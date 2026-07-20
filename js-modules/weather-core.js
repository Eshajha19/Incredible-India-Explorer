/**
 * js-modules/weather-core.js
 * Weather-Aware Itinerary Adjustment — rule-based logic module.
 *
 * Pure functions only: no DOM, no fetch, no localStorage. Forecast data is
 * passed in already-fetched (see weather-service.js for the Open-Meteo
 * fetch/cache layer, and weather-ui.js for DOM wiring). Kept separate so
 * the suitability/recommendation/reorder rules can be unit tested without
 * a browser (see tests/unit/weather-core.test.js).
 *
 * Exposed as window.WeatherCore (browser, plain <script> — no bundler in
 * this project) and via module.exports (Vitest / Node).
 */
(function (root) {
    "use strict";

    // ------------------------------------------------------------------
    // WMO weather code classification (the code Open-Meteo's `weathercode`
    // field returns — https://open-meteo.com/en/docs, WMO Weather
    // interpretation codes table)
    // ------------------------------------------------------------------
    const WEATHER_CODES = {
        0: { label: "Clear sky", icon: "☀️", severity: "none" },
        1: { label: "Mainly clear", icon: "🌤️", severity: "none" },
        2: { label: "Partly cloudy", icon: "⛅", severity: "none" },
        3: { label: "Overcast", icon: "☁️", severity: "none" },
        45: { label: "Fog", icon: "🌫️", severity: "mild" },
        48: { label: "Depositing rime fog", icon: "🌫️", severity: "mild" },
        51: { label: "Light drizzle", icon: "🌦️", severity: "mild" },
        53: { label: "Moderate drizzle", icon: "🌦️", severity: "mild" },
        55: { label: "Dense drizzle", icon: "🌧️", severity: "moderate" },
        56: { label: "Light freezing drizzle", icon: "🌧️", severity: "moderate" },
        57: { label: "Dense freezing drizzle", icon: "🌧️", severity: "severe" },
        61: { label: "Slight rain", icon: "🌦️", severity: "mild" },
        63: { label: "Moderate rain", icon: "🌧️", severity: "moderate" },
        65: { label: "Heavy rain", icon: "🌧️", severity: "severe" },
        66: { label: "Light freezing rain", icon: "🌧️", severity: "moderate" },
        67: { label: "Heavy freezing rain", icon: "🌧️", severity: "severe" },
        71: { label: "Slight snow fall", icon: "🌨️", severity: "moderate" },
        73: { label: "Moderate snow fall", icon: "🌨️", severity: "severe" },
        75: { label: "Heavy snow fall", icon: "❄️", severity: "severe" },
        77: { label: "Snow grains", icon: "🌨️", severity: "moderate" },
        80: { label: "Slight rain showers", icon: "🌦️", severity: "mild" },
        81: { label: "Moderate rain showers", icon: "🌧️", severity: "moderate" },
        82: { label: "Violent rain showers", icon: "⛈️", severity: "severe" },
        85: { label: "Slight snow showers", icon: "🌨️", severity: "moderate" },
        86: { label: "Heavy snow showers", icon: "❄️", severity: "severe" },
        95: { label: "Thunderstorm", icon: "⛈️", severity: "severe" },
        96: { label: "Thunderstorm, slight hail", icon: "⛈️", severity: "severe" },
        99: { label: "Thunderstorm, heavy hail", icon: "⛈️", severity: "severe" }
    };

    function classifyWeatherCode(code) {
        return WEATHER_CODES[code] || { label: "Unknown", icon: "❔", severity: "none" };
    }

    // ------------------------------------------------------------------
    // Category sensitivity — how much a destination category depends on
    // being outdoors. This is a heuristic, not a precise model: e.g.
    // "heritage" sites are often partly outdoors (fort ramparts, temple
    // courtyards) but usually have indoor/covered areas too, so they're
    // "moderate" rather than "high". See docs for the full rationale.
    // ------------------------------------------------------------------
    const CATEGORY_OUTDOOR_SENSITIVITY = {
        beaches: "high",
        adventure: "high",
        wildlife: "high",
        mountains: "high",
        backwaters: "high",
        desert: "high",
        historical: "moderate",
        heritage: "moderate",
        spiritual: "moderate",
        city: "low"
    };

    function destinationOutdoorSensitivity(categories) {
        if (!categories || !categories.length) return "moderate";
        const scores = categories.map((c) => CATEGORY_OUTDOOR_SENSITIVITY[c] || "moderate");
        if (scores.includes("high")) return "high";
        if (scores.every((s) => s === "low")) return "low";
        return "moderate";
    }

    // ------------------------------------------------------------------
    // Per-day suitability
    // ------------------------------------------------------------------
    const HEAT_WARNING_C = 40;
    const COLD_WARNING_C = 2;
    const HIGH_RAIN_PROB = 60;
    const MODERATE_RAIN_PROB = 35;

    /**
     * @param {Object} forecastDay - { date, weatherCode, tempMaxC, tempMinC, precipProbability }
     * @param {string[]} categories - destination categories (for sensitivity)
     * @returns {{status:'good'|'caution'|'poor', reasons:string[], sensitivity:string, weather:Object}}
     */
    function computeDaySuitability(forecastDay, categories) {
        if (!forecastDay) {
            return { status: "unknown", reasons: ["No forecast available for this date."], sensitivity: destinationOutdoorSensitivity(categories), weather: null };
        }

        const weather = classifyWeatherCode(forecastDay.weatherCode);
        const sensitivity = destinationOutdoorSensitivity(categories);
        const reasons = [];
        let riskScore = 0; // 0 = fine, higher = worse

        if (weather.severity === "severe") { riskScore += 3; reasons.push(`${weather.label.toLowerCase()} expected`); }
        else if (weather.severity === "moderate") { riskScore += 2; reasons.push(`${weather.label.toLowerCase()} expected`); }
        else if (weather.severity === "mild") { riskScore += 1; }

        if (typeof forecastDay.precipProbability === "number") {
            if (forecastDay.precipProbability >= HIGH_RAIN_PROB) { riskScore += 2; reasons.push(`${forecastDay.precipProbability}% chance of precipitation`); }
            else if (forecastDay.precipProbability >= MODERATE_RAIN_PROB) { riskScore += 1; }
        }

        if (typeof forecastDay.tempMaxC === "number" && forecastDay.tempMaxC >= HEAT_WARNING_C) {
            riskScore += 2;
            reasons.push(`extreme heat (${Math.round(forecastDay.tempMaxC)}°C)`);
        }
        if (typeof forecastDay.tempMinC === "number" && forecastDay.tempMinC <= COLD_WARNING_C) {
            riskScore += 2;
            reasons.push(`near-freezing conditions (${Math.round(forecastDay.tempMinC)}°C)`);
        }

        // Outdoor-heavy destinations are hit harder by the same weather than
        // indoor-friendly ones — scale risk by sensitivity rather than using
        // a flat threshold for every category.
        const sensitivityMultiplier = { high: 1.5, moderate: 1, low: 0.5 }[sensitivity] || 1;
        const adjustedRisk = riskScore * sensitivityMultiplier;

        let status = "good";
        if (adjustedRisk >= 4) status = "poor";
        else if (adjustedRisk >= 1.5) status = "caution";

        return { status, reasons, sensitivity, weather, riskScore: adjustedRisk };
    }

    /**
     * Map a schedule's "stay" days to calendar dates given a trip start date,
     * then evaluate suitability for each using that city's forecast.
     *
     * @param {Array} schedule - output of TripPlanner.buildDailySchedule()
     * @param {Object} destinationsById - { [destId]: destination } for category lookup
     * @param {Object} forecastsByDestId - { [destId]: forecastDay[] } (see weather-service.js)
     * @param {string} tripStartDateISO - "YYYY-MM-DD"
     * @returns {Array} evaluated schedule: each "stay" item gains { date, suitability }
     */
    function evaluateItineraryWeather(schedule, destinationsById, forecastsByDestId, tripStartDateISO) {
        const start = new Date(tripStartDateISO + "T00:00:00");
        if (isNaN(start.getTime())) {
            throw new Error("evaluateItineraryWeather: invalid tripStartDateISO");
        }

        return schedule.map((item) => {
            const date = addDaysISO(start, item.day - 1);
            if (item.type !== "stay") {
                return Object.assign({}, item, { date });
            }
            const dest = destinationsById[item.destId] || null;
            const forecastList = (dest && forecastsByDestId[dest.id]) || [];
            const forecastDay = forecastList.find((f) => f.date === date) || null;
            const suitability = computeDaySuitability(forecastDay, dest ? dest.categories : []);
            return Object.assign({}, item, { date, suitability });
        });
    }

    function addDaysISO(startDate, offset) {
        const d = new Date(startDate.getTime());
        d.setDate(d.getDate() + offset);
        const yyyy = d.getFullYear();
        const mm = String(d.getMonth() + 1).padStart(2, '0');
        const dd = String(d.getDate()).padStart(2, '0');
        return `${yyyy}-${mm}-${dd}`;
    }

    // ------------------------------------------------------------------
    // Alternative destination recommendations
    // ------------------------------------------------------------------

    /**
     * For a destination with poor weather on a given day, suggest nearby
     * alternatives (same budget tier, ideally overlapping category
     * preference) that have better weather that day, if a forecast for the
     * candidate is available.
     *
     * @param {Object} opts
     * @param {Object} opts.origin - the affected destination (needs lat/lng, categories, costPerDay)
     * @param {Array} opts.pool - candidate destinations (e.g. root.tripDestinations)
     * @param {Object} opts.forecastsByDestId
     * @param {string} opts.date - "YYYY-MM-DD"
     * @param {string} opts.tier - 'budget'|'mid'|'luxury'
     * @param {string[]} [opts.preferredCategories]
     * @param {number} [opts.maxDistanceKm=300]
     * @param {number} [opts.limit=3]
     * @param {Function} opts.haversineDistanceKm - injected so this module doesn't hard-depend on TripPlanner
     */
    function findAlternativeDestinations(opts) {
        const {
            origin, pool, forecastsByDestId, date, tier,
            preferredCategories = [], maxDistanceKm = 300, limit = 3, haversineDistanceKm
        } = opts;

        return pool
            .filter((d) => d.id !== origin.id)
            .map((d) => {
                const distanceKm = haversineDistanceKm(origin.lat, origin.lng, d.lat, d.lng);
                const forecastList = forecastsByDestId[d.id] || [];
                const forecastDay = forecastList.find((f) => f.date === date) || null;
                const suitability = computeDaySuitability(forecastDay, d.categories);
                const categoryMatch = preferredCategories.length
                    ? d.categories.some((c) => preferredCategories.includes(c))
                    : true;
                return { destination: d, distanceKm, suitability, categoryMatch };
            })
            .filter((c) => c.distanceKm <= maxDistanceKm)
            .filter((c) => c.suitability.status === "good" || c.suitability.status === "caution")
            .sort((a, b) => {
                // Prefer: category match, then better weather, then closer.
                if (a.categoryMatch !== b.categoryMatch) return a.categoryMatch ? -1 : 1;
                const statusRank = { good: 0, caution: 1, poor: 2, unknown: 3 };
                const statusDiff = statusRank[a.suitability.status] - statusRank[b.suitability.status];
                if (statusDiff !== 0) return statusDiff;
                return a.distanceKm - b.distanceKm;
            })
            .slice(0, limit);
    }

    // ------------------------------------------------------------------
    // Reordering suggestion: within a multi-day stay in ONE city, swap
    // which calendar day gets which highlight so outdoor-friendly
    // highlights land on good-weather days. Deliberately scoped this way
    // (rather than reordering cities/legs) so trip duration, budget, and
    // travel legs are never touched — only the mapping is up for
    // reassignment for the same city, so it is always feasible.
    // ------------------------------------------------------------------

    /**
     * @param {Array} evaluatedSchedule - output of evaluateItineraryWeather()
     * @returns {Array} list of { destId, city, moves: [{fromDay, toDay}], reason }
     */
    function suggestReorder(evaluatedSchedule) {
        const suggestions = [];
        const byDest = {};
        evaluatedSchedule.forEach((item) => {
            if (item.type !== "stay") return;
            if (!byDest[item.destId]) byDest[item.destId] = [];
            byDest[item.destId].push(item);
        });

        Object.keys(byDest).forEach((destId) => {
            const days = byDest[destId];
            if (days.length < 2) return; // nothing to reorder with a single day

            const rank = { good: 0, caution: 1, poor: 2, unknown: 1 };
            const sortedByWeather = days.slice().sort((a, b) => rank[a.suitability.status] - rank[b.suitability.status]);

            // If the days are already in best-weather-first order, no move needed.
            const alreadyOptimal = days.every((d, i) => d.day === sortedByWeather[i].day);
            if (alreadyOptimal) return;

            // Only propose a move if it actually improves at least one "poor" day.
            const poorDaysImproved = days.some((d, i) => d.suitability.status === "poor" && sortedByWeather[i].suitability.status !== "poor");
            if (!poorDaysImproved) return;

            const moves = days.map((original, i) => ({
                fromDay: original.day,
                toDay: sortedByWeather[i].day,
                highlight: original.activity
            })).filter((m) => m.fromDay !== m.toDay);

            if (moves.length) {
                suggestions.push({
                    destId,
                    city: days[0].city,
                    moves,
                    reason: "Reordering activities within " + days[0].city + " puts outdoor plans on the clearer days."
                });
            }
        });

        return suggestions;
    }

    function applyReorder(evaluatedSchedule, suggestion) {
        const activitiesByDay = {};
        evaluatedSchedule.forEach((item) => {
            activitiesByDay[item.day] = item.activity;
        });

        const targetToSource = {};
        suggestion.moves.forEach((move) => {
            targetToSource[move.toDay] = move.fromDay;
        });

        return evaluatedSchedule.map((item) => {
            const newItem = Object.assign({}, item);
            if (targetToSource[item.day] !== undefined) {
                const sourceDay = targetToSource[item.day];
                newItem.activity = activitiesByDay[sourceDay];
            }
            return newItem;
        });
    }

    // ------------------------------------------------------------------
    // Summary builder (for the "daily weather summary" UI requirement)
    // ------------------------------------------------------------------
    function buildWeatherSummary(evaluatedSchedule) {
        return evaluatedSchedule
            .filter((item) => item.type === "stay")
            .map((item) => ({
                day: item.day,
                date: item.date,
                city: item.city,
                status: item.suitability ? item.suitability.status : "unknown",
                weather: item.suitability ? item.suitability.weather : null,
                reasons: item.suitability ? item.suitability.reasons : []
            }));
    }

    const api = {
        WEATHER_CODES,
        classifyWeatherCode,
        destinationOutdoorSensitivity,
        computeDaySuitability,
        evaluateItineraryWeather,
        findAlternativeDestinations,
        suggestReorder,
        applyReorder,
        buildWeatherSummary
    };

    if (typeof module !== "undefined" && module.exports) {
        module.exports = api;
    }
    if (typeof window !== "undefined") {
        window.WeatherCore = api;
    }
})(typeof window !== "undefined" ? window : globalThis);