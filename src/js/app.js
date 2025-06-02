// Main JavaScript logic for the portfolio
document.addEventListener('DOMContentLoaded', () => {
    const burgerMenu = document.querySelector('.burger-menu');
    const navLinks = document.querySelector('.nav-links');
    const languagesSection = document.querySelector('.languages');
    
    // Toggle the burger menu
    burgerMenu.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        burgerMenu.classList.toggle('toggle');
    });

    // Animate the languages section
    const languages = ['Python', 'Java', 'Spark', 'C++', 'JavaScript'];
    let angle = 0;
    const radius = 150; // Radius for arc positioning

    languages.forEach((language, index) => {
        const langElement = document.createElement('div');
        langElement.classList.add('language');
        langElement.innerText = language;

        // Calculate position
        angle += (360 / languages.length);
        const x = radius * Math.cos(angle * (Math.PI / 180));
        const y = radius * Math.sin(angle * (Math.PI / 180));

        langElement.style.position = 'absolute';
        langElement.style.transform = `translate(${x}px, ${y}px)`;
        languagesSection.appendChild(langElement);
    });
});