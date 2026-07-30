/* panna-national-park.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Interactive Map
    const map = L.map('map-container').setView([24.7176, 79.9234], 11);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom icons or default markers
    const marker1 = L.marker([24.7176, 79.9234]).addTo(map)
        .bindPopup('<b>Panna National Park</b><br>Core Area').openPopup();

    const ranehFalls = L.marker([24.8966, 79.9482]).addTo(map)
        .bindPopup('<b>Raneh Falls</b><br>Spectacular granite canyon.');

    const kenRiver = L.marker([24.7891, 79.9325]).addTo(map)
        .bindPopup('<b>Ken River</b><br>Lifeline of the park.');

    const madlaGate = L.marker([24.8166, 79.9666]).addTo(map)
        .bindPopup('<b>Madla Gate</b><br>Main safari entrance.');


    // 2. Image Gallery Lightbox
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');

    function openLightbox(src, alt) {
        lightboxImg.src = src;
        lightboxImg.alt = alt;
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        lightboxClose.focus();
    }

    function closeLightbox() {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        // Return focus to the trigger element if possible, not strictly needed for this basic implementation
    }

    galleryItems.forEach(item => {
        // Click event
        item.addEventListener('click', (e) => {
            const img = item.querySelector('img');
            openLightbox(img.src, img.alt);
        });

        // Keyboard accessibility
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const img = item.querySelector('img');
                openLightbox(img.src, img.alt);
            }
        });
    });

    lightboxClose.addEventListener('click', closeLightbox);
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
