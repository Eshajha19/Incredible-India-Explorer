document.addEventListener("DOMContentLoaded", () => {
  const historyEvents = [
  {
    "id": "jan-12-vivekananda",
    "date": "01-12",
    "displayDate": "January 12",
    "year": "1863",
    "title": "Birth of Swami Vivekananda",
    "category": "Birth",
    "region": "West Bengal",
    "summary": "Swami Vivekananda was born in Kolkata. His speeches and teachings later became influential in modern Indian thought and youth inspiration.",
    "significance": "January 12 is widely observed in India as National Youth Day.",
    "tags": [
      "youth",
      "spirituality",
      "modern India"
    ]
  },
  {
    "id": "jan-23-netaji",
    "date": "01-23",
    "displayDate": "January 23",
    "year": "1897",
    "title": "Birth of Netaji Subhas Chandra Bose",
    "category": "Birth",
    "region": "Odisha",
    "summary": "Subhas Chandra Bose was born in Cuttack and later became one of the most prominent leaders of India’s freedom struggle.",
    "significance": "The day is remembered for his leadership, courage, and role in the Indian National Army.",
    "tags": [
      "freedom movement",
      "INA",
      "leadership"
    ]
  },
  {
    "id": "jan-26-republic",
    "date": "01-26",
    "displayDate": "January 26",
    "year": "1950",
    "title": "India became a Republic",
    "category": "Achievement",
    "region": "National",
    "summary": "The Constitution of India came into effect, and India became a sovereign democratic republic.",
    "significance": "Republic Day celebrates constitutional democracy and civic identity.",
    "tags": [
      "constitution",
      "republic day",
      "national"
    ]
  },
  {
    "id": "feb-28-raman",
    "date": "02-28",
    "displayDate": "February 28",
    "year": "1928",
    "title": "Discovery of the Raman Effect",
    "category": "Science",
    "region": "Karnataka",
    "summary": "C. V. Raman announced the light-scattering phenomenon that became known as the Raman Effect.",
    "significance": "February 28 is observed as National Science Day in India.",
    "tags": [
      "science",
      "physics",
      "innovation"
    ]
  },
  {
    "id": "mar-12-dandi",
    "date": "03-12",
    "displayDate": "March 12",
    "year": "1930",
    "title": "Dandi March began",
    "category": "Freedom Movement",
    "region": "Gujarat",
    "summary": "Mahatma Gandhi began the Salt March from Sabarmati Ashram to Dandi as a non-violent protest against the salt tax.",
    "significance": "The march became one of the most powerful civil disobedience movements in Indian history.",
    "tags": [
      "gandhi",
      "salt march",
      "civil disobedience"
    ]
  },
  {
    "id": "apr-13-jallianwala",
    "date": "04-13",
    "displayDate": "April 13",
    "year": "1919",
    "title": "Jallianwala Bagh massacre",
    "category": "Freedom Movement",
    "region": "Punjab",
    "summary": "A peaceful gathering at Jallianwala Bagh in Amritsar was fired upon by British troops.",
    "significance": "The tragedy deeply intensified India’s freedom movement.",
    "tags": [
      "amritsar",
      "freedom struggle",
      "colonial history"
    ]
  },
  {
    "id": "apr-14-ambedkar",
    "date": "04-14",
    "displayDate": "April 14",
    "year": "1891",
    "title": "Birth of Dr. B. R. Ambedkar",
    "category": "Birth",
    "region": "Madhya Pradesh",
    "summary": "Dr. B. R. Ambedkar was born in Mhow and later became the chief architect of the Indian Constitution.",
    "significance": "His work shaped constitutional rights, social justice, and democratic institutions.",
    "tags": [
      "constitution",
      "social justice",
      "rights"
    ]
  },
  {
    "id": "may-7-tagore",
    "date": "05-07",
    "displayDate": "May 7",
    "year": "1861",
    "title": "Birth of Rabindranath Tagore",
    "category": "Birth",
    "region": "West Bengal",
    "summary": "Rabindranath Tagore was born in Kolkata and became a poet, philosopher, composer, and Nobel laureate.",
    "significance": "His work shaped literature, music, education, and cultural identity.",
    "tags": [
      "literature",
      "music",
      "nobel"
    ]
  },
  {
    "id": "may-11-pokhran",
    "date": "05-11",
    "displayDate": "May 11",
    "year": "1998",
    "title": "Pokhran-II nuclear tests",
    "category": "Science",
    "region": "Rajasthan",
    "summary": "India conducted a series of nuclear tests at Pokhran.",
    "significance": "May 11 is observed as National Technology Day.",
    "tags": [
      "technology",
      "science",
      "pokhran"
    ]
  },
  {
    "id": "jun-21-yoga",
    "date": "06-21",
    "displayDate": "June 21",
    "year": "2015",
    "title": "First International Day of Yoga",
    "category": "Culture",
    "region": "National",
    "summary": "The first International Day of Yoga was celebrated globally, with major participation across India.",
    "significance": "The day highlights yoga as an Indian knowledge tradition with global reach.",
    "tags": [
      "yoga",
      "culture",
      "wellness"
    ]
  },
  {
    "id": "jul-22-chandrayaan2",
    "date": "07-22",
    "displayDate": "July 22",
    "year": "2019",
    "title": "Chandrayaan-2 launched",
    "category": "Science",
    "region": "Andhra Pradesh",
    "summary": "ISRO launched Chandrayaan-2 from Sriharikota to study the Moon.",
    "significance": "The mission strengthened India’s lunar exploration capabilities.",
    "tags": [
      "isro",
      "space",
      "moon"
    ]
  },
  {
    "id": "jul-26-kargil",
    "date": "07-26",
    "displayDate": "July 26",
    "year": "1999",
    "title": "Kargil Vijay Diwas",
    "category": "Achievement",
    "region": "Ladakh",
    "summary": "India marks the victory of Indian armed forces in the Kargil conflict.",
    "significance": "The day honours courage, sacrifice, and national service.",
    "tags": [
      "kargil",
      "armed forces",
      "national"
    ]
  },
  {
    "id": "aug-9-quit-india",
    "date": "08-09",
    "displayDate": "August 9",
    "year": "1942",
    "title": "Quit India Movement began",
    "category": "Freedom Movement",
    "region": "Maharashtra",
    "summary": "The Quit India Movement gained momentum after Mahatma Gandhi’s call to end British rule.",
    "significance": "It became a major mass movement in the final phase of India’s independence struggle.",
    "tags": [
      "quit india",
      "freedom movement",
      "gandhi"
    ]
  },
  {
    "id": "aug-15-independence",
    "date": "08-15",
    "displayDate": "August 15",
    "year": "1947",
    "title": "India gained Independence",
    "category": "Achievement",
    "region": "National",
    "summary": "India became independent after a long struggle against British colonial rule.",
    "significance": "Independence Day celebrates freedom, sacrifice, and national identity.",
    "tags": [
      "independence",
      "freedom",
      "national"
    ]
  },
  {
    "id": "sep-5-radhakrishnan",
    "date": "09-05",
    "displayDate": "September 5",
    "year": "1888",
    "title": "Birth of Dr. S. Radhakrishnan",
    "category": "Birth",
    "region": "Tamil Nadu",
    "summary": "Dr. Sarvepalli Radhakrishnan was born in Tiruttani and became a philosopher, teacher, and President of India.",
    "significance": "September 5 is celebrated as Teachers’ Day in India.",
    "tags": [
      "teachers day",
      "education",
      "philosophy"
    ]
  },
  {
    "id": "oct-2-gandhi",
    "date": "10-02",
    "displayDate": "October 2",
    "year": "1869",
    "title": "Birth of Mahatma Gandhi",
    "category": "Birth",
    "region": "Gujarat",
    "summary": "Mahatma Gandhi was born in Porbandar and later led major non-violent movements for Indian independence.",
    "significance": "The day is observed as Gandhi Jayanti and the International Day of Non-Violence.",
    "tags": [
      "gandhi",
      "nonviolence",
      "freedom"
    ]
  },
  {
    "id": "oct-15-kalam",
    "date": "10-15",
    "displayDate": "October 15",
    "year": "1931",
    "title": "Birth of Dr. A. P. J. Abdul Kalam",
    "category": "Birth",
    "region": "Tamil Nadu",
    "summary": "Dr. A. P. J. Abdul Kalam was born in Rameswaram and became a scientist, teacher, and President of India.",
    "significance": "He is remembered for inspiring students and strengthening India’s science and space programmes.",
    "tags": [
      "science",
      "students",
      "isro"
    ]
  },
  {
    "id": "oct-31-patel",
    "date": "10-31",
    "displayDate": "October 31",
    "year": "1875",
    "title": "Birth of Sardar Vallabhbhai Patel",
    "category": "Birth",
    "region": "Gujarat",
    "summary": "Sardar Patel was born in Nadiad and later played a key role in integrating princely states into India.",
    "significance": "October 31 is observed as Rashtriya Ekta Diwas.",
    "tags": [
      "unity",
      "integration",
      "leadership"
    ]
  },
  {
    "id": "nov-14-nehru",
    "date": "11-14",
    "displayDate": "November 14",
    "year": "1889",
    "title": "Birth of Jawaharlal Nehru",
    "category": "Birth",
    "region": "Uttar Pradesh",
    "summary": "Jawaharlal Nehru was born in Allahabad and later became India’s first Prime Minister.",
    "significance": "November 14 is celebrated as Children’s Day in India.",
    "tags": [
      "children's day",
      "prime minister",
      "modern India"
    ]
  },
  {
    "id": "nov-26-constitution",
    "date": "11-26",
    "displayDate": "November 26",
    "year": "1949",
    "title": "Constitution adopted",
    "category": "Achievement",
    "region": "National",
    "summary": "The Constituent Assembly adopted the Constitution of India.",
    "significance": "November 26 is observed as Constitution Day.",
    "tags": [
      "constitution",
      "democracy",
      "rights"
    ]
  },
  {
    "id": "dec-4-navy",
    "date": "12-04",
    "displayDate": "December 4",
    "year": "1971",
    "title": "Indian Navy Day",
    "category": "Achievement",
    "region": "National",
    "summary": "Navy Day commemorates naval operations during the 1971 conflict.",
    "significance": "The day honours the service and role of the Indian Navy.",
    "tags": [
      "navy",
      "defence",
      "national"
    ]
  },
  {
    "id": "dec-22-ramanujan",
    "date": "12-22",
    "displayDate": "December 22",
    "year": "1887",
    "title": "Birth of Srinivasa Ramanujan",
    "category": "Birth",
    "region": "Tamil Nadu",
    "summary": "Mathematician Srinivasa Ramanujan was born in Erode.",
    "significance": "December 22 is observed as National Mathematics Day in India.",
    "tags": [
      "mathematics",
      "science",
      "education"
    ]
  }
];
  const bookmarkKey = "incredible-india-one-day-history-bookmarks";
  const dateInput = document.getElementById("history-date");
  const categoryFilter = document.getElementById("category-filter");
  const searchInput = document.getElementById("history-search");
  const timelineList = document.getElementById("timeline-list");
  const emptyState = document.getElementById("empty-state");
  const selectedTitle = document.getElementById("selected-date-title");
  const selectedSummary = document.getElementById("selected-date-summary");
  const bookmarkCount = document.getElementById("bookmark-count");
  let bookmarks = readBookmarks();
  let showOnlyBookmarks = false;

  const escapeHtml = (value) => String(value).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#039;");
  const categories = [...new Set(historyEvents.map(event => event.category))].sort();

  function readBookmarks() { try { const parsed = JSON.parse(localStorage.getItem(bookmarkKey) || "[]"); return Array.isArray(parsed) ? parsed : []; } catch { return []; } }
  function saveBookmarks() { localStorage.setItem(bookmarkKey, JSON.stringify(bookmarks)); bookmarkCount.textContent = bookmarks.length; }
  function formatDateKey(dateValue) { if (!dateValue) return ""; const parts = dateValue.split("-"); return `${parts[1]}-${parts[2]}`; }
  function displaySelectedDate(dateValue) { if (!dateValue) return "All dates"; const date = new Date(`${dateValue}T00:00:00`); return date.toLocaleDateString("en-IN", { month: "long", day: "numeric" }); }
  function searchableText(event) { return [event.displayDate,event.year,event.title,event.category,event.region,event.summary,event.significance,event.tags.join(" ")].join(" ").toLowerCase(); }
  const indexedEvents = historyEvents.map(event => ({ ...event, search: searchableText(event) }));

  function populateCategories() { categories.forEach(category => { const option = document.createElement("option"); option.value = category; option.textContent = category; categoryFilter.append(option); }); }
  function updateHeroStats() { document.getElementById("event-count").textContent = historyEvents.length; document.getElementById("category-count").textContent = categories.length; bookmarkCount.textContent = bookmarks.length; }
  function isBookmarked(id) { return bookmarks.includes(id); }
  function toggleBookmark(id) { bookmarks = isBookmarked(id) ? bookmarks.filter(item => item !== id) : [...bookmarks, id]; saveBookmarks(); renderTimeline(); }
  function getFilteredEvents() {
    const dateKey = formatDateKey(dateInput.value);
    const category = categoryFilter.value;
    const query = searchInput.value.trim().toLowerCase();
    return indexedEvents
      .filter(event => !dateKey || event.date === dateKey)
      .filter(event => category === "all" || event.category === category)
      .filter(event => !query || event.search.includes(query))
      .filter(event => !showOnlyBookmarks || isBookmarked(event.id))
      .sort((a,b) => Number(a.year.replace(/[^0-9]/g,"")) - Number(b.year.replace(/[^0-9]/g,"")));
  }
  function eventCard(event) {
    const tags = event.tags.map(tag => `<span class="tag-pill">#${escapeHtml(tag)}</span>`).join("");
    const bookmarked = isBookmarked(event.id);
    return `<article class="timeline-card" id="${escapeHtml(event.id)}" data-search-item data-category="${escapeHtml(event.category)}" data-region="${escapeHtml(event.region)}" data-history-event><div class="timeline-card__top"><div><h3>${escapeHtml(event.title)}</h3><div class="timeline-meta"><span class="timeline-pill">${escapeHtml(event.displayDate)}</span><span class="timeline-pill">${escapeHtml(event.category)}</span><span class="timeline-pill">${escapeHtml(event.region)}</span></div></div><span class="timeline-year">${escapeHtml(event.year)}</span></div><p>${escapeHtml(event.summary)}</p><p><strong>Why it matters:</strong> ${escapeHtml(event.significance)}</p><div class="tag-row">${tags}</div><button class="bookmark-btn ${bookmarked ? "is-bookmarked" : ""}" type="button" data-bookmark-id="${escapeHtml(event.id)}" aria-pressed="${bookmarked}">${bookmarked ? "★ Bookmarked" : "☆ Bookmark"}</button></article>`;
  }
  function renderTimeline() {
    const filtered = getFilteredEvents();
    timelineList.innerHTML = filtered.map(eventCard).join("");
    emptyState.classList.toggle("visible", filtered.length === 0);
    timelineList.hidden = filtered.length === 0;
    selectedTitle.textContent = showOnlyBookmarks ? "Bookmarked history events" : displaySelectedDate(dateInput.value);
    selectedSummary.textContent = filtered.length ? `Showing ${filtered.length} event${filtered.length === 1 ? "" : "s"} from the selected timeline.` : "No matching event found. Try another date, keyword, category, or random discovery.";
    document.querySelectorAll("[data-bookmark-id]").forEach(button => { button.addEventListener("click", () => toggleBookmark(button.dataset.bookmarkId)); });
  }
  function randomDateDiscovery() { const event = indexedEvents[Math.floor(Math.random() * indexedEvents.length)]; const year = new Date().getFullYear(); dateInput.value = `${year}-${event.date}`; searchInput.value = ""; categoryFilter.value = "all"; showOnlyBookmarks = false; renderTimeline(); document.getElementById("history-explorer").scrollIntoView({ behavior: "smooth", block: "start" }); }
  function todayInHistory() { const today = new Date(); dateInput.value = `${today.getFullYear()}-${String(today.getMonth()+1).padStart(2,"0")}-${String(today.getDate()).padStart(2,"0")}`; showOnlyBookmarks = false; renderTimeline(); }
  function resetFilters() { dateInput.value = ""; categoryFilter.value = "all"; searchInput.value = ""; showOnlyBookmarks = false; renderTimeline(); searchInput.focus(); }

  populateCategories(); updateHeroStats(); randomDateDiscovery();
  dateInput.addEventListener("change", () => { showOnlyBookmarks = false; renderTimeline(); });
  categoryFilter.addEventListener("change", renderTimeline);
  searchInput.addEventListener("input", () => { showOnlyBookmarks = false; renderTimeline(); });
  document.getElementById("today-button").addEventListener("click", todayInHistory);
  document.getElementById("random-button").addEventListener("click", randomDateDiscovery);
  document.getElementById("empty-random").addEventListener("click", randomDateDiscovery);
  document.getElementById("reset-filters").addEventListener("click", resetFilters);
  document.getElementById("show-bookmarks").addEventListener("click", () => { showOnlyBookmarks = !showOnlyBookmarks; renderTimeline(); });
  window.OneDayHistoryExplorer = { events: () => [...historyEvents], random: randomDateDiscovery, bookmarks: () => [...bookmarks] };
});
