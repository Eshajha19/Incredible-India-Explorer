/**
 * js-modules/weather-service.js
 * Fetches daily forecasts from Open-Meteo (https://open-meteo.com) — free,
 * no API key required, matching the "no backend" approach this project
 * already uses for routing (see docs/ROUTE_PLANNER.md, which uses the
 * free OSRM demo server the same way).
 *
 * Responses are cached in localStorage per lat/lng with a TTL, since
 * forecasts don't need to be re-fetched on every render and Open-Meteo's
 * public endpoint is a shared resource other sites also rely on.
 *
 * DOM/network-facing by design — kept separate from weather-core.js so the
 * rule logic in that file stays unit-testable without mocking fetch.
 */
(function (root) {
    "use strict";

    const CACHE_PREFIX = "weatherCache:";
    const CACHE_TTL_MS = 3 * 60 * 60 * 1000; // 3 hours — forecasts change faster than routes, so a shorter TTL than route-planner's 7-day cache
    const FORECAST_DAYS = 16; // Open-Meteo's max daily-forecast horizon

    function cacheKey(lat, lng) {
        return CACHE_PREFIX + lat.toFixed(2) + ":" + lng.toFixed(2);
    }

    function readCache(lat, lng) {
        try {
            const raw = localStorage.getItem(cacheKey(lat, lng));
            if (!raw) return null;
            const parsed = JSON.parse(raw);
            if (!parsed || typeof parsed.fetchedAt !== "number") return null;
            if (Date.now() - parsed.fetchedAt > CACHE_TTL_MS) return null;
            return parsed.forecast;
        } catch (e) {
            return null;
        }
    }

    function writeCache(lat, lng, forecast) {
        try {
            localStorage.setItem(cacheKey(lat, lng), JSON.stringify({ fetchedAt: Date.now(), forecast }));
        } catch (e) {
            // Storage full/unavailable — forecast just won't be cached this session.
        }
    }

    function buildForecastUrl(lat, lng) {
        const params = new URLSearchParams({
            latitude: lat,
            longitude: lng,
            daily: "weathercode,temperature_2m_max,temperature_2m_min,precipitation_probability_max",
            timezone: "auto",
            forecast_days: String(FORECAST_DAYS)
        });
        return "https://api.open-meteo.com/v1/forecast?" + params.toString();
    }

    function normalizeResponse(json) {
        const daily = json && json.daily;
        if (!daily || !Array.isArray(daily.time)) return [];
        return daily.time.map((date, i) => ({
            date,
            weatherCode: daily.weathercode ? daily.weathercode[i] : null,
            tempMaxC: daily.temperature_2m_max ? daily.temperature_2m_max[i] : null,
            tempMinC: daily.temperature_2m_min ? daily.temperature_2m_min[i] : null,
            precipProbability: daily.precipitation_probability_max ? daily.precipitation_probability_max[i] : null
        }));
    }

    /** Fetch (or reuse cached) forecast for one lat/lng. Returns a Promise<forecastDay[]>. */
    async function fetchForecast(lat, lng) {
        const cached = readCache(lat, lng);
        if (cached) return cached;

        const res = await fetch(buildForecastUrl(lat, lng));
        if (!res.ok) {
            throw new Error("Weather API responded with status " + res.status);
        }
        const json = await res.json();
        const forecast = normalizeResponse(json);
        writeCache(lat, lng, forecast);
        return forecast;
    }

    /**
     * Fetch forecasts for a list of destinations ({id, lat, lng, name}[]).
     * Failures are isolated per-destination (one bad forecast doesn't fail
     * the whole itinerary) — callers get both the successful map and a list
     * of which destinations failed, so the UI can toast a partial-failure
     * message rather than silently dropping data or crashing.
     *
     * @returns {Promise<{forecastsByDestId: Object, failed: Array<{id,name,error}>}>}
     */
    async function fetchForecastsForDestinations(destinations) {
        const forecastsByDestId = {};
        const failed = [];

        const results = await Promise.allSettled(
            destinations.map((d) => fetchForecast(d.lat, d.lng).then((forecast) => ({ id: d.id, forecast })))
        );

        results.forEach((result, i) => {
            const dest = destinations[i];
            if (result.status === "fulfilled") {
                forecastsByDestId[result.value.id] = result.value.forecast;
            } else {
                failed.push({ id: dest.id, name: dest.name, error: result.reason ? result.reason.message : "Unknown error" });
            }
        });

        return { forecastsByDestId, failed };
    }

    const api = {
        CACHE_TTL_MS,
        FORECAST_DAYS,
        buildForecastUrl,
        normalizeResponse,
        fetchForecast,
        fetchForecastsForDestinations,
        _readCache: readCache,
        _writeCache: writeCache
    };

    if (typeof module !== "undefined" && module.exports) {
        module.exports = api;
    }
    if (typeof window !== "undefined") {
        window.WeatherService = api;
    }
})(typeof window !== "undefined" ? window : globalThis);