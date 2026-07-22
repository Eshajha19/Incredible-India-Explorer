/**
 * wildlife-engine.js
 * Logic engine for Wildlife Rescue Game
 */
import { PARKS, SUPPLIES } from './wildlife-data.js';

export class WildlifeEngine {
    constructor() {
        this.listeners = [];
        this.parks = JSON.parse(JSON.stringify(PARKS));
        this.currentParkIndex = 0;
        this.resetState();
    }

    resetState() {
        const park = this.parks[this.currentParkIndex];
        const size = park.mapSize;

        this.state = {
            park: park,
            player: { x: 0, y: 0, health: 100 },
            inventory: {
                "Medical Kit": 1, // Start with 1 to make it possible
                "Tracking Tag": 0,
                "Ranger Equipment": 0
            },
            xp: 0,
            coins: 0,
            animal: { x: size - 1, y: size - 1, ...park.animal, rescued: false },
            poachers: this.generatePoachers(park.difficulty, size),
            traps: this.generateTraps(park.difficulty + 2, size),
            supplies: this.generateSupplies(park.difficulty + 1, size),
            gridSize: size,
            gameOver: false,
            gameWon: false,
            message: "Welcome to " + park.name
        };
        
        if(this.timer) clearInterval(this.timer);
        this.timer = setInterval(() => this.tick(), 1000);
        this.notifyListeners();
    }

    generatePoachers(count, size) {
        let poachers = [];
        for (let i = 0; i < count; i++) {
            poachers.push({
                x: Math.floor(Math.random() * (size - 2)) + 1,
                y: Math.floor(Math.random() * (size - 2)) + 1,
                direction: Math.random() > 0.5 ? 'h' : 'v',
                speed: 1
            });
        }
        return poachers;
    }

    generateTraps(count, size) {
        let traps = [];
        for (let i = 0; i < count; i++) {
            traps.push({
                id: `trap-${i}`,
                x: Math.floor(Math.random() * (size - 2)) + 1,
                y: Math.floor(Math.random() * (size - 2)) + 1,
                active: true
            });
        }
        return traps;
    }

    generateSupplies(count, size) {
        let items = [];
        for (let i = 0; i < count; i++) {
            items.push({
                id: `supply-${i}`,
                x: Math.floor(Math.random() * (size - 2)) + 1,
                y: Math.floor(Math.random() * (size - 2)) + 1,
                type: SUPPLIES[Math.floor(Math.random() * SUPPLIES.length)],
                active: true
            });
        }
        return items;
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => this.listeners = this.listeners.filter(l => l !== listener);
    }

    notifyListeners() {
        this.listeners.forEach(l => l(this.state, this.parks));
    }

    movePlayer(dx, dy) {
        if (this.state.gameOver) return;

        let nx = this.state.player.x + dx;
        let ny = this.state.player.y + dy;

        if (nx >= 0 && nx < this.state.gridSize && ny >= 0 && ny < this.state.gridSize) {
            this.state.player.x = nx;
            this.state.player.y = ny;
            this.checkCollisions();
            this.notifyListeners();
        }
    }

    checkCollisions() {
        const { player, animal, traps, supplies, poachers } = this.state;

        // Supplies
        supplies.forEach(s => {
            if (s.active && s.x === player.x && s.y === player.y) {
                s.active = false;
                this.state.inventory[s.type]++;
                this.state.xp += 50;
                this.state.message = `Collected ${s.type}! (+50 XP)`;
            }
        });

        // Traps
        traps.forEach(t => {
            if (t.active && t.x === player.x && t.y === player.y) {
                if (this.state.inventory["Ranger Equipment"] > 0) {
                    t.active = false;
                    this.state.inventory["Ranger Equipment"]--;
                    this.state.xp += 100;
                    this.state.message = "Disabled a trap using Ranger Equipment! (+100 XP)";
                } else {
                    t.active = false;
                    this.state.player.health -= 25;
                    this.state.xp -= 100;
                    this.state.message = "Ouch! You stepped on a trap. (-25 Health, -100 XP)";
                }
            }
        });

        // Poachers
        poachers.forEach(p => {
            if (p.x === player.x && p.y === player.y) {
                this.endGame(false, "Caught by a poacher! Mission Failed.");
            }
        });

        // Animal
        if (animal.x === player.x && animal.y === player.y && !animal.rescued) {
            if (this.state.inventory["Medical Kit"] > 0) {
                this.state.inventory["Medical Kit"]--;
                animal.rescued = true;
                animal.health = 100;
                this.state.xp += 500;
                this.state.coins += 1000;
                this.endGame(true, `Rescued the ${animal.name}! (+500 XP, +1000 Coins)`);
                this.unlockNextPark();
            } else {
                this.state.message = "You need a Medical Kit to rescue the animal!";
            }
        }

        if (this.state.player.health <= 0) {
            this.endGame(false, "You lost all your health! Mission Failed.");
        }
    }

    tick() {
        if (this.state.gameOver) return;

        // Move poachers
        this.state.poachers.forEach(p => {
            if (p.direction === 'h') {
                p.x += p.speed;
                if (p.x <= 0 || p.x >= this.state.gridSize - 1) p.speed *= -1;
            } else {
                p.y += p.speed;
                if (p.y <= 0 || p.y >= this.state.gridSize - 1) p.speed *= -1;
            }
        });

        this.checkCollisions();
        this.notifyListeners();
    }

    endGame(won, msg) {
        this.state.gameOver = true;
        this.state.gameWon = won;
        this.state.message = msg;
        if(this.timer) clearInterval(this.timer);
    }

    unlockNextPark() {
        if (this.currentParkIndex + 1 < this.parks.length) {
            this.parks[this.currentParkIndex + 1].unlocked = true;
        }
    }

    loadPark(index) {
        if (this.parks[index].unlocked) {
            this.currentParkIndex = index;
            this.resetState();
        }
    }
}

export const wildlifeEngine = new WildlifeEngine();
