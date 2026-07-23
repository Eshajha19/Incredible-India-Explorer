# Route Planner

## What it does

Lets users pick multiple destinations, choose a transport mode (road/rail/air),
and see the route on a map with total distance and estimated travel time.

## Why no backend

This project is a static, buildless site with no server. All routing runs
in the browser:

| Mode | Data source | Notes |
| ---- | ----------- | ----- |
| Road | [OSRM](https://router.project-osrm.org) public demo API | Real road-network routing, free, no key. Rate-limited — see below. |
| Rail | Great-circle distance × 1.2 detour factor ÷ 55 km/h + 30 min overhead | Estimate only; no free Indian Railways routing API exists. |
| Air | Great-circle distance × 1.05 ÷ 700 km/h + 120 min overhead | Estimate only; no free flight-routing API exists. |

## Caching

Routes are cached in `localStorage`, keyed by `mode + ordered stop IDs`,
with a 7-day TTL. This avoids re-hitting OSRM for a route the user has
already calculated in this browser.

## Optimization strategy

For 3+ stops, "Optimize Order" runs:

1. **Nearest-neighbor** construction — builds an initial tour by always
   jumping to the closest unvisited stop.
2. **2-opt local search** — repeatedly removes crossing segments until no
   improvement is found.

The first stop is treated as a fixed starting point. This runs client-side
in milliseconds for itinerary-sized inputs (≤ ~12 stops) — no server needed.

## Known limitations / future work

- OSRM's public demo server is rate-limited and not meant for heavy
  production traffic. If usage grows, self-host OSRM or switch to a
  commercial provider (Mapbox Directions, OpenRouteService, Google Routes).
- Rail/air numbers are rough estimates, not real timetables.
- Optimization is heuristic (2-opt), not a guaranteed-optimal TSP solve —
  fine at itinerary scale, not meant for dozens of stops.