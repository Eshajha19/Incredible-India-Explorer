window.NavbarShared = {
    init() {
        const navbar = document.getElementById('navbar');
        const menuToggle = document.getElementById('menu-toggle');
        const navMenu = document.getElementById('nav-menu');

        if (!navbar) return;

        this.initMobileMenu(menuToggle, navMenu);
        this.initDropdowns();
        this.initScrollEffect(navbar);
        this.setActiveLink();
    },

    initMobileMenu(menuToggle, navMenu) {
        if (!menuToggle || !navMenu) return;

        menuToggle.addEventListener('click', function () {
            const isOpen = navMenu.classList.toggle('open');
            menuToggle.classList.toggle('active', isOpen);
            menuToggle.setAttribute('aria-expanded', isOpen);
            document.body.style.overflow = isOpen ? 'hidden' : '';
        });

        navMenu.querySelectorAll('.nav-link').forEach(function (link) {
            link.addEventListener('click', function () {
                if (window.innerWidth <= 1024) {
                    navMenu.classList.remove('open');
                    menuToggle.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    },

    initDropdowns() {
        const dropdowns = document.querySelectorAll('.nav-dropdown');

        dropdowns.forEach(function (dropdown) {
            const toggleBtn = dropdown.querySelector('.dropdown-toggle');
            if (!toggleBtn) return;

            toggleBtn.setAttribute('aria-haspopup', 'true');
            toggleBtn.setAttribute('aria-expanded', 'false');

            toggleBtn.addEventListener('click', function (e) {
                e.stopPropagation();
                const isOpen = dropdown.classList.toggle('open');
                toggleBtn.setAttribute('aria-expanded', isOpen);

                dropdowns.forEach(function (other) {
                    if (other !== dropdown) {
                        other.classList.remove('open');
                        const otherBtn = other.querySelector('.dropdown-toggle');
                        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    }
                });
            });
        });

        document.addEventListener('click', function () {
            dropdowns.forEach(function (dropdown) {
                dropdown.classList.remove('open');
                const btn = dropdown.querySelector('.dropdown-toggle');
                if (btn) btn.setAttribute('aria-expanded', 'false');
            });
        });
    },

    setActiveLink() {
        const currentPath = window.location.pathname + window.location.hash;
        document.querySelectorAll('.nav-link').forEach(function (link) {
            link.classList.remove('active');
            const href = link.getAttribute('href');
            if (href && (currentPath.endsWith(href) || currentPath.includes(href))) {
                link.classList.add('active');
            }
        });
    },

    initScrollEffect(navbar) {
        let lastScroll = 0;

        window.addEventListener('scroll', function () {
            const currentScroll = window.scrollY;
            navbar.classList.toggle('scrolled', currentScroll > 20);

            if (currentScroll > lastScroll && currentScroll > 150) {
                navbar.classList.add('nav-hidden');
            } else {
                navbar.classList.remove('nav-hidden');
            }
            lastScroll = currentScroll;
        });
    }
};

document.addEventListener('DOMContentLoaded', function () {
    window.NavbarShared.init();
});

document.addEventListener('app:route-changed', function () {
    window.NavbarShared.setActiveLink();
});