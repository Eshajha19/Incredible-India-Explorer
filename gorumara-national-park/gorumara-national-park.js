/* gorumara-national-park.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Interactive Map
    const map = L.map('map-container').setView([26.75, 88.80], 12); // Coordinates for Gorumara NP

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom markers
    L.marker([26.75, 88.80]).addTo(map)
        .bindPopup('<b>Gorumara National Park</b><br>Core area known for Rhinos.').openPopup();

    L.marker([26.73, 88.76]).addTo(map)
        .bindPopup('<b>Jatraprasad Watch Tower</b><br>Famous for panoramic views of the Murti river and wildlife.');

    L.marker([26.77, 88.82]).addTo(map)
        .bindPopup('<b>Medla Watch Tower</b><br>Located near the Kalipur eco-village, accessible via buffalo carts.');

    L.marker([26.71, 88.85]).addTo(map)
        .bindPopup('<b>Chandrachur Watch Tower</b><br>Excellent spot for observing wild elephants and Indian bison.');

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
