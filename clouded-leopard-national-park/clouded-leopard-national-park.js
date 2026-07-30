/* clouded-leopard-national-park.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Interactive Map
    const map = L.map('map-container').setView([23.63, 91.31], 12); // Coordinates for Clouded Leopard NP (Sipahijala)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom markers
    L.marker([23.63, 91.31]).addTo(map)
        .bindPopup('<b>Clouded Leopard National Park</b><br>Located within Sipahijala Wildlife Sanctuary.').openPopup();

    L.marker([23.65, 91.32]).addTo(map)
        .bindPopup('<b>Birdwatching Zone</b><br>Excellent area for spotting Hornbills and Drongos.');

    L.marker([23.61, 91.30]).addTo(map)
        .bindPopup('<b>Trekking Trails</b><br>Guided nature trails through the dense evergreen forest.');

    L.marker([23.64, 91.31]).addTo(map)
        .bindPopup('<b>Primate Observation</b><br>Hotspot for Phayre\'s Leaf Monkey and Capped Langur.');

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
        lightboxImg.src = '';
    }

    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
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
