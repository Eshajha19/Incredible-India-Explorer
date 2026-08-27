// luni-river.js

document.addEventListener('DOMContentLoaded', () => {
    // 1. Intersection Observer for Scroll Animations
    const sections = document.querySelectorAll('.content-section');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Trigger river animation if it's the geography section
                if (entry.target.id === 'geography') {
                    const path = document.querySelector('.river-path');
                    if(path) path.style.strokeDashoffset = '0';
                }
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        sectionObserver.observe(section);
    });

    // 2. Data Population for Tributaries
    const tributaries = [
        { name: "Sukri", bank: "Left", length: "150 km", description: "Historically important for local irrigation in Pali district." },
        { name: "Mithri", bank: "Left", length: "100 km", description: "A seasonal stream supporting desert flora." },
        { name: "Bandi", bank: "Left", length: "120 km", description: "Known for passing through the textile hub of Balotra." },
        { name: "Khari", bank: "Left", length: "90 km", description: "Highly saline tributary contributing to Luni's salt content." },
        { name: "Jawai", bank: "Left", length: "180 km", description: "Hosts the Jawai Dam, a major water source and leopard habitat." },
        { name: "Guhiya", bank: "Left", length: "80 km", description: "Small ephemeral stream in the upper catchment." },
        { name: "Sagi", bank: "Left", length: "110 km", description: "Joins near the lower basin before the Rann of Kutch." },
        { name: "Jojari", bank: "Right", length: "130 km", description: "The only major tributary joining from the right bank." }
    ];

    const tributaryGrid = document.getElementById('tributary-grid');
    if (tributaryGrid) {
        tributaries.forEach(trib => {
            const card = document.createElement('div');
            card.className = 'tributary-card';
            card.innerHTML = `
                <h4>${trib.name}</h4>
                <p><strong>Bank:</strong> ${trib.bank}</p>
                <p><strong>Length:</strong> ${trib.length}</p>
                <p>${trib.description}</p>
            `;
            tributaryGrid.appendChild(card);
        });
    }

    // 3. Integration with Journey/Bookmark system (Mocking shared nav behavior)
    const bookmarkBtn = document.getElementById('journey-bookmark');
    if (bookmarkBtn) {
        bookmarkBtn.addEventListener('click', () => {
            alert('Added "Luni River Explorer" to My Journey!');
            if (window.Journey && window.Journey.toggle) {
                window.Journey.toggle({
                    id: 'luni-river-explorer',
                    explorerPage: 'luni-river.html',
                    title: 'Luni River',
                    category: 'geography'
                });
            }
        });
    }

    // 4. Map Interactivity
    const mapPoints = document.querySelectorAll('.map-point');
    mapPoints.forEach(point => {
        point.addEventListener('mouseenter', (e) => {
            const label = e.target.nextElementSibling;
            if(label && label.classList.contains('map-label')) {
                label.style.fill = '#d35400';
                label.style.fontSize = '14px';
            }
        });
        point.addEventListener('mouseleave', (e) => {
            const label = e.target.nextElementSibling;
            if(label && label.classList.contains('map-label')) {
                label.style.fill = '#2c3e50';
                label.style.fontSize = '12px';
            }
        });
    });
});

    // 5. Advanced Basin Search Mock functionality
    const searchInput = document.getElementById("luni-search");
    if (searchInput) {
        searchInput.addEventListener("keyup", (e) => {
            const term = e.target.value.toLowerCase();
            const cards = document.querySelectorAll(".tributary-card");
            let found = 0;
            
            cards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(term)) {
                    card.style.display = "block";
                    found++;
                } else {
                    card.style.display = "none";
                }
            });
            
            if (term.length > 2 && found === 0) {
                console.log(`No results found for basin query: ${term}`);
            }
        });
    }

