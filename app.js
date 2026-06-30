/* ============================================================
   THRIVEHAUS — Interactive JavaScript
   ============================================================ */

'use strict';

/* ──────────────────── STICKY NAV ──────────────────── */
(function initNav() {
  const header = document.getElementById('site-header');
  if (!header) return;

  const SCROLL_THRESHOLD = 40;

  function onScroll() {
    if (window.scrollY > SCROLL_THRESHOLD) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ──────────────────── MOBILE NAV TOGGLE ──────────────────── */
(function initMobileNav() {
  const toggle = document.querySelector('.nav-toggle');
  const mobileNav = document.getElementById('mobile-nav');
  if (!toggle || !mobileNav) return;

  function closeNav() {
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    mobileNav.classList.remove('is-open');
    mobileNav.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  function openNav() {
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    mobileNav.classList.add('is-open');
    mobileNav.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  toggle.addEventListener('click', () => {
    const isOpen = toggle.classList.contains('is-open');
    isOpen ? closeNav() : openNav();
  });

  // Close on link click
  mobileNav.querySelectorAll('.mobile-nav-link, .mobile-nav-cta').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!toggle.contains(e.target) && !mobileNav.contains(e.target)) {
      closeNav();
    }
  });

  // Close on Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeNav();
  });
})();


/* ──────────────────── SCROLL ANIMATIONS (Intersection Observer) ──────────────────── */
(function initScrollAnimations() {
  if (!('IntersectionObserver' in window)) {
    // Fallback: show all animated elements immediately
    document.querySelectorAll('.animate').forEach(el => el.classList.add('in-view'));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -40px 0px'
    }
  );

  document.querySelectorAll('.animate').forEach(el => observer.observe(el));
})();


/* ──────────────────── COUNTER ANIMATION ──────────────────── */
(function initCounters() {
  const counters = document.querySelectorAll('.proof-count[data-target]');
  if (!counters.length) return;

  function easeOutCubic(t) {
    return 1 - Math.pow(1 - t, 3);
  }

  function animateCounter(el) {
    const target = parseInt(el.dataset.target, 10);
    const duration = 1800;
    const start = performance.now();

    function step(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = easeOutCubic(progress);
      const current = Math.round(eased * target);
      el.textContent = current.toLocaleString();

      if (progress < 1) {
        requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString();
      }
    }

    requestAnimationFrame(step);
  }

  if (!('IntersectionObserver' in window)) {
    counters.forEach(animateCounter);
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
})();


/* ──────────────────── VILLAGE DEFICIT CALCULATOR ──────────────────── */
(function initCalculator() {
  const sliders = document.querySelectorAll('.deficit-slider');
  const scoreArc = document.getElementById('scoreArc');
  const scoreValue = document.getElementById('scoreValue');
  const suggestionsList = document.getElementById('suggestions-list');

  if (!sliders.length || !scoreArc || !scoreValue) return;

  const CIRCUMFERENCE = 452.39; // 2π × 72

  const SUGGESTIONS = {
    childcare: {
      color: 'var(--color-terracotta)',
      title: 'Childcare & playdates',
      text: 'Connect with local families for co-care arrangements and playdate networks that give you real breathing room.'
    },
    learning: {
      color: 'var(--color-ochre)',
      title: 'Alternative learning',
      text: "There are families near you building micro-schools and learning pods. You don't have to do education alone."
    },
    household: {
      color: '#A08060',
      title: 'Household operations',
      text: 'Neighborhood skill-swapping transforms household operations. We match families with complementary strengths.'
    },
    emotional: {
      color: 'var(--color-sage)',
      title: 'Emotional & peer connection',
      text: "Our Circle program creates small groups of 4–6 families who meet regularly. Because you weren't meant to carry this alone."
    },
    expert: {
      color: 'var(--color-forest)',
      title: 'Expert guidance',
      text: 'Access vetted doulas, tutors, and family coaches — affordable when shared across a village.'
    }
  };

  function getValues() {
    return Array.from(sliders).map(s => ({
      category: s.dataset.category,
      value: parseInt(s.value, 10)
    }));
  }

  function updateScoreRing(percentage) {
    const offset = CIRCUMFERENCE * (1 - percentage / 100);
    scoreArc.style.strokeDashoffset = offset;
    scoreValue.textContent = percentage;

    // Color shift: low scores lean terracotta, high lean sage
    const hue = 15 + (percentage / 100) * 116; // 15 (terracotta) → 131 (sage)
    const sat = 48 - (percentage / 100) * 10;
    const lit = 54 - (percentage / 100) * 14;
    scoreArc.style.stroke = `hsl(${hue}, ${sat}%, ${lit}%)`;
  }

  function renderSuggestions(values) {
    if (!suggestionsList) return;

    // Find categories scoring below 5 (threshold)
    const weakSpots = values
      .filter(({ value }) => value < 5)
      .sort((a, b) => a.value - b.value)
      .slice(0, 3);

    if (weakSpots.length === 0) {
      suggestionsList.innerHTML = `
        <li class="suggestion-item">
          <span class="suggestion-dot" style="background: var(--color-sage)"></span>
          <div>
            <strong>Your village is strong!</strong>
            <p>You're well supported across all areas. Thrivehaus can help you give back and deepen your connections.</p>
          </div>
        </li>`;
      return;
    }

    suggestionsList.innerHTML = weakSpots.map(({ category }) => {
      const s = SUGGESTIONS[category];
      return `
        <li class="suggestion-item">
          <span class="suggestion-dot" style="background: ${s.color}"></span>
          <div>
            <strong>${s.title}</strong>
            <p>${s.text}</p>
          </div>
        </li>`;
    }).join('');
  }

  function updateCalculator() {
    const values = getValues();
    const avg = values.reduce((sum, { value }) => sum + value, 0) / values.length;
    const percentage = Math.round((avg / 10) * 100);

    updateScoreRing(percentage);
    renderSuggestions(values);

    // Update value display
    values.forEach(({ category, value }) => {
      const display = document.getElementById(`val-${category}`);
      if (display) {
        display.textContent = value;
        // Color feedback
        display.style.color = value < 4
          ? 'var(--color-terracotta)'
          : value >= 7
          ? 'var(--color-sage)'
          : 'var(--color-ochre)';
      }
    });

    // Update slider gradient fill
    sliders.forEach(slider => {
      const val = parseInt(slider.value, 10);
      const pct = (val / 10) * 100;
      slider.style.background = `linear-gradient(to right, var(--color-terracotta) ${pct}%, var(--color-cream-muted) ${pct}%)`;
    });
  }

  sliders.forEach(slider => {
    slider.addEventListener('input', updateCalculator);
    slider.addEventListener('change', updateCalculator);
  });

  // Initialize
  updateCalculator();
})();


/* ──────────────────── SMOOTH SCROLL ──────────────────── */
(function initSmoothScroll() {
  const NAV_HEIGHT = 80;

  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const offsetTop = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });

      // Update focus for accessibility
      target.setAttribute('tabindex', '-1');
      target.focus({ preventScroll: true });
    });
  });
})();


/* ──────────────────── WAITLIST FORM ──────────────────── */
(function initWaitlistForm() {
  const form = document.getElementById('waitlist-form');
  const successState = document.getElementById('waitlist-success');
  if (!form) return;

  function showError(inputId, errorId, message) {
    const input = document.getElementById(inputId);
    const error = document.getElementById(errorId);
    if (input) input.classList.add('is-invalid');
    if (error) error.textContent = message;
  }

  function clearErrors() {
    form.querySelectorAll('.form-input').forEach(el => el.classList.remove('is-invalid'));
    form.querySelectorAll('.form-error').forEach(el => el.textContent = '');
  }

  function validate() {
    clearErrors();
    let valid = true;

    const name = document.getElementById('wl-name');
    const email = document.getElementById('wl-email');
    const zip = document.getElementById('wl-zip');

    if (!name || name.value.trim().length < 2) {
      showError('wl-name', 'wl-name-error', 'Please enter your first name.');
      valid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailPattern.test(email.value.trim())) {
      showError('wl-email', 'wl-email-error', 'Please enter a valid email address.');
      valid = false;
    }

    const zipPattern = /^\d{4,10}$/;
    if (!zip || !zipPattern.test(zip.value.trim().replace(/[\s-]/g, ''))) {
      showError('wl-zip', 'wl-zip-error', 'Please enter a valid zip/postal code.');
      valid = false;
    }

    return valid;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    if (!validate()) return;

    const btn = form.querySelector('.waitlist-submit');
    if (btn) {
      btn.disabled = true;
      btn.textContent = 'Joining your village…';
    }

    // Simulate API call — replace with real fetch() to your backend
    setTimeout(() => {
      form.setAttribute('hidden', '');
      if (successState) {
        successState.removeAttribute('hidden');
        successState.focus();
      }
    }, 1200);
  });

  // Clear error on input
  form.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('input', function () {
      this.classList.remove('is-invalid');
      const errorEl = document.getElementById(`${this.id}-error`);
      if (errorEl) errorEl.textContent = '';
    });
  });
})();


/* ──────────────────── SHARE BUTTON (Web Share API) ──────────────────── */
(function initShareButton() {
  const btn = document.getElementById('share-btn');
  if (!btn) return;

  btn.addEventListener('click', async () => {
    const shareData = {
      title: 'Thrivehaus — Rebuild the Village',
      text: 'Modern families weren\'t meant to do this alone. Join me in rebuilding the village with Thrivehaus.',
      url: window.location.href
    };

    if (navigator.share) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') copyToClipboard();
      }
    } else {
      copyToClipboard();
    }
  });

  function copyToClipboard() {
    navigator.clipboard.writeText(window.location.href).then(() => {
      const btn = document.getElementById('share-btn');
      if (btn) {
        const original = btn.textContent;
        btn.textContent = 'Link copied!';
        setTimeout(() => { btn.textContent = original; }, 2500);
      }
    });
  }
})();


/* ──────────────────── HERO CARD ENTRANCE ANIMATION ──────────────────── */
(function initHeroCards() {
  const cards = document.querySelectorAll('.hero-card');
  if (!cards.length) return;

  cards.forEach((card, i) => {
    card.style.setProperty('--delay', `${0.1 + i * 0.12}s`);
  });
})();


/* ──────────────────── WAYFINDER CARDS ──────────────────── */
(function initWayfinder() {
  document.querySelectorAll('.wayfinder-card[data-target]').forEach(card => {
    card.addEventListener('click', () => {
      const target = document.querySelector(card.dataset.target);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();


/* ──────────────────── MOBILE STICKY CTA ──────────────────── */
(function initMobileStickyCta() {
  const cta = document.getElementById('mobile-sticky-cta');
  const hero = document.querySelector('.hero-section');
  const intake = document.getElementById('intake');
  if (!cta || !hero) return;

  // Add bottom padding to body so sticky bar doesn't cover content
  const addPadding = () => {
    if (window.innerWidth < 640) {
      document.body.style.paddingBottom = cta.offsetHeight + 'px';
    } else {
      document.body.style.paddingBottom = '';
    }
  };

  function onScroll() {
    if (window.innerWidth >= 640) return;

    const heroBottom = hero.getBoundingClientRect().bottom;
    const intakeTop = intake ? intake.getBoundingClientRect().top : Infinity;

    // Show after hero is scrolled past; hide once intake form is visible
    const pastHero = heroBottom < 0;
    const atIntake = intakeTop < window.innerHeight * 0.5;

    if (pastHero && !atIntake) {
      cta.classList.remove('is-hidden');
      cta.setAttribute('aria-hidden', 'false');
    } else {
      cta.classList.add('is-hidden');
      cta.setAttribute('aria-hidden', 'true');
    }
  }

  // Hide sticky CTA when any of its links are clicked
  cta.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      cta.classList.add('is-hidden');
    });
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', addPadding, { passive: true });
  addPadding();
  onScroll();
})();
