/* ==========================================================================
    Road trip card flip function , travel.html
   ========================================================================== */
export function initRoadTripFlipCards() {
    document.querySelectorAll('.roadtrip-flip-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const flipCard = btn.closest('.roadtrip-card-flip');
            if (flipCard) flipCard.classList.toggle('flipped');
        });
    });

    document.querySelectorAll('.roadtrip-card-back').forEach(back => {
        back.addEventListener('click', () => {
            const flipCard = back.closest('.roadtrip-card-flip');
            if (flipCard) flipCard.classList.remove('flipped');
        });
    });
}

// Attach to window for global inline HTML handlers
window.initRoadTripFlipCards = initRoadTripFlipCards;
