/* ═══════════════════════════════════════════════════════
   EFFECTS.JS  —  UI/UX premium
   Cursor · Spotlight · 3D Hero Tilt · Orb Parallax
   Scroll Depth · Magnetic · Stagger · Nav Pill
═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  var DESKTOP = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  var REDUCED_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function lerp(a, b, t) { return a + (b - a) * t; }
  function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

  /* ═══════════════════════════════════════════════════
     ÉTAT GLOBAL SOURIS / SCROLL
  ═══════════════════════════════════════════════════ */
  var mx = window.innerWidth / 2, my = window.innerHeight / 2;
  var rx = mx, ry = my;
  var scrollY = 0;

  document.addEventListener('mousemove', function (e) { mx = e.clientX; my = e.clientY; });
  window.addEventListener('scroll',      function ()    { scrollY = window.scrollY; }, { passive: true });

  /* ═══════════════════════════════════════════════════
     1. CURSEUR CUSTOM  +  SPOTLIGHT
  ═══════════════════════════════════════════════════ */
  if (DESKTOP && !REDUCED_MOTION) {
    var dot   = document.createElement('div');
    var ring  = document.createElement('div');
    dot.className  = 'cur-dot';
    ring.className = 'cur-ring';
    document.body.append(dot, ring);

    var spotlight = document.createElement('div');
    spotlight.className = 'cursor-spotlight';
    document.body.prepend(spotlight);

    document.addEventListener('mousedown', function () { dot.classList.add('click');    ring.classList.add('click');    });
    document.addEventListener('mouseup',   function () { dot.classList.remove('click'); ring.classList.remove('click'); });

    var SEL = 'a,button,.bento-card,.proj-card,.passion-card,.learn-card,.filter-btn,.bilan-card,.bilan-single,.profile-card,.stat,.hstat,.tech-badge';
    document.addEventListener('mouseover', function (e) {
      if (e.target.closest(SEL)) { dot.classList.add('big');    ring.classList.add('big');    }
    });
    document.addEventListener('mouseout', function (e) {
      if (e.target.closest(SEL)) { dot.classList.remove('big'); ring.classList.remove('big'); }
    });

    (function cursorTick() {
      rx = lerp(rx, mx, 0.1);
      ry = lerp(ry, my, 0.1);
      dot.style.transform  = 'translate3d(' + mx + 'px,' + my + 'px,0) translate(-50%,-50%)';
      ring.style.transform = 'translate3d(' + rx + 'px,' + ry + 'px,0) translate(-50%,-50%)';
      spotlight.style.background =
        'radial-gradient(540px circle at ' + mx + 'px ' + my + 'px,' +
        'rgba(99,85,255,0.065) 0%, transparent 65%)';
      requestAnimationFrame(cursorTick);
    })();
  }

  /* ═══════════════════════════════════════════════════
     2. SCROLL PROGRESS BAR
  ═══════════════════════════════════════════════════ */
  var bar = document.createElement('div');
  bar.className = 'scroll-bar';
  document.body.append(bar);
  window.addEventListener('scroll', function () {
    var max = document.documentElement.scrollHeight - window.innerHeight;
    bar.style.transform = 'scaleX(' + (max > 0 ? scrollY / max : 0) + ')';
  }, { passive: true });

  /* ═══════════════════════════════════════════════════
     3. MOUSE AURA (fond doux)
  ═══════════════════════════════════════════════════ */
  if (DESKTOP && !REDUCED_MOTION) {
    var aura = document.createElement('div');
    aura.className = 'mouse-aura';
    document.body.prepend(aura);
    var tx = 50, ty = 50, ax = 50, ay = 50;
    document.addEventListener('mousemove', function (e) {
      tx = (e.clientX / window.innerWidth)  * 100;
      ty = (e.clientY / window.innerHeight) * 100;
    });
    (function aLoop() {
      ax = lerp(ax, tx, 0.03);
      ay = lerp(ay, ty, 0.03);
      aura.style.background =
        'radial-gradient(ellipse 48% 40% at ' + ax.toFixed(1) + '% ' + ay.toFixed(1) + '%,' +
        'rgba(79,70,229,0.075) 0%, transparent 70%)';
      requestAnimationFrame(aLoop);
    })();
  }

  /* ═══════════════════════════════════════════════════
     4. 3D TILT HERO — la section entière pivote en 3D
  ═══════════════════════════════════════════════════ */
  var heroEl = document.querySelector('.hero-section');
  if (heroEl && DESKTOP && !REDUCED_MOTION) {
    var htRX = 0, htRY = 0, htTX = 0, htTY = 0;

    document.addEventListener('mousemove', function (e) {
      var cx = window.innerWidth  / 2;
      var cy = window.innerHeight / 2;
      htTX = clamp((e.clientX - cx) / cx * 3.5,  -3.5, 3.5);
      htTY = clamp((e.clientY - cy) / cy * -2.5, -2.5, 2.5);
    });

    /* Démarrer après l'animation d'entrée */
    setTimeout(function () {
      (function heroTilt() {
        if (scrollY < window.innerHeight) {
          htRX = lerp(htRX, htTX, 0.05);
          htRY = lerp(htRY, htTY, 0.05);
          heroEl.style.transform =
            'perspective(1200px) rotateY(' + htRX + 'deg) rotateX(' + htRY + 'deg)';
        }
        requestAnimationFrame(heroTilt);
      })();
    }, 1500);
  }

  /* ═══════════════════════════════════════════════════
     5. PARALLAXE SCROLL — le hero se dissolve en scrollant
  ═══════════════════════════════════════════════════ */
  if (heroEl && !REDUCED_MOTION) {
    var heroTitle  = heroEl.querySelector('.hero-title');
    var heroBadge  = heroEl.querySelector('.hero-badge');
    var heroMeta   = heroEl.querySelector('.hero-meta');
    var heroActs   = heroEl.querySelector('.hero-actions');
    var heroOrbs   = heroEl.querySelector('.hero-orbs');

    window.addEventListener('scroll', function () {
      var h        = heroEl.offsetHeight;
      if (scrollY > h) return;
      var progress = scrollY / h; /* 0→1 pendant le scroll du hero */

      if (heroTitle) {
        heroTitle.style.transform = 'translateY(' + (scrollY * 0.28) + 'px)';
        heroTitle.style.opacity   = String(clamp(1 - progress * 2.2, 0, 1));
      }
      if (heroBadge) heroBadge.style.opacity = String(clamp(1 - progress * 3.5, 0, 1));
      if (heroMeta)  heroMeta.style.opacity  = String(clamp(1 - progress * 2.8, 0, 1));
      if (heroActs)  heroActs.style.opacity  = String(clamp(1 - progress * 2.5, 0, 1));
      if (heroOrbs) {
        heroOrbs.style.transform = 'translateY(' + (scrollY * 0.45) + 'px)';
        heroOrbs.style.opacity   = String(clamp(1 - progress * 1.8, 0, 1));
      }
    }, { passive: true });
  }

  /* ═══════════════════════════════════════════════════
     6. PARALLAXE PROFONDEUR sur les ORBES (souris)
  ═══════════════════════════════════════════════════ */
  if (DESKTOP && !REDUCED_MOTION) {
    var orbs = Array.from(document.querySelectorAll('.orb'));
    if (orbs.length) {
      var oTx = Array(orbs.length).fill(0), oTy = Array(orbs.length).fill(0);
      var oCx = Array(orbs.length).fill(0), oCy = Array(orbs.length).fill(0);
      var depths = [0.025, 0.016, 0.02, 0.012]; /* vitesse de chaque orbe */

      document.addEventListener('mousemove', function (e) {
        var cx = window.innerWidth  / 2;
        var cy = window.innerHeight / 2;
        depths.forEach(function (d, i) {
          oTx[i] = (e.clientX - cx) * d;
          oTy[i] = (e.clientY - cy) * d;
        });
      });

      (function orbParallax() {
        orbs.forEach(function (orb, i) {
          oCx[i] = lerp(oCx[i], oTx[i], 0.04);
          oCy[i] = lerp(oCy[i], oTy[i], 0.04);
          /* Combiner le mouvement souris avec l'animation CSS float */
          orb.style.marginLeft = oCx[i] + 'px';
          orb.style.marginTop  = oCy[i] + 'px';
        });
        requestAnimationFrame(orbParallax);
      })();
    }
  }

  /* ═══════════════════════════════════════════════════
     7. HERO ENTRANCE (séquence chorégraphiée)
  ═══════════════════════════════════════════════════ */
  function heroEntrance() {
    var badge     = document.querySelector('.hero-badge');
    var htInners  = Array.from(document.querySelectorAll('.ht-inner'));
    var heroMeta  = document.querySelector('.hero-meta');
    var heroActs  = document.querySelector('.hero-actions');
    var scrollCue = document.querySelector('.hero-scroll-cue');
    var statsBar  = document.querySelector('.hero-stats');
    var bento     = document.querySelector('.bento-grid');

    if (!badge && !htInners.length) return;

    /* État initial pour les éléments non animés par CSS */
    htInners.forEach(function (el) { el.style.transform = REDUCED_MOTION ? 'translateY(0)' : 'translateY(110%)'; });

    function appear(el, delay) {
      if (!el) return;
      if (REDUCED_MOTION) { el.style.opacity = '1'; el.style.transform = 'translateY(0)'; return; }
      el.style.opacity = '0'; el.style.transform = 'translateY(14px)';
      setTimeout(function () {
        el.style.transition = 'opacity .75s ease, transform .75s cubic-bezier(.16,1,.3,1)';
        el.style.opacity    = '1';
        el.style.transform  = 'translateY(0)';
      }, delay);
    }

    function slideUp(el, delay) {
      if (!el) return;
      if (REDUCED_MOTION) { el.style.transform = 'translateY(0)'; return; }
      setTimeout(function () {
        el.style.transition = 'transform 1.15s cubic-bezier(.16,1,.3,1)';
        el.style.transform  = 'translateY(0)';
      }, delay);
    }

    appear(badge,    60);
    slideUp(htInners[0], 150);
    slideUp(htInners[1], 295);
    appear(heroMeta, 480);
    appear(heroActs, 580);

    if (scrollCue) setTimeout(function () {
      scrollCue.style.transition = 'opacity .6s ease';
      scrollCue.style.opacity    = '1';
    }, 720);

    if (statsBar) {
      statsBar.style.opacity   = '0';
      statsBar.style.transform = 'translateY(26px)';
      appear(statsBar, 850);
    }
    if (bento) {
      Array.from(bento.children).forEach(function (card, i) {
        card.style.opacity   = '0';
        card.style.transform = 'translateY(32px)';
        appear(card, 950 + i * 110);
      });
    }

    /* Compteurs hstat après l'entrée */
    setTimeout(runCounters, 900);
  }

  function runCounters() {
    document.querySelectorAll('.hstat-num').forEach(function (el) {
      var raw    = el.textContent.trim();
      var num    = parseFloat(raw.replace(/[^0-9.\-]/g, ''));
      if (isNaN(num)) return;
      var prefix = raw.match(/^[^0-9\-]*/)[0];
      var suffix = raw.replace(/^[^0-9\-]*[\-\d.]+/, '');
      var neg    = num < 0, abs = Math.abs(num);
      el.textContent = prefix + (neg ? '−' : '') + '0' + suffix;
      var t0 = performance.now(), dur = 1400;
      (function f(now) {
        var p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = prefix + (neg ? '−' : '') +
          (Number.isInteger(abs) ? Math.round(abs * e) : (abs * e).toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(f);
      })(t0);
    });
  }

  document.addEventListener('DOMContentLoaded', heroEntrance);

  /* ═══════════════════════════════════════════════════
     8. 3D TILT CARTES (avec glare)
  ═══════════════════════════════════════════════════ */
  if (DESKTOP && !REDUCED_MOTION) {
    function initTilt(sel, deg, glare) {
      document.querySelectorAll(sel).forEach(function (el) {
        var g = null;
        if (glare) {
          g = document.createElement('div');
          g.className = 'tilt-glare';
          el.appendChild(g);
        }
        el.addEventListener('mousemove', function (e) {
          var r  = el.getBoundingClientRect();
          var nx = ((e.clientX - r.left) / r.width)  - 0.5;
          var ny = ((e.clientY - r.top)  / r.height) - 0.5;
          el.style.transform  = 'perspective(900px) rotateY(' + (nx*deg) + 'deg) rotateX(' + (-ny*deg*.65) + 'deg) scale3d(1.018,1.018,1.018) translateZ(8px)';
          el.style.transition = 'box-shadow .12s';
          el.style.boxShadow  = (-nx*deg*1.6) + 'px ' + (ny*deg*1.2) + 'px 44px rgba(79,70,229,0.13)';
          if (g) {
            var angle = Math.atan2(ny, nx) * 180 / Math.PI + 90;
            g.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 65%)';
            g.style.opacity    = '1';
          }
        });
        el.addEventListener('mouseleave', function () {
          el.style.transform  = '';
          el.style.boxShadow  = '';
          el.style.transition = 'transform .75s cubic-bezier(.16,1,.3,1), box-shadow .75s';
          if (g) g.style.opacity = '0';
        });
      });
    }
    initTilt('.bento-card',   12, true);
    initTilt('.passion-card',  9, true);
    initTilt('.learn-card',    9, false);
    initTilt('.profile-card',  9, false);
    initTilt('.bilan-single',  5, false);
    initTilt('.contact-card',  5, false);
  }

  /* ═══════════════════════════════════════════════════
     9. BOUTONS MAGNÉTIQUES
  ═══════════════════════════════════════════════════ */
  if (DESKTOP && !REDUCED_MOTION) {
    document.querySelectorAll('.btn-primary,.btn-secondary,.btn-glass,.bento-arrow-btn').forEach(function (btn) {
      btn.addEventListener('mousemove', function (e) {
        var r  = btn.getBoundingClientRect();
        var dx = (e.clientX - (r.left + r.width  / 2)) * 0.4;
        var dy = (e.clientY - (r.top  + r.height / 2)) * 0.4;
        btn.style.transform  = 'translate(' + dx + 'px,' + dy + 'px)';
        btn.style.transition = 'transform .08s ease';
      });
      btn.addEventListener('mouseleave', function () {
        btn.style.transform  = '';
        btn.style.transition = 'transform .6s cubic-bezier(.16,1,.3,1)';
      });
    });
  }

  /* ═══════════════════════════════════════════════════
     10. STAGGER PROJ-CARDS
  ═══════════════════════════════════════════════════ */
  var projCards = Array.from(document.querySelectorAll('.proj-card'));
  if (projCards.length) {
    projCards.forEach(function (c) {
      c.style.opacity = '0'; c.style.transform = 'translateY(20px)'; c.style.transition = 'none';
    });
    var sObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var idx = projCards.indexOf(entry.target);
        setTimeout(function () {
          entry.target.style.transition = 'opacity .5s ease, transform .5s cubic-bezier(.16,1,.3,1)';
          entry.target.style.opacity    = '1';
          entry.target.style.transform  = 'translateY(0)';
        }, idx * 60);
        sObs.unobserve(entry.target);
      });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });
    projCards.forEach(function (c) { sObs.observe(c); });
  }

  /* ═══════════════════════════════════════════════════
     11. REVEAL AU SCROLL (bilan, learn, stat, passion…)
  ═══════════════════════════════════════════════════ */
  var revEls = Array.from(document.querySelectorAll(
    '.bilan-card,.bilan-single,.learn-card,.stat,.passion-card,.profile-card,.contact-card'
  ));
  if (revEls.length) {
    revEls.forEach(function (el) {
      el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; el.style.transition = 'none';
    });
    var rObs = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var idx = revEls.indexOf(entry.target);
        setTimeout(function () {
          entry.target.style.transition = 'opacity .6s ease, transform .6s cubic-bezier(.16,1,.3,1)';
          entry.target.style.opacity    = '1';
          entry.target.style.transform  = 'translateY(0)';
        }, idx * 40);
        rObs.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    revEls.forEach(function (el) { rObs.observe(el); });
  }

  /* ═══════════════════════════════════════════════════
     12. NAV PILL (highlight glissant)
  ═══════════════════════════════════════════════════ */
  if (DESKTOP && !REDUCED_MOTION) {
    var navLinks = document.querySelectorAll('.nav-links a');
    var navWrap  = document.querySelector('.nav-links');
    if (navWrap) {
      navWrap.style.position = 'relative';
      var pill = document.createElement('span');
      pill.className = 'nav-pill';
      navLinks.forEach(function (link) {
        link.addEventListener('mouseenter', function () {
          var r  = link.getBoundingClientRect();
          var pr = navWrap.getBoundingClientRect();
          pill.style.left    = (r.left - pr.left - 8) + 'px';
          pill.style.width   = (r.width + 16) + 'px';
          pill.style.opacity = '1';
          if (!pill.parentNode) navWrap.appendChild(pill);
        });
        link.addEventListener('mouseleave', function () { pill.style.opacity = '0'; });
      });
    }
  }

  /* ═══════════════════════════════════════════════════
     13. COMPTEUR STAT-NUM (page alternance)
  ═══════════════════════════════════════════════════ */
  document.querySelectorAll('.stat-num[data-target]').forEach(function (el) {
    var raw = parseInt(el.dataset.target, 10);
    var neg = raw < 0, abs = Math.abs(raw), sfx = el.dataset.suffix || '';
    el.textContent = (neg ? '-' : '') + '0' + sfx;
    var cObs = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      cObs.disconnect();
      var t0 = performance.now(), dur = 1300;
      (function f(now) {
        var p = Math.min((now - t0) / dur, 1), e = 1 - Math.pow(1 - p, 3);
        el.textContent = (neg ? '-' : '') + Math.round(abs * e) + sfx;
        if (p < 1) requestAnimationFrame(f);
      })(t0);
    }, { threshold: 0.5 });
    cObs.observe(el);
  });

})();
