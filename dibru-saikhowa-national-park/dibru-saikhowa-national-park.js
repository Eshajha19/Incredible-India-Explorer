/* dibru-saikhowa-national-park.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Interactive Map
    const map = L.map('map-container').setView([27.65, 95.33], 11); // Coordinates for Dibru-Saikhowa NP

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom markers
    L.marker([27.65, 95.33]).addTo(map)
        .bindPopup('<b>Dibru-Saikhowa National Park</b><br>River Island Ecosystem').openPopup();

    L.marker([27.58, 95.31]).addTo(map)
        .bindPopup('<b>Guijan Ghat</b><br>Primary entry point and boat safari starting point.');

    L.marker([27.68, 95.40]).addTo(map)
        .bindPopup('<b>Maguri Motapung Beel</b><br>Important wetland area for migratory birds.');

    L.marker([27.63, 95.25]).addTo(map)
        .bindPopup('<b>Feral Horse Habitat</b><br>Churkey Sapori area where feral horses graze.');

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
