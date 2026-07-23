const assert = require("assert");
const {
  haversineDistanceKm,
  optimizeRoute,
  tourLengthKm,
  formatDistance,
  formatDuration,
  buildCacheKey,
} = require("./../frontend/route-planner/route-planner.js");

let passed = 0;
function test(name, fn) {
  try {
    fn();
    console.log(`  PASS  ${name}`);
    passed++;
  } catch (err) {
    console.error(`  FAIL  ${name}`);
    console.error(`        ${err.message}`);
    process.exitCode = 1;
  }
}

const delhi = { id: "delhi", lat: 28.6139, lng: 77.2090 };
const agra = { id: "agra", lat: 27.1767, lng: 78.0081 };
const jaipur = { id: "jaipur", lat: 26.9124, lng: 75.7873 };
const mumbai = { id: "mumbai", lat: 19.0760, lng: 72.8777 };

console.log("../frontend/route-planner/route-planner.js unit tests");

test("haversineDistanceKm: Delhi to Agra is roughly 200km", () => {
  const d = haversineDistanceKm(delhi, agra);
  assert.ok(d > 180 && d < 220, `expected ~200km, got ${d.toFixed(1)}km`);
});

test("haversineDistanceKm: distance to self is zero", () => {
  assert.strictEqual(haversineDistanceKm(delhi, delhi), 0);
});

test("haversineDistanceKm: is symmetric", () => {
  const a = haversineDistanceKm(delhi, mumbai);
  const b = haversineDistanceKm(mumbai, delhi);
  assert.ok(Math.abs(a - b) < 1e-9);
});

test("optimizeRoute: keeps the first stop fixed", () => {
  const stops = [delhi, mumbai, agra, jaipur];
  const optimized = optimizeRoute(stops);
  assert.strictEqual(optimized[0].id, delhi.id);
});

test("optimizeRoute: returns the same set of stops (no drops/dupes)", () => {
  const stops = [delhi, mumbai, agra, jaipur];
  const optimized = optimizeRoute(stops);
  const originalIds = stops.map((s) => s.id).sort();
  const optimizedIds = optimized.map((s) => s.id).sort();
  assert.deepStrictEqual(optimizedIds, originalIds);
});

test("optimizeRoute: never produces a longer tour than the naive input order", () => {
  const stops = [delhi, mumbai, agra, jaipur];
  const naiveLength = tourLengthKm(stops);
  const optimizedLength = tourLengthKm(optimizeRoute(stops));
  assert.ok(optimizedLength <= naiveLength + 1e-9);
});

test("optimizeRoute: is a no-op for 2 or fewer stops", () => {
  assert.deepStrictEqual(optimizeRoute([delhi]), [delhi]);
  assert.deepStrictEqual(optimizeRoute([delhi, agra]), [delhi, agra]);
});

test("formatDistance: formats to one decimal with km suffix", () => {
  assert.strictEqual(formatDistance(203.456), "203.5 km");
});

test("formatDuration: formats sub-hour durations as minutes", () => {
  assert.strictEqual(formatDuration(45), "45 min");
});

test("formatDuration: formats multi-hour durations as h/m", () => {
  assert.strictEqual(formatDuration(125), "2h 5m");
});

test("buildCacheKey: is stable and order-sensitive", () => {
  const k1 = buildCacheKey(["delhi", "agra"], "road");
  const k2 = buildCacheKey(["agra", "delhi"], "road");
  assert.notStrictEqual(k1, k2);
  assert.strictEqual(buildCacheKey(["delhi", "agra"], "road"), k1);
});

console.log(`\n${passed} test(s) passed.`);