/**
 * route-planner.js
 * Interactive Route Planning module for Incredible India Explorer.
 *
 * Architecture note:
 * This project is a static, buildless, vanilla HTML/CSS/JS site (no backend
 * server, no Node/Express, no Python framework — see README "Getting Started").
 * So instead of a server-side routing service, all routing happens
 * client-side:
 *   - Road distance/time: OSRM's free public routing API (no key required).
 *   - Rail/Air distance/time: estimated from great-circle distance with a
 *     mode-specific detour factor and average speed (no free, keyless
 *     rail/flight routing API exists for India).
 *   - "Caching frequently requested routes": localStorage, keyed by the
 *     ordered stop list + transport mode, with a 7-day TTL.
 *
 * If a real backend is added to this project later, only `fetchRoadRoute()`
 * needs to change — optimization, caching, and rendering are decoupled from it.
 */

// ---------------------------------------------------------------------------
// 1. Destination data
// ---------------------------------------------------------------------------
const ROUTE_DESTINATIONS = [
  { id: "delhi", name: "Delhi", state: "Delhi", lat: 28.6139, lng: 77.2090 },
  { id: "agra", name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081 },
  { id: "jaipur", name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873 },
  { id: "jodhpur", name: "Jodhpur", state: "Rajasthan", lat: 26.2389, lng: 73.0243 },
  { id: "udaipur", name: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125 },
  { id: "jaisalmer", name: "Jaisalmer", state: "Rajasthan", lat: 26.9157, lng: 70.9083 },
  { id: "pushkar", name: "Pushkar", state: "Rajasthan", lat: 26.4899, lng: 74.5510 },
  { id: "amritsar", name: "Amritsar", state: "Punjab", lat: 31.6340, lng: 74.8723 },
  { id: "shimla", name: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lng: 77.1734 },
  { id: "manali", name: "Manali", state: "Himachal Pradesh", lat: 32.2432, lng: 77.1892 },
  { id: "kaza", name: "Kaza", state: "Himachal Pradesh", lat: 32.2260, lng: 78.0714 },
  { id: "leh", name: "Leh", state: "Ladakh", lat: 34.1526, lng: 77.5771 },
  { id: "rishikesh", name: "Rishikesh", state: "Uttarakhand", lat: 30.0869, lng: 78.2676 },
  { id: "varanasi", name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739 },
  { id: "khajuraho", name: "Khajuraho", state: "Madhya Pradesh", lat: 24.8318, lng: 79.9199 },
  { id: "mumbai", name: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777 },
  { id: "goa", name: "Goa", state: "Goa", lat: 15.2993, lng: 74.1240 },
  { id: "hampi", name: "Hampi", state: "Karnataka", lat: 15.3350, lng: 76.4600 },
  { id: "mysore", name: "Mysore", state: "Karnataka", lat: 12.2958, lng: 76.6394 },
  { id: "kochi", name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673 },
  { id: "munnar", name: "Munnar", state: "Kerala", lat: 10.0889, lng: 77.0595 },
  { id: "alleppey", name: "Alleppey", state: "Kerala", lat: 9.4981, lng: 76.3388 },
  { id: "trivandrum", name: "Trivandrum", state: "Kerala", lat: 8.5241, lng: 76.9366 },
  { id: "kanyakumari", name: "Kanyakumari", state: "Tamil Nadu", lat: 8.0883, lng: 77.5385 },
  { id: "madurai", name: "Madurai", state: "Tamil Nadu", lat: 9.9252, lng: 78.1198 },
  { id: "chennai", name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707 },
  { id: "kolkata", name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639 },
  { id: "darjeeling", name: "Darjeeling", state: "West Bengal", lat: 27.0410, lng: 88.2663 },
  { id: "gangtok", name: "Gangtok", state: "Sikkim", lat: 27.3389, lng: 88.6065 },
  { id: "shillong", name: "Shillong", state: "Meghalaya", lat: 25.5788, lng: 91.8933 },
];

// ---------------------------------------------------------------------------
// 1b. Extra travel info per destination (best time to visit, tips, attractions)
// ---------------------------------------------------------------------------
const DESTINATION_INFO = {
  delhi: { bestTime: "Oct – Mar", tip: "Book monument tickets online to skip long queues.", attractions: ["Red Fort", "India Gate", "Qutub Minar"] },
  agra: { bestTime: "Oct – Mar", tip: "Visit the Taj Mahal at sunrise for cooler weather and fewer crowds.", attractions: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri"] },
  jaipur: { bestTime: "Oct – Mar", tip: "Wear comfortable shoes — the forts involve a lot of walking.", attractions: ["Hawa Mahal", "Amber Fort", "City Palace"] },
  jodhpur: { bestTime: "Oct – Mar", tip: "Carry water; the Blue City gets very hot by midday.", attractions: ["Mehrangarh Fort", "Jaswant Thada", "Umaid Bhawan Palace"] },
  udaipur: { bestTime: "Sep – Mar", tip: "Catch sunset from a rooftop café overlooking Lake Pichola.", attractions: ["Lake Pichola", "City Palace", "Jag Mandir"] },
  jaisalmer: { bestTime: "Nov – Feb", tip: "Book a desert safari in advance during peak winter season.", attractions: ["Jaisalmer Fort", "Sam Sand Dunes", "Patwon Ki Haveli"] },
  pushkar: { bestTime: "Oct – Mar", tip: "Visit during the Pushkar Camel Fair (Nov) for a unique experience.", attractions: ["Pushkar Lake", "Brahma Temple", "Camel Fair Grounds"] },
  amritsar: { bestTime: "Oct – Mar", tip: "Attend the Wagah Border retreat ceremony before sunset.", attractions: ["Golden Temple", "Jallianwala Bagh", "Wagah Border"] },
  shimla: { bestTime: "Mar – Jun, Dec – Jan", tip: "Book stays early in peak summer and winter snow season.", attractions: ["The Ridge", "Mall Road", "Jakhoo Temple"] },
  manali: { bestTime: "Mar – Jun, Oct – Feb", tip: "Carry warm clothing even in summer for higher altitudes.", attractions: ["Solang Valley", "Hadimba Temple", "Rohtang Pass"] },
  kaza: { bestTime: "Jun – Sep", tip: "Roads open seasonally — check conditions before travelling.", attractions: ["Key Monastery", "Chandratal Lake", "Kibber Village"] },
  leh: { bestTime: "May – Sep", tip: "Spend a day acclimatizing to the altitude before sightseeing.", attractions: ["Pangong Lake", "Leh Palace", "Nubra Valley"] },
  rishikesh: { bestTime: "Sep – Apr", tip: "Try river rafting early morning when the water is calmer.", attractions: ["Laxman Jhula", "Triveni Ghat", "Beatles Ashram"] },
  varanasi: { bestTime: "Oct – Mar", tip: "Watch the Ganga Aarti at Dashashwamedh Ghat in the evening.", attractions: ["Dashashwamedh Ghat", "Kashi Vishwanath Temple", "Sarnath"] },
  khajuraho: { bestTime: "Oct – Mar", tip: "Hire a licensed guide to understand the temple carvings.", attractions: ["Western Group of Temples", "Eastern Group of Temples", "Raneh Falls"] },
  mumbai: { bestTime: "Nov – Feb", tip: "Use local trains to beat traffic during rush hour.", attractions: ["Gateway of India", "Marine Drive", "Elephanta Caves"] },
  goa: { bestTime: "Nov – Feb", tip: "Book beach resorts early around Christmas and New Year.", attractions: ["Baga Beach", "Fort Aguada", "Basilica of Bom Jesus"] },
  hampi: { bestTime: "Oct – Feb", tip: "Rent a bicycle to explore the spread-out ruins comfortably.", attractions: ["Virupaksha Temple", "Vittala Temple", "Hampi Bazaar"] },
  mysore: { bestTime: "Oct – Mar", tip: "Visit during Dasara festival for grand palace illuminations.", attractions: ["Mysore Palace", "Chamundi Hills", "Brindavan Gardens"] },
  kochi: { bestTime: "Oct – Mar", tip: "Watch a Kathakali performance in Fort Kochi in the evening.", attractions: ["Fort Kochi", "Chinese Fishing Nets", "Mattancherry Palace"] },
  munnar: { bestTime: "Sep – Mar", tip: "Carry a light jacket — hill mornings are cool year-round.", attractions: ["Tea Gardens", "Eravikulam National Park", "Mattupetty Dam"] },
  alleppey: { bestTime: "Nov – Feb", tip: "Book an overnight houseboat stay for the full backwaters experience.", attractions: ["Backwaters", "Alappuzha Beach", "Marari Beach"] },
  trivandrum: { bestTime: "Oct – Mar", tip: "Combine with a short trip to nearby Kovalam Beach.", attractions: ["Padmanabhaswamy Temple", "Napier Museum", "Kovalam Beach"] },
  kanyakumari: { bestTime: "Oct – Mar", tip: "Arrive early to see the sunrise from the Vivekananda Rock.", attractions: ["Vivekananda Rock Memorial", "Thiruvalluvar Statue", "Sunset Point"] },
  madurai: { bestTime: "Oct – Mar", tip: "Time your visit around the temple's evening ceremony.", attractions: ["Meenakshi Amman Temple", "Thirumalai Nayakkar Mahal", "Gandhi Museum"] },
  chennai: { bestTime: "Nov – Feb", tip: "Visit Marina Beach in the early morning or evening to avoid heat.", attractions: ["Marina Beach", "Kapaleeshwarar Temple", "Fort St. George"] },
  kolkata: { bestTime: "Oct – Mar", tip: "Visit during Durga Puja (Sep/Oct) for spectacular decorations.", attractions: ["Victoria Memorial", "Howrah Bridge", "Indian Museum"] },
  darjeeling: { bestTime: "Mar – May, Oct – Dec", tip: "Take the toy train early morning for the best mountain views.", attractions: ["Tiger Hill", "Darjeeling Himalayan Railway", "Tea Gardens"] },
  gangtok: { bestTime: "Mar – Jun, Oct – Dec", tip: "Carry permits in advance for nearby Nathula Pass excursions.", attractions: ["MG Marg", "Tsomgo Lake", "Rumtek Monastery"] },
  shillong: { bestTime: "Sep – Apr", tip: "Pack a raincoat — Meghalaya sees rain even outside monsoon.", attractions: ["Umiam Lake", "Elephant Falls", "Living Root Bridges"] },
};

// ---------------------------------------------------------------------------
// 2. Distance / geometry helpers
// ---------------------------------------------------------------------------
const EARTH_RADIUS_KM = 6371;

function toRadians(deg) {
  return (deg * Math.PI) / 180;
}

/** Great-circle distance between two {lat, lng} points, in km. */
function haversineDistanceKm(a, b) {
  const dLat = toRadians(b.lat - a.lat);
  const dLng = toRadians(b.lng - a.lng);
  const lat1 = toRadians(a.lat);
  const lat2 = toRadians(b.lat);

  const h =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLng / 2) ** 2;

  return 2 * EARTH_RADIUS_KM * Math.asin(Math.min(1, Math.sqrt(h)));
}

// ---------------------------------------------------------------------------
// 3. Transport modes
// ---------------------------------------------------------------------------
const TRANSPORT_MODES = {
  road: { label: "Road", icon: "🚗", detourFactor: 1, avgSpeedKmh: null, overheadMinutes: 0 },
  rail: { label: "Rail", icon: "🚆", detourFactor: 1.2, avgSpeedKmh: 55, overheadMinutes: 30 },
  air: { label: "Air", icon: "✈️", detourFactor: 1.05, avgSpeedKmh: 700, overheadMinutes: 120 },
};

// ---------------------------------------------------------------------------
// 4. Route caching (client-side; satisfies "cache frequently requested routes")
// ---------------------------------------------------------------------------
const CACHE_PREFIX = "iie_route_cache_v1:";
const CACHE_TTL_MS = 1000 * 60 * 60 * 24 * 7; // 7 days

function buildCacheKey(stopIds, mode) {
  return `${CACHE_PREFIX}${mode}:${stopIds.join(">")}`;
}

function readCache(stopIds, mode) {
  try {
    const raw = localStorage.getItem(buildCacheKey(stopIds, mode));
    if (!raw) return null;
    const entry = JSON.parse(raw);
    if (Date.now() - entry.savedAt > CACHE_TTL_MS) return null;
    return entry.data;
  } catch (err) {
    return null;
  }
}

function writeCache(stopIds, mode, data) {
  try {
    localStorage.setItem(buildCacheKey(stopIds, mode), JSON.stringify({ savedAt: Date.now(), data }));
  } catch (err) {
    // Non-fatal: caching is a perf optimization, not a correctness requirement.
  }
}

// ---------------------------------------------------------------------------
// 5. Route optimization (nearest-neighbor + 2-opt)
// ---------------------------------------------------------------------------
function tourLengthKm(stops) {
  let total = 0;
  for (let i = 0; i < stops.length - 1; i++) {
    total += haversineDistanceKm(stops[i], stops[i + 1]);
  }
  return total;
}

function nearestNeighborTour(stops) {
  if (stops.length <= 2) return stops.slice();
  const remaining = stops.slice(1);
  const tour = [stops[0]];
  let current = stops[0];
  while (remaining.length) {
    let bestIdx = 0;
    let bestDist = Infinity;
    for (let i = 0; i < remaining.length; i++) {
      const d = haversineDistanceKm(current, remaining[i]);
      if (d < bestDist) {
        bestDist = d;
        bestIdx = i;
      }
    }
    current = remaining.splice(bestIdx, 1)[0];
    tour.push(current);
  }
  return tour;
}

function twoOptImprove(stops) {
  let improved = true;
  let tour = stops.slice();
  const n = tour.length;
  if (n < 4) return tour;

  while (improved) {
    improved = false;
    for (let i = 1; i < n - 2; i++) {
      for (let j = i + 1; j < n - 1; j++) {
        const a = tour[i - 1], b = tour[i], c = tour[j], d = tour[j + 1];
        const before = haversineDistanceKm(a, b) + haversineDistanceKm(c, d);
        const after = haversineDistanceKm(a, c) + haversineDistanceKm(b, d);
        if (after + 1e-9 < before) {
          const reversed = tour.slice(i, j + 1).reverse();
          tour = [...tour.slice(0, i), ...reversed, ...tour.slice(j + 1)];
          improved = true;
        }
      }
    }
  }
  return tour;
}

/** Optimizes stop order to minimize total trip distance. First stop stays fixed as the start. */
function optimizeRoute(stops) {
  if (stops.length <= 2) return stops.slice();
  return twoOptImprove(nearestNeighborTour(stops));
}

// ---------------------------------------------------------------------------
// 6. Road routing via OSRM (free public demo server)
// ---------------------------------------------------------------------------
const OSRM_BASE_URL = "https://router.project-osrm.org/route/v1/driving/";

async function fetchRoadRoute(stops) {
  const coordString = stops.map((s) => `${s.lng},${s.lat}`).join(";");
  const url = `${OSRM_BASE_URL}${coordString}?overview=full&geometries=geojson`;

  const response = await fetch(url);
  if (!response.ok) throw new Error(`OSRM request failed: ${response.status}`);
  const data = await response.json();
  if (data.code !== "Ok" || !data.routes || !data.routes.length) {
    throw new Error("OSRM could not find a road route between these stops.");
  }

  const route = data.routes[0];
  return {
    distanceKm: route.distance / 1000,
    durationMinutes: route.duration / 60,
    geometry: route.geometry,
    legs: route.legs.map((leg) => ({
      distanceKm: leg.distance / 1000,
      durationMinutes: leg.duration / 60,
    })),
  };
}

/** Estimates a rail or air route (no free routing API exists for these). */
function estimateRoute(stops, mode) {
  const cfg = TRANSPORT_MODES[mode];
  const legs = [];
  let totalDistanceKm = 0;
  let totalDurationMinutes = 0;

  for (let i = 0; i < stops.length - 1; i++) {
    const straightLineKm = haversineDistanceKm(stops[i], stops[i + 1]);
    const distanceKm = straightLineKm * cfg.detourFactor;
    const durationMinutes = (distanceKm / cfg.avgSpeedKmh) * 60 + cfg.overheadMinutes;
    legs.push({ distanceKm, durationMinutes });
    totalDistanceKm += distanceKm;
    totalDurationMinutes += durationMinutes;
  }

  return {
    distanceKm: totalDistanceKm,
    durationMinutes: totalDurationMinutes,
    geometry: { type: "LineString", coordinates: stops.map((s) => [s.lng, s.lat]) },
    legs,
    estimated: true,
  };
}

/** Gets a route for an ordered list of stops + transport mode. Cache-first, then network. */
async function getRoute(stops, mode) {
  if (stops.length < 2) throw new Error("At least two stops are required to plan a route.");
  const stopIds = stops.map((s) => s.id);
  const cached = readCache(stopIds, mode);
  if (cached) return { ...cached, fromCache: true };

  const result = mode === "road" ? await fetchRoadRoute(stops) : estimateRoute(stops, mode);
  writeCache(stopIds, mode, result);
  return { ...result, fromCache: false };
}

// ---------------------------------------------------------------------------
// 6b. Recommended transport mode based on trip distance
// ---------------------------------------------------------------------------
function recommendMode(distanceKm) {
  if (distanceKm < 300) return "road";
  if (distanceKm < 800) return "rail";
  return "air";
}

// ---------------------------------------------------------------------------
// 7. Formatting helpers
// ---------------------------------------------------------------------------
function formatDistance(km) {
  return `${km.toFixed(1)} km`;
}

function formatDuration(minutes) {
  const h = Math.floor(minutes / 60);
  const m = Math.round(minutes % 60);
  return h === 0 ? `${m} min` : `${h}h ${m}m`;
}

// ---------------------------------------------------------------------------
// Export for both browser (global) and Node (tests) — mirrors the plain
// <script> pattern already used by app.js / data.js / story-engine.js.
// ---------------------------------------------------------------------------
const RoutePlanner = {
  ROUTE_DESTINATIONS, TRANSPORT_MODES, DESTINATION_INFO, haversineDistanceKm,
  optimizeRoute, tourLengthKm, getRoute, formatDistance, formatDuration, buildCacheKey,
  recommendMode,
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = RoutePlanner;
} else {
  window.RoutePlanner = RoutePlanner;
}