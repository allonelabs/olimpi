// OLIMPI — Catalog with StPageFlip library
// Realistic paper-folding page turns

(function () {
  'use strict';

  const bookEl = document.getElementById('book');
  const currentPageEl = document.getElementById('currentPage');
  const totalPagesEl = document.getElementById('totalPages');
  const thumbsContainer = document.getElementById('catalogThumbs');
  const bookScene = document.getElementById('bookScene');
  const wrapper = document.getElementById('catalogWrapper');

  let zoomLevel = 0;

  // ========================================
  // INITIALIZE StPageFlip
  // ========================================
  const pageFlip = new St.PageFlip(bookEl, {
    width: 550,
    height: 733,
    size: 'stretch',
    minWidth: 300,
    maxWidth: 1000,
    minHeight: 400,
    maxHeight: 1350,
    showCover: true,
    flippingTime: 1000,
    useMouseEvents: true,
    swipeDistance: 30,
    showPageCorners: true,
    drawShadow: true,
    maxShadowOpacity: 0.5,
  });

  // Load pages from HTML elements
  pageFlip.loadFromHTML(document.querySelectorAll('.page-content'));

  const totalPages = pageFlip.getPageCount();
  totalPagesEl.textContent = totalPages;

  // ========================================
  // PAGE INDICATOR UPDATE
  // ========================================
  function updatePageIndicator() {
    const currentIndex = pageFlip.getCurrentPageIndex();
    // StPageFlip uses 0-based indexing
    // With showCover, page 0 is the front cover (shown alone),
    // then pages are shown in pairs, last page is back cover (shown alone)

    // The library shows spreads: for the cover it's just page 0,
    // for inner spreads it's two pages, for back cover it's the last page
    if (currentIndex === 0) {
      // Front cover
      currentPageEl.textContent = '1';
    } else if (currentIndex >= totalPages - 1) {
      // Back cover
      currentPageEl.textContent = totalPages;
    } else {
      // Inner spread: currentIndex is the left page (0-based)
      // Display as 1-based pair
      const leftPage = currentIndex + 1;
      const rightPage = currentIndex + 2;
      if (rightPage <= totalPages) {
        currentPageEl.textContent = leftPage + '-' + rightPage;
      } else {
        currentPageEl.textContent = leftPage;
      }
    }

    updateThumbnails();
  }

  // Update book position (centered cover vs spread)
  function updateBookPosition() {
    const currentIndex = pageFlip.getCurrentPageIndex();
    if (currentIndex === 0) {
      bookScene.classList.add('on-cover');
      bookScene.classList.remove('on-back-cover');
    } else if (currentIndex >= totalPages - 1) {
      bookScene.classList.remove('on-cover');
      bookScene.classList.add('on-back-cover');
    } else {
      bookScene.classList.remove('on-cover');
      bookScene.classList.remove('on-back-cover');
    }
  }

  // ========================================
  // PAGE TURN SOUND — synthesized paper swoosh
  // ========================================
  let audioCtx = null;
  let soundEnabled = true;

  function playPageTurnSound() {
    if (!soundEnabled) return;

    // Lazy-init AudioContext (needs user gesture)
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const now = audioCtx.currentTime;
    const duration = 0.35;

    // White noise buffer for paper rustle
    const bufferSize = audioCtx.sampleRate * duration;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = (Math.random() * 2 - 1) * 0.4;
    }

    const noise = audioCtx.createBufferSource();
    noise.buffer = noiseBuffer;

    // Bandpass filter — makes noise sound like paper, not static
    const filter = audioCtx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(3000, now);
    filter.frequency.exponentialRampToValueAtTime(800, now + duration);
    filter.Q.value = 0.8;

    // Volume envelope — quick attack, fast decay
    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.15, now + 0.03);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.001, now + duration);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(audioCtx.destination);

    noise.start(now);
    noise.stop(now + duration);
  }

  // Listen for page flip events
  pageFlip.on('flip', function (e) {
    playPageTurnSound();
    updatePageIndicator();
    updateBookPosition();
  });

  // Initial state — start on cover, centered
  updatePageIndicator();
  updateBookPosition();

  // ========================================
  // NAVIGATION FUNCTIONS
  // ========================================
  function flipNext() {
    pageFlip.flipNext();
  }

  function flipPrev() {
    pageFlip.flipPrev();
  }

  function goToPage(pageNum) {
    // Convert 1-based page number to 0-based index
    const index = pageNum - 1;
    if (index >= 0 && index < totalPages) {
      pageFlip.flip(index);
    }
  }

  function goToFirst() {
    pageFlip.flip(0);
  }

  function goToLast() {
    pageFlip.flip(totalPages - 1);
  }

  // ========================================
  // THUMBNAILS
  // ========================================
  function buildThumbnails() {
    // Build thumbnail entries for each spread state
    // Cover (page 1), then pairs (2-3, 4-5, ..., 14-15), then back cover (16)
    const entries = [];

    // Front cover
    entries.push({ label: '1', page: 0 });

    // Inner spreads (pairs)
    for (let i = 1; i < totalPages - 1; i += 2) {
      const left = i + 1;
      const right = i + 2;
      entries.push({ label: left + '|' + right, page: i });
    }

    // Back cover
    entries.push({ label: String(totalPages), page: totalPages - 1 });

    entries.forEach(function (entry) {
      const thumb = document.createElement('button');
      thumb.className = 'thumb';
      thumb.textContent = entry.label;
      thumb.addEventListener('click', function () {
        pageFlip.flip(entry.page);
      });
      thumbsContainer.appendChild(thumb);
    });
  }

  function updateThumbnails() {
    const currentIndex = pageFlip.getCurrentPageIndex();
    const thumbs = thumbsContainer.querySelectorAll('.thumb');

    thumbs.forEach(function (thumb, i) {
      // Determine which thumb should be active based on current spread
      let isActive = false;

      if (i === 0 && currentIndex === 0) {
        isActive = true;
      } else if (i === thumbs.length - 1 && currentIndex >= totalPages - 1) {
        isActive = true;
      } else if (i > 0 && i < thumbs.length - 1) {
        // Inner spread thumbs: thumb i corresponds to spread starting at page (i*2 - 1) 0-based
        const spreadStart = i * 2 - 1;
        if (currentIndex === spreadStart || currentIndex === spreadStart + 1) {
          isActive = true;
        }
      }

      thumb.classList.toggle('active', isActive);
    });
  }

  buildThumbnails();

  // ========================================
  // TOOLBAR BUTTONS
  // ========================================
  document.getElementById('btnNext').addEventListener('click', flipNext);
  document.getElementById('btnPrev').addEventListener('click', flipPrev);
  document.getElementById('arrowRight').addEventListener('click', flipNext);
  document.getElementById('arrowLeft').addEventListener('click', flipPrev);

  document.getElementById('btnFirst').addEventListener('click', goToFirst);
  document.getElementById('btnLast').addEventListener('click', goToLast);

  // Sound toggle
  var btnSound = document.getElementById('btnSound');
  btnSound.addEventListener('click', function () {
    soundEnabled = !soundEnabled;
    btnSound.classList.toggle('active', soundEnabled);
    btnSound.title = soundEnabled ? 'ხმა ჩართულია' : 'ხმა გამორთულია';
  });

  // Zoom
  document.getElementById('btnZoomIn').addEventListener('click', function () {
    if (zoomLevel < 1) {
      zoomLevel = 1;
      bookScene.classList.add('zoomed-in');
    }
  });

  document.getElementById('btnZoomOut').addEventListener('click', function () {
    if (zoomLevel > 0) {
      zoomLevel = 0;
      bookScene.classList.remove('zoomed-in');
    }
  });

  // Fullscreen
  document.getElementById('btnFullscreen').addEventListener('click', function () {
    wrapper.classList.toggle('fullscreen');
    if (!document.fullscreenElement) {
      if (wrapper.requestFullscreen) {
        wrapper.requestFullscreen();
      } else if (wrapper.webkitRequestFullscreen) {
        wrapper.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
    // Let the library recalculate after resize
    setTimeout(function () {
      pageFlip.update();
    }, 300);
  });

  document.addEventListener('fullscreenchange', function () {
    if (!document.fullscreenElement) {
      wrapper.classList.remove('fullscreen');
      setTimeout(function () {
        pageFlip.update();
      }, 300);
    }
  });

  // Download (placeholder)
  document.getElementById('btnDownload').addEventListener('click', function () {
    alert('PDF ჩამოტვირთვა მალე იქნება ხელმისაწვდომი.');
  });

  // ========================================
  // KEYBOARD NAVIGATION
  // ========================================
  document.addEventListener('keydown', function (e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      flipNext();
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      flipPrev();
    } else if (e.key === 'Home') {
      e.preventDefault();
      goToFirst();
    } else if (e.key === 'End') {
      e.preventDefault();
      goToLast();
    } else if (e.key === 'Escape') {
      wrapper.classList.remove('fullscreen');
      if (document.fullscreenElement) {
        document.exitFullscreen();
      }
    }
  });

  // ========================================
  // TOC LINKS
  // ========================================
  document.querySelectorAll('.toc-item[data-goto]').forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      var targetPage = parseInt(item.dataset.goto, 10);
      goToPage(targetPage);
    });
  });

  // ========================================
  // HEADER (reuse from main)
  // ========================================
  var headerMain = document.getElementById('headerMain');
  if (headerMain) {
    window.addEventListener('scroll', function () {
      headerMain.classList.toggle('scrolled', window.scrollY > 10);
    });
  }

  var menuToggle = document.getElementById('menuToggle');
  var nav = document.getElementById('nav');
  menuToggle.addEventListener('click', function () {
    nav.classList.toggle('open');
  });
  nav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', function () {
      nav.classList.remove('open');
    });
  });

  // Language toggle
  document.querySelectorAll('.lang-switch__btn').forEach(function (btn) {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.lang-switch__btn').forEach(function (b) {
        b.classList.remove('active');
      });
      btn.classList.add('active');
    });
  });

  // ========================================
  // WINDOW RESIZE — Tell library to update
  // ========================================
  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      pageFlip.update();
    }, 200);
  });

})();
