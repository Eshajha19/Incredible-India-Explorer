/**
 * js-modules/trip-planner.js
 * Advanced Trip Planner — budget-aware, rule-based multi-city itinerary
 * generator. No backend: destinations come from trip-data.js, saved trips
 * live in localStorage.
 *
 * Loaded on demand by app.js when the route is trip-planner.html, mirroring
 * the pattern used by other js-modules/*.js pages (see initRoadTripFlipCards
 * etc. in app.js's `app:route-changed` handler).
 *
 * All the pure logic (scoring / selection / budget math) is exposed on
 * window.TripPlanner so it can be unit tested outside the DOM
 * (see trip-planner.test.js).
 */
(function (root) {
    "use strict";

    const SAVED_TRIPS_KEY = "tripPlannerSavedTrips";
    const CONTINGENCY_RATE = 0.10; // 10% buffer added to every cost estimate
    const LONG_HOP_KM = 400;       // hops longer than this consume a travel day
    const NEAREST_NEIGHBOR_POOL = 6; // how many top-scored candidates we consider when picking the geographically nearest "next city"

    const TRAVEL_RATE_PER_KM = { budget: 6, mid: 10, luxury: 18 };   // INR/km
    const TRAVEL_BASE_FEE = { budget: 400, mid: 1200, luxury: 3500 }; // INR flat per hop (booking/transfer overhead)
    const AVG_SPEED_KMH = { budget: 45, mid: 55, luxury: 70 };        // rough overland/mixed speed used only for display

    // --------------------------------------------------------------------
    // Geometry & cost primitives
    // --------------------------------------------------------------------

    function haversineDistanceKm(lat1, lng1, lat2, lng2) {
        const toRad = (deg) => (deg * Math.PI) / 180;
        const R = 6371;
        const dLat = toRad(lat2 - lat1);
        const dLng = toRad(lng2 - lng1);
        const a =
            Math.sin(dLat / 2) ** 2 +
            Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2;
        return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    }

    function estimateTravelLeg(distanceKm, tier) {
        const rate = TRAVEL_RATE_PER_KM[tier] || TRAVEL_RATE_PER_KM.mid;
        const base = TRAVEL_BASE_FEE[tier] || TRAVEL_BASE_FEE.mid;
        const speed = AVG_SPEED_KMH[tier] || AVG_SPEED_KMH.mid;
        const cost = Math.round(base + distanceKm * rate);
        const hours = Math.max(1, Math.round((distanceKm / speed) * 10) / 10);
        const travelDays = distanceKm > LONG_HOP_KM ? 1 : 0;
        return { distanceKm: Math.round(distanceKm), cost, hours, travelDays };
    }

    // --------------------------------------------------------------------
    // Scoring & tier selection
    // --------------------------------------------------------------------

    function scoreDestination(dest, categories) {
        const prefs = categories && categories.length ? categories : [];
        const matchCount = prefs.length
            ? dest.categories.filter((c) => prefs.includes(c)).length
            : 1; // no preference selected -> every destination matches equally
        // Preference match dominates; popularity only breaks ties.
        return matchCount * 100 + (dest.popularity || 0);
    }

    function chooseCostTier(perPersonBudget, days) {
        const perDay = perPersonBudget / Math.max(1, days);
        if (perDay >= 7000) return "luxury";
        if (perDay >= 2800) return "mid";
        return "budget";
    }

    // --------------------------------------------------------------------
    // Itinerary selection (the "optimization logic")
    // --------------------------------------------------------------------

    /**
     * @param {Object} input
     * @param {number} input.budget - total trip budget in INR (all travelers combined)
     * @param {number} input.days - total trip length in days
     * @param {string[]} input.categories - preferred destination types
     * @param {number} [input.travelers=1]
     * @param {string[]} [input.excludeIds] - destinations to leave out (used by "regenerate")
     * @returns {Object} itinerary
     */
    function generateItinerary(input) {
        const travelers = Math.max(1, input.travelers || 1);
        const days = Math.max(1, Math.round(input.days || 1));
        const budget = Math.max(0, input.budget || 0);
        const categories = input.categories || [];
        const excludeIds = new Set(input.excludeIds || []);

        const perPersonBudget = budget / travelers;
        const tier = chooseCostTier(perPersonBudget, days);

        let usedFallback = false;
        let pool = (root.tripDestinations || []).filter((d) => !excludeIds.has(d.id));

        if (categories.length) {
            const filtered = pool.filter((d) => d.categories.some((c) => categories.includes(c)));
            if (filtered.length === 0) {
                usedFallback = true; // nothing matched preferences; fall back to the full pool
            } else {
                pool = filtered;
            }
        }

        pool = pool
            .map((d) => ({ ...d, score: scoreDestination(d, categories) }))
            .sort((a, b) => b.score - a.score || b.popularity - a.popularity);

        const chosen = [];
        const legs = []; // travel leg *into* chosen[i], legs[i-1]
        let daysUsed = 0;
        let costUsed = 0; // per-person INR, accommodation + travel only (no contingency yet)
        // costUsed is capped here so that costUsed * (1 + CONTINGENCY_RATE) — the figure
        // actually charged once contingency is added below — lands at or under budget.
        const budgetCeiling = perPersonBudget / (1 + CONTINGENCY_RATE);
        let candidates = pool.slice();

        while (candidates.length && daysUsed < days) {
            let pick = null;
            let pickIndex = -1;

            if (chosen.length === 0) {
                pick = candidates[0];
                pickIndex = 0;
            } else {
                const last = chosen[chosen.length - 1];
                const topSlice = candidates.slice(0, NEAREST_NEIGHBOR_POOL);
                let bestDist = Infinity;
                topSlice.forEach((c, i) => {
                    const dist = haversineDistanceKm(last.lat, last.lng, c.lat, c.lng);
                    if (dist < bestDist) {
                        bestDist = dist;
                        pick = c;
                        pickIndex = i;
                    }
                });
            }

            if (!pick) break;
            candidates.splice(pickIndex, 1);

            const remainingDays = days - daysUsed;
            const stayDays = Math.max(1, Math.min(pick.minDays, remainingDays));

            const leg = chosen.length
                ? estimateTravelLeg(
                      haversineDistanceKm(chosen[chosen.length - 1].lat, chosen[chosen.length - 1].lng, pick.lat, pick.lng),
                      tier
                  )
                : { distanceKm: 0, cost: 0, hours: 0, travelDays: 0 };

            const projectedDays = daysUsed + stayDays + leg.travelDays;
            const projectedCost = costUsed + pick.costPerDay[tier] * stayDays + leg.cost;

            if (projectedDays > days) continue; // doesn't fit in remaining time, try another candidate
            if (chosen.length > 0 && projectedCost > budgetCeiling) continue; // doesn't fit budget (always keep at least 1 destination)

            chosen.push({ ...pick, assignedDays: stayDays });
            legs.push(leg);
            daysUsed = projectedDays;
            costUsed = projectedCost;
        }

        // If nothing fit at all (e.g. tiny budget), force the single cheapest matching destination.
        if (chosen.length === 0 && pool.length) {
            const cheapest = pool.slice().sort((a, b) => a.costPerDay[tier] - b.costPerDay[tier])[0];
            const stayDays = Math.min(cheapest.minDays, days);
            chosen.push({ ...cheapest, assignedDays: stayDays });
            legs.push({ distanceKm: 0, cost: 0, hours: 0, travelDays: 0 });
            daysUsed = stayDays;
            costUsed = cheapest.costPerDay[tier] * stayDays;
        }

        // Distribute any leftover days to the highest-popularity chosen cities, capped at
        // maxDays and never pushing the total past the budget ceiling.
        let leftover = days - daysUsed;
        if (leftover > 0 && chosen.length) {
            const order = chosen
                .map((d, i) => i)
                .sort((a, b) => (chosen[b].popularity || 0) - (chosen[a].popularity || 0));
            let guard = 0;
            while (leftover > 0 && guard < 1000) {
                let assignedAny = false;
                for (const i of order) {
                    if (leftover <= 0) break;
                    const cap = chosen[i].maxDays || chosen[i].minDays;
                    const extraCost = chosen[i].costPerDay[tier];
                    if (chosen[i].assignedDays < cap && costUsed + extraCost <= budgetCeiling) {
                        chosen[i].assignedDays += 1;
                        costUsed += extraCost;
                        leftover -= 1;
                        assignedAny = true;
                    }
                }
                guard += 1;
                if (!assignedAny) break;
            }
            daysUsed = days - leftover;
        }

        const travelCostTotal = legs.reduce((sum, l) => sum + l.cost, 0);
        const accommodationCostTotal = chosen.reduce((sum, d) => sum + d.costPerDay[tier] * d.assignedDays, 0);
        const perPersonSubtotal = travelCostTotal + accommodationCostTotal;
        const contingency = Math.round(perPersonSubtotal * CONTINGENCY_RATE);
        const perPersonTotal = perPersonSubtotal + contingency;
        const grandTotal = perPersonTotal * travelers;

        return {
            id: "trip_" + Date.now() + "_" + Math.random().toString(36).slice(2, 7),
            createdAt: new Date().toISOString(),
            inputs: { budget, days, categories, travelers },
            tier,
            usedFallback,
            destinations: chosen,
            legs,
            daysUsed,
            budget: {
                accommodation: accommodationCostTotal,
                travel: travelCostTotal,
                contingency,
                perPersonTotal,
                grandTotal,
                withinBudget: grandTotal <= budget || budget === 0,
                remaining: budget - grandTotal,
            },
        };
    }

    /** Re-roll the itinerary, forcing a different anchor destination for variety. */
    function regenerateItinerary(previous, overrides) {
        const excludeIds = new Set(previous.inputs.excludeIds || []);
        if (previous.destinations[0]) excludeIds.add(previous.destinations[0].id);
        const input = Object.assign({}, previous.inputs, overrides || {}, {
            excludeIds: Array.from(excludeIds),
        });
        const next = generateItinerary(input);
        // If exclusion emptied the pool (fallback triggered with same result), just accept it.
        return next;
    }

    /** Remove one destination and redistribute its days to the rest, without touching the pool. */
    function removeDestinationFromItinerary(itinerary, destId) {
        const remaining = itinerary.destinations.filter((d) => d.id !== destId);
        if (remaining.length === 0) return itinerary; // keep at least one

        const removedIndex = itinerary.destinations.findIndex((d) => d.id === destId);
        const freedDays = itinerary.destinations[removedIndex].assignedDays;

        // Rebuild legs for the new adjacency (recompute distances between the new neighbors).
        const tier = itinerary.tier;
        const legs = [];
        for (let i = 1; i < remaining.length; i++) {
            const a = remaining[i - 1];
            const b = remaining[i];
            legs.push(estimateTravelLeg(haversineDistanceKm(a.lat, a.lng, b.lat, b.lng), tier));
        }
        legs.unshift({ distanceKm: 0, cost: 0, hours: 0, travelDays: 0 });

        let leftover = freedDays;
        const order = remaining
            .map((d, i) => i)
            .sort((a, b) => (remaining[b].popularity || 0) - (remaining[a].popularity || 0));
        let guard = 0;
        while (leftover > 0 && guard < 1000) {
            let assignedAny = false;
            for (const i of order) {
                if (leftover <= 0) break;
                const cap = remaining[i].maxDays || remaining[i].minDays;
                if (remaining[i].assignedDays < cap) {
                    remaining[i].assignedDays += 1;
                    leftover -= 1;
                    assignedAny = true;
                }
            }
            guard += 1;
            if (!assignedAny) break;
        }

        const travelCostTotal = legs.reduce((s, l) => s + l.cost, 0);
        const accommodationCostTotal = remaining.reduce((s, d) => s + d.costPerDay[tier] * d.assignedDays, 0);
        const perPersonSubtotal = travelCostTotal + accommodationCostTotal;
        const contingency = Math.round(perPersonSubtotal * CONTINGENCY_RATE);
        const perPersonTotal = perPersonSubtotal + contingency;
        const travelers = itinerary.inputs.travelers || 1;
        const grandTotal = perPersonTotal * travelers;

        return Object.assign({}, itinerary, {
            destinations: remaining,
            legs,
            daysUsed: remaining.reduce((s, d) => s + d.assignedDays, 0),
            budget: {
                accommodation: accommodationCostTotal,
                travel: travelCostTotal,
                contingency,
                perPersonTotal,
                grandTotal,
                withinBudget: grandTotal <= itinerary.inputs.budget || itinerary.inputs.budget === 0,
                remaining: itinerary.inputs.budget - grandTotal,
            },
        });
    }

    /** Build a day-by-day schedule from a generated itinerary. */
    function buildDailySchedule(itinerary) {
        const schedule = [];
        let dayCounter = 1;
        itinerary.destinations.forEach((dest, idx) => {
            const leg = itinerary.legs[idx];
            if (leg && leg.travelDays > 0) {
                schedule.push({
                    day: dayCounter,
                    type: "travel",
                    from: itinerary.destinations[idx - 1] ? itinerary.destinations[idx - 1].name : null,
                    to: dest.name,
                    distanceKm: leg.distanceKm,
                    hours: leg.hours,
                    cost: leg.cost,
                });
                dayCounter += 1;
            }
            for (let d = 0; d < dest.assignedDays; d++) {
                const highlight = dest.highlights[d % dest.highlights.length];
                schedule.push({
                    day: dayCounter,
                    type: "stay",
                    city: dest.name,
                    state: dest.state,
                    activity:
                        d === 0 && idx > 0 && leg && leg.travelDays === 0 && idx > 0
                            ? `Arrive & explore ${highlight}`
                            : d === 0
                            ? `Arrive & explore ${highlight}`
                            : `Explore ${highlight}`,
                });
                dayCounter += 1;
            }
        });
        return schedule;
    }

    // --------------------------------------------------------------------
    // Persistence (localStorage — no backend)
    // --------------------------------------------------------------------

    function getSavedTrips() {
        try {
            const raw = localStorage.getItem(SAVED_TRIPS_KEY);
            return raw ? JSON.parse(raw) : [];
        } catch (e) {
            console.error("[TripPlanner] Failed to read saved trips", e);
            return [];
        }
    }

    function saveTrip(itinerary, title) {
        const trips = getSavedTrips();
        const record = {
            id: itinerary.id,
            title: title || defaultTripTitle(itinerary),
            savedAt: new Date().toISOString(),
            itinerary,
        };
        const existingIndex = trips.findIndex((t) => t.id === record.id);
        if (existingIndex >= 0) {
            trips[existingIndex] = record;
        } else {
            trips.unshift(record);
        }
        try {
            localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(trips));
            return true;
        } catch (e) {
            console.error("[TripPlanner] Failed to save trip", e);
            return false;
        }
    }

    function deleteSavedTrip(id) {
        const trips = getSavedTrips().filter((t) => t.id !== id);
        try {
            localStorage.setItem(SAVED_TRIPS_KEY, JSON.stringify(trips));
            return true;
        } catch (e) {
            console.error("[TripPlanner] Failed to delete trip", e);
            return false;
        }
    }

    function defaultTripTitle(itinerary) {
        const names = itinerary.destinations.map((d) => d.name);
        const label = names.length > 2 ? `${names[0]} + ${names.length - 1} more` : names.join(" & ");
        return `${itinerary.daysUsed}-Day Trip: ${label}`;
    }

    // --------------------------------------------------------------------
    // Public API (also unit-testable via module.exports, see bottom)
    // --------------------------------------------------------------------

    const TripPlanner = {
        haversineDistanceKm,
        estimateTravelLeg,
        scoreDestination,
        chooseCostTier,
        generateItinerary,
        regenerateItinerary,
        removeDestinationFromItinerary,
        buildDailySchedule,
        getSavedTrips,
        saveTrip,
        deleteSavedTrip,
        defaultTripTitle,
    };

    root.TripPlanner = TripPlanner;

    // --------------------------------------------------------------------
    // UI wiring — runs once per route load (called by app.js as
    // initTripPlannerPage(), following the site's existing lazy-load convention)
    // --------------------------------------------------------------------

    function fmtINR(n) {
        return "₹" + Math.round(n).toLocaleString("en-IN");
    }

    function initTripPlannerPage() {
        const form = document.getElementById("trip-planner-form");
        if (!form) return; // not on this page (defensive, route matching already guards this)

        const resultsEl = document.getElementById("trip-results");
        const savedListEl = document.getElementById("trip-saved-list");
        const categoryButtons = Array.from(document.querySelectorAll(".trip-category-chip"));
        const errorEl = document.getElementById("trip-form-error");

        let currentItinerary = null;
        let selectedCategories = [];

        categoryButtons.forEach((btn) => {
            btn.addEventListener("click", () => {
                btn.classList.toggle("active");
                const cat = btn.dataset.category;
                if (btn.classList.contains("active")) {
                    if (!selectedCategories.includes(cat)) selectedCategories.push(cat);
                } else {
                    selectedCategories = selectedCategories.filter((c) => c !== cat);
                }
            });
        });

        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const budget = parseFloat(document.getElementById("trip-budget").value);
            const days = parseInt(document.getElementById("trip-days").value, 10);
            const travelers = parseInt(document.getElementById("trip-travelers").value, 10) || 1;

            if (!budget || budget <= 0 || !days || days <= 0) {
                if (errorEl) {
                    errorEl.textContent = "Please enter a valid budget and number of days.";
                    errorEl.hidden = false;
                }
                return;
            }
            if (errorEl) errorEl.hidden = true;

            currentItinerary = generateItinerary({ budget, days, travelers, categories: selectedCategories });
            renderItinerary();
        });

        document.addEventListener("click", (e) => {
            const regenBtn = e.target.closest("#trip-regenerate-btn");
            if (regenBtn && currentItinerary) {
                currentItinerary = regenerateItinerary(currentItinerary);
                renderItinerary();
                return;
            }

            const removeBtn = e.target.closest(".trip-remove-city-btn");
            if (removeBtn && currentItinerary) {
                currentItinerary = removeDestinationFromItinerary(currentItinerary, removeBtn.dataset.destId);
                renderItinerary();
                return;
            }

            const saveBtn = e.target.closest("#trip-save-btn");
            if (saveBtn && currentItinerary) {
                saveTrip(currentItinerary);
                renderSavedTrips();
                saveBtn.textContent = "✓ Saved";
                setTimeout(() => {
                    saveBtn.textContent = "Save This Trip";
                }, 1800);
                return;
            }

            const deleteBtn = e.target.closest(".trip-delete-saved-btn");
            if (deleteBtn) {
                deleteSavedTrip(deleteBtn.dataset.tripId);
                renderSavedTrips();
                return;
            }

            const viewBtn = e.target.closest(".trip-view-saved-btn");
            if (viewBtn) {
                const trips = getSavedTrips();
                const found = trips.find((t) => t.id === viewBtn.dataset.tripId);
                if (found) {
                    currentItinerary = found.itinerary;
                    renderItinerary();
                    resultsEl.scrollIntoView({ behavior: "smooth", block: "start" });
                }
            }
        });

        function renderItinerary() {
            if (!resultsEl || !currentItinerary) return;
            const it = currentItinerary;
            const schedule = buildDailySchedule(it);

            const fallbackNote = it.usedFallback
                ? `<p class="trip-note">No destinations matched all your preferences within the trip length, so we broadened the search.</p>`
                : "";

            const budgetNote = it.budget.withinBudget
                ? `<span class="trip-budget-status trip-budget-ok">Within budget — ${fmtINR(it.budget.remaining)} to spare</span>`
                : `<span class="trip-budget-status trip-budget-over">Over budget by ${fmtINR(-it.budget.remaining)}</span>`;

            const cityChips = it.destinations
                .map(
                    (d) => `
                <div class="trip-city-chip">
                    <span>${d.name} <em>(${d.assignedDays}d)</em></span>
                    ${it.destinations.length > 1 ? `<button type="button" class="trip-remove-city-btn" data-dest-id="${d.id}" aria-label="Remove ${d.name}">✕</button>` : ""}
                </div>`
                )
                .join("");

            const scheduleHtml = schedule
                .map((item) => {
                    if (item.type === "travel") {
                        return `<div class="trip-day-row trip-day-travel">
                            <span class="trip-day-num">Day ${item.day}</span>
                            <span class="trip-day-desc">🚗 Travel: ${item.from} → ${item.to} (~${item.distanceKm} km, ~${item.hours}h, ${fmtINR(item.cost)})</span>
                        </div>`;
                    }
                    return `<div class="trip-day-row">
                        <span class="trip-day-num">Day ${item.day}</span>
                        <span class="trip-day-desc"><strong>${item.city}</strong>, ${item.state} — ${item.activity}</span>
                    </div>`;
                })
                .join("");

            resultsEl.hidden = false;
            resultsEl.innerHTML = `
                ${fallbackNote}
                <div class="trip-summary-card">
                    <div class="trip-summary-header">
                        <h3>${it.daysUsed}-Day Itinerary <span class="trip-tier-badge trip-tier-${it.tier}">${it.tier} tier</span></h3>
                        ${budgetNote}
                    </div>
                    <div class="trip-city-chips">${cityChips}</div>
                    <div class="trip-budget-breakdown">
                        <div><span>Accommodation &amp; food</span><strong>${fmtINR(it.budget.accommodation * it.inputs.travelers)}</strong></div>
                        <div><span>Inter-city travel</span><strong>${fmtINR(it.budget.travel * it.inputs.travelers)}</strong></div>
                        <div><span>Contingency (10%)</span><strong>${fmtINR(it.budget.contingency * it.inputs.travelers)}</strong></div>
                        <div class="trip-budget-total"><span>Estimated total (${it.inputs.travelers} traveler${it.inputs.travelers > 1 ? "s" : ""})</span><strong>${fmtINR(it.budget.grandTotal)}</strong></div>
                    </div>
                    <div class="trip-actions">
                        <button type="button" class="btn btn-secondary ripple" id="trip-regenerate-btn">🔄 Regenerate</button>
                        <button type="button" class="btn btn-primary ripple" id="trip-save-btn">Save This Trip</button>
                    </div>
                </div>
                <div class="trip-schedule">
                    <h4>Daily Schedule</h4>
                    ${scheduleHtml}
                </div>
            `;
        }

        function renderSavedTrips() {
            if (!savedListEl) return;
            const trips = getSavedTrips();
            if (trips.length === 0) {
                savedListEl.innerHTML = `<p class="trip-note">No saved trips yet. Generate an itinerary and save it to see it here.</p>`;
                return;
            }
            savedListEl.innerHTML = trips
                .map(
                    (t) => `
                <div class="trip-saved-card">
                    <div>
                        <h4>${t.title}</h4>
                        <p>${new Date(t.savedAt).toLocaleDateString()} • ${fmtINR(t.itinerary.budget.grandTotal)} • ${t.itinerary.destinations.length} cities</p>
                    </div>
                    <div class="trip-saved-actions">
                        <button type="button" class="btn btn-secondary ripple trip-view-saved-btn" data-trip-id="${t.id}">View</button>
                        <button type="button" class="btn-icon trip-delete-saved-btn" data-trip-id="${t.id}" aria-label="Delete trip">🗑️</button>
                    </div>
                </div>`
                )
                .join("");
        }

        renderSavedTrips();
    }

    root.initTripPlannerPage = initTripPlannerPage;

    if (typeof module !== "undefined" && module.exports) {
        module.exports = TripPlanner;
    }
})(typeof window !== "undefined" ? window : globalThis);
