/* gulf-of-mannar-marine-national-park.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Interactive Map
    const map = L.map('map-container').setView([9.25, 79.15], 9); // Coordinates for Gulf of Mannar

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom markers
    L.marker([9.25, 79.15]).addTo(map)
        .bindPopup('<b>Gulf of Mannar Marine National Park</b><br>Core Biosphere Reserve Area.').openPopup();

    L.marker([9.2667, 79.2000]).addTo(map)
        .bindPopup('<b>Kurusedi Island</b><br>Famous for coral reefs and marine biology research.');

    L.marker([9.1667, 79.1167]).addTo(map)
        .bindPopup('<b>Shingle Island</b><br>Key habitat for dugongs and seagrass beds.');

    L.marker([8.9500, 78.5000]).addTo(map)
        .bindPopup('<b>Tuticorin Coast</b><br>Dolphin sighting areas and eco-tourism points.');

    // 2. Image Gallery Lightbox with lazy loading support
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
        lightboxImg.src = ''; // Clear source to stop progressive loading overhead when closed
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            // Support lazy loaded images dataset or standard src
            const imgSrc = img.dataset.src || img.src; 
            openLightbox(imgSrc, img.alt);
        });

        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const img = item.querySelector('img');
                const imgSrc = img.dataset.src || img.src;
                openLightbox(imgSrc, img.alt);
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

    // Lazy Loading Observer for gallery
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('.gallery-item img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    }
});
