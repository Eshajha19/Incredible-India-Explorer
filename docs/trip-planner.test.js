/**
 * trip-planner.test.js
 * Lightweight unit tests for the Trip Planner's rule-based generation logic.
 * No framework dependency (matches the project's plain vanilla-JS setup).
 *
 * Run with:  node trip-planner.test.js
 */
require("./trip-data.js");
const TripPlanner = require("./js-modules/trip-planner.js");

let passed = 0;
let failed = 0;

function assert(condition, message) {
    if (condition) {
        passed += 1;
        console.log(`  ✓ ${message}`);
    } else {
        failed += 1;
        console.error(`  ✗ ${message}`);
    }
}

function section(title, fn) {
    console.log(`\n${title}`);
    fn();
}

// --------------------------------------------------------------------------

section("haversineDistanceKm", () => {
    const d = TripPlanner.haversineDistanceKm(28.6139, 77.209, 28.6139, 77.209);
    assert(d === 0, "distance between identical points is 0");

    const delhiAgra = TripPlanner.haversineDistanceKm(28.6139, 77.209, 27.1767, 78.0081);
    assert(delhiAgra > 150 && delhiAgra < 250, `Delhi–Agra distance is realistic (~200km), got ${delhiAgra.toFixed(0)}`);
});

section("estimateTravelLeg", () => {
    const leg = TripPlanner.estimateTravelLeg(200, "mid");
    assert(leg.cost > 0, "travel leg has a positive cost");
    assert(leg.travelDays === 0, "a 200km hop does not consume a dedicated travel day");

    const longLeg = TripPlanner.estimateTravelLeg(1200, "mid");
    assert(longLeg.travelDays === 1, "a 1200km hop consumes a dedicated travel day");
});

section("chooseCostTier", () => {
    assert(TripPlanner.chooseCostTier(2000, 10) === "budget", "low per-day budget -> budget tier");
    assert(TripPlanner.chooseCostTier(35000, 10) === "mid", "moderate per-day budget -> mid tier");
    assert(TripPlanner.chooseCostTier(100000, 10) === "luxury", "high per-day budget -> luxury tier");
});

section("scoreDestination", () => {
    const dest = { categories: ["mountains", "adventure"], popularity: 5 };
    const matchScore = TripPlanner.scoreDestination(dest, ["mountains"]);
    const noMatchScore = TripPlanner.scoreDestination(dest, ["beaches"]);
    assert(matchScore > noMatchScore, "a category match scores higher than a non-match");

    const noPrefScore = TripPlanner.scoreDestination(dest, []);
    assert(noPrefScore > 0, "an empty preference list still yields a positive baseline score");
});

section("generateItinerary — basic generation", () => {
    const it = TripPlanner.generateItinerary({ budget: 50000, days: 7, travelers: 1, categories: ["mountains"] });
    assert(it.destinations.length > 0, "produces at least one destination");
    assert(it.daysUsed <= 7, `does not exceed the requested day count (used ${it.daysUsed})`);
    assert(
        it.destinations.every((d) => d.categories.includes("mountains")),
        "every chosen destination matches the requested category"
    );
    assert(it.budget.grandTotal > 0, "produces a positive total cost estimate");
});

section("generateItinerary — budget respected", () => {
    const it = TripPlanner.generateItinerary({ budget: 15000, days: 10, travelers: 1, categories: [] });
    assert(it.budget.grandTotal <= 15000 * 1.15, "total cost stays close to the requested budget (small tolerance for the forced-minimum destination)");
});

section("generateItinerary — falls back gracefully with no category matches", () => {
    const it = TripPlanner.generateItinerary({ budget: 40000, days: 5, travelers: 1, categories: ["nonexistent-category"] });
    assert(it.usedFallback === true, "flags that it had to fall back to the full destination pool");
    assert(it.destinations.length > 0, "still returns a usable itinerary");
});

section("generateItinerary — multi-traveler scales cost", () => {
    const solo = TripPlanner.generateItinerary({ budget: 100000, days: 5, travelers: 1, categories: ["beaches"] });
    const group = TripPlanner.generateItinerary({ budget: 100000, days: 5, travelers: 4, categories: ["beaches"] });
    assert(group.budget.grandTotal > solo.budget.grandTotal, "a 4-traveler trip costs more in total than a solo trip with the same itinerary shape");
});

section("regenerateItinerary — produces a different anchor when possible", () => {
    const first = TripPlanner.generateItinerary({ budget: 60000, days: 7, travelers: 1, categories: ["historical"] });
    const second = TripPlanner.regenerateItinerary(first);
    assert(
        second.destinations[0].id !== first.destinations[0].id,
        "regenerating swaps out the original anchor destination"
    );
});

section("removeDestinationFromItinerary — redistributes freed days", () => {
    const it = TripPlanner.generateItinerary({ budget: 80000, days: 10, travelers: 1, categories: ["historical", "heritage"] });
    if (it.destinations.length < 2) {
        console.log("  (skipped — itinerary only had one destination)");
    } else {
        const totalDaysBefore = it.destinations.reduce((s, d) => s + d.assignedDays, 0);
        const removed = TripPlanner.removeDestinationFromItinerary(it, it.destinations[it.destinations.length - 1].id);
        const totalDaysAfter = removed.destinations.reduce((s, d) => s + d.assignedDays, 0);
        assert(removed.destinations.length === it.destinations.length - 1, "removes exactly one destination");
        assert(totalDaysAfter <= totalDaysBefore, "redistributed days never exceed the original total");
    }
});

section("buildDailySchedule", () => {
    const it = TripPlanner.generateItinerary({ budget: 50000, days: 6, travelers: 1, categories: ["spiritual"] });
    const schedule = TripPlanner.buildDailySchedule(it);
    assert(schedule.length > 0, "produces a non-empty day-by-day schedule");
    assert(schedule[0].day === 1, "schedule starts at day 1");
    const dayNumbers = schedule.map((s) => s.day);
    const isSequential = dayNumbers.every((n, i) => i === 0 || n === dayNumbers[i - 1] + 1);
    assert(isSequential, "day numbers are sequential with no gaps or repeats");
});

// --------------------------------------------------------------------------

console.log(`\n${passed} passed, ${failed} failed`);
process.exit(failed > 0 ? 1 : 0);
