/**
 * monsoon-engine.js
 * Game logic engine for the Monsoon Strategy Game
 */
import { INITIAL_STATES, SEASONS } from './monsoon-data.js';

export class MonsoonEngine {
    constructor() {
        this.listeners = [];
        this.resetGame();
    }

    resetGame() {
        this.state = {
            score: 0,
            multiplier: 1,
            seasonIndex: 0,
            timer: SEASONS[0].durationSec,
            statesData: JSON.parse(JSON.stringify(INITIAL_STATES)),
            gameOver: false,
            gameWon: false,
            reason: ""
        };
        this.notifyListeners();
    }

    startEngine() {
        if (this.gameInterval) clearInterval(this.gameInterval);
        this.gameInterval = setInterval(() => this.gameTick(), 1000);
    }

    stopEngine() {
        if (this.gameInterval) clearInterval(this.gameInterval);
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => {
            this.listeners = this.listeners.filter(l => l !== listener);
        };
    }

    notifyListeners() {
        this.listeners.forEach(l => l(this.state, this.getCurrentSeason()));
    }

    getCurrentSeason() {
        return SEASONS[this.state.seasonIndex];
    }

    gameTick() {
        if (this.state.gameOver) return;

        const currentSeason = this.getCurrentSeason();

        // 1. Timer & Season Progression
        this.state.timer -= 1;
        if (this.state.timer <= 0) {
            this.state.seasonIndex++;
            if (this.state.seasonIndex >= SEASONS.length) {
                // Win Condition Check
                this.checkWinCondition(true);
                return;
            } else {
                this.state.timer = SEASONS[this.state.seasonIndex].durationSec;
            }
        }

        // 2. Evaporation & Status Update
        this.state.statesData.forEach(st => {
            st.waterLevel -= currentSeason.evaporationRate;
            this.updateStatus(st);
        });

        // 3. Update Multiplier & Score
        this.updateMultiplier();
        this.state.score += (10 * this.state.multiplier);

        // 4. Check Lose Conditions
        this.checkLoseCondition();

        this.notifyListeners();
    }

    rain(stateId) {
        if (this.state.gameOver) return;
        
        const st = this.state.statesData.find(s => s.id === stateId);
        if (st) {
            const currentSeason = this.getCurrentSeason();
            st.waterLevel += currentSeason.rainPower;
            
            // Re-evaluate immediately
            this.updateStatus(st);
            this.updateMultiplier();
            this.notifyListeners();
        }
    }

    updateStatus(st) {
        if (st.waterLevel < st.minWater) {
            st.status = "Drought";
        } else if (st.waterLevel > st.maxWater) {
            st.status = "Flood";
        } else {
            st.status = "Balanced";
        }
    }

    updateMultiplier() {
        const balanced = this.state.statesData.filter(s => s.status === "Balanced").length;
        if (balanced >= 6) this.state.multiplier = 5;
        else if (balanced >= 4) this.state.multiplier = 3;
        else if (balanced >= 2) this.state.multiplier = 2;
        else this.state.multiplier = 1;

        // Penalty for flood/drought
        const problems = this.state.statesData.filter(s => s.status !== "Balanced").length;
        this.state.score -= (problems * 5); // small continuous penalty
        if (this.state.score < 0) this.state.score = 0;
    }

    checkLoseCondition() {
        const floods = this.state.statesData.filter(s => s.status === "Flood").length;
        const droughts = this.state.statesData.filter(s => s.status === "Drought").length;

        if (floods >= 3 || droughts >= 3) {
            this.state.gameOver = true;
            this.state.gameWon = false;
            this.state.reason = "Too many states experienced extreme weather (Floods/Droughts).";
            this.stopEngine();
            this.notifyListeners();
        }
    }

    checkWinCondition(timeEnded) {
        if (timeEnded) {
            const balanced = this.state.statesData.filter(s => s.status === "Balanced").length;
            if (balanced >= (this.state.statesData.length / 2)) {
                this.state.gameOver = true;
                this.state.gameWon = true;
                this.state.reason = "You survived the year maintaining balance in most states!";
            } else {
                this.state.gameOver = true;
                this.state.gameWon = false;
                this.state.reason = "Time is up, but too many states were left in poor conditions.";
            }
            this.stopEngine();
            this.notifyListeners();
        }
    }
}

export const monsoonEngine = new MonsoonEngine();
