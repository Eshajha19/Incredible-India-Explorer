/* indravati-national-park.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Interactive Map
    const map = L.map('map-container').setView([19.2667, 80.7833], 10); // Coordinates for Indravati NP

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom icons or default markers
    const coreArea = L.marker([19.2667, 80.7833]).addTo(map)
        .bindPopup('<b>Indravati National Park</b><br>Core Area').openPopup();

    const indravatiRiver = L.marker([19.1000, 80.4333]).addTo(map)
        .bindPopup('<b>Indravati River</b><br>The lifeline of the park.');

    const kutru = L.marker([19.1419, 80.7932]).addTo(map)
        .bindPopup('<b>Kutru</b><br>Important entry and administrative point.');

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
