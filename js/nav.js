window.IIE = window.IIE || {};
(function() {
  'use strict';

  function initNavigation() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const btnScrollTop = document.getElementById('btn-scroll-top');
    const exploreDropdown = navMenu?.querySelector('.nav-dropdown .dropdown-menu');
    const currentPath = window.location.pathname;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        if (btnScrollTop) btnScrollTop.classList.add('visible');
      } else {
        navbar.classList.remove('scrolled');
        if (btnScrollTop) btnScrollTop.classList.remove('visible');
      }
    });

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="dance.html"]')) {
      const danceLink = document.createElement('a');
      danceLink.href = 'dance.html';
      danceLink.className = 'dropdown-item';
      danceLink.textContent = 'Dance';
      if (currentPath.includes('dance.html')) {
        danceLink.classList.add('active');
      }
      exploreDropdown.appendChild(danceLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="sports.html"]')) {
      const sportsLink = document.createElement('a');
      sportsLink.href = 'sports.html';
      sportsLink.className = 'dropdown-item';
      sportsLink.textContent = 'Sports';
      if (currentPath.includes('sports.html')) {
        sportsLink.classList.add('active');
      }
      exploreDropdown.appendChild(sportsLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="science.html"]')) {
      const scienceLink = document.createElement('a');
      scienceLink.href = 'science.html';
      scienceLink.className = 'dropdown-item';
      scienceLink.textContent = 'Science';
      if (currentPath.includes('science.html')) {
        scienceLink.classList.add('active');
      }
      exploreDropdown.appendChild(scienceLink);
    }

    if (exploreDropdown && !exploreDropdown.querySelector('a[href="music.html"]')) {
      const musicLink = document.createElement('a');
      musicLink.href = 'music.html';
      musicLink.className = 'dropdown-item';
      musicLink.textContent = 'Music';
      if (currentPath.includes('music.html')) {
        musicLink.classList.add('active');
      }
      exploreDropdown.appendChild(musicLink);
    }

    menuToggle.addEventListener('click', () => {
      menuToggle.classList.toggle('open');
      navMenu.classList.toggle('open');
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        menuToggle.classList.remove('open');
        navMenu.classList.remove('open');
      });
    });

    if (btnScrollTop) {
      btnScrollTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }
  }

  function initScrollEffects() {
    const fadeSections = document.querySelectorAll('.fade-in-section, .story-step');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.scroll-section');

    const fadeObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    fadeSections.forEach(section => {
      fadeObserver.observe(section);
    });

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            } else {
              link.classList.remove('active');
            }
          });
        }
      });
    }, { threshold: 0.4 });

    sections.forEach(section => {
      sectionObserver.observe(section);
    });
  }

  function setupScrollReveals() {
    const paragraphs = document.querySelectorAll('.story-paragraph');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });

    paragraphs.forEach(p => {
      p.classList.remove('reveal');
      observer.observe(p);
    });
  }

  window.IIE.Nav = {
    init: initNavigation,
    initScrollEffects: initScrollEffects,
    setupScrollReveals: setupScrollReveals
  };
})();
