document.addEventListener('DOMContentLoaded', () => {
  const detailButtons = document.querySelectorAll('.detail-button');
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // Détails pour chaque projet
  const projectDetails = {
    "1": {
      attendus: "Dans ce projet, nous devions réaliser un tableau de bord sur l'outil de Microsoft de Datavisualisation Power BI sur des accidents de la vie courante (AcVC). Nous avions des données issues de Calyxis, un laboratoire de recherche situé à Niort qui étudie également les AcVC. Ce projet était le projet de fin d'année de première année, qui met en oeuvre toutes les compétences acquises au fur et à mesure de notre année universitaire. Nous étions par groupe de 5.",
      difficultes: "Nous avions peu de données, et il fallait les enrichir avec des données externes. De plus, la visualisation des données était complexe en raison de la diversité des sources.",
      competences: "Nous avons acquis des compétences en manipulation de données, en utilisation de Power BI pour la visualisation et en interprétation des résultats. Nous avons également appris à travailler en équipe avec la méthode agile, très utilisée en entreprise, pour mener à bien un projet complexe."
    },
    "2": {
      attendus: "Pour Séries chronologiques, nous devions réaliser une série chronologique sur les exportations d'un pays donné. C'était un projet individuel. Dans mon cas, je devais analyser les exportations de la Russie et réaliser un modèle pour prédire les exportations futures.",
      difficultes: "Les obstacles étaient de modéliser correctement les séries chronologiques et de gérer les différentes variations saisonnières.",
      competences: "Nous avons acquis des compétences en analyse de séries chronologiques, en modélisation statistique et en prévision. Nous avons également appris à utiliser Excel pour manipuler et visualiser les données de manière efficace."
    },
    "3": {
      attendus: "L'enquête sur les logements étudiants devait aboutir à un rapport expliquant et détaillant les résultats d'une enquête menée auprès des étudiants sur leurs conditions de logement.",
      difficultes: "Cela a été assez difficile de trouver des corrélations pertinentes entre les données collectées et les attentes des étudiants.",
      competences: "Développement de compétences en enquête, analyse de données et communication des résultats."
    },
    "4": {
      attendus: "Nous avons, par groupe de 2, développé une solution de visualisation de données concernant les 1000 musiques les plus streamées de Spotify. Le but était de créer une application web interactive permettant de visualiser les tendances musicales. Nous avons utilisé du PHP, du JavaScript et nous avons utiliser une interface de visualisation de base de données qui s'appelle PhpMyAdmin pour concevoir, requêter, et exporter des bases de données. Les données étaient prises de l'open data.",
      difficultes: "La gestion de la sécurité, de la session et de la compatibilité entre PHP et JavaScript a représenté un challenge.",
      competences: "Nous nous étions grandement améliorés sur les compétences en développement web full-stack et en intégration frontend-backend. Nous avons également appris à travailler avec des bases de données et à utiliser des API pour récupérer des données externes."
    },
    "5": {
      attendus: "Pour la collecte de données web, il fallait développer un script capable d'extraire et d'agréger des informations, pour les retranscrire via Python en une interface web capable de répertorier les informations. Le projet était divisé en deux : d'un côté, une équipe de deux devait scrapper un site internet tout seul et l'autre devait utiliser une API. C'était un travail par groupe de 4, un projet réservé aux alternants.",
      difficultes: "Les difficultés majeures étaient liées à la gestion des données non structurées et à l'automatisation du processus de scraping.",
      competences: "Nous avons acquis des compétences en scraping web, en manipulation de données avec Python, et en développement d'interfaces web. Nous avons également appris à travailler avec des API pour intégrer des données externes dans nos projets."
    },
    "6": {
      attendus: "Dans ce projet nous devions présenter une ville en particulier, son côté attractif et touristique, en anglais et en français. Nous devions faire nos propres recherches, et faire une présentation d'une vingtaine de minutes. Ce projet permettait de commencer à se familiariser avec les passages à l'oral et il était le premier projet universitaire de première année. Nous avons présenté Tokyo.",
      difficultes: "La principale difficulté était de trouver des informations pertinentes et fiables sur la ville choisie, ainsi que de structurer la présentation de manière cohérente.",
      competences: "Nous avons développé des compétences en recherche d'informations, en structuration de présentations et en communication orale. Nous avons également appris à travailler en équipe pour préparer une présentation efficace."
    }
  };

  // Gestion de l'ouverture de la modal
  detailButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const bubble = button.closest('.project-bubble');
      const projectId = bubble.getAttribute('data-project');
      const imgSrc = bubble.getAttribute('data-image');
      const title = bubble.getAttribute('data-title');
      modalImage.src = imgSrc;
      modalTitle.textContent = title;
      // Mise à jour des contenus selon le projet
      document.getElementById("attendus").innerHTML = `<p>${projectDetails[projectId].attendus}</p>`;
      document.getElementById("difficultes").innerHTML = `<p>${projectDetails[projectId].difficultes}</p>`;
      document.getElementById("competences").innerHTML = `<p>${projectDetails[projectId].competences}</p>`;
      modal.style.display = 'flex';
    });
  });

  // Fermeture de la modal
  modalClose.addEventListener('click', () => {
    modal.style.display = 'none';
  });

  // Gestion des onglets de la modal
  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      tabButtons.forEach(btn => btn.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));
      button.classList.add('active');
      const tab = button.getAttribute('data-tab');
      document.getElementById(tab).classList.add('active');
    });
  });

  // Fermeture de la modal en cliquant en dehors du contenu
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});
// Lorsque la modal s'ouvre, ajoute une classe pour bloquer le scroll du body
document.body.style.overflow = 'hidden';

// Lors de la fermeture, rétablis le scroll
document.body.style.overflow = '';