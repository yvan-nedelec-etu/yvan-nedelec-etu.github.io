// script.js
document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(".section");
    const options = {
      threshold: 0.5,
    };
  
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        } else {
          entry.target.classList.remove("active"); // Supprime la classe active si la section est inactive
        }
      });
    }, options);
  
    sections.forEach((section) => {
      observer.observe(section);
    });
  
    // Navbar dynamic highlight
    const navbarLinks = document.querySelectorAll(".navbar a");
    window.addEventListener("scroll", () => {
      let current = "";
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 60) {
          current = section.getAttribute("id");
        }
      });
  
      navbarLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href").includes(current)) {
          link.classList.add("active");
        }
      });
    });
  });
