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

function initCuisinePage() {
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
                    { title: "2. Marination & Sauté", text: `Mix the spices with the base ingredients. Slowly cook the ${ingredientsList.length > 2 ? ingredientsList[2] : "spices"} to release the aromas.` },
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
                    btnNextStep.innerText = "Finish 🎉";
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
