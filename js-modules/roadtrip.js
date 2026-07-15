function initRoadTripFlipCards() {
    document.querySelectorAll('.roadtrip-flip-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const flipCard = btn.closest('.roadtrip-card-flip');
            flipCard.classList.toggle('flipped');
        });
    });

    document.querySelectorAll('.roadtrip-card-back').forEach(back => {
        back.addEventListener('click', () => {
            back.closest('.roadtrip-card-flip').classList.remove('flipped');
        });
    });
}
