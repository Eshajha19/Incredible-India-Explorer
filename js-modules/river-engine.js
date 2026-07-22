/**
 * river-engine.js
 * Game Engine for endless scrolling River Explorer
 */
import { RIVERS, FISH_TYPES, OBSTACLE_TYPES, LANDMARKS } from './river-data.js';

export class RiverEngine {
    constructor(canvasWidth, canvasHeight) {
        this.width = canvasWidth;
        this.height = canvasHeight;
        this.riverBaseSpeed = 3;
        this.rivers = RIVERS;
        this.resetState();
    }

    resetState() {
        this.state = {
            river: this.rivers[0],
            boat: {
                x: this.width / 2,
                y: this.height - 100, // Fixed vertically near the bottom
                size: 40,
                speed: 5,
                health: 3
            },
            distance: 0,
            score: 0,
            fishCount: 0,
            badges: [],
            entities: [],
            gameOver: false,
            paused: true
        };
        this.spawnTimer = 0;
        this.lastTime = performance.now();
    }

    setRiver(index) {
        this.state.river = this.rivers[index];
    }

    start() {
        this.state.paused = false;
        this.lastTime = performance.now();
    }

    moveBoat(dx) {
        if (this.state.gameOver || this.state.paused) return;
        
        // Horizontal movement only
        let nx = this.state.boat.x + dx * this.state.boat.speed;
        
        // Clamp to river banks
        if (nx > 20 && nx < this.width - 60) {
            this.state.boat.x = nx;
        }
    }

    update(currentTime) {
        if (this.state.gameOver || this.state.paused) return;

        const dt = (currentTime - this.lastTime) / 1000; // seconds
        this.lastTime = currentTime;

        // Dynamic difficulty: speed increases with distance
        const currentSpeed = this.riverBaseSpeed + (this.state.distance * 0.05 * this.state.river.difficulty);
        
        // Increase distance
        this.state.distance += currentSpeed * 0.01;
        this.state.score += (currentSpeed * 0.05);

        // Update entities positions
        this.state.entities.forEach(ent => {
            ent.y += currentSpeed;
        });

        // Remove off-screen entities
        this.state.entities = this.state.entities.filter(ent => ent.y < this.height + 50);

        // Spawn new entities
        this.spawnTimer -= dt;
        if (this.spawnTimer <= 0) {
            this.spawnEntity();
            // Spawn faster as distance increases
            this.spawnTimer = Math.max(0.5, 1.5 - (this.state.distance * 0.02)); 
        }

        this.checkCollisions();
        this.checkBadges();

        if (this.state.boat.health <= 0) {
            this.state.gameOver = true;
            this.state.paused = true;
        }
    }

    spawnEntity() {
        const xPos = Math.random() * (this.width - 100) + 50;
        const rand = Math.random();

        let newEntity = { x: xPos, y: -50, size: 40, active: true };

        if (rand < 0.5) {
            // Spawn Obstacle
            const obs = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
            newEntity.type = "obstacle";
            newEntity.icon = obs.icon;
            newEntity.damage = obs.damage;
            newEntity.points = obs.points;
        } else if (rand < 0.9) {
            // Spawn Fish
            const fish = FISH_TYPES[Math.floor(Math.random() * FISH_TYPES.length)];
            newEntity.type = "fish";
            newEntity.icon = fish.icon;
            newEntity.points = fish.points;
        } else {
            // Spawn Landmark
            const lm = LANDMARKS[Math.floor(Math.random() * LANDMARKS.length)];
            newEntity.type = "landmark";
            newEntity.icon = lm.icon;
            newEntity.name = lm.name;
            newEntity.badge = lm.badge;
            newEntity.points = 200;
        }

        this.state.entities.push(newEntity);
    }

    checkCollisions() {
        const boat = this.state.boat;
        const hitboxSize = boat.size * 0.8; // forgiving hitbox

        this.state.entities.forEach(ent => {
            if (!ent.active) return;

            // Simple AABB Collision
            if (boat.x < ent.x + hitboxSize &&
                boat.x + hitboxSize > ent.x &&
                boat.y < ent.y + hitboxSize &&
                boat.y + hitboxSize > ent.y) {
                
                ent.active = false; // consume entity

                if (ent.type === "obstacle") {
                    this.state.boat.health -= ent.damage;
                    this.state.score += ent.points;
                } else if (ent.type === "fish") {
                    this.state.score += ent.points;
                    this.state.fishCount++;
                } else if (ent.type === "landmark") {
                    this.state.score += ent.points;
                    if (!this.state.badges.includes(ent.badge)) {
                        this.state.badges.push(ent.badge);
                        this.state.score += 500; // badge bonus
                    }
                }
            }
        });
    }

    checkBadges() {
        if (this.state.fishCount >= 5 && !this.state.badges.includes("River Biologist")) {
            this.state.badges.push("River Biologist");
            this.state.score += 500;
        }
        if (this.state.distance >= 10 && !this.state.badges.includes("Explorer")) {
            this.state.badges.push("Explorer");
            this.state.score += 500;
        }
        if (this.state.score >= 1000 && !this.state.badges.includes("River Legend")) {
            this.state.badges.push("River Legend");
        }
    }
}
