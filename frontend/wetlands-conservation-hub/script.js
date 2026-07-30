(function () {
  'use strict';

  let quizState = { current: 0, score: 0, answered: false, answers: [] };

  document.addEventListener('DOMContentLoaded', function () {
    renderWetlandTypes();
    renderTimeline();
    renderServices();
    renderThreats();
    renderProjects();
    renderInitiatives();
    renderQuiz();
    renderFeaturedExplorers();
    renderGallery();
    renderFacts();
    initScrollAnimations();
    initLightbox();
  });

  function renderFeaturedExplorers() {
    var container = document.getElementById('explorers-grid');
    if (!container || typeof FEATURED_EXPLORERS === 'undefined') return;

    container.innerHTML = FEATURED_EXPLORERS.map(function (ex) {
      var badgesHtml = ex.badges.map(function (b) {
        return '<span class="explorer-badge">' + b + '</span>';
      }).join('');
      return '<a href="' + ex.path + '" class="explorer-card animate-on-scroll">' +
        '<div class="explorer-icon">' + ex.icon + '</div>' +
        '<h3>' + ex.name + '</h3>' +
        '<p>' + ex.tagline + '</p>' +
        '<div class="explorer-badges">' + badgesHtml + '</div>' +
        '<span class="explorer-link">Explore →</span>' +
        '</a>';
    }).join('');
  }

  function initScrollAnimations() {
    const targets = document.querySelectorAll(
      '.info-card, .service-card, .timeline-item, .project-card, .initiative-card, .explorer-card, .gallery-item, .fact-card, .download-card, .content-section, .quiz-section'
    );
    if (!targets.length) return;
    if (!('IntersectionObserver' in window)) {
      targets.forEach(function (el) { el.classList.add('animate-visible'); });
      return;
    }
    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    targets.forEach(function (el) {
      el.classList.add('animate-on-scroll');
      observer.observe(el);
    });
  }

  function renderWetlandTypes() {
    const grid = document.querySelector('#types .info-grid');
    if (!grid) return;
    grid.innerHTML = WETLAND_TYPES.map(function (t) {
      return '<div class="info-card animate-on-scroll">' +
        '<div class="icon">' + t.icon + '</div>' +
        '<h3>' + t.name + '</h3>' +
        '<p>' + t.desc + '</p>' +
        '<span class="tag">' + t.states + '</span>' +
      '</div>';
    }).join('');
  }

  function renderTimeline() {
    const timeline = document.querySelector('.timeline');
    if (!timeline) return;
    timeline.innerHTML = RAMSAR_SITES_TIMELINE.map(function (item) {
      return '<div class="timeline-item animate-on-scroll">' +
        '<div class="timeline-year">' + item.year + '</div>' +
        '<div class="timeline-sites">' + item.sites.join(', ') + '</div>' +
        '<div class="timeline-note">' + item.note + '</div>' +
      '</div>';
    }).join('');
  }

  function renderServices() {
    const grid = document.querySelector('.service-grid');
    if (!grid) return;
    grid.innerHTML = ECOSYSTEM_SERVICES.map(function (s) {
      return '<div class="service-card animate-on-scroll">' +
        '<div class="icon">' + s.icon + '</div>' +
        '<h4>' + s.title + '</h4>' +
        '<p>' + s.desc + '</p>' +
      '</div>';
    }).join('');
  }

  function renderThreats() {
    const grid = document.querySelector('#threats .info-grid');
    if (!grid) return;
    grid.innerHTML = THREATS.map(function (t) {
      var sevClass = t.severity === 'Critical' ? 'severity-critical' : 'severity-high';
      return '<div class="info-card threat-card animate-on-scroll">' +
        '<div class="icon">' + t.icon + '</div>' +
        '<h3>' + t.title + '</h3>' +
        '<p>' + t.desc + '</p>' +
        '<span class="severity ' + sevClass + '">' + t.severity + '</span>' +
      '</div>';
    }).join('');
  }

  function renderProjects() {
    const grid = document.querySelector('.project-grid');
    if (!grid) return;
    grid.innerHTML = RESTORATION_PROJECTS.map(function (p) {
      return '<div class="project-card animate-on-scroll">' +
        '<img src="' + p.image + '" alt="' + p.name + '" loading="lazy" onerror="this.style.display=\'none\'" />' +
        '<div class="project-body">' +
          '<h3>' + p.name + '</h3>' +
          '<div class="location">📍 ' + p.location + '</div>' +
          '<p>' + p.desc + '</p>' +
          '<span class="year">' + p.year + '</span>' +
        '</div>' +
      '</div>';
    }).join('');
  }

  function renderInitiatives() {
    const grid = document.querySelector('.initiative-grid');
    if (!grid) return;
    grid.innerHTML = CONSERVATION_INITIATIVES.map(function (i) {
      return '<div class="initiative-card animate-on-scroll">' +
        '<h3>' + i.title + '</h3>' +
        '<span class="org">' + i.org + '</span>' +
        '<p>' + i.desc + '</p>' +
      '</div>';
    }).join('');
  }

  function renderQuiz() {
    var container = document.getElementById('quiz-section');
    if (!container) return;
    quizState = { current: 0, score: 0, answered: false, answers: [] };
    showQuestion(container);
  }

  function showQuestion(container) {
    if (quizState.current >= QUIZ_QUESTIONS.length) {
      showResult(container);
      return;
    }
    var q = QUIZ_QUESTIONS[quizState.current];
    var dots = QUIZ_QUESTIONS.map(function (_, i) {
      var cls = 'quiz-dot';
      if (i < quizState.current) {
        cls += quizState.answers[i] ? ' answered-correct' : ' answered-wrong';
      }
      if (i === quizState.current) cls += ' active';
      return '<span class="' + cls + '"></span>';
    }).join('');

    container.innerHTML =
      '<div class="quiz-progress">' + dots + '</div>' +
      '<div class="quiz-question">' + (quizState.current + 1) + '. ' + q.q + '</div>' +
      '<div class="quiz-options">' +
        q.options.map(function (opt, i) {
          return '<button class="quiz-option" data-index="' + i + '">' + opt + '</button>';
        }).join('') +
      '</div>' +
      '<div style="margin-top:16px;text-align:center;color:var(--text-sub);font-size:0.85rem">Question ' + (quizState.current + 1) + ' of ' + QUIZ_QUESTIONS.length + '</div>';

    quizState.answered = false;
    container.querySelectorAll('.quiz-option').forEach(function (btn) {
      btn.addEventListener('click', function () {
        if (quizState.answered) return;
        quizState.answered = true;
        var selected = parseInt(this.dataset.index);
        var correct = q.answer === selected;
        if (correct) quizState.score++;
        quizState.answers.push(correct);
        container.querySelectorAll('.quiz-option').forEach(function (b) { b.disabled = true; });
        if (correct) {
          this.classList.add('correct');
        } else {
          this.classList.add('wrong');
          container.querySelector('.quiz-option[data-index="' + q.answer + '"]').classList.add('correct');
        }
        setTimeout(function () {
          quizState.current++;
          showQuestion(container);
        }, correct ? 800 : 1200);
      });
    });
  }

  function showResult(container) {
    var pct = Math.round((quizState.score / QUIZ_QUESTIONS.length) * 100);
    var msg = pct >= 80 ? 'Excellent! You\'re a Wetlands Expert! 🌟' :
              pct >= 60 ? 'Great job! You know your wetlands! 🌿' :
              pct >= 40 ? 'Good start! Keep learning about wetlands! 📚' :
                          'Explore more to become a wetlands champion! 💪';
    container.innerHTML =
      '<div class="quiz-score">' +
        '<div style="font-size:4rem;margin-bottom:12px">' + (pct >= 80 ? '🏆' : pct >= 60 ? '🎉' : pct >= 40 ? '📖' : '🌱') + '</div>' +
        '<h3>' + quizState.score + ' / ' + QUIZ_QUESTIONS.length + '</h3>' +
        '<p>' + msg + '</p>' +
        '<button class="btn-primary" id="quiz-restart">Try Again</button>' +
      '</div>';
    document.getElementById('quiz-restart').addEventListener('click', function () {
      quizState = { current: 0, score: 0, answered: false, answers: [] };
      showQuestion(container);
    });
  }

  function renderGallery() {
    var grid = document.querySelector('.gallery-grid');
    if (!grid) return;
    grid.innerHTML = GALLERY_IMAGES.map(function (img, i) {
      return '<div class="gallery-item animate-on-scroll" data-index="' + i + '">' +
        '<img src="' + img.src + '" alt="' + img.caption + '" loading="lazy" onerror="this.style.display=\'none\'" />' +
        '<div class="caption">' + img.caption + '</div>' +
      '</div>';
    }).join('');
    grid.querySelectorAll('.gallery-item').forEach(function (item) {
      item.addEventListener('click', function () {
        openLightbox(parseInt(this.dataset.index));
      });
    });
  }

  function renderFacts() {
    var grid = document.querySelector('.facts-grid');
    if (!grid) return;
    var icons = ['💡', '🌍', '🐟', '🌿', '🔬', '🦆', '🌊', '🏗️', '🧂', '🏝️', '📊', '🦅'];
    grid.innerHTML = WETLAND_FACTS.map(function (f, i) {
      return '<div class="fact-card animate-on-scroll">' +
        '<span class="fact-icon">' + (icons[i] || '💚') + '</span>' +
        '<p>' + f.fact + '</p>' +
      '</div>';
    }).join('');
  }

  function initLightbox() {
    var lb = document.getElementById('lightbox');
    if (!lb) return;
    document.getElementById('lightbox-close').addEventListener('click', function () { lb.classList.remove('active'); });
    document.getElementById('lightbox-prev').addEventListener('click', function () { navigateLightbox(-1); });
    document.getElementById('lightbox-next').addEventListener('click', function () { navigateLightbox(1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) lb.classList.remove('active'); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('active')) return;
      if (e.key === 'Escape') lb.classList.remove('active');
      if (e.key === 'ArrowLeft') navigateLightbox(-1);
      if (e.key === 'ArrowRight') navigateLightbox(1);
    });
  }

  var lightboxIndex = 0;
  function openLightbox(index) {
    lightboxIndex = index;
    var img = GALLERY_IMAGES[index];
    var lb = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox-caption').textContent = img.caption;
    lb.classList.add('active');
  }

  function navigateLightbox(dir) {
    lightboxIndex = (lightboxIndex + dir + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    var img = GALLERY_IMAGES[lightboxIndex];
    document.getElementById('lightbox-img').src = img.src;
    document.getElementById('lightbox-caption').textContent = img.caption;
  }
})();
