
document.addEventListener("DOMContentLoaded", () => {
  const facts = [{"label": "Height", "value": "7,272 m", "detail": "Mana Peak is one of the high summits of the Garhwal Himalayas."}, {"label": "State", "value": "Uttarakhand", "detail": "The peak is associated with the Chamoli district / Mana region of Uttarakhand."}, {"label": "Range", "value": "Garhwal Himalayas", "detail": "Part of the greater Himalayan system close to major high-altitude passes."}, {"label": "Nearby region", "value": "Mana Pass", "detail": "The area is known for remote trans-Himalayan terrain near the Indo-Tibetan border."}, {"label": "Route type", "value": "Expedition climb", "detail": "High-altitude snow, ice, glacier, and weather planning are essential."}, {"label": "Best suited for", "value": "Experienced teams", "detail": "This is educational content, not a casual trekking recommendation."}];
  const timeline = [{"title": "Himalayan setting", "text": "Mana Peak rises in the Garhwal Himalayas, one of India's most dramatic high-mountain regions."}, {"title": "Borderland geography", "text": "Its landscape is shaped by high passes, glaciers, cold winds, and remote approach routes."}, {"title": "Expedition focus", "text": "The peak is suitable only for trained mountaineering teams with high-altitude preparation."}, {"title": "Educational value", "text": "Mana Peak helps learners understand Indian Himalayan geography, elevation, and expedition planning."}];
  const gallery = [{"title": "Garhwal Himalaya", "image": "../../assets/travel_mountains.png", "caption": "Snow-covered high Himalayan terrain."}, {"title": "Remote approach", "image": "../../assets/travel_hidden.png", "caption": "Long valleys and high-altitude routes shape the journey."}, {"title": "Expedition camp", "image": "../../assets/hero_banner.png", "caption": "Staged camps and acclimatisation are essential."}, {"title": "Mountain ridge", "image": "../../assets/travel_mountains.png", "caption": "Summit routes demand careful planning and safe weather windows."}];

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

  document.getElementById("timeline").innerHTML = timeline.map((item, index) => `
    <article class="timeline-item">
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

  window.ManaPeakMountainPage = {
    facts: () => [...facts],
    gallery: () => [...gallery],
  };
});
