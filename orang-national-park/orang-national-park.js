/* orang-national-park.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Interactive Map
    const map = L.map('map-container').setView([26.5667, 92.2667], 11); // Coordinates for Orang NP

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom markers
    L.marker([26.5667, 92.2667]).addTo(map)
        .bindPopup('<b>Orang National Park</b><br>Mini Kaziranga').openPopup();

    L.marker([26.6000, 92.2000]).addTo(map)
        .bindPopup('<b>Brahmaputra River Bank</b><br>Floodplain grasslands and wetlands.');

    L.marker([26.5333, 92.3000]).addTo(map)
        .bindPopup('<b>Primary Rhino Habitat</b><br>Dense grassland areas for the One-Horned Rhinoceros.');

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
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            openLightbox(img.src, img.alt);
        });

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

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
});
