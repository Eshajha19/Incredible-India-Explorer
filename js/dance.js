window.IIE = window.IIE || {};
(function() {
  'use strict';

  const danceAsset = fileName => `assets/dance/${encodeURIComponent(fileName)}`;

  const danceData = [
    { id: 'd1', name: 'Bharatanatyam', state: 'Tamil Nadu', category: 'classical', image: danceAsset('bharatanatyam.png'), video: danceAsset('bharatanatyam-video.png'), summary: 'One of the oldest classical dance forms, known for its fixed upper torso, bent legs, and intricate footwork.', description: 'Bharatanatyam originated in the temples of Tamil Nadu and is characterized by precise movements, storytelling through hand gestures (mudras), and rhythmic footwork. It traditionally begins with an alarippu and progresses through varnams and padams.', highlights: ['Ancient temple dance', 'Mudra storytelling', 'Sculptural poses'] },
    { id: 'd2', name: 'Kathak', state: 'Uttar Pradesh', category: 'classical', image: danceAsset('kathak.png'), video: danceAsset('kathak-video.png'), summary: 'A storytelling dance from North India, famous for fast spins (chakkars) and rhythmic footwork.', description: 'Kathak evolved from the Kathakars or storytellers who performed in temples. It emphasizes complex footwork, spins, and expressive storytelling. Both Hindu and Muslim traditions influenced its development in the Mughal courts.', highlights: ['Lightning-fast spins', 'Storytelling roots', 'Indo-Persian fusion'] },
    { id: 'd3', name: 'Kathakali', state: 'Kerala', category: 'classical', image: danceAsset('kathakali.png'), video: danceAsset('kathakali-video.png'), summary: 'A dramatic dance-theater known for elaborate makeup, masks, and larger-than-life expressions.', description: 'Kathakali uses elaborate costumes, face masks, and exaggerated eye movements (netra abhinaya) to enact mythological stories. Performers train for years to master the distinct facial expressions and body movements.', highlights: ['Elaborate costumes', 'Eye expression training', 'Mythological epics'] },
    { id: 'd4', name: 'Odissi', state: 'Odisha', category: 'classical', image: danceAsset('odissi.png'), video: danceAsset('odissi-video.png'), summary: 'A lyrical dance form with fluid upper body movements and signature tribhangi posture.', description: 'Odissi features the tribhangi (three-bend) posture and fluid, graceful movements that mimic temple sculptures. It draws heavily from the devotion of Lord Jagannath and Odisha\'s temple traditions.', highlights: ['Tribhangi posture', 'Temple sculptures', 'Devotional themes'] },
    { id: 'd5', name: 'Kuchipudi', state: 'Andhra Pradesh', category: 'classical', image: danceAsset('kuchipudi.png'), video: danceAsset('kuchipudi-video.png'), summary: 'A dance-drama tradition performed on a brass plate, combining fast footwork with dramatic storytelling.', description: 'Kuchipudi originated as a village dance-drama performed by Brahmin men. It combines nritta (pure dance), nritya (expressive dance), and natya (drama), with performers sometimes dancing on the rim of a brass plate.', highlights: ['Brass plate dancing', 'Dance-drama tradition', 'Nritta-natya blend'] },
    { id: 'd6', name: 'Manipuri', state: 'Manipur', category: 'classical', image: danceAsset('manipuri.png'), video: danceAsset('manipuri-video.png'), summary: 'A gentle, flowing dance form inspired by the Rasalila of Lord Krishna.', description: 'Manipuri dance is characterized by gentle, flowing movements and colorful costumes. It is deeply devotional, centered on the Rasalila themes of Krishna and Radha. The movements are circular and continuous.', highlights: ['Gentle flowing motion', 'Rasalila themes', 'Colorful costumes'] },
    { id: 'd7', name: 'Mohiniyattam', state: 'Kerala', category: 'classical', image: danceAsset('mohiniyattam.png'), video: danceAsset('mohiniyattam-video.png'), summary: 'A graceful, feminine dance form performed by women, known for gentle swaying movements.', description: 'Mohiniyattam, the dance of the enchantress, features graceful, swaying movements and subtle expressions. It focuses on feminine themes and devotion, with a repertoire that includes varnams and padams.', highlights: ['Feminine grace', 'Swaying movements', 'Subtle expressions'] },
    { id: 'd8', name: 'Sattriya', state: 'Assam', category: 'classical', image: danceAsset('sattriya.png'), video: danceAsset('sattriya-video.png'), summary: 'A monastic dance tradition from Assam\'s Vaishnavite monasteries.', description: 'Sattriya was introduced by the Vaishnavite saint Srimanta Sankardeva in the 15th century. It was performed in satras (monasteries) as a form of devotional storytelling and is characterized by brisk footwork and expressive mudras.', highlights: ['Monastic origin', 'Sankardeva legacy', 'Devotional storytelling'] },
    { id: 'd9', name: 'Bhangra', state: 'Punjab', category: 'folk', image: danceAsset('bhangra.png'), video: danceAsset('bhangra-video.png'), summary: 'A high-energy harvest dance with powerful kicks and rhythmic shoulder movements.', description: 'Bhangra began as a Punjabi harvest celebration and evolved into a global dance phenomenon. It features high-energy movements, rhythmic shoulder shrugs, and powerful kicks set to the beat of the dhol drum.', highlights: ['High-energy moves', 'Dhol drum beats', 'Global popularity'] },
    { id: 'd10', name: 'Garba', state: 'Gujarat', category: 'folk', image: danceAsset('garba.png'), video: danceAsset('garba-video.png'), summary: 'A circular folk dance performed during Navratri, with clapping and twirling movements.', description: 'Garba is performed in circles around a central lamp or deity image, with dancers clapping and twirling in synchronized patterns. Modern Garba has evolved into a high-energy social dance, especially during the nine nights of Navratri.', highlights: ['Circular formation', 'Navratri tradition', 'Clapping rhythm'] },
    { id: 'd11', name: 'Ghoomar', state: 'Rajasthan', category: 'folk', image: danceAsset('ghoomar.png'), video: danceAsset('ghoomar-video.png'), summary: 'A graceful spinning dance performed by Rajput women in flowing ghagras.', description: 'Ghoomar involves elegant spinning movements performed by women in flowing, colorful ghagras. The dance starts slow and builds in speed, showcasing the dancers\' balance, grace, and the vibrant swirl of their attire.', highlights: ['Elegant spins', 'Flowing ghagras', 'Royal tradition'] },
    { id: 'd12', name: 'Bihu', state: 'Assam', category: 'folk', image: danceAsset('bihu.png'), video: danceAsset('bihu-video.png'), summary: 'A lively spring harvest dance with rapid hand movements and brisk steps.', description: 'Bihu dance marks the Assamese New Year and harvest season. Dancers perform with brisk steps, rapid hand movements, and rhythmic hip swings, accompanied by the dhol, pepa (buffalo horn pipe), and gogona (jaw harp).', highlights: ['Spring harvest', 'Rapid movements', 'Traditional instruments'] }
  ];

  function initDancePage() {
    const danceGrid = document.getElementById('dance-grid');
    const filterButtons = document.querySelectorAll('[data-dance-filter]');
    const videoGrid = document.querySelector('.dance-video-grid');
    const quizContainer = document.getElementById('dance-quiz-container');
    const modal = document.getElementById('dance-modal');
    const modalClose = document.getElementById('dance-modal-close');
    const modalImg = document.getElementById('dance-modal-img');
    const modalState = document.getElementById('dance-modal-state');
    const modalCategory = document.getElementById('dance-modal-category');
    const modalTitle = document.getElementById('dance-modal-title');
    const modalSummary = document.getElementById('dance-modal-summary');
    const modalDescription = document.getElementById('dance-modal-description');
    const modalHighlights = document.getElementById('dance-modal-highlights');

    if (!danceGrid || !filterButtons.length || !modal) return;

    document.querySelectorAll('.fade-in-section').forEach(s => s.classList.add('is-visible'));

    let activeCategory = 'all';
    let currentDanceId = null;

    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        activeCategory = btn.getAttribute('data-dance-filter') || 'all';
        filterButtons.forEach(b => b.classList.toggle('active', (b.getAttribute('data-dance-filter') || 'all') === activeCategory));
        renderDanceGrid();
      });
    });

    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeModal(); });

    function closeModal() {
      modal.classList.remove('open');
      document.body.classList.remove('no-scroll');
    }

    function renderDanceGrid() {
      danceGrid.innerHTML = '';
      const filtered = activeCategory === 'all' ? danceData : danceData.filter(d => d.category === activeCategory);

      filtered.forEach(dance => {
        const card = document.createElement('article');
        card.className = 'dance-card glass-card';
        card.innerHTML = `<div class="dance-card-media"><img src="${dance.image}" alt="${dance.name}" loading="lazy"></div><div class="dance-card-body"><span class="dance-badge">${dance.category}</span><h3>${dance.name}</h3><p class="dance-state">${dance.state}</p><p class="dance-summary">${dance.summary}</p><div class="dance-card-footer"><button type="button" class="btn btn-secondary dance-view-btn">Explore Dance</button></div></div>`;
        card.addEventListener('click', () => openDanceModal(dance));
        danceGrid.appendChild(card);
      });
    }

    function openDanceModal(dance) {
      currentDanceId = dance.id;
      modalImg.innerHTML = `<img src="${dance.image}" alt="${dance.name}" loading="lazy">`;
      modalState.textContent = dance.state; modalCategory.textContent = dance.category;
      modalTitle.textContent = dance.name; modalSummary.textContent = dance.summary;
      modalDescription.textContent = dance.description;
      modalHighlights.innerHTML = dance.highlights.map(h => `<li>${h}</li>`).join('');
      modal.classList.add('open');
      document.body.classList.add('no-scroll');
    }

    // Render video previews
    if (videoGrid) {
      videoGrid.innerHTML = '';
      danceData.slice(0, 6).forEach(dance => {
        const card = document.createElement('article');
        card.className = 'dance-video-card glass-card';
        card.innerHTML = `<img src="${dance.video}" alt="${dance.name}" loading="lazy"><div class="dance-video-overlay"><span class="play-icon">\u25B6</span></div><div class="dance-video-info"><h4>${dance.name}</h4><p>${dance.state}</p></div>`;
        card.addEventListener('click', () => openDanceModal(dance));
        videoGrid.appendChild(card);
      });
    }

    // Quiz
    if (quizContainer) {
      const quizQuestions = [
        { question: "Which dance form originated in the temples of Tamil Nadu?", options: ["Kathak", "Bharatanatyam", "Odissi", "Kuchipudi"], answer: "Bharatanatyam", hint: "This dance has a fixed upper torso" },
        { question: "Which dance is known for its fast spins (chakkars)?", options: ["Kathak", "Bhangra", "Ghoomar", "Manipuri"], answer: "Kathak", hint: "This dance comes from North India" },
        { question: "Which dance form features elaborate makeup and masks?", options: ["Mohiniyattam", "Sattriya", "Kathakali", "Kuchipudi"], answer: "Kathakali", hint: "This dance is from Kerala" },
        { question: "Which dance is performed on a brass plate?", options: ["Odissi", "Kuchipudi", "Bharatanatyam", "Manipuri"], answer: "Kuchipudi", hint: "This dance is from Andhra Pradesh" },
        { question: "Which dance form has the tribhangi (three-bend) posture?", options: ["Bharatanatyam", "Kathak", "Odissi", "Mohiniyattam"], answer: "Odissi", hint: "This dance is from Odisha" },
        { question: "Which harvest dance is traditionally performed to the beat of the dhol?", options: ["Garba", "Ghoomar", "Bhangra", "Bihu"], answer: "Bhangra", hint: "This dance is from Punjab" }
      ];

      let qIndex = 0, score = 0, quizLocked = false;

      const qText = document.getElementById('dance-quiz-question');
      const qOptions = document.getElementById('dance-quiz-options');
      const qFeedback = document.getElementById('dance-quiz-feedback');
      const qScore = document.getElementById('dance-quiz-score');
      const qNext = document.getElementById('dance-quiz-next');
      const qResult = document.getElementById('dance-quiz-result');
      const qResultText = document.getElementById('dance-quiz-result-text');

      if (qText && qOptions && qFeedback && qNext) {
        loadQuizQuestion();

        qNext.addEventListener('click', () => {
          qIndex++;
          if (qIndex < quizQuestions.length) {
            loadQuizQuestion();
          } else {
            showQuizResult();
          }
        });

        function loadQuizQuestion() {
          quizLocked = false;
          qFeedback.classList.add('hidden');
          qNext.classList.add('hidden');
          const q = quizQuestions[qIndex];
          qText.textContent = `Question ${qIndex + 1} of ${quizQuestions.length}: ${q.question}`;
          qOptions.innerHTML = '';
          q.options.forEach(opt => {
            const btn = document.createElement('button');
            btn.className = 'quiz-option';
            btn.textContent = opt;
            btn.addEventListener('click', () => answerQuiz(btn, opt, q));
            qOptions.appendChild(btn);
          });
        }

        function answerQuiz(btn, val, q) {
          if (quizLocked) return;
          quizLocked = true;

          const isCorrect = val === q.answer;
          qOptions.querySelectorAll('.quiz-option').forEach(b => b.classList.add('disabled'));
          if (isCorrect) {
            btn.classList.add('correct');
            score++;
            qFeedback.innerHTML = `<p class="feedback-correct">\u2705 Correct! ${q.answer}</p>`;
          } else {
            btn.classList.add('wrong');
            qFeedback.innerHTML = `<p class="feedback-wrong">\u274C Incorrect. The answer is ${q.answer}</p>`;
          }
          qFeedback.classList.remove('hidden');

          if (qScore) qScore.textContent = `Score: ${score}/${quizQuestions.length}`;
          if (qIndex < quizQuestions.length - 1) {
            qNext.classList.remove('hidden');
          } else {
            setTimeout(showQuizResult, 1500);
          }
        }

        function showQuizResult() {
          if (qResult && qResultText) {
            qResult.classList.remove('hidden');
            qText.classList.add('hidden');
            qOptions.classList.add('hidden');
            qFeedback.classList.add('hidden');
            qNext.classList.add('hidden');
            qResultText.innerHTML = score === quizQuestions.length
              ? `\uD83C\uDFC6 Perfect score! You're a dance expert!`
              : score >= 4
                ? `\uD83C\uDF1F Great job! You scored ${score}/${quizQuestions.length}`
                : `\uD83D\uDC83 Keep exploring! You scored ${score}/${quizQuestions.length}`;
          }
        }
      }
    }

    renderDanceGrid();
  }

  window.IIE.DancePage = { init: initDancePage };
})();
