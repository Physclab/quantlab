// â”€â”€ CURSOR
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  document.addEventListener('mousemove', e => {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
    ring.style.left = e.clientX + 'px';
    ring.style.top = e.clientY + 'px';
  });

  // â”€â”€ COUNTER ANIMATION
  function animateCounter(el, target, duration = 1400) {
    const start = performance.now();
    const update = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.round(eased * target);
      if (progress < 1) requestAnimationFrame(update);
    };
    requestAnimationFrame(update);
  }

  const counters = document.querySelectorAll('[data-target]');
  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        animateCounter(e.target, parseInt(e.target.dataset.target));
        counterObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.5 });
  counters.forEach(c => counterObserver.observe(c));

  // â”€â”€ SCROLL REVEAL
  const reveals = document.querySelectorAll('.reveal, .step');
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach((e, i) => {
      if (e.isIntersecting) {
        setTimeout(() => e.target.classList.add('visible'), e.target.dataset.delay || 0);
        revealObserver.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });

  reveals.forEach((el, i) => {
    el.style.transitionDelay = (i % 4) * 80 + 'ms';
    revealObserver.observe(el);
  });

  // â”€â”€ CAROUSEL
  const track = document.getElementById('track');
  const slides = track.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.dot');
  let current = 0;
  let slidesVisible = window.innerWidth < 700 ? 1 : window.innerWidth < 1100 ? 2 : 3;

  function getSlideWidth() {
    return slides[0].offsetWidth + 24;
  }

  function goTo(idx) {
    const max = slides.length - slidesVisible;
    current = Math.max(0, Math.min(idx, max));
    track.style.transform = `translateX(-${current * getSlideWidth()}px)`;
    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  document.getElementById('next').addEventListener('click', () => goTo(current + 1));
  document.getElementById('prev').addEventListener('click', () => goTo(current - 1));
  dots.forEach((d, i) => d.addEventListener('click', () => goTo(i)));

  // Auto-advance carousel
  setInterval(() => goTo((current + 1) % (slides.length - slidesVisible + 1)), 4500);

  window.addEventListener('resize', () => {
    slidesVisible = window.innerWidth < 700 ? 1 : window.innerWidth < 1100 ? 2 : 3;
    goTo(current);
  });

  // â”€â”€ TIMEFRAME CHIPS
  document.querySelectorAll('.tf-chip').forEach(chip => {
    chip.addEventListener('click', function() {
      document.querySelectorAll('.tf-chip').forEach(c => c.classList.remove('active'));
      this.classList.add('active');
    });
  });

  // â”€â”€ PARALLAX on hero glow
  document.addEventListener('mousemove', e => {
    const glow = document.querySelector('.hero-glow');
    if (!glow) return;
    const x = (e.clientX / window.innerWidth - 0.5) * 40;
    const y = (e.clientY / window.innerHeight - 0.5) * 40;
    glow.style.transform = `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`;
  });
