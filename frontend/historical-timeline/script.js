// ---------- Era Data (7 major periods of UP history) ----------
const allEras = [
  {
    id: "ramayana",
    name: "Ramayana Era",
    icon: "🏹",
    period: "Ancient / Mythic Age",
    description: "The legendary age associated with Lord Rama, centred around the ancient city of Ayodhya, believed to be his birthplace.",
    facts: [
      "Ayodhya, located in present-day Uttar Pradesh, is traditionally regarded as the birthplace of Lord Rama.",
      "The epic Ramayana describes Ayodhya as the capital of the Kosala kingdom.",
      "The region has been a major pilgrimage site for millennia, drawing devotees from across India."
    ],
    legacy: "Ayodhya remains one of India's most significant spiritual and cultural centres, with the Ramayana's influence still shaping regional festivals and traditions."
  },
  {
    id: "buddha",
    name: "Age of the Buddha",
    icon: "🪷",
    period: "6th Century BCE",
    description: "The period when Gautama Buddha traveled and taught across the Gangetic plains, including regions now part of Uttar Pradesh.",
    facts: [
      "Sarnath, near Varanasi, is where the Buddha is believed to have delivered his first sermon after attaining enlightenment.",
      "The Kosala kingdom, which included parts of present-day UP, was one of the major centres where Buddhism first spread.",
      "Ancient stupas and monastic remains from this era have been excavated across the state."
    ],
    legacy: "Sarnath remains one of the four most sacred Buddhist pilgrimage sites in the world, drawing visitors and scholars from across the globe."
  },
  {
    id: "mauryan",
    name: "Mauryan Empire",
    icon: "🦁",
    period: "4th–2nd Century BCE",
    description: "A period of centralised imperial rule under the Mauryan dynasty, including the reign of Emperor Ashoka, that shaped much of ancient India.",
    facts: [
      "Emperor Ashoka erected pillars and edicts across the region, several of which survive in Uttar Pradesh today.",
      "The Mauryan Empire connected the Gangetic plains through an extensive administrative and trade network.",
      "Ashokan inscriptions found in the state provide some of the earliest written records of governance in Indian history."
    ],
    legacy: "Ashokan pillars and edicts discovered across UP remain important archaeological windows into one of India's earliest centralised empires."
  },
  {
    id: "mughal",
    name: "Mughal Period",
    icon: "🕌",
    period: "16th–18th Century",
    description: "The era following Babur's establishment of the Mughal Empire in 1526, which left behind some of India's most iconic architecture across the region.",
    facts: [
      "The Mughal Empire was established after Babur's victory at the First Battle of Panipat in 1526.",
      "Agra served as a key Mughal capital, home to monuments including Agra Fort and Fatehpur Sikri.",
      "The Taj Mahal, one of the most recognised monuments in the world, was built in Agra during this period."
    ],
    legacy: "Mughal-era monuments across Agra and Fatehpur Sikri remain UNESCO World Heritage Sites and among India's most visited landmarks."
  },
  {
    id: "awadh",
    name: "Nawabs of Awadh",
    icon: "👑",
    period: "1722 – 1856",
    description: "A period of semi-autonomous rule by the Nawabs of Awadh, who blended Persianate courtly culture with local traditions, centred in Lucknow.",
    facts: [
      "Saadat Ali Khan was appointed the first Nawab of Awadh in 1722, establishing a dynasty that ruled for over a century.",
      "Lucknow flourished as a centre of art, poetry, cuisine, and architecture under Nawabi patronage.",
      "The annexation of Awadh by the British East India Company in 1856 became one of the key triggers for the events of 1857."
    ],
    legacy: "Lucknow's distinctive Awadhi culture, cuisine, and architecture continue to define the city's identity today."
  },
  {
    id: "revolt1857",
    name: "The 1857 Revolt",
    icon: "⚔️",
    period: "1857 – 1858",
    description: "A landmark uprising against British rule that began in Meerut and spread rapidly across the region, now regarded by many as India's First War of Independence.",
    facts: [
      "The revolt began on 10 May 1857 when sepoys in Meerut rebelled, and within months it spread to more than 25 cities.",
      "Begum Hazrat Mahal led resistance forces in Lucknow after the annexation of Awadh.",
      "Uprisings also took place in Kanpur, Jhansi, Bareilly, and several other towns across the region."
    ],
    legacy: "The 1857 Revolt is remembered as a foundational moment in India's freedom struggle, with sites across UP preserving its memory today."
  },
  {
    id: "modern",
    name: "Modern Uttar Pradesh",
    icon: "🏙️",
    period: "1937 – Present",
    description: "The formation and evolution of the modern state, from the North-Western Provinces to today's Uttar Pradesh, India's most populous state.",
    facts: [
      "The region was formally established as the United Provinces of Agra and Oudh in 1937, later renamed Uttar Pradesh after independence.",
      "Uttar Pradesh is today India's most populous state, with a rich blend of ancient heritage and rapid modern development.",
      "The state continues to be a major centre of politics, culture, agriculture, and pilgrimage tourism in India."
    ],
    legacy: "Modern Uttar Pradesh stands as a bridge between millennia of history and a rapidly developing future, home to some of India's most visited heritage sites."
  }
];

// ---------- DOM References ----------
const eraJumpNav = document.getElementById("eraJumpNav");
const timelineTrack = document.getElementById("timelineTrack");

const eraModalOverlay = document.getElementById("eraModalOverlay");
const eraModalClose = document.getElementById("eraModalClose");
const modalEraIcon = document.getElementById("modalEraIcon");
const modalEraPeriod = document.getElementById("modalEraPeriod");
const modalEraTitle = document.getElementById("modalEraTitle");
const modalEraDesc = document.getElementById("modalEraDesc");
const modalEraFacts = document.getElementById("modalEraFacts");
const modalEraLegacy = document.getElementById("modalEraLegacy");

let lastFocusedElement = null;

// ---------- Build Era Jump Nav ----------
function buildEraJumpNav() {
  allEras.forEach(era => {
    const btn = document.createElement("button");
    btn.className = "era-jump-btn";
    btn.dataset.id = era.id;
    btn.textContent = era.name;
    btn.addEventListener("click", () => {
      const target = document.getElementById(`era-${era.id}`);
      if (target) target.scrollIntoView({ behavior: "smooth", block: "center" });
    });
    eraJumpNav.appendChild(btn);
  });
}

// ---------- Build Timeline ----------
function buildTimeline() {
  allEras.forEach((era, index) => {
    const side = index % 2 === 0 ? "left" : "right";

    const item = document.createElement("div");
    item.className = `era-item ${side}`;
    item.id = `era-${era.id}`;

    item.innerHTML = `
      <div class="era-node">${era.icon}</div>
      <div class="era-card" tabindex="0" role="button" aria-label="View details about ${era.name}">
        <span class="era-card-period">${era.period}</span>
        <h3 class="era-card-title">${era.name}</h3>
        <p class="era-card-desc">${era.description}</p>
        <span class="era-card-cta">Tap to explore &rarr;</span>
      </div>
    `;

    const card = item.querySelector(".era-card");
    card.addEventListener("click", () => openModal(era, card));
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        openModal(era, card);
      }
    });

    timelineTrack.appendChild(item);
  });
}

// ---------- Scroll Fade-in Animation ----------
function setupScrollAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  document.querySelectorAll(".era-item").forEach(item => observer.observe(item));
}

// ---------- Active Nav Highlight on Scroll ----------
function setupActiveNavHighlight() {
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const eraId = entry.target.id.replace("era-", "");
        document.querySelectorAll(".era-jump-btn").forEach(btn => {
          btn.classList.toggle("active", btn.dataset.id === eraId);
        });
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll(".era-item").forEach(item => navObserver.observe(item));
}

// ---------- Modal ----------
function openModal(era, triggerEl) {
  lastFocusedElement = triggerEl;

  modalEraIcon.textContent = era.icon;
  modalEraPeriod.textContent = era.period;
  modalEraTitle.textContent = era.name;
  modalEraDesc.textContent = era.description;
  modalEraLegacy.textContent = era.legacy;

  modalEraFacts.innerHTML = "";
  era.facts.forEach(fact => {
    const li = document.createElement("li");
    li.textContent = fact;
    modalEraFacts.appendChild(li);
  });

  eraModalOverlay.classList.add("active");
  eraModalClose.focus();
}

function closeModal() {
  eraModalOverlay.classList.remove("active");
  if (lastFocusedElement) lastFocusedElement.focus();
}

eraModalClose.addEventListener("click", closeModal);
eraModalOverlay.addEventListener("click", (e) => {
  if (e.target === eraModalOverlay) closeModal();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && eraModalOverlay.classList.contains("active")) closeModal();
});

// ---------- Init ----------
buildEraJumpNav();
buildTimeline();
setupScrollAnimation();
setupActiveNavHighlight();