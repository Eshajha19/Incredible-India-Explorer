// ===== Navbar Redesign — Behavior =====

document.addEventListener('DOMContentLoaded', function () {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const dropdowns = document.querySelectorAll('.nav-dropdown');
    const navLinks = document.querySelectorAll('a.nav-link');
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    // --- Mobile menu toggle ---
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function () {
            const isOpen = navMenu.classList.toggle('open');
            menuToggle.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });
    }

    // --- Close mobile menu when a link is clicked ---
    navLinks.forEach(function (link) {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 1024) {
                navMenu.classList.remove('open');
                menuToggle.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });

    // --- Dropdown toggle (click-based, works for mobile + keyboard) ---
    dropdowns.forEach(function (dropdown) {
        const toggleBtn = dropdown.querySelector('.dropdown-toggle');
        if (!toggleBtn) return;

        toggleBtn.setAttribute('aria-haspopup', 'true');
        toggleBtn.setAttribute('aria-expanded', 'false');

        toggleBtn.addEventListener('click', function (e) {
            e.stopPropagation();
            const isOpen = dropdown.classList.toggle('open');
            toggleBtn.setAttribute('aria-expanded', isOpen);

            // Close other open dropdowns
            dropdowns.forEach(function (other) {
                if (other !== dropdown) {
                    other.classList.remove('open');
                    const otherBtn = other.querySelector('.dropdown-toggle');
                    if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                }
            });
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', function () {
        dropdowns.forEach(function (dropdown) {
            dropdown.classList.remove('open');
            const btn = dropdown.querySelector('.dropdown-toggle');
            if (btn) btn.setAttribute('aria-expanded', 'false');
        });
    });

    // --- Active link highlighting based on current URL ---
    function setActiveLink() {
        const currentPath = window.location.pathname + window.location.hash;
        navLinks.forEach(function (link) {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && (currentPath.endsWith(href) || currentPath.includes(href))) {
                link.classList.add('active');
            }
        });
    }
    setActiveLink();
    window.addEventListener('hashchange', setActiveLink);

    // --- Sticky scroll effect (shrink/hide on scroll) ---
    let lastScroll = 0;
    window.addEventListener('scroll', function () {
        const currentScroll = window.scrollY;

        // Add shadow/background once scrolled
        navbar.classList.toggle('scrolled', currentScroll > 20);

        // Hide navbar on scroll down, show on scroll up
        if (currentScroll > lastScroll && currentScroll > 150) {
            navbar.classList.add('nav-hidden');
        } else {
            navbar.classList.remove('nav-hidden');
        }
        lastScroll = currentScroll;
    });
});