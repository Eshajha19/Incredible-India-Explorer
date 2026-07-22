
document.addEventListener("DOMContentLoaded", () => {
  const symbols = [{"id": "emblem", "name": "National Emblem", "symbol": "Lion Capital of Ashoka", "emoji": "🦁", "category": "National Symbol", "fact": "The National Emblem of India is adapted from the Lion Capital of Ashoka at Sarnath."}, {"id": "animal", "name": "National Animal", "symbol": "Royal Bengal Tiger", "emoji": "🐅", "category": "National Symbol", "fact": "The tiger represents strength, grace, and India's wildlife heritage."}, {"id": "bird", "name": "National Bird", "symbol": "Indian Peacock", "emoji": "🦚", "category": "National Symbol", "fact": "The Indian Peacock is known for its colourful feathers and cultural significance."}, {"id": "flower", "name": "National Flower", "symbol": "Lotus", "emoji": "🪷", "category": "National Symbol", "fact": "The lotus is associated with purity, resilience, and Indian art traditions."}, {"id": "tree", "name": "National Tree", "symbol": "Banyan Tree", "emoji": "🌳", "category": "National Symbol", "fact": "The banyan tree is known for its wide canopy and long life."}, {"id": "fruit", "name": "National Fruit", "symbol": "Mango", "emoji": "🥭", "category": "National Symbol", "fact": "The mango is often called the king of fruits and has a long history in India."}, {"id": "river", "name": "National River", "symbol": "Ganga", "emoji": "🌊", "category": "National Symbol", "fact": "The Ganga is deeply connected with Indian civilisation, ecology, and spirituality."}, {"id": "aquatic", "name": "National Aquatic Animal", "symbol": "Ganges River Dolphin", "emoji": "🐬", "category": "National Symbol", "fact": "The Ganges River Dolphin is an endangered freshwater dolphin found in river systems."}];
  const bestKey = "incredible-india-national-symbols-memory-best";

  const grid = document.getElementById("memory-grid");
  const movesEl = document.getElementById("move-count");
  const timerEl = document.getElementById("timer-count");
  const matchedEl = document.getElementById("matched-count");
  const complete = document.getElementById("complete-card");
  const modal = document.getElementById("fact-modal");

  let deck = [];
  let flipped = [];
  let matched = 0;
  let moves = 0;
  let seconds = 0;
  let timer = null;
  let started = false;

  const escapeHtml = (value) => String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

  const shuffle = (items) => [...items].sort(() => Math.random() - 0.5);
  const formatTime = (totalSeconds) => {
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
    const secs = String(totalSeconds % 60).padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  function readBest() {
    try {
      return JSON.parse(localStorage.getItem(bestKey) || "{}");
    } catch {
      return {};
    }
  }

  function updateBestHero() {
    const best = readBest();
    document.getElementById("best-moves").textContent = best.moves || "--";
    document.getElementById("best-time").textContent = best.time ? formatTime(best.time) : "--";
  }

  function buildDeck() {
    return shuffle(symbols.flatMap((item) => [
      { ...item, cardId: `${item.id}-icon`, kind: "icon" },
      { ...item, cardId: `${item.id}-name`, kind: "name" },
    ]));
  }

  function cardHtml(card) {
    const backContent = card.kind === "icon"
      ? `<span class="emoji">${escapeHtml(card.emoji)}</span><strong>${escapeHtml(card.symbol)}</strong>`
      : `<strong>${escapeHtml(card.name)}</strong><small>${escapeHtml(card.symbol)}</small>`;

    return `
      <button class="memory-card" type="button" data-card-id="${escapeHtml(card.cardId)}" data-match-id="${escapeHtml(card.id)}">
        <span class="card-inner">
          <span class="card-face card-front"><span>?</span><strong>Flip</strong></span>
          <span class="card-face card-back">${backContent}</span>
        </span>
      </button>
    `;
  }

  function startTimer() {
    if (started) return;
    started = true;
    timer = setInterval(() => {
      seconds += 1;
      timerEl.textContent = formatTime(seconds);
    }, 1000);
  }

  function render() {
    grid.innerHTML = deck.map(cardHtml).join("");
    grid.querySelectorAll(".memory-card").forEach((button) => {
      button.addEventListener("click", () => flip(button));
    });

    movesEl.textContent = moves;
    timerEl.textContent = formatTime(seconds);
    matchedEl.textContent = `${matched}/${symbols.length}`;
    document.getElementById("pair-count").textContent = symbols.length;
    updateBestHero();
  }

  function flip(button) {
    if (button.disabled || flipped.length === 2 || button.classList.contains("is-flipped")) return;

    startTimer();
    button.classList.add("is-flipped");
    flipped.push(button);

    if (flipped.length === 2) {
      checkMatch();
    }
  }

  function checkMatch() {
    moves += 1;
    movesEl.textContent = moves;

    const [first, second] = flipped;
    const isMatch = first.dataset.matchId === second.dataset.matchId && first.dataset.cardId !== second.dataset.cardId;

    if (isMatch) {
      matched += 1;
      [first, second].forEach((card) => {
        card.classList.add("is-matched");
        card.disabled = true;
      });

      matchedEl.textContent = `${matched}/${symbols.length}`;
      showFact(first.dataset.matchId);
      flipped = [];

      if (matched === symbols.length) {
        finishGame();
      }
    } else {
      setTimeout(() => {
        first.classList.remove("is-flipped");
        second.classList.remove("is-flipped");
        flipped = [];
      }, 850);
    }
  }

  function showFact(id) {
    const item = symbols.find((symbol) => symbol.id === id);
    if (!item) return;

    document.getElementById("fact-emoji").textContent = item.emoji;
    document.getElementById("fact-title").textContent = item.name;
    document.getElementById("fact-text").textContent = item.fact;
    modal.hidden = false;
  }

  function finishGame() {
    clearInterval(timer);
    const best = readBest();

    if (!best.moves || moves < best.moves || (moves === best.moves && seconds < best.time)) {
      localStorage.setItem(bestKey, JSON.stringify({ moves, time: seconds }));
    }

    updateBestHero();
    complete.className = "complete-card visible";
    complete.innerHTML = `<strong>Game complete!</strong><br>You matched all ${symbols.length} pairs in ${moves} moves and ${formatTime(seconds)}.`;
  }

  function restart() {
    clearInterval(timer);
    deck = buildDeck();
    flipped = [];
    matched = 0;
    moves = 0;
    seconds = 0;
    timer = null;
    started = false;
    complete.className = "complete-card";
    complete.innerHTML = "";
    render();
  }

  document.querySelectorAll("[data-close-fact]").forEach((button) => {
    button.addEventListener("click", () => {
      modal.hidden = true;
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") modal.hidden = true;
  });

  document.getElementById("restart-game").addEventListener("click", restart);

  restart();

  window.NationalSymbolsMemory = {
    restart,
    symbols: () => [...symbols],
  };
});
