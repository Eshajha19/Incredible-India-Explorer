/**
 * culinary-engine.js
 * Logic engine for Culinary Strategy Game
 */
import { RECIPES } from './culinary-data.js';

export class CulinaryEngine {
    constructor() {
        this.listeners = [];
        this.resetState();
    }

    resetState() {
        this.state = {
            score: 0,
            coins: 0,
            xp: 0,
            completedOrders: 0,
            perfectStreak: 0,
            multiplier: 1,
            currentOrder: null,
            selectedIngredients: [],
            timeLeft: 0,
            maxTime: 0,
            gameOver: false,
            resultMessage: ""
        };
        this.generateOrder();
    }

    subscribe(listener) {
        this.listeners.push(listener);
        return () => this.listeners = this.listeners.filter(l => l !== listener);
    }

    notifyListeners() {
        this.listeners.forEach(l => l(this.state));
    }

    startTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
        this.timerInterval = setInterval(() => {
            if (this.state.gameOver) return;

            this.state.timeLeft -= 1;
            if (this.state.timeLeft <= 0) {
                this.timeOut();
            } else {
                this.notifyListeners();
            }
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) clearInterval(this.timerInterval);
    }

    generateOrder() {
        const idx = Math.floor(Math.random() * RECIPES.length);
        const baseRecipe = RECIPES[idx];

        // Difficulty increases (time shrinks) after every 2 orders
        const timeReduction = Math.floor(this.state.completedOrders / 2) * 2;
        let finalTime = Math.max(15, baseRecipe.time - timeReduction);

        this.state.currentOrder = baseRecipe;
        this.state.selectedIngredients = [];
        this.state.timeLeft = finalTime;
        this.state.maxTime = finalTime;
        this.startTimer();
        this.notifyListeners();
    }

    selectIngredient(ingredientName) {
        if (this.state.gameOver) return;

        this.state.selectedIngredients.push(ingredientName);
        
        // Immediate simple validation per step
        const currentIndex = this.state.selectedIngredients.length - 1;
        const expected = this.state.currentOrder.ingredients[currentIndex];

        if (ingredientName === expected) {
            // Correct step
            this.state.score += (20 * this.state.multiplier);
            
            // Check if recipe complete
            if (this.state.selectedIngredients.length === this.state.currentOrder.ingredients.length) {
                this.completeOrder();
            } else {
                this.notifyListeners(); // Just update UI
            }
        } else {
            // Wrong ingredient
            this.wrongIngredient();
        }
    }

    wrongIngredient() {
        this.state.score -= 30;
        this.state.perfectStreak = 0;
        this.updateMultiplier();
        this.state.resultMessage = "Wrong Ingredient! Penalty -30 Score. Sequence Reset.";
        this.state.selectedIngredients = []; // Reset current attempt
        this.notifyListeners();
    }

    timeOut() {
        this.state.score -= 100;
        this.state.perfectStreak = 0;
        this.updateMultiplier();
        this.state.resultMessage = "Time's up! Order failed. Penalty -100 Score.";
        this.generateOrder(); // Give a new order automatically
    }

    completeOrder() {
        this.stopTimer();

        // Calculate rewards
        const recipe = this.state.currentOrder;
        let earnScore = recipe.reward * this.state.multiplier;
        
        // Speed bonus
        if (this.state.timeLeft > recipe.time / 2) {
            earnScore += 100; // Served quickly
        }

        this.state.score += earnScore;
        this.state.coins += 50;
        this.state.xp += 100;
        this.state.completedOrders += 1;
        this.state.perfectStreak += 1;
        
        this.updateMultiplier();

        this.state.resultMessage = `ORDER COMPLETE! ⭐ +${earnScore} Score 🪙 +50 Coins ✨ +100 XP`;
        this.state.gameOver = true; // Temporary state to show modal
        this.notifyListeners();
    }

    updateMultiplier() {
        if (this.state.perfectStreak >= 5) this.state.multiplier = 3;
        else if (this.state.perfectStreak >= 3) this.state.multiplier = 2;
        else this.state.multiplier = 1;
    }

    nextOrder() {
        this.state.gameOver = false;
        this.state.resultMessage = "";
        this.generateOrder();
    }
}

export const culinaryEngine = new CulinaryEngine();
