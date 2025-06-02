document.addEventListener('DOMContentLoaded', () => {
  const skillsSection = document.querySelector('.skills-section');
  const logos         = document.querySelector('.skills-logos');

  window.addEventListener('scroll', () => {
    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.7) {
      logos.classList.add('visible');
    }
  });
});