document.addEventListener('DOMContentLoaded', () => {
  const detailButtons = document.querySelectorAll('.detail-button');
  const modal = document.getElementById('project-modal');
  const modalClose = document.getElementById('modal-close');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  // Ouverture de la modal lors du clic sur "Voir en détail"
  detailButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.stopPropagation();
      const bubble = button.closest('.project-bubble');
      const imgSrc = bubble.getAttribute('data-image');
      const title = bubble.getAttribute('data-title');
      modalImage.src = imgSrc;
      modalTitle.textContent = title;
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

  // Ferme la modal en cliquant en dehors du contenu
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.style.display = 'none';
    }
  });
});