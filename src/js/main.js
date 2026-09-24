/* ==========================================================================
   FRNDS Dubai — JavaScript entry point
   Architecture only: each feature is an isolated init module.
   Complex animations are intentionally deferred.
   ========================================================================== */

import '../css/input.css';

/* --------------------------------------------------------------------------
   Mobile navigation
   Toggles the mobile menu via [data-nav-toggle] / [data-nav-menu].
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggle = document.querySelector('[data-nav-toggle]');
  const menu = document.querySelector('[data-nav-menu]');
  if (!toggle || !menu) return;

  const setOpen = (open) => {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute(
      'aria-label',
      open ? 'Close navigation menu' : 'Open navigation menu'
    );
    menu.classList.toggle('is-open', open);
    document.body.classList.toggle('nav-locked', open);
  };

  const isOpen = () => toggle.getAttribute('aria-expanded') === 'true';

  toggle.addEventListener('click', () => setOpen(!isOpen()));

  // Close when any link inside the menu is activated.
  menu.addEventListener('click', (event) => {
    if (event.target.closest('a')) setOpen(false);
  });

  // Close on Escape and return focus to the toggle.
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isOpen()) {
      setOpen(false);
      toggle.focus();
    }
  });
}

/* --------------------------------------------------------------------------
   Scroll-based navbar behavior
   Adds [data-scrolled] to the header once the page is scrolled.
   -------------------------------------------------------------------------- */
function initScrollNavbar() {
  const header = document.querySelector('[data-header]');
  if (!header) return;

  const onScroll = () => {
    header.toggleAttribute('data-scrolled', window.scrollY > 24);
  };

  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}

/* --------------------------------------------------------------------------
   Announcement bar
   Dismissible bar via [data-announcement] / [data-announcement-close].
   -------------------------------------------------------------------------- */
function initAnnouncementBar() {
  const bar = document.querySelector('[data-announcement]');
  const close = document.querySelector('[data-announcement-close]');
  if (!bar || !close) return;

  close.addEventListener('click', () => {
    // Animate out, then remove from layout once the collapse finishes.
    bar.classList.add('is-dismissing');
    bar.addEventListener(
      'transitionend',
      (event) => {
        if (event.propertyName !== 'max-height') return;
        bar.setAttribute('hidden', '');
        document.dispatchEvent(new CustomEvent('announcement:dismissed'));
      },
      { once: true }
    );
  });
}

/* --------------------------------------------------------------------------
   Reveal animations
   Elements with [data-reveal] fade/rise in when they enter the viewport.
   -------------------------------------------------------------------------- */
function initRevealAnimations() {
  const elements = document.querySelectorAll('[data-reveal]');
  if (!elements.length) return;

  // If reduced motion is preferred, show everything immediately.
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    elements.forEach((el) => el.classList.add('reveal-visible'));
    return;
  }

  elements.forEach((el) => {
    el.classList.add('reveal-hidden');
    // Optional stagger: data-reveal-delay="150" (ms)
    const delay = el.getAttribute('data-reveal-delay');
    if (delay) el.style.transitionDelay = `${delay}ms`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('reveal-hidden');
        entry.target.classList.add('reveal-visible');
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -5% 0px' }
  );

  elements.forEach((el) => observer.observe(el));
}

/* --------------------------------------------------------------------------
   Future interactive sections
   Register upcoming feature modules here (menus, gallery, reservations…).
   -------------------------------------------------------------------------- */
// function initMenuTabs() {}
// function initGallery() {}
// function initReservationForm() {}

/* --------------------------------------------------------------------------
   Bootstrap
   -------------------------------------------------------------------------- */
function init() {
  initMobileNav();
  initScrollNavbar();
  initAnnouncementBar();
  initRevealAnimations();
  initReservationForm();
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}
