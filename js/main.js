/* ═══════════════════════════════════════════════════════════
   Interactive Academic Site — Main JavaScript
   ═══════════════════════════════════════════════════════════ */

// Prevent browser from restoring scroll position on refresh
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

// Also reset after full page load (fonts, images, etc.)
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

document.addEventListener('DOMContentLoaded', () => {

    // ── Scroll Progress Bar ────────────────────────────────
    const progressBar = document.querySelector('.scroll-progress');
    const updateProgress = () => {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        if (progressBar) progressBar.style.width = progress + '%';
    };

    // ── Active Nav Highlighting ────────────────────────────
    const navLinks = document.querySelectorAll('.sidebar-nav a[href^="#"]');
    const sections = document.querySelectorAll('section[id]');

    const highlightNav = () => {
        const scrollPos = window.scrollY + 120;
        let current = '';
        sections.forEach(sec => {
            if (sec.offsetTop <= scrollPos) {
                current = sec.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    };

    // ── Back to Top Button ─────────────────────────────────
    const backBtn = document.querySelector('.back-to-top');
    const toggleBackToTop = () => {
        if (backBtn) {
            if (window.scrollY > 400) {
                backBtn.classList.add('visible');
            } else {
                backBtn.classList.remove('visible');
            }
        }
    };

    if (backBtn) {
        backBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Combined scroll handler
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateProgress();
                highlightNav();
                toggleBackToTop();
                ticking = false;
            });
            ticking = true;
        }
    });

    // ── Scroll Reveal Animations ───────────────────────────
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .stagger');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => observer.observe(el));

    // ── Mobile Hamburger Menu ──────────────────────────────
    const hamburger = document.querySelector('.hamburger');
    const sidebar = document.querySelector('.sidebar');

    if (hamburger && sidebar) {
        hamburger.addEventListener('click', () => {
            sidebar.classList.toggle('mobile-open');
            hamburger.classList.toggle('active');
        });

        sidebar.querySelectorAll('.sidebar-nav a').forEach(link => {
            link.addEventListener('click', () => {
                sidebar.classList.remove('mobile-open');
                hamburger.classList.remove('active');
            });
        });
    }

    // ── Typing Animation ───────────────────────────────────
    const typedEl = document.querySelector('.typed-text');
    if (typedEl) {
        const phrases = [
            'Missing Modality in MRI',
            'Medical Image Analysis',
            'Generative Modeling',
            'Super-Resolution & Reconstruction'
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let delay = 80;

        function typeLoop() {
            const current = phrases[phraseIndex];
            if (isDeleting) {
                typedEl.textContent = current.substring(0, charIndex - 1);
                charIndex--;
                delay = 40;
            } else {
                typedEl.textContent = current.substring(0, charIndex + 1);
                charIndex++;
                delay = 80;
            }

            if (!isDeleting && charIndex === current.length) {
                delay = 2200;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = 400;
            }

            setTimeout(typeLoop, delay);
        }

        setTimeout(typeLoop, 1000);
    }

    // ── Publication Filtering ──────────────────────────────
    const filterTabs = document.querySelectorAll('.filter-tab');
    const pubCards = document.querySelectorAll('.pub-card');

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            const filter = tab.dataset.filter;

            pubCards.forEach(card => {
                if (filter === 'all' || card.dataset.venue === filter) {
                    card.classList.remove('hidden');
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                        card.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    }, 50);
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });

    // ── Smooth scroll for anchor links ─────────────────────
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ── Footer year ──────────────────────────────────────
    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // ── Initial calls ──────────────────────────────────────
    updateProgress();
    highlightNav();
});
