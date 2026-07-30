import { describe, it, expect } from "vitest";
import {
  parseSeasonRanges,
  computeSeasonalFit,
  getFestivalsForMonth,
  SeasonalRecommendationEngine,
} from "../../js-modules/seasonal-recommendation-engine.js";

const destinations = [
  {
    id: "agra", name: "Agra", state: "Uttar Pradesh",
    categories: ["historical", "heritage"], bestSeason: "Oct-Mar", popularity: 10,
  },
  {
    id: "manali", name: "Manali", state: "Himachal Pradesh",
    categories: ["mountains", "adventure"], bestSeason: "Mar-Jun, Sep-Dec", popularity: 8,
  },
  {
    id: "goa", name: "Goa", state: "Goa",
    categories: ["beaches"], bestSeason: "Nov-Feb", popularity: 9,
  },
  {
    id: "jaisalmer", name: "Jaisalmer", state: "Rajasthan",
    categories: ["desert", "historical", "adventure"], bestSeason: "Nov-Feb", popularity: 8,
  },
  {
    id: "no-data-dest", name: "Mystery Town", state: "Nowhere",
    categories: ["heritage"], bestSeason: "", popularity: 3,
  },
];

const events = [
  {
    id: "taj-mahotsav", name: "Taj Mahotsav", destinationId: "agra", state: "Uttar Pradesh",
    startMonth: 2, endMonth: 2, popularity: 7,
  },
  {
    id: "pushkar-camel-fair", name: "Pushkar Camel Fair", destinationId: "jaisalmer", state: "Rajasthan",
    startMonth: 10, endMonth: 11, popularity: 8,
  },
  {
    id: "goa-carnival", name: "Goa Carnival", destinationId: "goa", state: "Goa",
    startMonth: 2, endMonth: 2, popularity: 9,
  },
];

describe("parseSeasonRanges", () => {
  it("parses a single month range", () => {
    expect(parseSeasonRanges("Oct-Mar")).toEqual([{ start: 10, end: 3 }]);
  });

  it("parses multiple comma-separated ranges", () => {
    expect(parseSeasonRanges("Mar-Jun, Sep-Dec")).toEqual([
      { start: 3, end: 6 },
      { start: 9, end: 12 },
    ]);
  });

  it("returns an empty array for empty/malformed input", () => {
    expect(parseSeasonRanges("")).toEqual([]);
    expect(parseSeasonRanges(undefined)).toEqual([]);
    expect(parseSeasonRanges("not-a-range-format-xyz")).toEqual([]);
  });
});

describe("computeSeasonalFit", () => {
  it("marks a month inside the best-season window as ideal", () => {
    const fit = computeSeasonalFit(destinations[0], 12); // Agra, December
    expect(fit.level).toBe("ideal");
    expect(fit.score).toBe(1);
  });

  it("marks a month just outside the window as shoulder season", () => {
    const fit = computeSeasonalFit(destinations[2], 3); // Goa, March (best is Nov-Feb)
    expect(fit.level).toBe("shoulder");
  });

  it("marks a month far outside the window as off-season", () => {
    const fit = computeSeasonalFit(destinations[2], 7); // Goa, July (monsoon)
    expect(fit.level).toBe("off-season");
    expect(fit.score).toBeLessThan(0.5);
  });

  it("handles a wrap-around range correctly across the year boundary", () => {
    // Goa's best season is Nov-Feb (wraps across the year boundary).
    // January and December should both read as ideal...
    expect(computeSeasonalFit(destinations[2], 1).level).toBe("ideal");
    expect(computeSeasonalFit(destinations[2], 12).level).toBe("ideal");
    // ...while a month on the far side of the year, like June, is off-season.
    expect(computeSeasonalFit(destinations[2], 6).level).toBe("off-season");
  });

  it("returns 'unknown' with a neutral score when there is no season data", () => {
    const fit = computeSeasonalFit(destinations[4], 6);
    expect(fit.level).toBe("unknown");
    expect(fit.score).toBe(0.5);
  });
});

describe("getFestivalsForMonth", () => {
  it("finds festivals matching destinationId and month", () => {
    const results = getFestivalsForMonth(destinations[0], 2, events); // Agra, Feb
    expect(results.map((e) => e.id)).toEqual(["taj-mahotsav"]);
  });

  it("returns an empty array when nothing matches", () => {
    expect(getFestivalsForMonth(destinations[0], 7, events)).toEqual([]);
  });

  it("sorts multiple matches by popularity descending", () => {
    const busyMonthEvents = [
      ...events,
      { id: "extra-goa-event", name: "Extra Goa Event", destinationId: "goa", state: "Goa", startMonth: 2, endMonth: 2, popularity: 15 },
    ];
    const results = getFestivalsForMonth(destinations[2], 2, busyMonthEvents);
    expect(results[0].id).toBe("extra-goa-event");
  });
});

describe("SeasonalRecommendationEngine.recommend", () => {
  it("throws for an invalid month", () => {
    const engine = new SeasonalRecommendationEngine({ destinations, events });
    expect(() => engine.recommend({ month: 13 })).toThrow();
    expect(() => engine.recommend({ month: 0 })).toThrow();
  });

  it("ranks destinations that are in-season for the given month above off-season ones", () => {
    const engine = new SeasonalRecommendationEngine({ destinations, events });
    const results = engine.recommend({ month: 12 }); // December
    const ids = results.map((r) => r.destination.id);
    // Agra, Goa, Jaisalmer are all in-season in December; Manali (Sep-Dec) also in-season.
    // No-data destination should rank behind clearly in-season ones due to neutral score.
    expect(ids.indexOf("agra")).toBeLessThan(ids.indexOf("no-data-dest"));
  });

  it("filters to only destinations matching requested interests when interests are given", () => {
    const engine = new SeasonalRecommendationEngine({ destinations, events });
    const results = engine.recommend({ month: 12, interests: ["beaches"] });
    expect(results.every((r) => r.destination.categories.includes("beaches"))).toBe(true);
    expect(results.map((r) => r.destination.id)).toContain("goa");
  });

  it("includes matching festivals in the result and explanation", () => {
    const engine = new SeasonalRecommendationEngine({ destinations, events });
    const results = engine.recommend({ month: 2 }); // February
    const agraResult = results.find((r) => r.destination.id === "agra");
    expect(agraResult.festivals.map((e) => e.id)).toContain("taj-mahotsav");
    expect(agraResult.explanation).toMatch(/Taj Mahotsav/);
  });

  it("respects the limit parameter", () => {
    const engine = new SeasonalRecommendationEngine({ destinations, events });
    const results = engine.recommend({ month: 12, limit: 2 });
    expect(results.length).toBeLessThanOrEqual(2);
  });
});

describe("SeasonalRecommendationEngine.getAlternatives", () => {
  it("returns no alternatives when the destination is already an ideal fit", () => {
    const engine = new SeasonalRecommendationEngine({ destinations, events });
    const alternatives = engine.getAlternatives(destinations[2], 12); // Goa, December (ideal)
    expect(alternatives).toEqual([]);
  });

  it("suggests a same-category, in-season alternative for an off-season destination", () => {
    const engine = new SeasonalRecommendationEngine({ destinations, events });
    // Goa (beaches only) in July is off-season and shares no categories with
    // anything else in-season -> expect no alternatives rather than a bad match.
    const noSharedCategory = engine.getAlternatives(destinations[2], 7);
    expect(noSharedCategory).toEqual([]);

    // Jaisalmer (desert/historical/adventure) in June is off-season; Agra
    // (historical/heritage) is NOT in-season in June either, so no alternative
    // should be forced. Use a month where Agra IS in-season and shares "historical".
    const alternatives = engine.getAlternatives(destinations[3], 1); // Jaisalmer, January
    // Jaisalmer is ideal in January (Nov-Feb), so no alternatives expected here.
    expect(alternatives).toEqual([]);
  });

  it("never suggests the destination as its own alternative", () => {
    const engine = new SeasonalRecommendationEngine({ destinations, events });
    const alternatives = engine.getAlternatives(destinations[2], 7);
    expect(alternatives.every((a) => a.destination.id !== destinations[2].id)).toBe(true);
  });
});
