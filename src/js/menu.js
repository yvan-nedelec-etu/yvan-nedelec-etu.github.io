const menuButton = document.querySelector('.menu-button');
const navMenu = document.querySelector('.nav-menu');

menuButton.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    menuButton.classList.toggle('active');
});

// Close the menu when a link is clicked
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuButton.classList.remove('active');
    });
});