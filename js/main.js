// OLIMPI — Main JS (tazeay-style)

(function () {
  'use strict';

  // ========================================
  // STICKY HEADER with scroll shadow
  // ========================================
  const headerMain = document.getElementById('headerMain');
  let lastScrollY = 0;

  function handleScroll() {
    const scrollY = window.scrollY;
    headerMain.classList.toggle('scrolled', scrollY > 10);
    lastScrollY = scrollY;
  }

  window.addEventListener('scroll', handleScroll, { passive: true });

  // ========================================
  // MOBILE MENU TOGGLE
  // ========================================
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');

  menuToggle.addEventListener('click', function () {
    nav.classList.toggle('open');
    menuToggle.classList.toggle('active');
    document.body.style.overflow = nav.classList.contains('open') ? 'hidden' : '';
  });

  // Close menu on link click
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
      menuToggle.classList.remove('active');
      document.body.style.overflow = '';
    });
  });

  // ========================================
  // SMOOTH SCROLL for nav links
  // ========================================
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;
      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      var headerHeight = headerMain.offsetHeight;
      var targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    });
  });

  // ========================================
  // HERO PARALLAX-LIKE BACKGROUND
  // ========================================
  var heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    // Parallax is handled via CSS background-attachment: fixed
    // On mobile, it falls back to scroll (set in CSS)
  }

  // ========================================
  // ANIMATED COUNTERS (count up on scroll)
  // ========================================
  var counters = document.querySelectorAll('.fact-card__num[data-target]');

  var counterObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;

      var el = entry.target;
      var target = parseInt(el.dataset.target, 10);
      var suffix = el.dataset.suffix || '';
      var duration = 2000;
      var start = performance.now();

      function tick(now) {
        var elapsed = now - start;
        var progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        var ease = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(target * ease) + suffix;
        if (progress < 1) {
          requestAnimationFrame(tick);
        } else {
          el.textContent = target + suffix;
        }
      }

      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(function (c) {
    counterObserver.observe(c);
  });

  // ========================================
  // GALLERY FILTERING
  // ========================================
  var filterBtns = document.querySelectorAll('.gallery__filter');
  var galleryItems = document.querySelectorAll('.gallery__item');

  filterBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var filter = btn.dataset.filter;

      // Update active state
      filterBtns.forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');

      // Show/hide items with fade
      galleryItems.forEach(function (item) {
        if (filter === 'all' || item.dataset.category === filter) {
          item.classList.remove('hidden');
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          requestAnimationFrame(function () {
            item.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
            item.style.opacity = '1';
            item.style.transform = 'scale(1)';
          });
        } else {
          item.style.opacity = '0';
          item.style.transform = 'scale(0.9)';
          setTimeout(function () {
            item.classList.add('hidden');
          }, 300);
        }
      });
    });
  });

  // ========================================
  // SCROLL REVEAL ANIMATIONS
  // ========================================
  var revealElements = document.querySelectorAll(
    '.product-card, .fact-card, .principle-card, .gallery__item, ' +
    '.contact__info-card, .contact__form, .about__image, .about__content, ' +
    '.sub-about__layout, .news-card'
  );

  var revealObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.06,
    rootMargin: '0px 0px -40px 0px'
  });

  revealElements.forEach(function (el, i) {
    el.classList.add('reveal');
    // Stagger within groups of 4
    var delay = (i % 4) * 100;
    el.style.transitionDelay = delay + 'ms';
    revealObserver.observe(el);
  });

  // ========================================
  // CONTACT FORM SUBMIT (demo)
  // ========================================
  var form = document.getElementById('contactForm');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    var btn = form.querySelector('button[type="submit"]');
    var originalText = btn.textContent;

    // Disable button
    btn.disabled = true;
    btn.textContent = 'იგზავნება...';
    btn.style.opacity = '0.7';

    // Simulate sending
    setTimeout(function () {
      btn.textContent = 'გაგზავნილია!';
      btn.style.background = '#2e7d32';
      btn.style.opacity = '1';

      setTimeout(function () {
        btn.textContent = originalText;
        btn.style.background = '';
        btn.disabled = false;
        form.reset();
      }, 2500);
    }, 800);
  });

  // ========================================
  // LANGUAGE SWITCHER (demo toggle)
  // ========================================
  document.querySelectorAll('.lang-switch__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.lang-switch__btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
    });
  });

  // ========================================
  // ACTIVE NAV LINK ON SCROLL
  // ========================================
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  function updateActiveNav() {
    var scrollPos = window.scrollY + headerMain.offsetHeight + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('nav__link--active');
          var href = link.getAttribute('href');
          if (href === '#' + id) {
            link.classList.add('nav__link--active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

})();
