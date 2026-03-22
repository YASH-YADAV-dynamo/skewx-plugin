/* SkewX Docs — theme, drawer, search, tabs, copy, section spy, OTP */

(function () {
  'use strict';

  const html = document.documentElement;
  const stored = localStorage.getItem('skewx-theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  html.setAttribute('data-theme', stored || (prefersDark ? 'dark' : 'light'));

  function setupTheme() {
    const desktopToggle = document.createElement('button');
    desktopToggle.className = 'theme-toggle desktop-only';
    desktopToggle.setAttribute('aria-label', 'Toggle theme');
    desktopToggle.innerHTML = `
      <span class="icon-sun">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41"/></svg>
      </span>
      <span class="icon-moon">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
      </span>`;
    document.body.appendChild(desktopToggle);

    function toggle() {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('skewx-theme', next);
    }
    desktopToggle.addEventListener('click', toggle);
    const mobileToggle = document.getElementById('themeToggle');
    if (mobileToggle) mobileToggle.addEventListener('click', toggle);
  }

  function setupSidebar() {
    const sidebar = document.getElementById('sidebar');
    const hamburger = document.getElementById('hamburger');
    const overlay = document.getElementById('overlay');
    if (!sidebar || !hamburger || !overlay) return;

    function open() {
      sidebar.classList.add('open');
      hamburger.classList.add('open');
      overlay.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      sidebar.classList.remove('open');
      hamburger.classList.remove('open');
      overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', () =>
      sidebar.classList.contains('open') ? close() : open());
    overlay.addEventListener('click', close);

    document.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 768) close();
      });
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 768) close();
    });
  }

  const searchIndex = [
    { title: 'Introduction', section: 'Overview', anchor: 'intro', keywords: 'skewx plugin skill claude readme' },
    { title: 'Quick start', section: 'Overview', anchor: 'quickstart', keywords: 'invoke install begin' },
    { title: 'Install', section: 'Overview', anchor: 'install', keywords: 'plugin marketplace official repo claude-plugins-official' },
    { title: 'What it provides', section: 'Skill', anchor: 'provides', keywords: 'websocket symbol mapping imbalance noise reduction dex' },
    { title: 'Venues', section: 'Skill', anchor: 'venues', keywords: 'pacifica 01 hotstuff paradex hibachi hyperliquid extended aster nado' },
    { title: 'Order book', section: 'Skill', anchor: 'orderbook', keywords: 'imbalance formula lambda kalman ema spike filter regime' },
    { title: 'WebSocket reference', section: 'Reference', anchor: 'websocket', keywords: 'wss subscribe reference.md l2Book' },
    { title: 'Commands', section: 'Reference', anchor: 'skill', keywords: '@skewx skewx skewx:skewx plugin command' },
    { title: 'Use cases', section: 'Skill', anchor: 'usecases', keywords: 'bots arbitrage spread liquidity order flow' },
    { title: 'About these docs', section: 'Meta', anchor: 'about', keywords: 'static docs skill.md plugin.json' },
  ];

  function setupSearch() {
    const input = document.getElementById('searchInput');
    const results = document.getElementById('searchResults');
    if (!input || !results) return;

    let highlighted = -1;

    function query(q) {
      if (!q.trim()) return [];
      const lq = q.toLowerCase();
      return searchIndex
        .filter(
          (item) =>
            item.title.toLowerCase().includes(lq) ||
            item.section.toLowerCase().includes(lq) ||
            item.keywords.toLowerCase().includes(lq)
        )
        .slice(0, 8);
    }

    function navigate(anchor) {
      const el = document.getElementById(anchor);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveLink(anchor);
      }
      closeResults();
    }

    function closeResults() {
      results.hidden = true;
      results.innerHTML = '';
      highlighted = -1;
    }

    function render(items) {
      if (!items.length) {
        results.innerHTML = '<div class="search-empty">No results for this query.</div>';
        results.hidden = false;
        return;
      }
      results.innerHTML = items
        .map(
          (item, i) =>
            `<div class="search-result-item" data-anchor="${item.anchor}" tabindex="-1" data-idx="${i}">
          <span class="sri-title">${item.title}</span>
          <span class="sri-section">${item.section}</span>
        </div>`
        )
        .join('');
      results.hidden = false;
      highlighted = -1;
      results.querySelectorAll('.search-result-item').forEach((el) => {
        el.addEventListener('mousedown', (e) => {
          e.preventDefault();
          navigate(el.dataset.anchor);
        });
      });
    }

    input.addEventListener('input', () => {
      const items = query(input.value);
      if (!input.value.trim()) {
        closeResults();
        return;
      }
      render(items);
    });

    input.addEventListener('keydown', (e) => {
      const items = results.querySelectorAll('.search-result-item');
      if (!items.length) return;
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        highlighted = Math.min(highlighted + 1, items.length - 1);
        items.forEach((el, i) => el.classList.toggle('highlighted', i === highlighted));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        highlighted = Math.max(highlighted - 1, 0);
        items.forEach((el, i) => el.classList.toggle('highlighted', i === highlighted));
      } else if (e.key === 'Enter') {
        const active = results.querySelector('.highlighted');
        if (active) navigate(active.dataset.anchor);
      } else if (e.key === 'Escape') {
        closeResults();
        input.blur();
      }
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-wrap')) closeResults();
    });

    const box = document.getElementById('searchBox');
    if (box) box.addEventListener('click', () => input.focus());

    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        input.focus();
        input.select();
      }
    });

  }

  function setupTabs() {
    document.querySelectorAll('.tabs').forEach((tabs) => {
      const buttons = tabs.querySelectorAll('.tab-btn');
      const panels = tabs.querySelectorAll('.tab-panel');
      buttons.forEach((btn) => {
        btn.addEventListener('click', () => {
          const target = btn.dataset.tab;
          buttons.forEach((b) => b.classList.toggle('active', b.dataset.tab === target));
          panels.forEach((p) => p.classList.toggle('active', p.dataset.panel === target));
        });
      });
    });
  }

  function setupCopy() {
    document.querySelectorAll('.copy-btn').forEach((btn) => {
      btn.addEventListener('click', async () => {
        const text =
          btn.dataset.copy ||
          btn.closest('.code-block')?.querySelector('code')?.textContent?.trim() ||
          '';
        try {
          await navigator.clipboard.writeText(text);
          btn.textContent = 'Copied!';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = 'Copy';
            btn.classList.remove('copied');
          }, 2000);
        } catch (_) {
          btn.textContent = 'Error';
          setTimeout(() => {
            btn.textContent = 'Copy';
          }, 2000);
        }
      });
    });
  }

  function setActiveLink(id) {
    document.querySelectorAll('.nav-link').forEach((link) => {
      link.classList.toggle('active', link.dataset.section === id);
    });
    document.querySelectorAll('.otp-link').forEach((link) => {
      link.classList.toggle('active', link.dataset.anchor === id);
    });
  }

  function setupSectionSpy() {
    const sections = document.querySelectorAll('.doc-section[id]');
    if (!sections.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: '-12% 0px -65% 0px', threshold: 0 }
    );
    sections.forEach((s) => obs.observe(s));
  }

  function buildOTP() {
    const nav = document.getElementById('otpNav');
    if (!nav) return;
    document.querySelectorAll('.doc-section[id]').forEach((section) => {
      const titleEl = section.querySelector('.page-title, .section-title');
      if (!titleEl) return;
      const a = document.createElement('a');
      a.className = 'otp-link';
      a.href = `#${section.id}`;
      a.dataset.anchor = section.id;
      a.textContent = titleEl.textContent;
      a.addEventListener('click', (e) => {
        e.preventDefault();
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
        setActiveLink(section.id);
      });
      nav.appendChild(a);
    });
  }

  function setupHashNav() {
    document.querySelectorAll('a[href^="#"]').forEach((a) => {
      const href = a.getAttribute('href');
      if (href === '#' || href.length < 2) return;
      const id = href.slice(1);
      a.addEventListener('click', (e) => {
        const el = document.getElementById(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
          setActiveLink(id);
          history.pushState(null, '', `#${id}`);
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    setupTheme();
    setupSidebar();
    setupSearch();
    setupTabs();
    setupCopy();
    buildOTP();
    setupSectionSpy();
    setupHashNav();

    const hash = window.location.hash.slice(1);
    if (hash) {
      const el = document.getElementById(hash);
      if (el) {
        setTimeout(() => el.scrollIntoView({ block: 'start' }), 80);
        setActiveLink(hash);
      }
    }
  });
})();
