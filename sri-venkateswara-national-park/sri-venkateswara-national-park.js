/* sri-venkateswara-national-park.js */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize Interactive Map
    const map = L.map('map-container').setView([13.66, 79.25], 11); // Coordinates for Sri Venkateswara NP

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Custom markers
    L.marker([13.66, 79.25]).addTo(map)
        .bindPopup('<b>Sri Venkateswara National Park</b><br>Eastern Ghats biodiversity hotspot.').openPopup();

    L.marker([13.80, 79.22]).addTo(map)
        .bindPopup('<b>Talakona Waterfall</b><br>Highest waterfall in Andhra Pradesh, surrounded by dense forests.');

    L.marker([13.68, 79.34]).addTo(map)
        .bindPopup('<b>Tirumala Hills</b><br>Sacred hills intimately connected to the park ecosystem.');

    L.marker([13.72, 79.18]).addTo(map)
        .bindPopup('<b>Trekking Trails</b><br>Start of major eco-tourism trekking routes.');

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
