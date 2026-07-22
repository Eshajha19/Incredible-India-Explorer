document.addEventListener("DOMContentLoaded", () => {
  const universities = [
  {
    "id": "nalanda",
    "name": "Nalanda",
    "period": "5th century CE – c. 1200 CE",
    "location": "Nalanda, Bihar",
    "region": "east",
    "overview": "One of the most renowned monastic universities of ancient India, Nalanda attracted students and scholars from across Asia and became a major centre of Buddhist learning and intellectual exchange.",
    "subjects": [
      "Buddhist Philosophy",
      "Logic",
      "Grammar",
      "Medicine",
      "Astronomy",
      "Mathematics"
    ],
    "scholars": [
      "Xuanzang",
      "Yijing",
      "Shilabhadra",
      "Dharmapala"
    ],
    "legacy": "Its residential monastic model, libraries, debate culture, and international scholarly community made it one of the most influential centres of learning in Asia.",
    "image": "assets/heritage_ruins.png",
    "gallery": [
      "assets/heritage_ruins.png",
      "assets/travel_hidden.png",
      "assets/hero_banner.png"
    ],
    "search": "nalanda 5th century ce – c. 1200 ce nalanda, bihar one of the most renowned monastic universities of ancient india, nalanda attracted students and scholars from across asia and became a major centre of buddhist learning and intellectual exchange. its residential monastic model, libraries, debate culture, and international scholarly community made it one of the most influential centres of learning in asia. buddhist philosophy logic grammar medicine astronomy mathematics xuanzang yijing shilabhadra dharmapala"
  },
  {
    "id": "takshashila",
    "name": "Takshashila",
    "period": "c. 6th century BCE onward",
    "location": "Taxila region, present-day Pakistan",
    "region": "northwest",
    "overview": "Takshashila was an early and influential centre of advanced learning where students studied under individual teachers across a wide range of disciplines.",
    "subjects": [
      "Vedas",
      "Grammar",
      "Medicine",
      "Politics",
      "Military Arts",
      "Philosophy"
    ],
    "scholars": [
      "Panini",
      "Kautilya",
      "Jivaka"
    ],
    "legacy": "Its reputation for specialised study and teacher-led learning connected intellectual traditions across South and Central Asia.",
    "image": "assets/heritage_forts.png",
    "gallery": [
      "assets/heritage_forts.png",
      "assets/travel_mountains.png",
      "assets/heritage_ruins.png"
    ],
    "search": "takshashila c. 6th century bce onward taxila region, present-day pakistan takshashila was an early and influential centre of advanced learning where students studied under individual teachers across a wide range of disciplines. its reputation for specialised study and teacher-led learning connected intellectual traditions across south and central asia. vedas grammar medicine politics military arts philosophy panini kautilya jivaka"
  },
  {
    "id": "vikramashila",
    "name": "Vikramashila",
    "period": "8th – 12th century CE",
    "location": "Antichak, Bihar",
    "region": "east",
    "overview": "Founded under the Pala rulers, Vikramashila became one of the leading Buddhist centres of higher learning in eastern India.",
    "subjects": [
      "Buddhist Philosophy",
      "Tantric Studies",
      "Logic",
      "Grammar",
      "Metaphysics"
    ],
    "scholars": [
      "Atiśa Dīpaṅkara",
      "Ratnākaraśānti",
      "Jñānaśrīmitra"
    ],
    "legacy": "The university played an important role in the transmission of Buddhist scholarship to Tibet and other parts of Asia.",
    "image": "assets/heritage_temples.png",
    "gallery": [
      "assets/heritage_temples.png",
      "assets/heritage_ruins.png",
      "assets/travel_hidden.png"
    ],
    "search": "vikramashila 8th – 12th century ce antichak, bihar founded under the pala rulers, vikramashila became one of the leading buddhist centres of higher learning in eastern india. the university played an important role in the transmission of buddhist scholarship to tibet and other parts of asia. buddhist philosophy tantric studies logic grammar metaphysics atiśa dīpaṅkara ratnākaraśānti jñānaśrīmitra"
  },
  {
    "id": "vallabhi",
    "name": "Vallabhi",
    "period": "6th – 12th century CE",
    "location": "Vallabhipur, Gujarat",
    "region": "west",
    "overview": "Vallabhi emerged as a major centre of Buddhist and secular education under the Maitraka rulers and was known for practical as well as philosophical studies.",
    "subjects": [
      "Buddhist Studies",
      "Administration",
      "Law",
      "Economics",
      "Politics",
      "Literature"
    ],
    "scholars": [
      "Gunamati",
      "Sthiramati"
    ],
    "legacy": "Its curriculum was associated with both religious scholarship and training for governance and administration.",
    "image": "assets/heritage_stepwells.png",
    "gallery": [
      "assets/heritage_stepwells.png",
      "assets/heritage_forts.png",
      "assets/travel_deserts.png"
    ],
    "search": "vallabhi 6th – 12th century ce vallabhipur, gujarat vallabhi emerged as a major centre of buddhist and secular education under the maitraka rulers and was known for practical as well as philosophical studies. its curriculum was associated with both religious scholarship and training for governance and administration. buddhist studies administration law economics politics literature gunamati sthiramati"
  },
  {
    "id": "odantapuri",
    "name": "Odantapuri",
    "period": "8th – 12th century CE",
    "location": "Bihar Sharif, Bihar",
    "region": "east",
    "overview": "Odantapuri was a major Pala-period Buddhist monastic university and is regarded as one of the important learning centres of eastern India.",
    "subjects": [
      "Buddhist Philosophy",
      "Logic",
      "Grammar",
      "Scriptural Studies",
      "Debate"
    ],
    "scholars": [
      "Associated Pala-era monastic scholars"
    ],
    "legacy": "It formed part of a wider network of major Buddhist learning institutions in eastern India.",
    "image": "assets/heritage_ruins.png",
    "gallery": [
      "assets/heritage_ruins.png",
      "assets/heritage_temples.png",
      "assets/travel_forests.png"
    ],
    "search": "odantapuri 8th – 12th century ce bihar sharif, bihar odantapuri was a major pala-period buddhist monastic university and is regarded as one of the important learning centres of eastern india. it formed part of a wider network of major buddhist learning institutions in eastern india. buddhist philosophy logic grammar scriptural studies debate associated pala-era monastic scholars"
  },
  {
    "id": "jagaddala",
    "name": "Jagaddala",
    "period": "11th – 12th century CE",
    "location": "Varendra region, Bengal",
    "region": "east",
    "overview": "Jagaddala was a later Pala-era Buddhist centre of scholarship known for Sanskrit learning, translation activity, and connections with Tibetan Buddhist traditions.",
    "subjects": [
      "Buddhist Philosophy",
      "Sanskrit",
      "Translation",
      "Logic",
      "Tantric Studies"
    ],
    "scholars": [
      "Vibhūticandra",
      "Dānaśīla"
    ],
    "legacy": "It contributed to the preservation and transmission of Buddhist texts and scholarly traditions during the later Pala period.",
    "image": "assets/travel_forests.png",
    "gallery": [
      "assets/travel_forests.png",
      "assets/heritage_ruins.png",
      "assets/travel_hidden.png"
    ],
    "search": "jagaddala 11th – 12th century ce varendra region, bengal jagaddala was a later pala-era buddhist centre of scholarship known for sanskrit learning, translation activity, and connections with tibetan buddhist traditions. it contributed to the preservation and transmission of buddhist texts and scholarly traditions during the later pala period. buddhist philosophy sanskrit translation logic tantric studies vibhūticandra dānaśīla"
  }
];
  const fallbackImage = "assets/hero_banner.png";

  const grid = document.getElementById("university-grid");
  const searchInput = document.getElementById("university-search");
  const regionFilter = document.getElementById("region-filter");
  const subjectFilter = document.getElementById("subject-filter");
  const status = document.getElementById("result-status");
  const clearButton = document.getElementById("clear-filters");
  const emptyState = document.getElementById("empty-state");
  const emptyReset = document.getElementById("empty-reset");

  const modal = document.getElementById("university-modal");
  const modalClose = document.getElementById("modal-close");
  const modalImage = document.getElementById("modal-image");
  const modalCounter = document.getElementById("modal-counter");

  let activeUniversity = null;
  let imageIndex = 0;
  let lastFocus = null;

  const escapeHtml = (value) => String(value)
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");

  [...new Set(universities.flatMap(u => u.subjects))]
    .sort()
    .forEach(subject => {
      const option = document.createElement("option");
      option.value = subject;
      option.textContent = subject;
      subjectFilter.append(option);
    });

  function createCard(u) {
    const card = document.createElement("article");
    card.className = "university-card";
    card.dataset.id = u.id;

    card.innerHTML = `
      <div class="university-media">
        <img src="${escapeHtml(u.image)}" alt="${escapeHtml(u.name)}" loading="lazy">
        <span class="period-badge">${escapeHtml(u.period)}</span>
        <span class="region-badge">${escapeHtml(u.region)}</span>
        <button type="button" class="explore-button" data-id="${escapeHtml(u.id)}">
          Explore details
        </button>
      </div>
      <div class="university-body">
        <h3>${escapeHtml(u.name)}</h3>
        <p class="location">${escapeHtml(u.location)}</p>
        <p class="overview">${escapeHtml(u.overview)}</p>
        <div class="subject-preview">
          ${u.subjects.slice(0,3).map(subject =>
            `<span class="subject-chip">${escapeHtml(subject)}</span>`
          ).join("")}
        </div>
      </div>`;

    const img = card.querySelector("img");
    img.addEventListener("error", () => img.src = fallbackImage, {once:true});
    return card;
  }

  grid.replaceChildren(...universities.map(createCard));
  document.getElementById("hero-count").textContent = universities.length;

  function filterUniversities() {
    const q = searchInput.value.trim().toLowerCase();
    const region = regionFilter.value;
    const subject = subjectFilter.value;

    const visible = universities.filter(u =>
      (!q || u.search.includes(q)) &&
      (region === "all" || u.region === region) &&
      (subject === "all" || u.subjects.includes(subject))
    );

    const ids = new Set(visible.map(u => u.id));

    document.querySelectorAll(".university-card").forEach(card => {
      card.hidden = !ids.has(card.dataset.id);
    });

    const active =
      q ||
      region !== "all" ||
      subject !== "all";

    status.textContent = active
      ? `Found ${visible.length} learning centre${visible.length === 1 ? "" : "s"}`
      : `Showing all ${visible.length} learning centres`;

    emptyState.classList.toggle("visible", visible.length === 0);
    grid.hidden = visible.length === 0;
  }

  function resetFilters() {
    searchInput.value = "";
    regionFilter.value = "all";
    subjectFilter.value = "all";
    filterUniversities();
    searchInput.focus();
  }

  function updateImage() {
    const images = activeUniversity.gallery;
    modalImage.src = images[imageIndex];
    modalImage.alt = `${activeUniversity.name} gallery image ${imageIndex + 1}`;
    modalImage.onerror = () => {
      modalImage.onerror = null;
      modalImage.src = fallbackImage;
    };
    modalCounter.textContent = `${imageIndex + 1} / ${images.length}`;
  }

  function populateList(containerId, values) {
    const container = document.getElementById(containerId);
    container.replaceChildren(
      ...values.map(value => {
        const span = document.createElement("span");
        span.textContent = value;
        return span;
      })
    );
  }

  function openModal(u, trigger) {
    activeUniversity = u;
    imageIndex = 0;
    lastFocus = trigger;

    document.getElementById("modal-location").textContent = u.location;
    document.getElementById("modal-title").textContent = u.name;
    document.getElementById("modal-overview").textContent = u.overview;
    document.getElementById("modal-period").textContent = u.period;
    document.getElementById("modal-legacy").textContent = u.legacy;

    populateList("modal-subjects", u.subjects);
    populateList("modal-scholars", u.scholars);

    updateImage();

    modal.hidden = false;
    document.body.classList.add("modal-open");
    modalClose.focus();
  }

  function closeModal() {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    activeUniversity = null;
    imageIndex = 0;

    if (lastFocus) {
      lastFocus.focus();
    }
  }

  function stepGallery(direction) {
    if (!activeUniversity) return;

    imageIndex =
      (imageIndex + direction + activeUniversity.gallery.length) %
      activeUniversity.gallery.length;

    updateImage();
  }

  searchInput.addEventListener("input", filterUniversities);
  regionFilter.addEventListener("change", filterUniversities);
  subjectFilter.addEventListener("change", filterUniversities);
  clearButton.addEventListener("click", resetFilters);
  emptyReset.addEventListener("click", resetFilters);

  grid.addEventListener("click", event => {
    const button = event.target.closest("[data-id]");
    if (!button) return;

    const university = universities.find(u => u.id === button.dataset.id);
    if (university) openModal(university, button);
  });

  modalClose.addEventListener("click", closeModal);
  document.getElementById("modal-prev").addEventListener("click", () => stepGallery(-1));
  document.getElementById("modal-next").addEventListener("click", () => stepGallery(1));

  modal.addEventListener("click", event => {
    if (event.target.matches("[data-close-modal]")) {
      closeModal();
    }
  });

  document.addEventListener("keydown", event => {
    if (modal.hidden) return;

    if (event.key === "Escape") closeModal();
    if (event.key === "ArrowLeft") stepGallery(-1);
    if (event.key === "ArrowRight") stepGallery(1);
  });

  filterUniversities();
});
