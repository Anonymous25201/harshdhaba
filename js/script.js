document.addEventListener('DOMContentLoaded', function() {

    // Mobile Menu Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            const isExpanded = navMenu.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
            // Optional: Change icon
            if (isExpanded) {
                menuToggle.innerHTML = '<i class="fas fa-times"></i>'; // Close icon
            } else {
                menuToggle.innerHTML = '<i class="fas fa-bars"></i>'; // Bars icon
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open after clicking a link
                if (navMenu && navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                    menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
                }

                // Smooth scroll
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Set current year in footer
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // Active navigation link highlighting based on scroll (basic version)
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function changeNavActive() {
        let index = sections.length;

        while(--index && window.scrollY + 100 < sections[index].offsetTop) {} // 100px offset

        navLinks.forEach((link) => link.classList.remove('active'));
        // Check if the corresponding link exists before adding class
        if (navLinks[index] && sections[index]) { // Check if sections[index] exists
             const activeLink = document.querySelector(`.nav-menu a[href="#${sections[index].id}"]`);
             if (activeLink) {
                activeLink.classList.add('active');
             }
        } else if (window.scrollY < sections[0].offsetTop - 100) { // For top of page if no section yet
            const homeLink = document.querySelector('.nav-menu a[href="#home"]');
            if (homeLink) homeLink.classList.add('active');
        }
    }

    // Initial call and on scroll
    if (sections.length > 0 && navLinks.length > 0) {
        changeNavActive(); // Call once on load
        window.addEventListener('scroll', changeNavActive);
    }

    // Simple testimonial "slider" (just cycles visibility - can be enhanced)
    const testimonialItems = document.querySelectorAll('.testimonial-item');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonialItems.forEach((item, i) => {
            item.style.display = (i === index) ? 'block' : 'none';
        });
    }

    if (testimonialItems.length > 0) {
        showTestimonial(currentTestimonial); // Show first testimonial

        // You can add next/prev buttons and event listeners for a proper slider
        // For a simple auto-cycle:
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonialItems.length;
            showTestimonial(currentTestimonial);
        }, 5000); // Change every 5 seconds
    }

});