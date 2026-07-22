/**
 * monsoon-data.js
 * Config and initial state data for Monsoon Game
 */

export const INITIAL_STATES = [
    {
        id: "gujarat",
        name: "Gujarat",
        waterLevel: 40,
        minWater: 30,
        idealWater: 60,
        maxWater: 90,
        status: "Balanced"
    },
    {
        id: "rajasthan",
        name: "Rajasthan",
        waterLevel: 15,
        minWater: 20,
        idealWater: 50,
        maxWater: 80,
        status: "Drought"
    },
    {
        id: "kerala",
        name: "Kerala",
        waterLevel: 85,
        minWater: 40,
        idealWater: 70,
        maxWater: 90,
        status: "Balanced"
    },
    {
        id: "bihar",
        name: "Bihar",
        waterLevel: 65,
        minWater: 30,
        idealWater: 60,
        maxWater: 85,
        status: "Balanced"
    },
    {
        id: "assam",
        name: "Assam",
        waterLevel: 80,
        minWater: 40,
        idealWater: 75,
        maxWater: 95,
        status: "Balanced"
    },
    {
        id: "maharashtra",
        name: "Maharashtra",
        waterLevel: 25,
        minWater: 30,
        idealWater: 60,
        maxWater: 85,
        status: "Drought"
    }
];

export const SEASONS = [
    { name: "Early Monsoon", evaporationRate: 1, durationSec: 30, rainPower: 10 },
    { name: "Peak Monsoon", evaporationRate: 0.5, durationSec: 30, rainPower: 20 },
    { name: "Late Monsoon", evaporationRate: 1.5, durationSec: 30, rainPower: 15 },
    { name: "Dry Season", evaporationRate: 3, durationSec: 30, rainPower: 5 }
];
