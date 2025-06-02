document.addEventListener('DOMContentLoaded', () => {
  const burger = document.getElementById('burger');
  const nav    = document.getElementById('nav');

  burger.addEventListener('click', () => {
    burger.classList.toggle('active');
    nav.classList.toggle('open');
  });
  // refermer menu au clic sur lien
  nav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('active');
      nav.classList.remove('open');
    });
  });
});