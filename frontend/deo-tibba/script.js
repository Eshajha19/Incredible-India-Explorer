
document.addEventListener("DOMContentLoaded", () => {
  const facts = [{"label": "Height", "value": "6,001 m", "detail": "Deo Tibba is listed in the issue as a 6,001 metre peak."}, {"label": "State", "value": "Himachal Pradesh", "detail": "The mountain is associated with Himachal Pradesh's high Himalayan trekking landscape."}, {"label": "Range", "value": "Pir Panjal", "detail": "The issue identifies Deo Tibba with the Pir Panjal range."}, {"label": "Known for", "value": "Trekking views", "detail": "The region is known for alpine meadows, snow views, moraines, and dramatic Himalayan scenery."}, {"label": "Nearest hub", "value": "Manali region", "detail": "Deo Tibba treks are commonly planned from the Kullu-Manali side of Himachal Pradesh."}, {"label": "Page focus", "value": "Nature + trek guide", "detail": "The page combines natural beauty, quick facts, trekking information, gallery, and safety notes."}];
  const trek = [{"title": "Trail character", "text": "The Deo Tibba trekking region is known for forests, meadows, river crossings, moraine zones, and open Himalayan views."}, {"title": "Fitness level", "text": "Trekkers should be comfortable with multi-day walking, altitude gain, cold weather, and uneven terrain."}, {"title": "Best planning window", "text": "Season depends on snow and local conditions; travellers should check current advisories and local operator guidance."}, {"title": "Responsible trekking", "text": "Follow Leave No Trace habits, avoid littering, respect local communities, and stay on safe marked routes."}];
  const gallery = [{"title": "Alpine meadow", "image": "../../assets/travel_mountains.png", "caption": "Meadows and high Himalayan scenery around the Deo Tibba trekking landscape."}, {"title": "Forest approach", "image": "../../assets/travel_hidden.png", "caption": "Lower route sections often pass through forests and valley trails."}, {"title": "Snow view", "image": "../../assets/hero_banner.png", "caption": "Clear weather can reveal dramatic snow peaks and ridgelines."}, {"title": "Mountain camp", "image": "../../assets/travel_mountains.png", "caption": "Camp planning, weather checks, and acclimatisation awareness matter."}];

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

  document.getElementById("trek-grid").innerHTML = trek.map((item, index) => `
    <article class="trek-card">
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

  window.DeoTibbaMountainPage = {
    facts: () => [...facts],
    trek: () => [...trek],
  };
});
