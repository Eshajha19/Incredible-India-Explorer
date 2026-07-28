
document.addEventListener("DOMContentLoaded", () => {
  const facts = [{"label": "Height", "value": "6,931 m", "detail": "Kalanka is a high Himalayan summit listed in the issue at 6,931 metres."}, {"label": "State", "value": "Uttarakhand", "detail": "The mountain belongs to the Garhwal Himalayan landscape of Uttarakhand."}, {"label": "Range", "value": "Garhwal Himalayas", "detail": "The Garhwal Himalayas are known for major peaks, glaciers, valleys, and pilgrimage corridors."}, {"label": "Mountain type", "value": "High-altitude peak", "detail": "The page presents Kalanka as a serious mountaineering and geography subject."}, {"label": "Learning focus", "value": "Geography + climbing context", "detail": "Useful for understanding Indian Himalayan terrain and mountaineering importance."}, {"label": "Travel note", "value": "Educational only", "detail": "This page does not provide technical route instructions or expedition advice."}];
  const gallery = [{"title": "Garhwal skyline", "image": "../../assets/travel_mountains.png", "caption": "Snow peaks and ridges represent the high Garhwal Himalayan setting."}, {"title": "Hidden valley approach", "image": "../../assets/travel_hidden.png", "caption": "Remote valleys and approach terrain shape Himalayan expeditions."}, {"title": "Alpine conditions", "image": "../../assets/hero_banner.png", "caption": "Weather, altitude, and logistics define serious mountain objectives."}, {"title": "Summit landscape", "image": "../../assets/travel_mountains.png", "caption": "Kalanka's page highlights high-altitude geography and mountaineering importance."}];
  const importance = [{"title": "Garhwal geography", "text": "Kalanka adds another high Himalayan profile to the Mountains of India collection, strengthening coverage of Uttarakhand peaks."}, {"title": "Mountaineering context", "text": "The feature explains the mountain as a serious high-altitude objective rather than a casual trekking destination."}, {"title": "Educational clarity", "text": "Quick facts, gallery cards, and source notes make the page useful for learners exploring Indian Himalayan peaks."}, {"title": "Collection integration", "text": "A helper script adds a landing-page card and route link when a matching landing file exists in the repository."}];

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  document.getElementById("facts-grid").innerHTML = facts.map((fact) => `
    <article class="fact-card">
      <span>${escapeHtml(fact.label)}</span>
      <strong>${escapeHtml(fact.value)}</strong>
      <p>${escapeHtml(fact.detail)}</p>
    </article>
  `).join("");

  document.getElementById("importance-grid").innerHTML = importance.map((item, index) => `
    <article class="importance-card">
      <span>0${index + 1}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
    </article>
  `).join("");

  document.getElementById("gallery-grid").innerHTML = gallery.map((item) => `
    <article class="gallery-card">
      <img src="${escapeHtml(item.image)}" alt="${escapeHtml(item.title)}" onerror="this.src='../../assets/hero_banner.png'">
      <div>
        <h3>${escapeHtml(item.title)}</h3>
        <p>${escapeHtml(item.caption)}</p>
      </div>
    </article>
  `).join("");

  window.KalankaMountainPage = {
    facts: () => [...facts],
    gallery: () => [...gallery],
  };
});
