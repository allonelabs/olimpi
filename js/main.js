// OLIMPI — Main JS (tazeay-style)

(function () {
  'use strict';

  // ========================================
  // STICKY HEADER
  // ========================================
  const headerMain = document.getElementById('headerMain');
  window.addEventListener('scroll', () => {
    headerMain.classList.toggle('scrolled', window.scrollY > 10);
  });

  // ========================================
  // MOBILE MENU
  // ========================================
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
  });

  // Close on link click
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });

  // ========================================
  // HERO SLIDER
  // ========================================
  const slides = document.querySelectorAll('.hero__slide');
  const dotsContainer = document.getElementById('heroDots');
  let currentSlide = 0;
  let slideInterval;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'hero__dot' + (i === 0 ? ' hero__dot--active' : '');
    dot.addEventListener('click', () => goToSlide(i));
    dotsContainer.appendChild(dot);
  });

  function goToSlide(index) {
    slides[currentSlide].classList.remove('hero__slide--active');
    dotsContainer.children[currentSlide].classList.remove('hero__dot--active');
    currentSlide = index;
    slides[currentSlide].classList.add('hero__slide--active');
    dotsContainer.children[currentSlide].classList.add('hero__dot--active');
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function prevSlide() {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  document.getElementById('heroNext').addEventListener('click', () => {
    nextSlide();
    resetAutoplay();
  });
  document.getElementById('heroPrev').addEventListener('click', () => {
    prevSlide();
    resetAutoplay();
  });

  function startAutoplay() {
    slideInterval = setInterval(nextSlide, 5000);
  }
  function resetAutoplay() {
    clearInterval(slideInterval);
    startAutoplay();
  }
  startAutoplay();

  // ========================================
  // ANIMATED COUNTERS
  // ========================================
  const counters = document.querySelectorAll('.fact-card__num[data-target]');

  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.target, 10);
      const duration = 1800;
      const start = performance.now();

      function tick(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * ease);
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target;
        }
      }
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => counterObserver.observe(c));

  // ========================================
  // GALLERY FILTER
  // ========================================
  const filterBtns = document.querySelectorAll('.gallery__filter');
  const galleryItems = document.querySelectorAll('.gallery__item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter;

      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      galleryItems.forEach(item => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
        } else {
          item.classList.add('hidden');
        }
      });
    });
  });

  // ========================================
  // SCROLL REVEAL
  // ========================================
  const reveals = document.querySelectorAll(
    '.product-card, .fact-card, .principle-card, .gallery__item, .contact__info-card, .contact__form, .about__image, .about__content'
  );

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

  reveals.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity 0.5s ease ${i % 4 * 80}ms, transform 0.5s ease ${i % 4 * 80}ms`;
    revealObserver.observe(el);
  });

  // ========================================
  // CONTACT FORM
  // ========================================
  const form = document.getElementById('contactForm');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = 'შეტყობინება გაგზავნილია!';
    btn.style.background = '#2e7d32';
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      form.reset();
    }, 2500);
  });

  // ========================================
  // LANGUAGE SWITCH (demo)
  // ========================================
  document.querySelectorAll('.lang-switch__btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.lang-switch__btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

})();
