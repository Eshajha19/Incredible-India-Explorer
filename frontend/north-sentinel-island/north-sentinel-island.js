/* ============================================================
   North Sentinel Island — north-sentinel-island.js
   Handles: tab navigation and the rotating "Did You Know?"
   facts panel. No map or gallery — see PR notes for why.
   ============================================================ */

// ---------- 1. INTERESTING FACTS ----------
const SENTINEL_FACTS = [
  "The Sentinelese are believed to have lived in isolation on North Sentinel Island for tens of thousands of years, possibly since the first human migrations out of Africa.",
  "North Sentinel Island covers only about 59.67 sq. km, roughly the size of a small town, yet has remained almost entirely unexplored by outsiders.",
  "Surrounding coral reefs make the island's coastline treacherous to approach by boat, which has helped keep it isolated for centuries.",
  "The Sentinelese reportedly moved to higher ground before the 2004 Indian Ocean tsunami struck, an example of traditional ecological knowledge passed down without any written record.",
  "India has enforced a strict 'eyes-on, hands-off' no-contact policy toward the island since the late 1990s.",
  "The Protection of Aboriginal Tribes Regulation, 1956 makes it illegal to travel to North Sentinel Island or attempt contact with its residents.",
  "No outside census has ever been conducted on the island; population estimates of roughly 50 to 200 people come from aerial and offshore observation only."
];

// ---------- 2. STATE ----------
let factIndex = 0;

// ---------- 3. DOM READY ----------
document.addEventListener("DOMContentLoaded", () => {
  initTabs();
  initFactsRotator();
});

// ---------- 4. TAB NAVIGATION ----------
function initTabs() {
  const tabButtons = document.querySelectorAll(".sentinel-tab-btn");
  const tabPanels = document.querySelectorAll(".sentinel-tab-panel");

  tabButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.getAttribute("data-tab");

      tabButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      tabPanels.forEach((panel) => {
        panel.classList.toggle("active", panel.id === "tab-" + target);
      });
    });
  });
}

// ---------- 5. FACTS ROTATOR ----------
function initFactsRotator() {
  const factEl = document.getElementById("sentinel-fact-text");
  const dotsWrap = document.getElementById("sentinel-fact-dots");
  if (!factEl) return;

  if (dotsWrap) {
    SENTINEL_FACTS.forEach((_, i) => {
      const dot = document.createElement("button");
      dot.className = "sentinel-fact-dot" + (i === 0 ? " active" : "");
      dot.setAttribute("aria-label", "Show fact " + (i + 1));
      dot.addEventListener("click", () => showFact(i));
      dotsWrap.appendChild(dot);
    });
  }

  function showFact(i) {
    factIndex = i;
    factEl.style.opacity = "0";
    setTimeout(() => {
      factEl.textContent = SENTINEL_FACTS[factIndex];
      factEl.style.opacity = "1";
    }, 200);
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, di) => dot.classList.toggle("active", di === factIndex));
    }
  }

  showFact(0);
  setInterval(() => showFact((factIndex + 1) % SENTINEL_FACTS.length), 6000);
}