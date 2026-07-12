const innovationDetails = {
    'Zero': {
        year: '500 BCE',
        details: 'The concept of zero (shunya) was developed by the ancient Indian mathematician Aryabhata. This revolutionary concept transformed mathematics by providing a placeholder and a number in its own right. The decimal system, including zero, was later transmitted to the Arab world and then to Europe, becoming the foundation of modern mathematics.'
    },
    'Ayurveda': {
        year: '5000 BCE',
        details: 'Ayurveda, meaning "the science of life," is one of the world\'s oldest medical systems. It originated in India more than 5,000 years ago and emphasizes holistic healing through diet, lifestyle, herbal remedies, and yoga. The Charaka Samhita and Sushruta Samhita are foundational texts that document surgical techniques and medical knowledge far ahead of their time.'
    },
    'Chess': {
        year: '600 CE',
        details: 'Chess originated in ancient India as "Chaturanga," meaning "four limbs" or "four divisions" of the military: infantry, cavalry, elephants, and chariotry. The game spread to Persia, where it became "Shatranj," and eventually evolved into modern chess in Europe. The strategic complexity and intellectual challenge of chess have made it a timeless game enjoyed worldwide.'
    },
    'Iron Pillar': {
        year: '400 CE',
        details: 'The Iron Pillar of Delhi, standing 7 meters tall and weighing over 6 tons, is a remarkable metallurgical achievement. Despite being exposed to the elements for over 1,600 years, it has shown remarkable resistance to corrosion. The pillar\'s composition includes high phosphorus content, which forms a protective layer of iron phosphate, demonstrating advanced ancient Indian metallurgy.'
    },
    'ISRO': {
        year: '1969',
        details: 'The Indian Space Research Organisation (ISRO) was founded in 1969 with the vision of harnessing space technology for national development. From launching its first satellite, Aryabhata, in 1975 to achieving remarkable milestones like Chandrayaan and Mangalyaan, ISRO has established India as a major space-faring nation known for cost-effective and innovative space missions.'
    },
    'Chandrayaan': {
        year: '2008',
        details: 'Chandrayaan-1, India\'s first lunar mission, was launched in 2008. The orbiter made the groundbreaking discovery of water molecules on the Moon\'s surface, particularly near the polar regions. This mission demonstrated India\'s growing capabilities in space exploration and contributed significantly to lunar science. Chandrayaan-2 and Chandrayaan-3 have further advanced India\'s lunar exploration program.'
    },
    'Mangalyaan': {
        year: '2013',
        details: 'Mangalyaan (Mars Orbiter Mission), launched in 2013, made India the first country to successfully reach Mars orbit on its first attempt. Remarkably, it was accomplished at a cost of $74 million, less than the budget of many Hollywood movies. The mission studies Martian surface features, morphology, mineralogy, and atmosphere, showcasing India\'s cost-effective space capabilities.'
    },
    'Digital India': {
        year: '2015',
        details: 'Launched in 2015, Digital India is a flagship program to transform India into a digitally empowered society and knowledge economy. It includes initiatives like Aadhaar (biometric ID), UPI (unified payments interface), and digital infrastructure projects. The program has revolutionized how Indians access government services, make payments, and connect to the digital economy.'
    }
};

document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const detailButtons = document.querySelectorAll('.detail-btn');
    const modal = document.getElementById('detailModal');
    const closeBtn = document.querySelector('.close');
    const modalTitle = document.getElementById('modalTitle');
    const modalYear = document.getElementById('modalYear');
    const modalBody = document.getElementById('modalBody');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            timelineItems.forEach(item => {
                const category = item.getAttribute('data-category');
                
                if (filter === 'all' || category === filter) {
                    item.classList.remove('hidden');
                    item.style.animation = 'none';
                    item.offsetHeight;
                    item.style.animation = 'slideIn 0.6s ease-out forwards';
                } else {
                    item.classList.add('hidden');
                }
            });
        });
    });

    detailButtons.forEach(button => {
        button.addEventListener('click', function() {
            const timelineContent = this.closest('.timeline-content');
            const title = timelineContent.querySelector('h3').textContent;
            const year = timelineContent.querySelector('.timeline-year').textContent;
            
            modalTitle.textContent = title;
            modalYear.textContent = year;
            modalBody.textContent = innovationDetails[title].details;
            
            modal.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });

    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    timelineItems.forEach(item => {
        observer.observe(item);
    });
});
