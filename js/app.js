document.addEventListener('DOMContentLoaded', function () {

  /* ── Project data ───────────────────────────────────────────────── */
  var projectData = {
    '1': {
      attendus:    "Réaliser un tableau de bord Power BI sur des accidents de la vie courante (AcVC) à partir de données issues de Calyxis, laboratoire de recherche niortais. Projet de fin d'année S1–S2, par groupe de 5. Toutes les compétences de l'année mobilisées.",
      difficultes: "Données peu nombreuses, hétérogènes, nécessitant un enrichissement externe. Diversité des sources et complexité de la visualisation multi-dimensionnelle.",
      competences: "Power BI, manipulation de données, interprétation de résultats, méthode agile, travail en équipe sur un livrable professionnel."
    },
    '2': {
      attendus:    "Analyser les exportations de la Russie et construire un modèle de prévision des exportations futures. Projet individuel.",
      difficultes: "Modélisation correcte des variations saisonnières et des composantes irrégulières de la série.",
      competences: "Analyse de séries chronologiques, modélisation statistique, prévision, Excel pour manipulation et visualisation."
    },
    '3': {
      attendus:    "Rapport expliquant les résultats d'une enquête menée auprès d'étudiants sur leurs conditions de logement.",
      difficultes: "Trouver des corrélations pertinentes dans des données collectées de manière hétérogène. Résultat final en deçà des attentes — un projet formateur pour cette raison même.",
      competences: "Méthode d'enquête, analyse de données primaires, communication écrite structurée des résultats."
    },
    '4': {
      attendus:    "Présenter Tokyo sous l'angle attractif et touristique, en anglais et en français. Recherches autonomes, présentation de 20 minutes. Premier projet universitaire de 1ère année.",
      difficultes: "Trouver des informations fiables et les structurer de façon cohérente. S'adapter à une présentation bilingue face au jury.",
      competences: "Recherche d'informations, structuration de présentation, communication orale, travail en équipe."
    },
    '5': {
      attendus:    "Développer un tableau de bord Excel VBA répertoriant des joueurs de football, leurs performances et statistiques. Graphiques interactifs, navigation par liens hypertextes par joueur.",
      difficultes: "Tableaux de bord individuels par joueur, graphiques dynamiques, automatisation des mises à jour via VBA.",
      competences: "Excel avancé, VBA, automatisation, visualisation de données sportives, tableaux de bord interactifs."
    },
    '6': {
      attendus:    "Créer une base de données via PhpMyAdmin, alimenter et afficher les données dans une interface Python Tkinter.",
      difficultes: "Communication entre la BDD et l'application Python. Affichage cohérent des données dans l'interface Tkinter.",
      competences: "Gestion BDD relationnelle, développement Python Tkinter, intégration base de données dans une application, SQL."
    },
    '7': {
      attendus:    "Développer une application web interactive visualisant les 1000 musiques les plus streamées de Spotify. PHP, JavaScript, PhpMyAdmin, données open data. Groupe de 2.",
      difficultes: "Sécurité, gestion de session, compatibilité PHP/JavaScript, intégration frontend-backend.",
      competences: "Développement web full-stack, intégration frontend-backend, bases de données, API, visualisation interactive."
    },
    '8': {
      attendus:    "Extraire et agréger des données via scraping et API, retranscrire via une interface web Python. Groupe de 4 : équipe scraping + équipe API.",
      difficultes: "Données non structurées, automatisation du scraping, fusion de sources hétérogènes.",
      competences: "Scraping web, manipulation de données Python, interfaces web, APIs, intégration de sources multiples."
    },
    '9': {
      attendus:    "Concevoir et développer un outil décisionnel en JavaScript à partir de données réelles d'un cabinet dentaire (incomplètes et hétérogènes). Dashboard interactif : fréquentation, types d'actes, revenus, tendances. Projet de groupe.",
      difficultes: "Qualité des données : valeurs manquantes, formats hétérogènes, incohérences. Choisir les indicateurs pertinents pour un usage métier non technique.",
      competences: "Traitement de données réelles, conception d'outil décisionnel, JavaScript frontend, dataviz orientée utilisateur métier, livrable professionnel en équipe."
    },
    '10': {
      attendus:    "Depuis un fichier .sql, concevoir et implémenter une migration complète vers MongoDB. Script Python de transformation (jointures → documents imbriqués JSON) + dashboard Streamlit connecté à la nouvelle base.",
      difficultes: "Dénormalisation du schéma relationnel, gestion des jointures en documents imbriqués, intégrité des données post-migration.",
      competences: "Migration de données, modélisation NoSQL, scripting Python avancé, Streamlit, paradigme relationnel vs document."
    }
  };

  /* ── Fade-up ────────────────────────────────────────────────────── */
  var fadeEls = document.querySelectorAll('.fade-up');
  fadeEls.forEach(function (el) {
    el.style.transitionDelay = (el.dataset.delay || 0) + 'ms';
  });
  var fadeObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach(function (el) { fadeObs.observe(el); });

  /* ── Skill fills ────────────────────────────────────────────────── */
  var fills   = document.querySelectorAll('.skill-fill');
  var fillObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('visible'); fillObs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  fills.forEach(function (el) { fillObs.observe(el); });

  /* ── Count-up ───────────────────────────────────────────────────── */
  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }
  function countUp(el) {
    var raw = parseInt(el.dataset.target, 10);
    var neg = raw < 0;
    var abs = Math.abs(raw);
    var sfx = el.dataset.suffix || '';
    var dur = 1200;
    var t0  = performance.now();
    (function tick(now) {
      var p = Math.min((now - t0) / dur, 1);
      el.textContent = (neg ? '-' : '') + Math.round(easeOut(p) * abs) + sfx;
      if (p < 1) requestAnimationFrame(tick);
    })(t0);
  }
  var statNums = document.querySelectorAll('.stat-num[data-target]');
  var statObs  = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { countUp(e.target); statObs.unobserve(e.target); }
    });
  }, { threshold: 0.5 });
  statNums.forEach(function (el) { statObs.observe(el); });

  /* ── Filter ─────────────────────────────────────────────────────── */
  var filterBtns = document.querySelectorAll('.filter-btn');
  var projCards  = document.querySelectorAll('.proj-card');
  if (filterBtns.length) {
    filterBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filterBtns.forEach(function (b) { b.classList.remove('active'); });
        btn.classList.add('active');
        var f = btn.dataset.filter;
        projCards.forEach(function (c) {
          c.style.display = (f === 'all' || c.dataset.semester === f) ? '' : 'none';
        });
      });
    });
  }

  /* ── Modal ──────────────────────────────────────────────────────── */
  var modal      = document.getElementById('project-modal');
  var modalClose = document.getElementById('modal-close');
  var modalTitle = document.getElementById('modal-title');
  var tabBtns    = document.querySelectorAll('.tab-button');
  var tabConts   = document.querySelectorAll('.tab-content');

  function closeModal() {
    if (modal) { modal.classList.remove('open'); document.body.style.overflow = ''; }
  }

  if (modal) {
    projCards.forEach(function (card) {
      card.addEventListener('click', function () {
        var id   = card.dataset.project;
        var data = projectData[id];
        if (!data) return;
        modalTitle.textContent = card.querySelector('.proj-title').textContent;
        document.getElementById('attendus').innerHTML    = '<p>' + data.attendus    + '</p>';
        document.getElementById('difficultes').innerHTML = '<p>' + data.difficultes + '</p>';
        document.getElementById('competences').innerHTML = '<p>' + data.competences + '</p>';
        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        tabConts.forEach(function (c) { c.classList.remove('active'); });
        tabBtns[0].classList.add('active');
        tabConts[0].classList.add('active');
        modal.classList.add('open');
        document.body.style.overflow = 'hidden';
      });
    });
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', function (e) { if (e.target === modal) closeModal(); });
    tabBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        tabBtns.forEach(function (b) { b.classList.remove('active'); });
        tabConts.forEach(function (c) { c.classList.remove('active'); });
        btn.classList.add('active');
        document.getElementById(btn.dataset.tab).classList.add('active');
      });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
  }
});
