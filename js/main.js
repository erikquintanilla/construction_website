(() => {
  const getAll = (selector) => Array.from(document.querySelectorAll(selector));

  const throttle = (fn, waitMs) => {
    let lastCall = 0;
    let pending = null;

    return (...args) => {
      const now = Date.now();
      const remaining = waitMs - (now - lastCall);

      if (remaining <= 0) {
        lastCall = now;
        fn(...args);
        return;
      }

      if (pending) return;
      pending = window.setTimeout(() => {
        pending = null;
        lastCall = Date.now();
        fn(...args);
      }, remaining);
    };
  };

  const setNavScrolledState = () => {
    const nav = document.getElementById('main-nav') || document.querySelector('nav');
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 40);
  };

  const updateHeroBlur = () => {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;
    const maxBlur = 8;
    const blurVal = Math.min(maxBlur, window.scrollY / 100);
    heroBg.style.filter = `blur(${blurVal}px)`;
  };

  const onScroll = throttle(() => {
    try {
      setNavScrolledState();
      updateHeroBlur();
    } catch (err) {
      console.error('Scroll handler failed', err);
    }
  }, 50);

  const initScroll = () => {
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  };

  const initScrollReveal = () => {
    const reveals = getAll('.reveal');
    if (reveals.length === 0) return;

    if (!('IntersectionObserver' in window)) {
      reveals.forEach((el) => el.classList.add('visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          try {
            const parent = entry.target.parentElement;
            const siblings = parent ? Array.from(parent.querySelectorAll('.reveal')) : [];
            const idx = siblings.indexOf(entry.target);

            window.setTimeout(
              () => entry.target.classList.add('visible'),
              (idx >= 0 ? idx : 0) * 80
            );

            observer.unobserve(entry.target);
          } catch (err) {
            console.error('Reveal animation failed', err);
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    reveals.forEach((el) => observer.observe(el));
  };

  const initPortfolioFilters = () => {
    const buttons = getAll('.filter-btn');
    if (buttons.length === 0) return;

    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        try {
          buttons.forEach((b) => b.classList.remove('active'));
          btn.classList.add('active');
        } catch (err) {
          console.error('Portfolio filter click failed', err);
        }
      });
    });
  };

  const handleSubmit = (e) => {
    try {
      if (!e || !e.preventDefault) return;
      e.preventDefault();

      const form = e.target;
      if (!form) return;

      const btn = form.querySelector('.form-submit');
      if (!btn) {
        form.reset();
        return;
      }

      const originalText = btn.textContent;
      btn.textContent = 'Request Sent ✓';
      btn.style.background = '#4a7c59';
      btn.style.color = '#fff';
      btn.disabled = true;

      window.setTimeout(() => {
        btn.textContent = originalText || 'Submit Request';
        btn.style.background = '';
        btn.style.color = '';
        btn.disabled = false;
        form.reset();
      }, 3000);
    } catch (err) {
      console.error('Form submit handler failed', err);
    }
  };

  // Needed because your form uses onsubmit="handleSubmit(event)"
  window.handleSubmit = handleSubmit;

  document.addEventListener('DOMContentLoaded', () => {
    initScroll();
    initScrollReveal();
    initPortfolioFilters();
  });
})();