
document.addEventListener("DOMContentLoaded", () => {
  const facts = [{"label": "Height", "value": "5,289 m", "detail": "Friendship Peak is listed in the issue as a 5,289 metre mountain."}, {"label": "State", "value": "Himachal Pradesh", "detail": "The peak belongs to the Himachal Pradesh mountain landscape."}, {"label": "Range", "value": "Pir Panjal", "detail": "The issue identifies Friendship Peak with the Pir Panjal range."}, {"label": "Known for", "value": "Popular trekking destination", "detail": "Friendship Peak is widely known as a scenic high-altitude trekking and climbing objective."}, {"label": "Nearest hub", "value": "Manali region", "detail": "The peak is commonly associated with the Kullu-Manali side of Himachal Pradesh."}, {"label": "Page focus", "value": "Trekking guide + nature", "detail": "The page combines natural beauty, facts, trekking guidance, safety, and gallery cards."}];
  const trek = [{"title": "Trail character", "text": "Friendship Peak routes are known for forests, alpine meadows, moraine zones, snow patches, and broad mountain views."}, {"title": "Fitness level", "text": "Trekkers should be prepared for altitude, long walking days, cold nights, and changing weather."}, {"title": "Skills and support", "text": "Use trained guides for snow sections, route decisions, weather checks, equipment, and emergency planning."}, {"title": "Responsible trekking", "text": "Carry waste back, protect meadows, respect local communities, and avoid unsafe shortcuts."}];
  const gallery = [{"title": "Pir Panjal view", "image": "../../assets/travel_mountains.png", "caption": "The Pir Panjal landscape is known for snow ridges and open Himalayan views."}, {"title": "Meadow approach", "image": "../../assets/travel_hidden.png", "caption": "Approach trails may include forests, meadows, and remote campsites."}, {"title": "Summit weather", "image": "../../assets/hero_banner.png", "caption": "Weather windows and altitude awareness are important for high mountain plans."}, {"title": "Trek camp", "image": "../../assets/travel_mountains.png", "caption": "Camp discipline and responsible travel protect fragile mountain environments."}];
  const highlights = [{"title": "Accessible learning profile", "text": "Friendship Peak is a recognisable mountain for users learning about Himachal trekking destinations."}, {"title": "Natural beauty", "text": "The page highlights forests, alpine meadows, snow slopes, and scenic Pir Panjal views."}, {"title": "Safety-first guide", "text": "Trekking information is written as awareness guidance, not as technical route instructions."}, {"title": "Landing integration", "text": "A helper script adds a Mountains landing-page card and route link when matching files are present."}];

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

  document.getElementById("highlight-grid").innerHTML = highlights.map((item, index) => `
    <article class="highlight-card">
      <span>0${index + 1}</span>
      <h3>${escapeHtml(item.title)}</h3>
      <p>${escapeHtml(item.text)}</p>
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

  window.FriendshipPeakMountainPage = {
    facts: () => [...facts],
    trek: () => [...trek],
  };
});
