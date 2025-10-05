// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  'use strict'

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll('.needs-validation')

  // Loop over them and prevent submission
  Array.from(forms).forEach(form => {
    form.addEventListener('submit', event => {
      if (!form.checkValidity()) {
        event.preventDefault()
        event.stopPropagation()
      }

      form.classList.add('was-validated')
    }, false)
  })
})

// public/js/script.js

// public/js/script.js

document.addEventListener("DOMContentLoaded", () => {
    // Select the elements we need
    const navbarSearch = document.getElementById('navbar-search');
    const heroSection = document.getElementById('hero-section');

    // ** THIS IS THE UPDATED LOGIC **

    // A. If the hero section EXISTS on the page...
    if (heroSection && navbarSearch) {
        
        // ...then set up the scroll effect.
        const triggerPoint = heroSection.offsetHeight - 80;

        window.addEventListener('scroll', () => {
            if (window.scrollY > triggerPoint) {
                navbarSearch.classList.add('sticky-search');
            } else {
                navbarSearch.classList.remove('sticky-search');
            }
        });

    // B. ELSE (if there's no hero section), just make the search bar visible.
    } else if (navbarSearch) {
        navbarSearch.classList.add('sticky-search');
    }
});
