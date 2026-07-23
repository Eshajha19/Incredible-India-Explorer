/**
 * ISRO Satellite Mission Simulator
 * Simulates ISRO space missions including Chandrayaan, Mangalyaan, Aditya-L1, and Gaganyaan.
 */

(function () {
    'use strict';

    const MISSIONS_DATA = [
        {
            id: 'chandrayaan3',
            name: 'Chandrayaan-3',
            type: 'LUNAR EXPLORATION',
            destination: 'Lunar South Pole (69.37°S, 32.35°E)',
            payloadMass: '3,900 kg (Propulsion + Lander + Rover)',
            launchDate: 'July 14, 2023',
            objective: 'Demonstrate soft landing on lunar surface and rover mobility',
            desc: 'India\'s historic 3rd lunar exploration mission which successfully achieved a soft landing near the Moon\'s uncharted South Pole.',
            correctRocket: 'LVM3-M4',
            fact: 'With Chandrayaan-3, India became the 4th country in the world to soft-land on the Moon and the 1st to land near the lunar South Pole. The landing site was named Shiv Shakti Point.',
            stages: ['Launch & Earth Orbit', 'Trans-Lunar Injection', 'Lunar Orbit Insertion', 'Lander Separation', 'Soft Landing at South Pole']
        },
        {
            id: 'mangalyaan',
            name: 'Mangalyaan (Mars Orbiter Mission)',
            type: 'INTERPLANETARY MISSION',
            destination: 'Martian Orbit',
            payloadMass: '1,337 kg (Orbiter)',
            launchDate: 'November 5, 2013',
            objective: 'Explore Mars surface features, morphology, mineralogy & atmosphere',
            desc: 'ISRO\'s maiden interplanetary mission to Mars, launched aboard PSLV-XL, reaching Martian orbit on its very first attempt.',
            correctRocket: 'PSLV-XL',
            fact: 'India became the 1st nation in the world to reach Martian orbit on its maiden attempt, and at a fraction of the cost ($74M) of typical interplanetary missions.',
            stages: ['Earth Orbit Raising', 'Trans-Mars Injection', 'Helicentric Cruise', 'Mars Orbit Insertion']
        },
        {
            id: 'adityal1',
            name: 'Aditya-L1',
            type: 'SOLAR OBSERVATORY',
            destination: 'Sun-Earth Lagrange Point 1 (1.5 million km)',
            payloadMass: '1,475 kg (7 Science Payloads)',
            launchDate: 'September 2, 2023',
            objective: 'Observe solar corona, chromosphere, solar wind & coronal mass ejections',
            desc: 'India\'s first dedicated solar space observatory stationed in a halo orbit around Lagrange Point L1.',
            correctRocket: 'PSLV-C57',
            fact: 'Stationed at L1, Aditya-L1 has an unobstructed view of the Sun without any occultation/eclipses, monitoring space weather in real-time.',
            stages: ['Earth Injection', 'Cruise Phase to L1', 'Halo Orbit Insertion']
        },
        {
            id: 'gaganyaan',
            name: 'Gaganyaan (Crewed Spaceflight)',
            type: 'HUMAN SPACEFLIGHT',
            destination: 'Low Earth Orbit (400 km)',
            payloadMass: '8,000 kg (Crew Module + Service Module)',
            launchDate: 'Target 2025 (Test flights underway)',
            objective: 'Demonstrate human spaceflight capability by sending 3 astronauts for 3 days',
            desc: 'ISRO\'s flagship human spaceflight programme to carry astronauts (Gaganyatri) safely to Low Earth Orbit and return them to Earth.',
            correctRocket: 'LVM3-Gaganyaan',
            fact: 'Gaganyaan includes advanced Crew Escape Systems (CES) and environmental control life support systems (ECLSS) developed indigenously in India.',
            stages: ['Launch & Ascent', 'Orbital Insertion (400 km)', 'In-orbit Experiments', 'Retro-burn & De-orbit', 'Parachute Splashdown']
        }
    ];

    const ROCKETS_DATA = [
        { id: 'PSLV-XL', name: 'PSLV-XL (C25/C57)', capacity: 'Up to 1,800 kg', desc: 'Workhorse launch vehicle with 6 extended solid strap-on motors.' },
        { id: 'LVM3-M4', name: 'LVM3 (GSLV Mk III)', capacity: 'Up to 4,000 kg GTO', desc: 'Heavy-lift launch vehicle equipped with indigenous CE-20 cryogenic engine.' },
        { id: 'PSLV-C57', name: 'PSLV-C57 Solar Variant', capacity: '1,500 kg to L1', desc: 'Specialized PSLV variant tailored for high-energy solar transfer orbit.' },
        { id: 'LVM3-Gaganyaan', name: 'Human Rated LVM3 (HLVM3)', capacity: '8,000 kg LEO', desc: 'Human-rated heavy-lift rocket with enhanced safety margins and Crew Escape System.' }
    ];

    function init() {
        const missionSelect = document.getElementById('mission-select');
        const btnStart = document.getElementById('btn-start-mission');
        const rocketGrid = document.getElementById('rocket-options-grid');
        const launchCard = document.getElementById('launch-control-card');
        const resultCard = document.getElementById('mission-result-card');
        const btnExecute = document.getElementById('btn-execute-launch');
        const btnRetry = document.getElementById('btn-retry-mission');

        let activeMission = MISSIONS_DATA[0];
        let selectedRocket = null;

        function populateMissions() {
            if (!missionSelect) return;
            missionSelect.innerHTML = MISSIONS_DATA.map(m => `<option value="${m.id}">${m.name}</option>`).join('');
        }

        function updateMissionOverview(mission) {
            activeMission = mission;

            document.getElementById('mission-type-badge').textContent = mission.type;
            document.getElementById('mission-title').textContent = mission.name;
            document.getElementById('mission-desc').textContent = mission.desc;
            document.getElementById('spec-destination').textContent = mission.destination;
            document.getElementById('spec-payload').textContent = mission.payloadMass;
            document.getElementById('spec-launch-date').textContent = mission.launchDate;
            document.getElementById('spec-objective').textContent = mission.objective;

            // Reset cards
            selectedRocket = null;
            if (launchCard) launchCard.classList.add('hidden');
            if (resultCard) resultCard.classList.add('hidden');

            renderRockets();
        }

        function renderRockets() {
            if (!rocketGrid) return;
            rocketGrid.innerHTML = ROCKETS_DATA.map(r => `
                <div class="rocket-card ${selectedRocket === r.id ? 'selected' : ''}" data-id="${r.id}">
                    <i class="fa-solid fa-rocket"></i>
                    <h4>${r.name}</h4>
                    <p>Payload Capacity: ${r.capacity}</p>
                    <p style="font-size:0.8rem; margin-top:5px;">${r.desc}</p>
                </div>
            `).join('');

            rocketGrid.querySelectorAll('.rocket-card').forEach(card => {
                card.addEventListener('click', () => {
                    selectedRocket = card.dataset.id;
                    renderRockets();
                    if (launchCard) {
                        launchCard.classList.remove('hidden');
                        renderTimelineVisual();
                        launchCard.scrollIntoView({ behavior: 'smooth' });
                    }
                });
            });
        }

        function renderTimelineVisual() {
            const visual = document.getElementById('timeline-visual');
            if (!visual) return;

            visual.innerHTML = activeMission.stages.map((stage, idx) => `
                <div class="stage-node ${idx === 0 ? 'active' : ''}" data-stage="${idx}">
                    Step ${idx + 1}: ${stage}
                </div>
            `).join('');
        }

        function executeLaunchSequence() {
            const isCorrectRocket = (selectedRocket === activeMission.correctRocket);
            const statusText = document.getElementById('telemetry-status');
            const progressFill = document.getElementById('flight-progress-fill');

            btnExecute.disabled = true;
            let progress = 0;
            let currentStageIdx = 0;

            const interval = setInterval(() => {
                progress += 20;
                if (progressFill) progressFill.style.width = progress + '%';

                if (currentStageIdx < activeMission.stages.length) {
                    const stageName = activeMission.stages[currentStageIdx];
                    if (statusText) statusText.textContent = `[TELEMETRY OK] Stage ${currentStageIdx + 1}: ${stageName}...`;

                    document.querySelectorAll('.stage-node').forEach((node, i) => {
                        if (i === currentStageIdx) {
                            node.classList.add('active');
                        } else if (i < currentStageIdx) {
                            node.classList.remove('active');
                            node.classList.add('completed');
                        }
                    });
                    currentStageIdx++;
                }

                if (progress >= 100) {
                    clearInterval(interval);
                    btnExecute.disabled = false;
                    showMissionResult(isCorrectRocket);
                }
            }, 800);
        }

        function showMissionResult(success) {
            if (!resultCard) return;

            resultCard.classList.remove('hidden');
            resultCard.scrollIntoView({ behavior: 'smooth' });

            const icon = document.getElementById('result-icon-wrap');
            const title = document.getElementById('result-title');
            const msg = document.getElementById('result-message');
            const fact = document.getElementById('fact-text');

            if (success) {
                if (icon) icon.innerHTML = `<i class="fa-solid fa-circle-check" style="color:var(--isro-green);"></i>`;
                if (title) title.textContent = `🎉 ${activeMission.name} Mission Success!`;
                if (msg) msg.textContent = `Excellent work! You selected the correct launch vehicle (${selectedRocket}) for ${activeMission.name}.`;
            } else {
                if (icon) icon.innerHTML = `<i class="fa-solid fa-circle-exclamation" style="color:var(--isro-saffron);"></i>`;
                if (title) title.textContent = `⚠️ Launch Anomaly (Sub-optimal Rocket Choice)`;
                if (msg) msg.textContent = `You selected ${selectedRocket}, but ISRO used ${activeMission.correctRocket} for this mission requirement!`;
            }

            if (fact) fact.textContent = activeMission.fact;
        }

        missionSelect?.addEventListener('change', () => {
            const chosen = MISSIONS_DATA.find(m => m.id === missionSelect.value);
            if (chosen) updateMissionOverview(chosen);
        });

        btnStart?.addEventListener('click', () => {
            document.getElementById('rocket-challenge-card')?.scrollIntoView({ behavior: 'smooth' });
        });

        btnExecute?.addEventListener('click', executeLaunchSequence);

        btnRetry?.addEventListener('click', () => {
            const currentIdx = MISSIONS_DATA.findIndex(m => m.id === activeMission.id);
            const nextIdx = (currentIdx + 1) % MISSIONS_DATA.length;
            missionSelect.value = MISSIONS_DATA[nextIdx].id;
            updateMissionOverview(MISSIONS_DATA[nextIdx]);
            document.getElementById('mission-overview-card')?.scrollIntoView({ behavior: 'smooth' });
        });

        populateMissions();
        updateMissionOverview(MISSIONS_DATA[0]);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
