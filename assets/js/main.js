/* =========================================================
   CATCH · Real Seafood · Lubumbashi
   Interactions & scroll animations (GSAP + ScrollTrigger + Lenis)
   ========================================================= */
(() => {
  'use strict';

  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const DATA = window.CATCH_MENU;

  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  const isDesktop = () => window.matchMedia('(min-width: 901px)').matches;

  gsap.registerPlugin(ScrollTrigger, SplitText);
  gsap.defaults({ ease: 'expo.out', duration: 1.1 });

  const fmtPrice = (p) => {
    if (p === 'SQ') return 'SQ';
    if (typeof p === 'number') return `$${p}`;
    return String(p).split('/').map((x) => `$${x.trim()}`).join(' / ');
  };
  const esc = (s = '') => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------------------------------------------------------
     Smooth scroll
     --------------------------------------------------------- */
  let lenis = null;
  if (!reduced && typeof Lenis !== 'undefined') {
    lenis = new Lenis({ lerp: 0.095, smoothWheel: true, wheelMultiplier: 0.95 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    lenis.stop();
  }

  const scrollToTarget = (target) => {
    const el = typeof target === 'string' ? $(target) : target;
    if (!el) return;
    if (lenis) lenis.scrollTo(el, { offset: 0, duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) });
    else el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  };

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const id = a.getAttribute('href');
    if (id.length < 2 || !$(id)) return;
    e.preventDefault();
    if (document.body.classList.contains('menu-open')) {
      closeMobileNav();
      setTimeout(() => scrollToTarget(id), 450);
    } else {
      scrollToTarget(id);
    }
  });

  /* =========================================================
     BUILD: menu, bar, gallery
     ========================================================= */
  let lang = 'en';
  let activeCat = DATA.food[0].id;

  const tabsEl = $('.menu__tabs');
  const panelsEl = $('.menu__panels');
  const coversEl = $('.menu__covers');

  const dishHTML = (d) => {
    const name = lang === 'fr' ? d.fr || d.name : d.name;
    const desc = lang === 'fr' ? d.fr_d : d.en_d;
    const tag = d.tag ? `<span class="dish__tag">${esc(d.tag[lang])}</span>` : '';
    const cam = d.img ? '<svg class="dish__cam" aria-hidden="true"><use href="#i-camera"/></svg>' : '';
    const thumb = d.img ? `<div class="dish__thumb"><img src="${d.img}" alt="${esc(d.name)}" loading="lazy"></div>` : '';
    const attrs = d.img ? ` data-img="${d.img}" tabindex="0" aria-label="${esc(name)}, ${esc(fmtPrice(d.price))}. Show photo"` : '';
    return `<li class="dish"${attrs}>
      <div class="dish__row"><h4 class="dish__name">${esc(name)}</h4>${cam}<span class="dish__dots"></span><span class="dish__price">${fmtPrice(d.price)}</span></div>
      <p class="dish__desc">${esc(desc)}</p>${tag}${thumb}
    </li>`;
  };

  const buildMenu = () => {
    tabsEl.innerHTML = DATA.food.map((c, i) => `
      <button class="menu-tab${c.id === activeCat ? ' is-active' : ''}" role="tab" id="tab-${c.id}" aria-controls="panel-${c.id}" aria-selected="${c.id === activeCat}" data-cat="${c.id}">
        <small>${String(i + 1).padStart(2, '0')}</small><span>${esc(c.label[lang])}</span>
      </button>`).join('');

    panelsEl.innerHTML = DATA.food.map((c) => `
      <div class="menu-panel" role="tabpanel" id="panel-${c.id}" aria-labelledby="tab-${c.id}"${c.id === activeCat ? '' : ' hidden'}>
        <p class="menu-panel__script" aria-hidden="true">${esc(c.script)}</p>
        ${c.note ? `<p class="menu-panel__note">${esc(c.note[lang])}</p>` : ''}
        ${c.groups.map((g) => `
          <div class="menu-group">
            <h3 class="menu-group__title">${esc(g.title[lang])}</h3>
            <ul class="menu-list">${g.items.map(dishHTML).join('')}</ul>
          </div>`).join('')}
      </div>`).join('');

    if (!coversEl.children.length) {
      const c = DATA.food.find((x) => x.id === activeCat);
      coversEl.innerHTML = c.cover.map((src, i) => `<figure class="menu__cover menu__cover--${i + 1}"><img src="${src}" alt=""></figure>`).join('');
    }
  };

  const animatePanelIn = (panel) => {
    const items = $$('.menu-panel__script, .menu-panel__note, .menu-group__title, .dish', panel);
    gsap.fromTo(items, { autoAlpha: 0, y: 26 }, { autoAlpha: 1, y: 0, duration: 0.9, stagger: 0.035, overwrite: true, clearProps: 'transform' });
  };

  const swapCovers = (cat) => {
    const figs = $$('.menu__cover', coversEl);
    gsap.timeline()
      .to(figs, { autoAlpha: 0, y: 30, rotate: (i) => (i ? 14 : -14), duration: 0.45, ease: 'power3.in', stagger: 0.05 })
      .add(() => figs.forEach((f, i) => { $('img', f).src = cat.cover[i]; }))
      .fromTo(figs, { autoAlpha: 0, y: -30, rotate: (i) => (i ? -6 : 6) }, { autoAlpha: 1, y: 0, rotate: 0, duration: 1, stagger: 0.08 });
  };

  const selectCat = (id, focus = false) => {
    if (id === activeCat) return;
    const cur = $(`#panel-${activeCat}`);
    const cat = DATA.food.find((x) => x.id === id);
    activeCat = id;
    $$('.menu-tab', tabsEl).forEach((t) => {
      const on = t.dataset.cat === id;
      t.classList.toggle('is-active', on);
      t.setAttribute('aria-selected', on);
      if (on && focus) t.focus();
      if (on && !isDesktop()) t.scrollIntoView({ inline: 'center', block: 'nearest', behavior: reduced ? 'auto' : 'smooth' });
    });
    gsap.to(cur, {
      autoAlpha: 0, y: -16, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        // resolve against the latest choice so fast clicks never leave two panels open
        $$('.menu-panel', panelsEl).forEach((p) => {
          p.hidden = p.id !== `panel-${activeCat}`;
          gsap.set(p, { clearProps: 'opacity,visibility,transform' });
        });
        animatePanelIn($(`#panel-${activeCat}`));
        ScrollTrigger.refresh();
        const top = $('.menu__panels').getBoundingClientRect().top;
        if (top < 0) scrollToTarget(isDesktop() ? '#menu' : '.menu__panels');
      }
    });
    if (isDesktop()) swapCovers(cat);
  };

  tabsEl.addEventListener('click', (e) => {
    const t = e.target.closest('.menu-tab');
    if (t) selectCat(t.dataset.cat);
  });
  tabsEl.addEventListener('keydown', (e) => {
    if (!['ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    e.preventDefault();
    const ids = DATA.food.map((c) => c.id);
    const i = ids.indexOf(activeCat);
    const dir = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : -1;
    selectCat(ids[(i + dir + ids.length) % ids.length], true);
  });

  // EN / FR toggle
  const langToggle = $('.lang-toggle');
  langToggle.addEventListener('click', (e) => {
    const b = e.target.closest('button[data-lang]');
    if (!b || b.dataset.lang === lang) return;
    lang = b.dataset.lang;
    langToggle.classList.toggle('is-fr', lang === 'fr');
    $$('button', langToggle).forEach((x) => {
      x.classList.toggle('is-active', x === b);
      x.setAttribute('aria-pressed', x === b);
    });
    buildMenu();
    animatePanelIn($(`#panel-${activeCat}`));
    ScrollTrigger.refresh();
  });

  // Mobile: tap a dish with a photo to reveal it
  panelsEl.addEventListener('click', (e) => {
    const d = e.target.closest('.dish[data-img]');
    if (!d || isDesktop()) return;
    d.classList.toggle('is-open');
    setTimeout(() => ScrollTrigger.refresh(), 520);
  });
  panelsEl.addEventListener('keydown', (e) => {
    const d = e.target.closest('.dish[data-img]');
    if (d && (e.key === 'Enter' || e.key === ' ')) { e.preventDefault(); d.classList.toggle('is-open'); }
  });

  // Desktop: floating photo preview follows the cursor
  if (finePointer) {
    const preview = $('.dish-preview');
    const pImg = $('img', preview);
    const px = gsap.quickTo(preview, 'x', { duration: 0.55, ease: 'power3' });
    const py = gsap.quickTo(preview, 'y', { duration: 0.55, ease: 'power3' });
    let over = null;
    panelsEl.addEventListener('mousemove', (e) => {
      // keep the card on screen: flip to the left of the cursor near the right edge
      px(e.clientX + 290 > window.innerWidth ? e.clientX - 290 : e.clientX + 28);
      py(gsap.utils.clamp(10, window.innerHeight - 330, e.clientY - 150));
      const d = e.target.closest('.dish[data-img]');
      if (d === over) return;
      over = d;
      if (d) {
        if (pImg.getAttribute('src') !== d.dataset.img) pImg.src = d.dataset.img;
        gsap.to(preview, { opacity: 1, scale: 1, rotate: gsap.utils.random(-4, 4), duration: 0.6 });
      } else {
        gsap.to(preview, { opacity: 0, scale: 0.6, duration: 0.4, ease: 'power3' });
      }
    });
    panelsEl.addEventListener('mouseleave', () => {
      over = null;
      gsap.to(preview, { opacity: 0, scale: 0.6, duration: 0.4, ease: 'power3' });
    });
  }

  /* ---------- Bar ---------- */
  const barPanel = $('.bar__panel');
  const drinkBtn = (d) => `<button class="drink" style="--c:${d.c}" data-name="${esc(d.name)}" data-desc="${esc(d.d)}" data-price="${d.price}" data-color="${d.c}">
      <span class="drink__dot"></span><span class="drink__name">${esc(d.name)}</span><span class="drink__line"></span><span class="drink__price">${fmtPrice(d.price)}</span>
    </button>`;
  const rows = (items) => items.map(([n, p]) => `<div class="spirit-row"><span>${esc(n)}</span><span class="drink__line"></span><span class="drink__price">${fmtPrice(p)}</span></div>`).join('');

  const barViews = {
    cocktails: () => `<div class="drinks">${DATA.cocktails.map(drinkBtn).join('')}</div>`,
    bubbles: () => `<div class="drinks">
        <p class="bar-subtitle">Champagne cocktails</p>${DATA.bubbles.map(drinkBtn).join('')}
        <p class="bar-subtitle">Shooters</p>${DATA.shooters.map(drinkBtn).join('')}
      </div>`,
    wines: () => `<div class="wines">${DATA.wines.map((g) => `
        <div class="wine-group"><h4>${esc(g.title)}</h4>${g.items.map((w) => `
          <div class="wine"><div class="wine__row"><span class="wine__name">${esc(w.name)}</span><span class="drink__line"></span><span class="drink__price">${fmtPrice(w.price)}</span></div>${w.d ? `<p class="wine__note">${esc(w.d)}</p>` : ''}</div>`).join('')}
        </div>`).join('')}
        <p class="wines__french">French wines are available too: ask your waiter for today’s selection.</p>
      </div>`,
    spirits: () => `<div class="spirits">${DATA.spirits.map((g) => `<div class="wine-group"><h4>${esc(g.title)}</h4>${rows(g.items)}</div>`).join('')}</div>`,
    beers: () => `<div class="spirits">${DATA.beers.map((g) => `<div class="wine-group"><h4>${esc(g.title)} beers</h4>${rows(g.items)}</div>`).join('')}</div>`
  };
  let barView = 'cocktails';
  barPanel.innerHTML = barViews.cocktails();

  $('.bar__tabs').addEventListener('click', (e) => {
    const b = e.target.closest('button[data-bar]');
    if (!b || b.dataset.bar === barView) return;
    barView = b.dataset.bar;
    $$('.bar__tabs button').forEach((x) => {
      x.classList.toggle('is-active', x === b);
      x.setAttribute('aria-selected', x === b);
    });
    gsap.to(barPanel, {
      autoAlpha: 0, y: 14, duration: 0.25, ease: 'power2.in',
      onComplete: () => {
        barPanel.innerHTML = barViews[barView]();
        gsap.fromTo(barPanel, { autoAlpha: 0, y: 20 }, { autoAlpha: 1, y: 0, duration: 0.8 });
        gsap.from($$('.drink, .wine, .spirit-row, .bar-subtitle, h4', barPanel), { autoAlpha: 0, y: 14, stagger: 0.012, duration: 0.7 });
        ScrollTrigger.refresh();
      }
    });
  });

  const barSection = $('.bar');
  const nowName = $('.bar__now-name');
  const nowDesc = $('.bar__now-desc');
  const nowPrice = $('.bar__now-price');
  let currentDrink = null;
  const setDrink = (btn) => {
    if (!btn || btn === currentDrink) return;
    currentDrink?.classList.remove('is-active');
    currentDrink = btn;
    btn.classList.add('is-active');
    const { name, desc, price, color } = btn.dataset;
    if (!reduced) {
      gsap.timeline()
        .to('.glass__fill', { y: 46, duration: 0.3, ease: 'power2.in' })
        .add(() => barSection.style.setProperty('--drink', color))
        .to('.glass__fill', { y: 0, duration: 0.9, ease: 'elastic.out(1, 0.55)' });
    } else {
      barSection.style.setProperty('--drink', color);
    }
    gsap.timeline()
      .to([nowName, nowDesc, nowPrice], { autoAlpha: 0, y: -10, duration: 0.18, ease: 'power2.in', stagger: 0.03 })
      .add(() => {
        nowName.textContent = name;
        nowDesc.textContent = desc;
        nowPrice.textContent = fmtPrice(isNaN(+price) ? price : +price);
      })
      .to([nowName, nowDesc, nowPrice], { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.05 });
  };
  barPanel.addEventListener('mouseover', (e) => setDrink(e.target.closest('.drink')));
  barPanel.addEventListener('focusin', (e) => setDrink(e.target.closest('.drink')));
  barPanel.addEventListener('click', (e) => setDrink(e.target.closest('.drink')));

  /* ---------- Gallery ---------- */
  const GALLERY = [
    ['venue/terrace.webp', 'Terrace tables facing the lake', '3/4'],
    ['food/prawn-pasta.webp', 'Prawn pasta', '4/5'],
    ['food/full-monty.webp', 'The Full Monty breakfast', '1/1'],
    ['venue/burger-lakeside.webp', 'Burger with a lake view', '3/4'],
    ['food/calamari-salad.webp', 'Calamari salad', '1/1'],
    ['venue/interior.webp', 'The dining room and long bar', '16/10'],
    ['food/chicken-caesar.webp', 'Chicken Caesar salad', '1/1'],
    ['food/oreo-shake.webp', 'Oreo milkshake', '3/4'],
    ['food/dagalicious.webp', 'Dagalicious burger', '3/4'],
    ['food/smoked-salmon-salad.webp', 'Smoked salmon salad', '1/1'],
    ['venue/dessert-lakeside.webp', 'Dessert by the water', '3/4'],
    ['food/meaty-mania.webp', 'Meaty Mania platter', '1/1'],
    ['food/greek-salad.webp', 'Greek salad on the terrace', '3/4'],
    ['food/ribs.webp', 'Rib basket', '3/4'],
    ['food/wraps.webp', 'Santa Fe & Cuban wraps', '3/4'],
    ['venue/lakeside-lunch.webp', 'Lunch under the umbrellas', '3/4'],
    ['food/grilled-platter.webp', 'Grilled chicken platter', '1/1'],
    ['food/triple-decker.webp', 'Emperor Triple Decker', '3/4'],
    ['food/sundae.webp', 'Ice cream sundae', '3/4'],
    ['food/breakfast.webp', 'Breakfast on the terrace', '1/1'],
    ['food/prawn-pasta-2.webp', 'Prawn pasta, Legends side', '4/5'],
    ['food/chicken-burger.webp', 'Chicken burger with wedges', '3/4'],
    ['food/eggs-terrace.webp', 'On the Run breakfast', '3/4'],
    ['food/not-so-fast.webp', 'Not So Fast breakfast', '3/4']
  ];
  const galleryCols = $('.gallery__cols');
  const buildGallery = (cols) => {
    const colHTML = Array.from({ length: cols }, () => []);
    GALLERY.forEach(([src, cap, ar], i) => {
      colHTML[i % cols].push(`<figure class="gallery__item" data-index="${i}" data-cursor="view" style="--ar:${ar}">
        <img src="assets/img/${src}" alt="${esc(cap)}" loading="lazy"><figcaption>${esc(cap)}</figcaption></figure>`);
    });
    galleryCols.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
    galleryCols.innerHTML = colHTML.map((c) => `<div class="gallery__col">${c.join('')}</div>`).join('');
  };

  // Stats: keep counts in sync with the data
  const cocktailCount = DATA.cocktails.length + DATA.bubbles.length + DATA.shooters.length;
  const wineCount = DATA.wines.reduce((n, g) => n + g.items.length, 0);
  $('.js-count-cocktails')?.setAttribute('data-to', cocktailCount);
  $('.js-count-wines')?.setAttribute('data-to', wineCount);

  buildMenu();

  /* =========================================================
     LIGHTBOX
     ========================================================= */
  const lb = $('.lightbox');
  const lbImg = $('img', lb);
  const lbCap = $('figcaption', lb);
  let lbIndex = 0;
  const lbShow = (i) => {
    lbIndex = (i + GALLERY.length) % GALLERY.length;
    const [src, cap] = GALLERY[lbIndex];
    gsap.fromTo(lbImg, { autoAlpha: 0, scale: 0.96 }, { autoAlpha: 1, scale: 1, duration: 0.6 });
    lbImg.src = `assets/img/${src}`;
    lbImg.alt = cap;
    lbCap.textContent = cap;
  };
  const lbOpen = (i) => {
    lb.hidden = false;
    lenis?.stop();
    gsap.fromTo(lb, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.4, ease: 'power2.out' });
    lbShow(i);
    $('.lightbox__close', lb).focus();
  };
  const lbClose = () => {
    gsap.to(lb, { autoAlpha: 0, duration: 0.3, onComplete: () => { lb.hidden = true; } });
    lenis?.start();
  };
  galleryCols.addEventListener('click', (e) => {
    const f = e.target.closest('.gallery__item');
    if (f) lbOpen(+f.dataset.index);
  });
  $('.lightbox__close', lb).addEventListener('click', lbClose);
  $('.lightbox__prev', lb).addEventListener('click', () => lbShow(lbIndex - 1));
  $('.lightbox__next', lb).addEventListener('click', () => lbShow(lbIndex + 1));
  lb.addEventListener('click', (e) => { if (e.target === lb) lbClose(); });
  document.addEventListener('keydown', (e) => {
    if (lb.hidden) return;
    if (e.key === 'Escape') lbClose();
    if (e.key === 'ArrowLeft') lbShow(lbIndex - 1);
    if (e.key === 'ArrowRight') lbShow(lbIndex + 1);
  });

  /* =========================================================
     NAV
     ========================================================= */
  const nav = $('.nav');
  const burger = $('.nav__burger');
  const mobileNav = $('.mobile-nav');
  let navOpen = false;

  const openMobileNav = () => {
    navOpen = true;
    document.body.classList.add('menu-open');
    burger.setAttribute('aria-expanded', 'true');
    mobileNav.setAttribute('aria-hidden', 'false');
    lenis?.stop();
    gsap.timeline()
      .fromTo('.mobile-nav__bg', { clipPath: 'circle(0% at calc(100% - 44px) 42px)' }, { clipPath: 'circle(150% at calc(100% - 44px) 42px)', duration: 0.9, ease: 'power3.inOut' })
      .fromTo('.mobile-nav__links a', { yPercent: 110, autoAlpha: 0 }, { yPercent: 0, autoAlpha: 1, stagger: 0.06, duration: 0.8 }, '-=0.35')
      .fromTo('.mobile-nav__foot', { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.5 }, '-=0.5');
  };
  function closeMobileNav() {
    if (!navOpen) return;
    navOpen = false;
    burger.setAttribute('aria-expanded', 'false');
    mobileNav.setAttribute('aria-hidden', 'true');
    gsap.timeline({ onComplete: () => document.body.classList.remove('menu-open') })
      .to('.mobile-nav__links a, .mobile-nav__foot', { autoAlpha: 0, y: -20, stagger: 0.03, duration: 0.3, ease: 'power2.in' })
      .to('.mobile-nav__bg', { clipPath: 'circle(0% at calc(100% - 44px) 42px)', duration: 0.6, ease: 'power3.inOut' }, '-=0.1')
      .set('.mobile-nav__links a, .mobile-nav__foot', { clearProps: 'all' });
    lenis?.start();
  }
  burger.addEventListener('click', () => (navOpen ? closeMobileNav() : openMobileNav()));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && navOpen) closeMobileNav(); });

  /* =========================================================
     PRELOADER → HERO INTRO
     ========================================================= */
  const pre = $('.preloader');
  let introPlayed = false;

  const finishLoading = () => {
    if (introPlayed) return;
    introPlayed = true;
    document.body.classList.remove('is-loading');
    lenis?.start();
    heroIntro();
    gsap.to('.depth', { opacity: 1, duration: 1, delay: 1 });
  };

  const runPreloader = () => {
    if (reduced || !pre) {
      pre?.remove();
      finishLoading();
      return;
    }
    const counter = { v: 0 };
    const countEl = $('.js-count', pre);
    const ready = Promise.race([
      Promise.all([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => (document.readyState === 'complete' ? r() : window.addEventListener('load', r, { once: true })))]),
      new Promise((r) => setTimeout(r, 2600))
    ]);

    const tl = gsap.timeline();
    tl.to('.pl-sweep', { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut' })
      .to('.pl-wipe', { attr: { width: 1860 }, duration: 1.3, ease: 'power3.inOut' }, 0.35)
      .to('.preloader__tag span', { opacity: 1, y: 0, stagger: 0.12, duration: 0.8 }, 0.9)
      .to(counter, { v: 86, duration: 1.8, ease: 'power1.inOut', onUpdate: () => { countEl.textContent = Math.round(counter.v); } }, 0);

    ready.then(() => {
      tl.then(() => {
        gsap.timeline({ onComplete: () => pre.remove() })
          .to(counter, { v: 100, duration: 0.4, ease: 'power1.out', onUpdate: () => { countEl.textContent = Math.round(counter.v); } })
          .to('.preloader__inner', { y: -50, autoAlpha: 0, duration: 0.7, ease: 'power3.in' }, '+=0.1')
          .add(finishLoading, '-=0.15')
          .to('.js-pl-wave', { attr: { d: 'M0 0 H1440 V0 Q720 160 0 0 Z' }, duration: 0.6, ease: 'power2.in' }, '<')
          .to(pre, { yPercent: -100, duration: 1.05, ease: 'power4.inOut' }, '<')
          .to('.js-pl-wave', { attr: { d: 'M0 0 H1440 V0 Q720 0 0 0 Z' }, duration: 0.6, ease: 'power2.out' }, '-=0.45');
      });
    });
  };

  // Safety net: never leave a visitor stuck behind the preloader
  setTimeout(() => {
    if (!introPlayed) {
      pre?.remove();
      finishLoading();
    }
  }, 8000);

  function heroIntro() {
    if (reduced) return;
    const tl = gsap.timeline({ delay: 0.15 });
    tl.from('.hero__eyebrow > *', { y: 20, autoAlpha: 0, stagger: 0.06, duration: 1 })
      .from('.hero__swoosh', { rotation: -70, svgOrigin: '1600 880', autoAlpha: 0, duration: 1.8, ease: 'expo.out' }, 0.05)
      .from('.hero__logo', { scale: 0.86, autoAlpha: 0, duration: 1.6 }, 0.1)
      .from('.hero__script', { clipPath: 'inset(-20% 100% -20% 0)', duration: 1.4, ease: 'power3.inOut', clearProps: 'clipPath' }, 0.6)
      .from('.hero__lede', { y: 24, autoAlpha: 0 }, 0.8)
      .from('.hero__cta > *', { y: 24, autoAlpha: 0, stagger: 0.1 }, 0.9)
      .from('.porthole', { scale: 0, autoAlpha: 0, duration: 1.6, ease: 'back.out(1.6)', stagger: { each: 0.12, from: 'random' } }, 0.3)
      .from('.hero__meta > *', { y: 16, autoAlpha: 0, stagger: 0.1 }, 1.1)
      .from('.nav > *', { y: -24, autoAlpha: 0, stagger: 0.08 }, 0.4);
  }

  /* =========================================================
     HERO: WebGL water light + bubbles
     ========================================================= */
  const hero = $('.hero');
  let heroVisible = true;

  const initWater = () => {
    const canvas = $('.hero__water');
    const gl = canvas.getContext('webgl', { premultipliedAlpha: true, alpha: true, antialias: false });
    if (!gl) return null;

    const vert = 'attribute vec2 p;void main(){gl_Position=vec4(p,0.,1.);}';
    // Animated Voronoi cell edges read as light refracting through water
    const frag = `
      precision mediump float;
      uniform vec2 uRes; uniform float uTime; uniform vec2 uMouse;
      vec2 hash2(vec2 p){ p=vec2(dot(p,vec2(127.1,311.7)),dot(p,vec2(269.5,183.3))); return fract(sin(p)*43758.5453); }
      float edge(vec2 p, float t){
        vec2 ip=floor(p), fp=fract(p); float f1=8., f2=8.;
        for(int y=-1;y<=1;y++) for(int x=-1;x<=1;x++){
          vec2 g=vec2(float(x),float(y)); vec2 o=hash2(ip+g);
          o=.5+.42*sin(t+6.2831*o);
          float d=length(g+o-fp);
          if(d<f1){f2=f1;f1=d;} else if(d<f2){f2=d;}
        }
        return f2-f1;
      }
      void main(){
        vec2 uv=gl_FragCoord.xy/uRes;
        vec2 p=(gl_FragCoord.xy-.5*uRes)/uRes.y + uMouse*.04;
        float t=uTime*.3;
        vec2 w=p*2.3;
        w+=.38*vec2(sin(w.y*1.3+t*1.1),cos(w.x*1.15-t*.9));
        w+=.16*vec2(sin(w.y*3.1-t*1.7),cos(w.x*2.7+t*1.3));
        float e1=edge(w,t), e2=edge(w*1.7+4.,t*1.2);
        float c=pow(1.-clamp(e1*5.5,0.,1.),3.)*.85 + pow(1.-clamp(e2*7.,0.,1.),3.)*.4;
        float surface=smoothstep(-.15,1.,uv.y);
        float a=c*(.03+.3*surface);
        a*=1.-.6*length(uv-vec2(.5,.65));
        vec3 col=mix(vec3(.38,.74,.95),vec3(.75,.92,1.),c);
        gl_FragColor=vec4(col*a,a);
      }`;
    const sh = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return gl.getShaderParameter(s, gl.COMPILE_STATUS) ? s : null;
    };
    const vs = sh(gl.VERTEX_SHADER, vert);
    const fs = sh(gl.FRAGMENT_SHADER, frag);
    if (!vs || !fs) return null;
    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return null;
    gl.useProgram(prog);
    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, 'p');
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);
    const uRes = gl.getUniformLocation(prog, 'uRes');
    const uTime = gl.getUniformLocation(prog, 'uTime');
    const uMouse = gl.getUniformLocation(prog, 'uMouse');

    const scale = Math.min(window.devicePixelRatio || 1, 1.5) * 0.6;
    const resize = () => {
      canvas.width = Math.round(hero.clientWidth * scale);
      canvas.height = Math.round(hero.clientHeight * scale);
      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.uniform2f(uRes, canvas.width, canvas.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const mouse = { x: 0, y: 0, tx: 0, ty: 0 };
    hero.addEventListener('pointermove', (e) => {
      mouse.tx = e.clientX / window.innerWidth - 0.5;
      mouse.ty = 0.5 - e.clientY / window.innerHeight;
    });
    const start = performance.now();
    const draw = () => {
      mouse.x += (mouse.tx - mouse.x) * 0.05;
      mouse.y += (mouse.ty - mouse.y) * 0.05;
      gl.uniform1f(uTime, (performance.now() - start) / 1000);
      gl.uniform2f(uMouse, mouse.x, mouse.y);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    };
    return draw;
  };

  const initBubbles = () => {
    const canvas = $('.hero__bubbles');
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;
    let bubbles = [];
    const mouse = { x: -999, y: -999 };
    const make = (initial) => ({
      x: Math.random() * W,
      y: initial ? Math.random() * H : H + 20 + Math.random() * 120,
      r: 1.5 + Math.pow(Math.random(), 2.4) * 11,
      v: 0.25 + Math.random() * 0.75,
      a: Math.random() * Math.PI * 2,
      w: 0.4 + Math.random() * 1.2,
      push: 0
    });
    const resize = () => {
      W = hero.clientWidth;
      H = hero.clientHeight;
      canvas.width = W * dpr;
      canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const n = Math.round(Math.min(70, W / 22));
      bubbles = Array.from({ length: n }, () => make(true));
    };
    resize();
    window.addEventListener('resize', resize);
    hero.addEventListener('pointermove', (e) => {
      const r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    });
    hero.addEventListener('pointerleave', () => { mouse.x = mouse.y = -999; });

    return () => {
      ctx.clearRect(0, 0, W, H);
      for (const b of bubbles) {
        b.a += 0.02 * b.w;
        b.y -= b.v * (1 + b.r * 0.06);
        const dx = b.x - mouse.x;
        const dy = b.y - mouse.y;
        const d = Math.hypot(dx, dy);
        if (d < 130) b.push += (dx / (d || 1)) * (130 - d) * 0.012;
        b.push *= 0.94;
        const x = b.x + Math.sin(b.a) * 6 * b.w + b.push * 6;
        if (b.y < -30) Object.assign(b, make(false));
        const life = Math.min(1, (H - b.y) / 220) * Math.min(1, (b.y + 30) / 160);
        ctx.globalAlpha = 0.55 * life;
        ctx.beginPath();
        ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
        ctx.strokeStyle = 'rgba(190,230,255,.9)';
        ctx.lineWidth = 1;
        ctx.stroke();
        ctx.fillStyle = 'rgba(140,203,239,.08)';
        ctx.fill();
        if (b.r > 3) {
          ctx.beginPath();
          ctx.arc(x - b.r * 0.35, b.y - b.r * 0.35, b.r * 0.28, 0, Math.PI * 2);
          ctx.fillStyle = 'rgba(255,255,255,.75)';
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    };
  };

  const drawWater = initWater();
  const drawBubbles = initBubbles();
  if (reduced) {
    drawWater?.();
    drawBubbles?.();
  } else {
    gsap.ticker.add(() => {
      // nothing to draw while the preloader covers the hero or it is off screen
      if (!introPlayed || !heroVisible || document.hidden) return;
      drawWater?.();
      drawBubbles?.();
    });
  }
  ScrollTrigger.create({ trigger: hero, start: 'top bottom', end: 'bottom top', onToggle: (s) => { heroVisible = s.isActive; } });

  /* =========================================================
     SCROLL ANIMATIONS
     ========================================================= */
  const mm = gsap.matchMedia();

  const initScroll = () => {
    // ---- Hero parallax out
    if (!reduced) {
      const ht = gsap.timeline({ scrollTrigger: { trigger: hero, start: 'top top', end: 'bottom top', scrub: true } });
      ht.to('.hero__content', { yPercent: -18, autoAlpha: 0.1, ease: 'none' }, 0)
        .to('.hero__meta', { autoAlpha: 0, y: -40, ease: 'none' }, 0)
        .to('.hero__rays', { yPercent: 20, ease: 'none' }, 0)
        .to('.hero__wave-back', { y: -30, ease: 'none' }, 0);
      $$('.porthole').forEach((p) => {
        const depth = +p.dataset.depth || 0.5;
        ht.to(p, { y: -260 * depth, rotate: (depth - 0.5) * 30, ease: 'none' }, 0);
      });

      // mouse parallax on portholes
      if (finePointer) {
        const movers = $$('.porthole').map((p) => ({
          d: +p.dataset.depth || 0.5,
          x: gsap.quickTo(p, 'x', { duration: 1.2, ease: 'power3' })
        }));
        hero.addEventListener('pointermove', (e) => {
          const nx = e.clientX / window.innerWidth - 0.5;
          movers.forEach((m) => m.x(nx * -60 * m.d));
        });
      }
    }

    // ---- Marquee, speed reacts to scroll velocity
    const mTrack = $('.marquee__track');
    mTrack.innerHTML += mTrack.innerHTML;
    if (!reduced) {
      const loop = gsap.to(mTrack, { xPercent: -50, ease: 'none', duration: 28, repeat: -1 });
      let boost = gsap.to({}, {});
      ScrollTrigger.create({
        trigger: '.marquee', start: 'top bottom', end: 'bottom top',
        onUpdate: (s) => {
          const v = s.getVelocity() / 300;
          boost.kill();
          loop.timeScale(gsap.utils.clamp(-6, 6, 1 + Math.abs(v)) * (s.direction < 0 ? -1 : 1));
          boost = gsap.to(loop, { timeScale: s.direction < 0 ? -1 : 1, duration: 1.2, ease: 'power2.out', delay: 0.1 });
        }
      });
    }

    // ---- Gallery: one column set per breakpoint; columns drift in opposite directions
    mm.add({ lg: '(min-width: 1101px)', md: '(min-width: 901px) and (max-width: 1100px)', sm: '(max-width: 900px)' }, (ctx) => {
      const { lg, md } = ctx.conditions;
      buildGallery(lg ? 4 : md ? 3 : 2);
      if (reduced) return;
      $$('.gallery__col').forEach((col, i) => {
        const dist = () => Math.max(0, col.scrollHeight - galleryCols.clientHeight * 0.75);
        gsap.fromTo(col, { y: () => (i % 2 ? -dist() : 0) }, {
          y: () => (i % 2 ? 0 : -dist()), ease: 'none',
          scrollTrigger: { trigger: galleryCols, start: 'top bottom', end: 'bottom top', scrub: 0.6, invalidateOnRefresh: true }
        });
      });
    });

    if (reduced) {
      $$('.js-counter').forEach((el) => { el.textContent = (+el.dataset.to).toFixed(+el.dataset.decimals || 0); });
      gsap.set('.reviews__stars-fill', { width: `${(4.2 / 5) * 100}%` });
      return;
    }

    // ---- Brush labels paint in
    $$('[data-brush]').forEach((el) => {
      gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 88%' } })
        .from($('.brush', el), { scaleX: 0, duration: 1.1, ease: 'power3.inOut' })
        .from($('.brush-label__text', el), { autoAlpha: 0, x: -14, duration: 0.9 }, 0.45);
    });

    // ---- Headings, line by line
    $$('.split-lines').forEach((el) => {
      SplitText.create(el, {
        type: 'lines', mask: 'lines', linesClass: 'split-line', autoSplit: true,
        onSplit: (self) => gsap.from(self.lines, { yPercent: 110, stagger: 0.1, duration: 1.3, scrollTrigger: { trigger: el, start: 'top 88%' } })
      });
    });

    // ---- Story statement: words brighten as you read
    const statement = $('.js-scrub-words');
    if (statement) {
      SplitText.create(statement, {
        type: 'words', wordsClass: 'w', autoSplit: true,
        onSplit: (self) => gsap.to(self.words, { opacity: 1, stagger: 0.1, ease: 'none', scrollTrigger: { trigger: statement, start: 'top 82%', end: 'bottom 48%', scrub: true } })
      });
    }

    // ---- Generic reveals
    ScrollTrigger.batch('.reveal', {
      start: 'top 90%',
      onEnter: (els) => gsap.to(els, { autoAlpha: 1, y: 0, stagger: 0.08, duration: 1.1, overwrite: true })
    });

    // ---- Image reveals with parallax
    $$('.story__img').forEach((fig, i) => {
      const wrap = $('.img-reveal', fig);
      const img = $('img', fig);
      gsap.timeline({ scrollTrigger: { trigger: fig, start: 'top 85%' } })
        .from(wrap, { clipPath: i ? 'inset(100% 0 0 0)' : 'inset(0 0 0 100%)', duration: 1.5, ease: 'expo.inOut' })
        .from(img, { scale: 1.3, duration: 1.8 }, 0)
        .from($('figcaption', fig), { autoAlpha: 0, y: 10, duration: 0.8 }, 0.9);
      gsap.fromTo(img, { yPercent: -6 }, { yPercent: 6, ease: 'none', scrollTrigger: { trigger: fig, start: 'top bottom', end: 'bottom top', scrub: true } });
    });
    gsap.from('.story__badge', { scale: 0, rotate: -120, duration: 1.6, ease: 'back.out(1.4)', scrollTrigger: { trigger: '.story__media', start: 'top 75%' } });

    // ---- Counters
    $$('.js-counter').forEach((el) => {
      const to = parseFloat(el.dataset.to);
      const dec = +el.dataset.decimals || 0;
      const o = { v: 0 };
      gsap.to(o, {
        v: to, duration: 2, ease: 'power2.out',
        scrollTrigger: { trigger: el, start: 'top 92%' },
        onUpdate: () => { el.textContent = o.v.toFixed(dec); }
      });
    });

    // ---- Menu aside & covers
    gsap.from('.menu__covers .menu__cover', { y: 60, autoAlpha: 0, rotate: (i) => (i ? 18 : -18), stagger: 0.12, duration: 1.4, scrollTrigger: { trigger: '.menu__covers', start: 'top 92%' } });
    gsap.from('.menu-tab', { x: -20, autoAlpha: 0, stagger: 0.06, duration: 0.9, scrollTrigger: { trigger: '.menu__tabs', start: 'top 88%' } });
    ScrollTrigger.create({ trigger: '.menu__panels', start: 'top 85%', once: true, onEnter: () => animatePanelIn($(`#panel-${activeCat}`)) });
    gsap.set('#panel-' + activeCat + ' .dish, #panel-' + activeCat + ' .menu-group__title, #panel-' + activeCat + ' .menu-panel__script', { autoAlpha: 0 });

    // ---- Bar glass & list
    gsap.to('.glass__wave--1', { x: 200, duration: 3.2, ease: 'none', repeat: -1 });
    gsap.to('.glass__wave--2', { x: -200, duration: 4.4, ease: 'none', repeat: -1 });
    const bubbleG = $('.glass__bubbles');
    const NS = 'http://www.w3.org/2000/svg';
    for (let i = 0; i < 14; i++) {
      const c = document.createElementNS(NS, 'circle');
      c.setAttribute('r', gsap.utils.random(1.5, 4.5));
      c.setAttribute('cx', gsap.utils.random(80, 160));
      c.setAttribute('cy', 270);
      bubbleG.appendChild(c);
      gsap.to(c, { attr: { cy: 128 }, opacity: 0, duration: gsap.utils.random(2.2, 4.5), ease: 'power1.in', repeat: -1, delay: gsap.utils.random(0, 4) });
      gsap.to(c, { x: gsap.utils.random(-8, 8), duration: gsap.utils.random(0.6, 1.2), yoyo: true, repeat: -1, ease: 'sine.inOut' });
    }
    gsap.from('.glass', { y: 80, rotate: -8, autoAlpha: 0, duration: 1.6, scrollTrigger: { trigger: '.bar__stage', start: 'top 85%' } });
    gsap.from('.glass__straw', { y: -60, autoAlpha: 0, duration: 1.2, ease: 'back.out(2)', scrollTrigger: { trigger: '.bar__stage', start: 'top 70%' } });
    gsap.from('.bar__tabs button', { y: 20, autoAlpha: 0, stagger: 0.06, duration: 0.9, scrollTrigger: { trigger: '.bar__tabs', start: 'top 90%' } });
    ScrollTrigger.batch('.bar__panel .drink', { start: 'top 95%', onEnter: (els) => gsap.from(els, { autoAlpha: 0, x: -16, stagger: 0.03, duration: 0.8 }), once: true });

    // ---- Services
    gsap.from('.service', { y: 70, autoAlpha: 0, stagger: 0.12, duration: 1.3, scrollTrigger: { trigger: '.services__grid', start: 'top 82%' } });
    gsap.fromTo('.service__flyer', { rotate: 14, y: 60 }, { rotate: 4, y: -20, ease: 'none', scrollTrigger: { trigger: '.service--delivery', start: 'top bottom', end: 'bottom top', scrub: true } });

    // ---- Reviews: stars + endless rail
    gsap.to('.reviews__stars-fill', { width: `${(4.2 / 5) * 100}%`, duration: 1.8, ease: 'power2.inOut', scrollTrigger: { trigger: '.reviews__score', start: 'top 85%' } });
    const rTrack = $('.reviews__track');
    rTrack.innerHTML += rTrack.innerHTML;
    $$('.quote', rTrack).slice(rTrack.children.length / 2).forEach((q) => q.setAttribute('aria-hidden', 'true'));
    const rLoop = gsap.to(rTrack, { xPercent: -50, ease: 'none', duration: 46, repeat: -1 });
    rTrack.addEventListener('mouseenter', () => gsap.to(rLoop, { timeScale: 0.15, duration: 0.6 }));
    rTrack.addEventListener('mouseleave', () => gsap.to(rLoop, { timeScale: 1, duration: 0.6 }));
    gsap.from('.quote', { y: 50, autoAlpha: 0, stagger: 0.08, duration: 1.2, scrollTrigger: { trigger: '.reviews__rail', start: 'top 88%' } });

    // ---- Visit
    gsap.from('.visit__map-frame', { clipPath: 'inset(12% 12% 12% 12% round 30px)', scale: 1.04, duration: 1.6, ease: 'expo.inOut', scrollTrigger: { trigger: '.visit__map', start: 'top 80%' } });
    gsap.from('.visit__pin', { y: 30, autoAlpha: 0, duration: 1, delay: 0.8, scrollTrigger: { trigger: '.visit__map', start: 'top 80%' } });

    // ---- Footer logo
    gsap.timeline({ scrollTrigger: { trigger: '.footer', start: 'top 75%' } })
      .from('.footer__big svg', { yPercent: 30, autoAlpha: 0, duration: 1.6 })
      .from('.footer__swoosh', { rotation: -90, svgOrigin: '1600 880', autoAlpha: 0, duration: 2 }, 0.1)
      .from('.footer__cols > *', { y: 30, autoAlpha: 0, stagger: 0.08, duration: 1 }, 0.4);

    // ---- Signatures: pinned horizontal travel on desktop
    const track = $('.signatures__track');
    const arts = $$('.sig-card .art');
    arts.forEach((a) => gsap.set($$('path, circle, ellipse', a), { strokeDashoffset: 1 }));

    mm.add('(min-width: 901px)', () => {
      const dist = () => track.scrollWidth - window.innerWidth;
      const travel = gsap.to(track, {
        x: () => -dist(), ease: 'none',
        scrollTrigger: {
          trigger: '.signatures', pin: true, start: 'top top', end: () => `+=${dist()}`,
          scrub: 0.8, invalidateOnRefresh: true, anticipatePin: 1,
          onUpdate: (s) => gsap.set('.signatures__progress span', { scaleX: s.progress })
        }
      });
      $$('.sig-card').forEach((card) => {
        const art = $('.art', card);
        if (art) {
          gsap.to($$('path, circle, ellipse', art), {
            strokeDashoffset: 0, duration: 1.8, stagger: 0.12, ease: 'power2.inOut',
            scrollTrigger: { trigger: card, containerAnimation: travel, start: 'left 88%' }
          });
        }
        const img = $('.sig-card__media img', card);
        if (img) {
          gsap.fromTo(img, { xPercent: -8 }, { xPercent: 8, ease: 'none', scrollTrigger: { trigger: card, containerAnimation: travel, start: 'left right', end: 'right left', scrub: true } });
        }
        gsap.from($('.sig-card__body', card).children, { y: 24, autoAlpha: 0, stagger: 0.06, duration: 1, scrollTrigger: { trigger: card, containerAnimation: travel, start: 'left 92%' } });
      });
      gsap.from('.sig-intro > *', { y: 40, autoAlpha: 0, stagger: 0.1, duration: 1.2, scrollTrigger: { trigger: '.signatures', start: 'top 70%' } });
      return () => gsap.set(track, { clearProps: 'transform' });
    });

    mm.add('(max-width: 900px)', () => {
      gsap.to(arts.flatMap((a) => $$('path, circle, ellipse', a)), {
        strokeDashoffset: 0, duration: 2, stagger: 0.03, ease: 'power2.inOut',
        scrollTrigger: { trigger: '.signatures', start: 'top 70%' }
      });
    });
  };

  /* =========================================================
     NAV state: theme under the bar, hide on scroll down, active link
     ========================================================= */
  const initNavState = () => {
    $$('main [data-theme], footer[data-theme]').forEach((sec) => {
      ScrollTrigger.create({
        trigger: sec, start: 'top 40px', end: 'bottom 40px',
        onToggle: (s) => { if (s.isActive) nav.classList.toggle('is-light', sec.dataset.theme === 'light'); }
      });
    });
    ScrollTrigger.create({
      start: 0, end: 'max',
      onUpdate: (s) => {
        const y = s.scroll();
        nav.classList.toggle('is-scrolled', y > 40);
        if (!navOpen) nav.classList.toggle('is-hidden', y > window.innerHeight * 0.8 && s.direction === 1);
        const p = s.progress;
        gsap.set('.depth__fill', { scaleY: p });
        gsap.set('.depth__fish', { top: `${p * 100}%` });
        const d = $('.js-depth');
        if (d) d.textContent = Math.round(p * 42);
      }
    });
    const links = $$('.nav__links a');
    links.forEach((a) => {
      const sec = $(a.getAttribute('href'));
      if (!sec) return;
      ScrollTrigger.create({
        trigger: sec, start: 'top 50%', end: 'bottom 50%',
        onToggle: (s) => a.classList.toggle('is-active', s.isActive)
      });
    });
  };

  /* =========================================================
     Map: load the iframe only when it is close
     ========================================================= */
  // Start fetching gallery photos well before they scroll into view
  ScrollTrigger.create({
    trigger: '.gallery', start: 'top bottom+=1500', once: true,
    onEnter: () => $$('.gallery__item img').forEach((img) => { img.loading = 'eager'; })
  });

  const iframe = $('.visit__map iframe');
  ScrollTrigger.create({
    trigger: '.visit', start: 'top bottom+=600', once: true,
    onEnter: () => { if (!iframe.src) iframe.src = iframe.dataset.src; }
  });

  /* =========================================================
     Cursor & magnetic buttons
     ========================================================= */
  const initCursor = () => {
    if (!finePointer || reduced) return;
    document.documentElement.classList.add('has-cursor');
    const cursor = $('.cursor');
    const dot = $('.cursor__dot');
    const ring = $('.cursor__ring');
    const label = $('.cursor__label');
    const dx = gsap.quickTo(dot, 'x', { duration: 0.15, ease: 'power3' });
    const dy = gsap.quickTo(dot, 'y', { duration: 0.15, ease: 'power3' });
    const rx = gsap.quickTo(ring, 'x', { duration: 0.5, ease: 'power3' });
    const ry = gsap.quickTo(ring, 'y', { duration: 0.5, ease: 'power3' });
    window.addEventListener('pointermove', (e) => { dx(e.clientX); dy(e.clientY); rx(e.clientX); ry(e.clientY); });
    document.addEventListener('pointerover', (e) => {
      const view = e.target.closest('[data-cursor="view"]');
      const link = e.target.closest('a, button, .dish[data-img], .drink');
      cursor.classList.toggle('is-view', !!view);
      cursor.classList.toggle('is-link', !view && !!link);
      label.textContent = view ? 'View' : '';
    });
    document.addEventListener('pointerleave', () => gsap.to(cursor, { autoAlpha: 0, duration: 0.3 }));
    document.addEventListener('pointerenter', () => gsap.to(cursor, { autoAlpha: 1, duration: 0.3 }));

    $$('[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - (r.left + r.width / 2)) * 0.28);
        yTo((e.clientY - (r.top + r.height / 2)) * 0.38);
      });
      el.addEventListener('pointerleave', () => {
        gsap.to(el, { x: 0, y: 0, duration: 0.9, ease: 'elastic.out(1, 0.4)' });
      });
    });
  };

  /* =========================================================
     BOOT
     ========================================================= */
  const boot = () => {
    try { initScroll(); } catch (err) { console.error('[catch] scroll init', err); }
    try { initNavState(); } catch (err) { console.error('[catch] nav init', err); }
    try { initCursor(); } catch (err) { console.error('[catch] cursor init', err); }
    // triggers below the pinned section were created before it; order them by page position
    ScrollTrigger.sort();
    ScrollTrigger.refresh();
    $('.js-year').textContent = new Date().getFullYear();
    // first drink preview
    const first = $('.bar__panel .drink');
    if (first) {
      first.classList.add('is-active');
      currentDrink = first;
      barSection.style.setProperty('--drink', first.dataset.color);
    }
  };

  // The preloader only needs the inline SVG logo, so it starts right away
  runPreloader();
  // Scroll effects wait for the web fonts (so text splits measure correctly), but never longer than 1.5s
  Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 1500))]).then(boot);
  window.addEventListener('load', () => ScrollTrigger.refresh());
})();
