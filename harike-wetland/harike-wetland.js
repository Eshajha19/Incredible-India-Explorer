// Harike Wetland Explorer — no external API calls, purely local interactivity

document.addEventListener('DOMContentLoaded', function () {
  var zones = document.querySelectorAll('.hw-map-zone');

  function activateZone(zone) {
    zones.forEach(function (z) {
      z.classList.remove('hw-zone-active');
      z.setAttribute('aria-pressed', 'false');
    });
    zone.classList.add('hw-zone-active');
    zone.setAttribute('aria-pressed', 'true');
  }

  zones.forEach(function (zone) {
    zone.addEventListener('click', function () {
      activateZone(zone);
    });
  });
});