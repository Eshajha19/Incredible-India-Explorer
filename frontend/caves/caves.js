document.addEventListener("app:route-changed", () => {
    const fallbackImage = "assets/hero_banner.png";

    const caveSites = [
        {
            id: "ajanta",
            name: "Ajanta Caves",
            location: "Aurangabad district, Maharashtra",
            state: "Maharashtra",
            region: "west",
            period: "ancient",
            periodLabel: "2nd century BCE – 6th century CE",
            religions: ["buddhist"],
            traditionLabel: "Buddhist",
            dynasty: "Satavahana & Vakataka patronage",
            significance:
                "A celebrated complex of Buddhist prayer halls and monasteries, renowned for mural painting, sculpture, and narrative art.",
            search:
                "ajanta caves aurangabad maharashtra buddhist satavahana vakataka paintings murals chaitya vihara",
            images: [
                "assets/travel_hidden.png",
                "assets/travel_forests.png",
                "assets/travel_mountains.png"
            ]
        },
        {
            id: "ellora",
            name: "Ellora Caves",
            location: "Verul, Maharashtra",
            state: "Maharashtra",
            region: "west",
            period: "early-medieval",
            periodLabel: "6th – 10th century CE",
            religions: ["buddhist", "hindu", "jain"],
            traditionLabel: "Buddhist · Hindu · Jain",
            dynasty: "Kalachuri, Chalukya & Rashtrakuta phases",
            significance:
                "A vast multi-faith rock-cut complex whose monuments include monasteries, shrines, sculptural programs, and the monumental Kailasa temple.",
            search:
                "ellora caves verul maharashtra buddhist hindu jain kailasa kailasanatha rashtrakuta",
            images: [
                "assets/travel_mountains.png",
                "assets/travel_hidden.png",
                "assets/travel_deserts.png"
            ]
        },
        {
            id: "elephanta",
            name: "Elephanta Caves",
            location: "Elephanta Island, Mumbai",
            state: "Maharashtra",
            region: "west",
            period: "late-ancient",
            periodLabel: "c. 5th – 8th century CE",
            religions: ["hindu"],
            traditionLabel: "Hindu",
            dynasty: "Early medieval western Deccan",
            significance:
                "An island cave complex centred on monumental Shaiva sculpture, including the iconic three-faced image commonly known as Trimurti.",
            search:
                "elephanta caves island mumbai maharashtra hindu shaiva shiva trimurti sculpture",
            images: [
                "assets/travel_islands.png",
                "assets/travel_hidden.png",
                "assets/travel_beaches.png"
            ]
        },
        {
            id: "badami",
            name: "Badami Cave Temples",
            location: "Badami, Karnataka",
            state: "Karnataka",
            region: "south",
            period: "late-ancient",
            periodLabel: "6th – 7th century CE",
            religions: ["hindu", "jain"],
            traditionLabel: "Hindu · Jain",
            dynasty: "Early Chalukya",
            significance:
                "Sandstone cave temples combining sculptural panels, columned halls, and sacred imagery associated with Vaishnava, Shaiva, and Jain traditions.",
            search:
                "badami cave temples vatapi karnataka chalukya hindu jain sandstone sculpture",
            images: [
                "assets/travel_deserts.png",
                "assets/travel_mountains.png",
                "assets/travel_hidden.png"
            ]
        },
        {
            id: "udayagiri-mp",
            name: "Udayagiri Caves",
            location: "Vidisha, Madhya Pradesh",
            state: "Madhya Pradesh",
            region: "central",
            period: "late-ancient",
            periodLabel: "Early 5th century CE",
            religions: ["hindu", "jain"],
            traditionLabel: "Hindu · Jain",
            dynasty: "Gupta period",
            significance:
                "A major Gupta-period sacred landscape known for inscriptions and sculptural programs, especially the monumental Varaha relief.",
            search:
                "udayagiri caves vidisha madhya pradesh gupta hindu jain varaha relief sculpture",
            images: [
                "assets/travel_forests.png",
                "assets/travel_hidden.png",
                "assets/travel_mountains.png"
            ]
        },
        {
            id: "barabar",
            name: "Barabar Caves",
            location: "Jehanabad district, Bihar",
            state: "Bihar",
            region: "east",
            period: "ancient",
            periodLabel: "3rd century BCE",
            religions: ["ajivika"],
            traditionLabel: "Ajivika",
            dynasty: "Mauryan period",
            significance:
                "Among the earliest surviving rock-cut caves in India, noted for highly polished interiors and inscriptions connected with Mauryan imperial patronage.",
            search:
                "barabar caves jehanabad bihar mauryan ashoka dasharatha ajivika polished granite",
            images: [
                "assets/travel_hidden.png",
                "assets/travel_forests.png",
                "assets/travel_deserts.png"
            ]
        },
        {
            id: "kanheri",
            name: "Kanheri Caves",
            location: "Mumbai, Maharashtra",
            state: "Maharashtra",
            region: "west",
            period: "ancient",
            periodLabel: "1st century BCE – 10th century CE",
            religions: ["buddhist"],
            traditionLabel: "Buddhist",
            dynasty: "Long-lived monastic complex",
            significance:
                "A large Buddhist monastic settlement with prayer halls, cells, inscriptions, cisterns, and water-management systems carved into basalt hills.",
            search:
                "kanheri caves mumbai maharashtra buddhist monastery vihara chaitya basalt sanjay gandhi national park",
            images: [
                "assets/travel_forests.png",
                "assets/travel_hidden.png",
                "assets/travel_mountains.png"
            ]
        },
        {
            id: "karla",
            name: "Karla Caves",
            location: "Karla, Maharashtra",
            state: "Maharashtra",
            region: "west",
            period: "ancient",
            periodLabel: "2nd century BCE – 5th century CE",
            religions: ["buddhist"],
            traditionLabel: "Buddhist",
            dynasty: "Early historic western Deccan",
            significance:
                "Best known for an imposing rock-cut chaitya hall with a high vaulted form, rows of columns, and evidence of mercantile patronage.",
            search:
                "karla caves karli lonavala maharashtra buddhist chaitya hall merchants trade",
            images: [
                "assets/travel_mountains.png",
                "assets/travel_hidden.png",
                "assets/travel_forests.png"
            ]
        },
        {
            id: "bhaja",
            name: "Bhaja Caves",
            location: "Near Lonavala, Maharashtra",
            state: "Maharashtra",
            region: "west",
            period: "ancient",
            periodLabel: "c. 2nd century BCE",
            religions: ["buddhist"],
            traditionLabel: "Buddhist",
            dynasty: "Early Buddhist rock-cut phase",
            significance:
                "An early Buddhist cave group with a prominent chaitya hall, monastic cells, relief sculpture, and a group of rock-cut stupas.",
            search:
                "bhaja caves lonavala pune maharashtra buddhist chaitya vihara stupas ancient",
            images: [
                "assets/travel_hidden.png",
                "assets/travel_mountains.png",
                "assets/travel_forests.png"
            ]
        },
        {
            id: "undavalli",
            name: "Undavalli Caves",
            location: "Near Vijayawada, Andhra Pradesh",
            state: "Andhra Pradesh",
            region: "south",
            period: "late-ancient",
            periodLabel: "c. 4th – 7th century CE",
            religions: ["hindu"],
            traditionLabel: "Hindu",
            dynasty: "Vishnukundina-era association",
            significance:
                "A multi-storeyed rock-cut complex overlooking the Krishna River, known for columned spaces and a large reclining Vishnu image.",
            search:
                "undavalli caves vijayawada andhra pradesh hindu vishnu reclining vishnukundina krishna river",
            images: [
                "assets/travel_forests.png",
                "assets/travel_islands.png",
                "assets/travel_hidden.png"
            ]
        },
        {
            id: "khandagiri-udayagiri",
            name: "Udayagiri & Khandagiri Caves",
            location: "Bhubaneswar, Odisha",
            state: "Odisha",
            region: "east",
            period: "ancient",
            periodLabel: "c. 1st century BCE",
            religions: ["jain"],
            traditionLabel: "Jain",
            dynasty: "Mahameghavahana period",
            significance:
                "Twin hill complexes associated with Jain ascetic use, inscriptions, relief carving, and the celebrated multi-level Rani Gumpha.",
            search:
                "udayagiri khandagiri caves bhubaneswar odisha jain kharavela hathigumpha rani gumpha",
            images: [
                "assets/travel_forests.png",
                "assets/travel_hidden.png",
                "assets/travel_mountains.png"
            ]
        },
        {
            id: "masroor",
            name: "Masroor Rock-Cut Temples",
            location: "Kangra district, Himachal Pradesh",
            state: "Himachal Pradesh",
            region: "north",
            period: "early-medieval",
            periodLabel: "c. 8th century CE",
            religions: ["hindu"],
            traditionLabel: "Hindu",
            dynasty: "Early medieval Himalayan tradition",
            significance:
                "A rare monolithic temple group in the Himalayan region, with a clustered architectural composition carved from a sandstone ridge.",
            search:
                "masroor rock cut temples kangra himachal pradesh hindu monolithic sandstone himalaya",
            images: [
                "assets/travel_mountains.png",
                "assets/travel_hidden.png",
                "assets/travel_forests.png"
            ]
        }
    ];

    const grid = document.getElementById("cave-grid");
    const searchInput = document.getElementById("cave-search");
    const regionFilter = document.getElementById("region-filter");
    const periodFilter = document.getElementById("period-filter");
    const religionFilter = document.getElementById("religion-filter");
    const resultStatus = document.getElementById("result-status");
    const emptyState = document.getElementById("empty-state");
    const clearFiltersButton = document.getElementById("clear-filters");
    const emptyResetButton = document.getElementById("empty-reset");
    const heroSiteCount = document.getElementById("hero-site-count");

    const galleryModal = document.getElementById("gallery-modal");
    const galleryImage = document.getElementById("gallery-image");
    const galleryTitle = document.getElementById("gallery-title");
    const galleryLocation = document.getElementById("gallery-location");
    const galleryCaption = document.getElementById("gallery-caption");
    const galleryCounter = document.getElementById("gallery-counter");
    const galleryClose = document.getElementById("gallery-close");
    const galleryPrev = document.getElementById("gallery-prev");
    const galleryNext = document.getElementById("gallery-next");

    let activeGallerySite = null;
    let activeGalleryIndex = 0;
    let lastFocusedElement = null;

    function escapeHtml(value) {
        return String(value)
            .replaceAll("&", "&amp;")
            .replaceAll("<", "&lt;")
            .replaceAll(">", "&gt;")
            .replaceAll('"', "&quot;")
            .replaceAll("'", "&#039;");
    }

    function createCard(site) {
        const article = document.createElement("article");
        article.className = "cave-card";
        article.dataset.id = site.id;
        article.dataset.region = site.region;
        article.dataset.period = site.period;
        article.dataset.religion = site.religions.join(" ");
        article.dataset.search = site.search.toLowerCase();

        article.innerHTML = `
            <div class="cave-media">
                <img
                    src="${escapeHtml(site.images[0])}"
                    alt="Scenic representation for ${escapeHtml(site.name)}"
                    loading="lazy"
                >

                <div class="cave-badges">
                    <span class="state-badge">${escapeHtml(site.state)}</span>
                    <span class="tradition-badge">${escapeHtml(site.traditionLabel)}</span>
                </div>

                <button
                    type="button"
                    class="gallery-trigger"
                    data-gallery-id="${escapeHtml(site.id)}"
                    aria-label="Open image gallery for ${escapeHtml(site.name)}"
                >
                    ◫ Gallery
                </button>
            </div>

            <div class="cave-body">
                <h3 class="cave-title">${escapeHtml(site.name)}</h3>
                <p class="cave-location">${escapeHtml(site.location)}</p>

                <div class="cave-meta">
                    <div class="meta-pill">
                        <span class="meta-icon" aria-hidden="true">⌛</span>
                        <span>${escapeHtml(site.periodLabel)}</span>
                    </div>

                    <div class="meta-pill">
                        <span class="meta-icon" aria-hidden="true">⌂</span>
                        <span>${escapeHtml(site.dynasty)}</span>
                    </div>
                </div>

                <p class="cave-significance">${escapeHtml(site.significance)}</p>
            </div>
        `;

        const image = article.querySelector("img");
        image.addEventListener(
            "error",
            () => {
                if (!image.src.endsWith(fallbackImage)) {
                    image.src = fallbackImage;
                }
            },
            { once: true }
        );

        return article;
    }

    function renderCards() {
        grid.replaceChildren(...caveSites.map(createCard));
        heroSiteCount.textContent = String(caveSites.length);

        grid.addEventListener("click", (event) => {
            const trigger = event.target.closest("[data-gallery-id]");
            if (!trigger) return;

            const site = caveSites.find(
                (item) => item.id === trigger.dataset.galleryId
            );

            if (site) {
                openGallery(site, trigger);
            }
        });
    }

    function getFilteredSites() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const selectedRegion = regionFilter.value;
        const selectedPeriod = periodFilter.value;
        const selectedReligion = religionFilter.value;

        return caveSites.filter((site) => {
            const matchesSearch =
                !searchTerm || site.search.includes(searchTerm);

            const matchesRegion =
                selectedRegion === "all" || site.region === selectedRegion;

            const matchesPeriod =
                selectedPeriod === "all" || site.period === selectedPeriod;

            const matchesReligion =
                selectedReligion === "all" ||
                site.religions.includes(selectedReligion);

            return (
                matchesSearch &&
                matchesRegion &&
                matchesPeriod &&
                matchesReligion
            );
        });
    }

    function filterCaves() {
        const visibleSites = getFilteredSites();
        const visibleIds = new Set(visibleSites.map((site) => site.id));

        document.querySelectorAll(".cave-card").forEach((card) => {
            card.hidden = !visibleIds.has(card.dataset.id);
        });

        const filtersActive =
            searchInput.value.trim() ||
            regionFilter.value !== "all" ||
            periodFilter.value !== "all" ||
            religionFilter.value !== "all";

        resultStatus.textContent = filtersActive
            ? `Found ${visibleSites.length} cave site${visibleSites.length === 1 ? "" : "s"}`
            : `Showing all ${visibleSites.length} cave sites`;

        emptyState.classList.toggle("visible", visibleSites.length === 0);
        grid.hidden = visibleSites.length === 0;
    }

    function resetFilters() {
        searchInput.value = "";
        regionFilter.value = "all";
        periodFilter.value = "all";
        religionFilter.value = "all";
        filterCaves();
        searchInput.focus();
    }

    function setGalleryImage() {
        if (!activeGallerySite) return;

        const images = activeGallerySite.images;
        const imagePath = images[activeGalleryIndex];

        galleryImage.src = imagePath;
        galleryImage.alt =
            `${activeGallerySite.name} gallery image ${activeGalleryIndex + 1}`;

        galleryImage.onerror = () => {
            galleryImage.onerror = null;
            galleryImage.src = fallbackImage;
        };

        galleryTitle.textContent = activeGallerySite.name;
        galleryLocation.textContent = activeGallerySite.location;
        galleryCaption.textContent = activeGallerySite.significance;
        galleryCounter.textContent =
            `${activeGalleryIndex + 1} / ${images.length}`;
    }

    function openGallery(site, trigger) {
        activeGallerySite = site;
        activeGalleryIndex = 0;
        lastFocusedElement = trigger;

        setGalleryImage();

        galleryModal.hidden = false;
        document.body.classList.add("gallery-open");
        galleryClose.focus();
    }

    function closeGallery() {
        galleryModal.hidden = true;
        document.body.classList.remove("gallery-open");

        activeGallerySite = null;
        activeGalleryIndex = 0;

        if (lastFocusedElement) {
            lastFocusedElement.focus();
        }
    }

    function stepGallery(direction) {
        if (!activeGallerySite) return;

        const imageCount = activeGallerySite.images.length;

        activeGalleryIndex =
            (activeGalleryIndex + direction + imageCount) % imageCount;

        setGalleryImage();
    }

    function handleModalKeydown(event) {
        if (galleryModal.hidden) return;

        if (event.key === "Escape") {
            closeGallery();
            return;
        }

        if (event.key === "ArrowLeft") {
            stepGallery(-1);
            return;
        }

        if (event.key === "ArrowRight") {
            stepGallery(1);
        }
    }

    renderCards();
    filterCaves();

    searchInput.addEventListener("input", filterCaves);
    regionFilter.addEventListener("change", filterCaves);
    periodFilter.addEventListener("change", filterCaves);
    religionFilter.addEventListener("change", filterCaves);

    clearFiltersButton.addEventListener("click", resetFilters);
    emptyResetButton.addEventListener("click", resetFilters);

    galleryClose.addEventListener("click", closeGallery);
    galleryPrev.addEventListener("click", () => stepGallery(-1));
    galleryNext.addEventListener("click", () => stepGallery(1));

    galleryModal.addEventListener("click", (event) => {
        if (event.target.matches("[data-close-gallery]")) {
            closeGallery();
        }
    });

    document.addEventListener("keydown", handleModalKeydown);
});
