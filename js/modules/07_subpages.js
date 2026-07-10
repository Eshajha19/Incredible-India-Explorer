import { cuisinesData } from '../data/cuisinesData.js';
import { festivalsData } from '../data/festivalsData.js';

/* ==========================================================================
   SUB-PAGES INITIALIZATION LOGIC & MAPPINGS
   ========================================================================== */

const cuisineDetails = {
    "c1": {
        spice: 45, richness: 90, sweetness: 40,
        ingredients: ["Boneless Chicken", "Fresh Tomato Puree", "Butter & Fresh Cream", "Kashmiri Lal Mirch", "Garam Masala", "Kasuri Methi"],
        story: "Originating in the 1950s at the Moti Mahal restaurant in Delhi, Butter Chicken was created by Kundan Lal Gujral. He cleverly mixed leftover tandoori chicken juices with a rich, buttery tomato gravy to keep the chicken moist, creating a global phenomenon."
    },
    "c2": {
        spice: 80, richness: 70, sweetness: 10,
        ingredients: ["Kabuli Chana (Chickpeas)", "Maida Flatbreads", "Pomegranate Seed Powder", "Amchoor (Mango Powder)", "Green Chiles & Ginger", "Carom Seeds"],
        story: "A beloved classic born in the streets of Punjab, Chole Bhature is the ultimate indulgence. The chickpeas are slow-simmered in a dark, tea-infused spice blend, while the bhature dough is fermented to puff up into massive, golden, cloud-like balloons."
    },
    "c3": {
        spice: 75, richness: 85, sweetness: 10,
        ingredients: ["Mutton (Lamb Shoulder)", "Kashmiri Dry Red Chilies", "Fennel Powder", "Ginger Powder", "Maval (Cockscomb flower)", "Asafoetida"],
        story: "Introduced to Kashmir by the Mughals, Rogan Josh is a staple of the royal Kashmiri Wazwan feast. The dish gets its signature crimson color not from hot heat, but from mild Kashmiri red chilies and cockscomb flower petals."
    },
    "c4": {
        spice: 50, richness: 60, sweetness: 15,
        ingredients: ["Fermented Rice Batter", "Mashed Potatoes", "Mustard Seeds & Curry Leaves", "Chana Dal", "Turmeric & Onion", "Coconut Chutney"],
        story: "Originating in the temple city of Udupi, Karnataka, Masala Dosa is a masterpiece of textures. The paper-thin fermented rice crepe is roasted in ghee until crispy outside, wrapping around a soft, seasoned potato-onion mash."
    },
    "c5": {
        spice: 90, richness: 85, sweetness: 10,
        ingredients: ["Basmati Rice", "Marinated Meat (Chicken/Goat)", "Saffron Milk", "Fried Onions (Biryanis)", "Mint & Coriander Leaves", "Rose Water"],
        story: "Perfected in the kitchens of the Nizams of Hyderabad, this legendary dish uses the raw (Kacchi) biryani method. Raw marinated meat is cooked in layers under seal ('Dum') with long-grain Basmati rice, infusing the rice with pure meat juices."
    },
    "c6": {
        spice: 40, richness: 30, sweetness: 10,
        ingredients: ["Parboiled Rice", "Urad Dal", "Toor Dal (Lentils)", "Tamarind Pulp", "Drumstick & Shallots", "Sambar Powder"],
        story: "Idlis are ancient steamed cakes whose origins trace back to Southern India or Indonesia. Fermenting the black lentils and rice batter breaks down nutrients, making Idli and Sambar one of the healthiest and most digestible breakfasts globally."
    },
    "c7": {
        spice: 65, richness: 50, sweetness: 5,
        ingredients: ["Whole Wheat Flour", "Sattu (Roasted Chickpea)", "Roasted Eggplant", "Mustard Oil", "Garlic & Green Chiles", "Ajwain (Carom)"],
        story: "Litti Chokha was once the survival food for peasant armies and revolutionaries in Bihar because of its long shelf-life. The dough balls stuffed with spiced sattu are slow-baked over dung fires, cracked open, dipped in ghee, and eaten with rustic chokha mash."
    },
    "c8": {
        spice: 70, richness: 40, sweetness: 15,
        ingredients: ["Rahu Fish Pieces", "Mustard Oil & Paste", "Panch Phoron (Five-spice)", "Turmeric & Ginger", "Potatoes & Cauliflower", "Green Chiles"],
        story: "Machher Jhol is the ultimate comfort food for every Bengali home. It is a light, spicy fish stew that balances the pungency of mustard oil with fresh green chilies and a digestive blend of five spices, representing Bengal's riverine heritage."
    },
    "c9": {
        spice: 0, richness: 30, sweetness: 95,
        ingredients: ["Chhena (Fresh Milk Curds)", "Sugar Syrup", "Rose Water", "Semolina (Rava)", "Saffron Strands", "Cardamom Powder"],
        story: "The origin of Rasgulla is a famous historical debate between Bengal and Odisha. In Bengal, Nobin Chandra Das popularized the soft, spongy variant in 1868, while in Odisha, the sweet has been offered to Goddess Lakshmi at Jagannath Temple for centuries."
    },
    "c10": {
        spice: 55, richness: 30, sweetness: 35,
        ingredients: ["Gram Flour (Besan)", "Citric Acid & Baking Soda", "Mustard Seeds", "Curry Leaves & Sesame", "Green Chilies", "Grated Coconut"],
        story: "Khaman Dhokla is a steamed, airy, savory snack from Gujarat. The key is fermenting the gram flour batter and steaming it to perfection, followed by a hot tempering of mustard seeds, green chilies, and sugar water that keeps the cake moist."
    },
    "c11": {
        spice: 85, richness: 60, sweetness: 5,
        ingredients: ["Boiled Potatoes", "Gram Flour Batter", "Pav (Bread Roll)", "Dry Garlic-Coconut Chutney", "Salted Green Chili", "Mint-Coriander Chutney"],
        story: "Invented in 1966 by Ashok Vaidya outside Mumbai's Dadar Station, Vada Pav was designed as a cheap, grab-and-go meal for textile mill workers. Today, it is Mumbai's iconic culinary identity, eaten by millions daily across all social classes."
    },
    "c12": {
        spice: 0, richness: 90, sweetness: 80,
        ingredients: ["Egg Yolks", "Thick Coconut Milk", "Pure Ghee", "Sugar", "Flour", "Nutmeg Grating"],
        story: "Bebinca is a classic Indo-Portuguese dessert, often called the 'Queen of Goan Desserts'. Legend says it was invented by a nun named Bebiana at the Santa Monica Convent, who made layers to symbolize the seven hills of Lisbon or Goa."
    },
    "c13": {
        spice: 60, richness: 35, sweetness: 10,
        ingredients: ["Refined Flour Dough", "Minced Vegetables/Meat", "Soy Sauce & Ginger", "Szechuan Pepper", "Garlic & Chilies", "Sesame Oil"],
        story: "Momos entered the culinary fabric of Sikkim and Northeast India through Tibetan traders and refugees. These steamed delicacies have adapted to local palates, featuring spicy red chutneys made from hot local 'Dalle Khursani' chilies."
    },
    "c14": {
        spice: 95, richness: 50, sweetness: 0,
        ingredients: ["Smoked Pork Pieces", "Anishi (Fermented Yam Leaves)", "Fermented Bamboo Shoots", "Raja Mircha (Ghost Pepper)", "Ginger-Garlic", "Local Herbs"],
        story: "A core staple of the Naga tribal hearth, this dish features pork that is slow-smoked over kitchen woodfires for weeks. It is simmered with pungent, sour fermented bamboo shoots and seasoned with Raja Mircha, one of the spiciest chilies in the world."
    },
    "c15": {
        spice: 70, richness: 45, sweetness: 5,
        ingredients: ["Red Hill Rice", "Pork/Chicken Stock", "Ginger Paste", "Black Pepper", "Local Sesame Seeds", "Aromatic Khasi Herbs"],
        story: "Jadoh is a highly sacred and popular rice dish of the Khasi tribe of Meghalaya. Cooked traditionally with red hill rice and pork or chicken, it is served during important festivals and family reunions as a mark of Khasi heritage and hospitality."
    }
};

const festivalHighlights = {
    "Diwali": [
        { icon: "ðŸª”", text: "Clay Diyas & Lighting" },
        { icon: "ðŸŽ¨", text: "Flower & Powder Rangoli" },
        { icon: "ðŸ¬", text: "Sharing Mithai (Sweets)" },
        { icon: "ðŸŽ†", text: "Night Sparklers & Fireworks" }
    ],
    "Holi": [
        { icon: "ðŸŽ¨", text: "Organic Colors (Gulal)" },
        { icon: "ðŸ’¦", text: "Pichkaris & Water Balloons" },
        { icon: "ðŸ¥›", text: "Thandai & Gujiya Sweets" },
        { icon: "ðŸ”¥", text: "Holika Dahan Bonfires" }
    ],
    "Eid": [
        { icon: "ðŸŒ™", text: "Crescent Moon Sighting" },
        { icon: "ðŸ•Œ", text: "Congregational Prayers" },
        { icon: "ðŸ¥£", text: "Sweet Sheer Khurma Feast" },
        { icon: "ðŸŽ", text: "Eidi (Gift-Giving)" }
    ],
    "Pongal": [
        { icon: "ðŸŒ¾", text: "Harvest Sugarcane Stalks" },
        { icon: "ðŸº", text: "Decorated Clay Boiling Pots" },
        { icon: "â˜€ï¸", text: "Surya (Sun God) Worship" },
        { icon: "ðŸ„", text: "Decorating Cattle (Mattu)" }
    ],
    "Navratri": [
        { icon: "ðŸ’ƒ", text: "Garba & Dandiya Dances" },
        { icon: "ðŸ¥»", text: "Chaniya Choli Dressups" },
        { icon: "ðŸ•¯ï¸", text: "Ghatasthapana (Holy Jar)" },
        { icon: "ðŸ”±", text: "Dussehra Effigy Burning" }
    ],
    "Bihu": [
        { icon: "ðŸ¥", text: "Dhol & Pepa Music" },
        { icon: "ðŸŒ¾", text: "Rongali Spring Dance" },
        { icon: "ðŸ¥ž", text: "Pitha Rice Cake Feasts" },
        { icon: "ðŸƒ", text: "Community Bonfires" }
    ]
};

export function initCuisinePage() {
    const cuisineGrid = document.getElementById('cuisine-grid');
    const tabBtns = document.querySelectorAll('.tab-btn');
    const searchInput = document.getElementById('cuisine-search-input');

    const drawer = document.getElementById('cuisine-drawer');
    const drawerClose = document.getElementById('drawer-close');
    const dRegion = document.getElementById('drawer-region-text');
    const dTitle = document.getElementById('drawer-title');
    const dState = document.getElementById('drawer-state-text');
    const dImg = document.getElementById('drawer-img');
    const dDesc = document.getElementById('drawer-description');
    const dSpice = document.getElementById('fill-spice');
    const dRich = document.getElementById('fill-richness');
    const dSweet = document.getElementById('fill-sweetness');
    const dIngredients = document.getElementById('drawer-ingredients');

    let currentRegion = 'all';
    let searchQuery = '';

    render();

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentRegion = btn.getAttribute('data-region');
            animateRender();
        });
    });

    searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value.toLowerCase().trim();
        animateRender();
    });

    drawerClose.addEventListener('click', closeDrawer);
    drawer.addEventListener('click', (e) => {
        if (e.target === drawer) closeDrawer();
    });

    function closeDrawer() {
        drawer.classList.remove('open');
        document.body.classList.remove('no-scroll');
        document.documentElement.classList.remove('no-scroll');
    }

    function animateRender() {
        cuisineGrid.style.opacity = '0';
        cuisineGrid.style.transform = 'translateY(15px)';
        cuisineGrid.style.transition = 'opacity 0.25s, transform 0.25s';

        setTimeout(() => {
            render();
            cuisineGrid.style.opacity = '1';
            cuisineGrid.style.transform = 'translateY(0)';
        }, 200);
    }

    function render() {
        cuisineGrid.innerHTML = '';

        let filtered = cuisinesData;
        if (currentRegion !== 'all') {
            filtered = filtered.filter(item => item.region === currentRegion);
        }
        if (searchQuery !== '') {
            filtered = filtered.filter(item =>
                item.name.toLowerCase().includes(searchQuery) ||
                item.state.toLowerCase().includes(searchQuery) ||
                item.description.toLowerCase().includes(searchQuery)
            );
        }

        if (filtered.length === 0) {
            cuisineGrid.innerHTML = `<div class="no-results" style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--text-muted); font-size: 1.1rem;">No cuisines match your criteria. Try adjusting the filter or search word.</div>`;
            return;
        }

        filtered.forEach(dish => {
            const card = document.createElement('div');
            card.className = 'cuisine-card glass-card';

            let badgeClass = 'saffron-bg';
            if (dish.region === 'south') badgeClass = 'gold-bg';
            if (dish.region === 'east') badgeClass = 'green-bg';
            if (dish.region === 'northeast') badgeClass = 'gold-bg';

            card.innerHTML = `
                <div class="cuisine-card-image">
                    <img src="${dish.image}" alt="${dish.name}" loading="lazy">
                    <span class="cuisine-region-badge ${badgeClass}">${dish.region} India</span>
                </div>
                <div class="cuisine-card-body">
                    <span class="cuisine-origin">${dish.state}</span>
                    <h3>${dish.name}</h3>
                    <p>${dish.description}</p>
                </div>
            `;

            card.addEventListener('click', () => {
                const details = cuisineDetails[dish.id] || {
                    spice: 50, richness: 50, sweetness: 50,
                    ingredients: ["Local spices", "Regional vegetables", "Traditional grains"],
                    story: dish.description
                };

                dRegion.innerText = `${dish.region} India`;
                dRegion.className = `drawer-badge ${badgeClass}`;
                dTitle.innerText = dish.name;
                dState.innerText = `Origin: ${dish.state}`;
                dImg.src = dish.image;
                dImg.alt = dish.name;
                dDesc.innerText = details.story;

                dSpice.style.width = details.spice + '%';
                dRich.style.width = details.richness + '%';
                dSweet.style.width = details.sweetness + '%';

                dIngredients.innerHTML = '';
                details.ingredients.forEach(ing => {
                    const li = document.createElement('li');
                    li.innerText = ing;
                    dIngredients.appendChild(li);
                });

                drawer.classList.add('open');
                document.body.classList.add('no-scroll');
                document.documentElement.classList.add('no-scroll');
            });

            cuisineGrid.appendChild(card);
        });

        // Try Recipe Mode Logic
        const btnTryRecipe = document.getElementById('btn-try-recipe');
        const recipeOverlay = document.getElementById('recipe-mode-overlay');
        const btnExitRecipe = document.getElementById('btn-exit-recipe');
        const recipeTitle = document.getElementById('recipe-title');
        const progressFill = document.getElementById('recipe-progress-fill');
        const stepIndicator = document.getElementById('recipe-step-indicator');
        const stepTitle = document.getElementById('step-title');
        const stepInstruction = document.getElementById('step-instruction');
        const btnPrevStep = document.getElementById('btn-prev-step');
        const btnNextStep = document.getElementById('btn-next-step');

        let currentRecipeSteps = [];
        let currentStepIndex = 0;

        if (btnTryRecipe) {
            btnTryRecipe.onclick = () => {
                recipeTitle.innerText = dTitle.innerText;

                // Generate pseudo-steps based on ingredients
                const ingredientsList = Array.from(dIngredients.querySelectorAll('li')).map(li => li.innerText);
                currentRecipeSteps = [
                    { title: "1. Preparation", text: `Gather and prepare the following ingredients: ${ingredientsList.slice(0, 2).join(', ')}.` },
                    { title: "2. Marination & SautÃ©", text: `Mix the spices with the base ingredients. Slowly cook the ${ingredientsList.length > 2 ? ingredientsList[2] : "spices"} to release the aromas.` },
                    { title: "3. Simmer & Cook", text: `Add the main elements and let the dish simmer on low heat until fully cooked. Let the flavors meld.` },
                    { title: "4. Garnish & Serve", text: `Finish off with ${ingredientsList.length > 3 ? ingredientsList[3] : "fresh herbs"} and serve hot! Enjoy your authentic meal.` }
                ];

                currentStepIndex = 0;
                updateRecipeUI();
                recipeOverlay.classList.add('active');
            };

            btnExitRecipe.onclick = () => {
                recipeOverlay.classList.remove('active');
            };

            btnPrevStep.onclick = () => {
                if (currentStepIndex > 0) {
                    currentStepIndex--;
                    updateRecipeUI();
                }
            };

            btnNextStep.onclick = () => {
                if (currentStepIndex < currentRecipeSteps.length - 1) {
                    currentStepIndex++;
                    updateRecipeUI();
                } else {
                    // Finished
                    recipeOverlay.classList.remove('active');
                }
            };

            function updateRecipeUI() {
                const step = currentRecipeSteps[currentStepIndex];
                stepTitle.innerText = step.title;
                stepInstruction.innerText = step.text;

                const progress = ((currentStepIndex + 1) / currentRecipeSteps.length) * 100;
                progressFill.style.width = `${progress}%`;
                stepIndicator.innerText = `Step ${currentStepIndex + 1} of ${currentRecipeSteps.length}`;

                btnPrevStep.disabled = currentStepIndex === 0;

                if (currentStepIndex === currentRecipeSteps.length - 1) {
                    btnNextStep.innerText = "Finish ðŸŽ‰";
                } else {
                    btnNextStep.innerHTML = "Next Step &rarr;";
                }

                // Re-trigger animation
                const card = document.getElementById('recipe-step-card');
                card.classList.remove('animate-slide-up');
                void card.offsetWidth; // trigger reflow
                card.classList.add('animate-slide-up');
            }
        }
    }
}

export function initFestivalsPage() {
    const festivalTimeline = document.getElementById('festival-timeline');
    const overlay = document.getElementById('story-overlay');
    const backBtn = document.getElementById('story-back-btn');
    const audioBtn = document.getElementById('story-audio-btn');

    const storyImg = document.getElementById('story-img');
    const particlesContainer = document.getElementById('canvas-particles');
    const shapeContainer = document.getElementById('canvas-shape-container');
    const storySubtitle = document.getElementById('story-subtitle');
    const storyTitle = document.getElementById('story-title');
    const storyMainText = document.getElementById('story-main-text');
    const highlightsGrid = document.getElementById('story-highlights-grid');

    festivalTimeline.innerHTML = '';

    festivalsData.forEach(fest => {
        const card = document.createElement('div');
        card.className = 'festival-card glass-card';
        card.innerHTML = `
            <img class="festival-card-img" src="${fest.image}" alt="${fest.name}" loading="lazy">
            <div class="festival-card-content">
                <span class="subtitle">${fest.subtitle}</span>
                <h3>${fest.name}</h3>
                <p>${fest.description}</p>
            </div>
        `;

        card.addEventListener('click', () => {
            storyImg.src = fest.image;
            storyImg.alt = fest.name;
            storySubtitle.innerText = fest.subtitle;
            storyTitle.innerText = fest.name;

            // Format story text as paragraph lines
            const paragraphs = (fest.story || fest.description)
                .split('\n\n')
                .map(pText => `<p class="story-paragraph">${pText}</p>`)
                .join('');
            storyMainText.innerHTML = paragraphs;

            // Reapply Drop Cap on first paragraph
            const firstPara = storyMainText.querySelector('.story-paragraph');
            if (firstPara) firstPara.classList.add('drop-cap');

            // Set dynamic background color transition class
            overlay.className = `story-overlay theme-${fest.name.toLowerCase()}`;

            // Load highlights
            highlightsGrid.innerHTML = '';
            const highlights = festivalHighlights[fest.name] || [
                { icon: "ðŸŽ‰", text: "Traditional Customs" },
                { icon: "ðŸ¥£", text: "Festive Meals" },
                { icon: "âœ¨", text: "Joyous Decorations" },
                { icon: "ðŸ«‚", text: "Community Gatherings" }
            ];

            highlights.forEach(hl => {
                const div = document.createElement('div');
                div.className = 'highlight-bullet';
                div.innerHTML = `<span class="bullet-icon">${hl.icon}</span><span>${hl.text}</span>`;
                highlightsGrid.appendChild(div);
            });

            // Spawns custom CSS-animated shapes
            shapeContainer.innerHTML = '';
            if (fest.name === "Diwali") {
                shapeContainer.innerHTML = `
                    <div class="diya-graphic animate-slide-up">
                        <div class="diya-flame" id="diya-flame-obj"></div>
                        <div class="diya-body"></div>
                    </div>
                `;
            } else if (fest.name === "Holi") {
                let html = '<div class="holi-powders">';
                const offsets = [
                    { x: -70, y: -60, color: 'rgba(239, 68, 68, 0.65)', dx: -40, dy: -30 },
                    { x: 70, y: -50, color: 'rgba(59, 130, 246, 0.65)', dx: 30, dy: -40 },
                    { x: -50, y: 60, color: 'rgba(16, 185, 129, 0.65)', dx: -30, dy: 40 },
                    { x: 50, y: 50, color: 'rgba(236, 72, 153, 0.65)', dx: 40, dy: 30 }
                ];
                offsets.forEach(offset => {
                    html += `
                        <div class="color-cloud" style="
                            left: calc(50% + ${offset.x}px); 
                            top: calc(50% + ${offset.y}px); 
                            background: ${offset.color};
                            width: ${Math.random() * 50 + 90}px;
                            height: ${Math.random() * 50 + 90}px;
                            --dx: ${offset.dx}px;
                            --dy: ${offset.dy}px;
                        "></div>
                    `;
                });
                html += '</div>';
                shapeContainer.innerHTML = html;
            } else if (fest.name === "Eid") {
                shapeContainer.innerHTML = `
                    <div class="eid-lantern">
                        <div class="lantern-cord"></div>
                        <div class="lantern-body"></div>
                    </div>
                `;
            } else if (fest.name === "Pongal") {
                shapeContainer.innerHTML = `
                    <div class="pongal-pot-graphic animate-slide-up">
                        <div class="pongal-foam">
                            <div class="foam-bubble"></div>
                            <div class="foam-bubble"></div>
                            <div class="foam-bubble"></div>
                        </div>
                        <div class="pongal-neck"></div>
                        <div class="pongal-pot"></div>
                    </div>
                `;
            } else if (fest.name === "Navratri") {
                shapeContainer.innerHTML = `
                    <div class="navratri-dandiya animate-slide-up" id="navratri-dandiya-sticks">
                        <div class="dandiya-stick left"></div>
                        <div class="dandiya-stick right"></div>
                    </div>
                `;
            } else if (fest.name === "Bihu") {
                shapeContainer.innerHTML = `
                    <div class="bihu-dhol animate-slide-up">
                        <div class="dhol-drum" id="bihu-dhol-drum"></div>
                    </div>
                `;
            }

            // Open overlay with animations
            overlay.classList.add('open');

            // Trigger scroll triggers
            setupScrollReveals();

            // Trigger themed particles spawning
            spawnThemedParticles(fest.name, particlesContainer);

            // Bind soundscape controllers
            audioBtn.classList.remove('playing');
            audioBtn.innerHTML = '<span class="audio-icon">ðŸ”Š</span> Listen to Soundscape';
            stopSoundscape();

            audioBtn.onclick = () => {
                if (audioBtn.classList.contains('playing')) {
                    audioBtn.classList.remove('playing');
                    audioBtn.innerHTML = '<span class="audio-icon">ðŸ”Š</span> Listen to Soundscape';
                    stopSoundscape();
                } else {
                    audioBtn.classList.add('playing');
                    audioBtn.innerHTML = '<span class="audio-icon">ðŸ”‡</span> Stop Soundscape';

                    let drumEl = null;
                    if (fest.name === "Bihu") {
                        drumEl = document.getElementById('bihu-dhol-drum');
                    } else if (fest.name === "Navratri") {
                        drumEl = document.getElementById('navratri-dandiya-sticks');
                    } else if (fest.name === "Diwali") {
                        drumEl = document.getElementById('diya-flame-obj');
                    }
                    playSoundscape(fest.name, drumEl);
                }
            };
        });

        festivalTimeline.appendChild(card);
    });

    backBtn.addEventListener('click', () => {
        overlay.classList.remove('open');
        particlesContainer.innerHTML = '';
        shapeContainer.innerHTML = '';
        stopSoundscape();
    });
}

export function setupScrollReveals() {
    const paragraphs = document.querySelectorAll('.story-paragraph');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    paragraphs.forEach(p => {
        p.classList.remove('reveal');
        observer.observe(p);
    });
}

export function spawnThemedParticles(festName, container) {
    container.innerHTML = '';

    if (festName === "Diwali") {
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'diya-particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.bottom = Math.random() * 50 + '%';
            p.style.animationDelay = Math.random() * 5 + 's';
            p.style.animationDuration = (Math.random() * 4 + 4) + 's';
            container.appendChild(p);
        }
        for (let i = 0; i < 15; i++) {
            const p = document.createElement('div');
            p.className = 'sparkle-particle';
            p.style.left = Math.random() * 80 + 10 + '%';
            p.style.top = Math.random() * 80 + 10 + '%';
            p.style.setProperty('--x', (Math.random() * 100 - 50) + 'px');
            p.style.setProperty('--y', (Math.random() * 100 - 50) + 'px');
            p.style.animationDelay = Math.random() * 2 + 's';
            container.appendChild(p);
        }
    } else if (festName === "Holi") {
        const colors = ['#ef4444', '#3b82f6', '#10b981', '#ec4899', '#f59e0b', '#8b5cf6'];
        for (let i = 0; i < 15; i++) {
            const p = document.createElement('div');
            p.className = 'splash-particle';
            p.style.left = Math.random() * 80 + 10 + '%';
            p.style.top = Math.random() * 80 + 10 + '%';
            const size = Math.random() * 30 + 15;
            p.style.width = size + 'px';
            p.style.height = size + 'px';
            p.style.background = colors[Math.floor(Math.random() * colors.length)];
            p.style.setProperty('--x', (Math.random() * 160 - 80) + 'px');
            p.style.setProperty('--y', (Math.random() * 160 - 80) + 'px');
            p.style.animationDelay = Math.random() * 3 + 's';
            container.appendChild(p);
        }
    } else if (festName === "Eid") {
        for (let i = 0; i < 25; i++) {
            const p = document.createElement('div');
            p.className = 'star-particle';
            p.innerText = 'â˜…';
            p.style.left = Math.random() * 100 + '%';
            p.style.top = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 3 + 's';
            p.style.animationDuration = (Math.random() * 2 + 2) + 's';
            container.appendChild(p);
        }
    } else if (festName === "Pongal") {
        for (let i = 0; i < 15; i++) {
            const p = document.createElement('div');
            p.className = 'steam-particle';
            p.style.left = (Math.random() * 40 + 30) + '%';
            p.style.bottom = '10%';
            p.style.setProperty('--x', (Math.random() * 40 - 20) + 'px');
            p.style.animationDelay = Math.random() * 3 + 's';
            container.appendChild(p);
        }
    } else if (festName === "Navratri" || festName === "Bihu") {
        for (let i = 0; i < 20; i++) {
            const p = document.createElement('div');
            p.className = 'leaf-particle';
            p.innerText = festName === "Bihu" ? 'ðŸƒ' : 'ðŸŒ¸';
            p.style.left = Math.random() * 100 + '%';
            p.style.setProperty('--x', (Math.random() * 80 - 40) + 'px');
            p.style.animationDelay = Math.random() * 5 + 's';
            p.style.animationDuration = (Math.random() * 4 + 5) + 's';
            container.appendChild(p);
        }
    }
}



// Attach to window for global inline HTML handlers
window.initCuisinePage = initCuisinePage;
window.initFestivalsPage = initFestivalsPage;
window.setupScrollReveals = setupScrollReveals;
window.spawnThemedParticles = spawnThemedParticles;
