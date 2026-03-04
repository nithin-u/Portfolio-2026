// Ensure page starts at top on refresh
if (history.scrollRestoration) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);

document.addEventListener("DOMContentLoaded", () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observerInstance) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observerInstance.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const hiddenElements = document.querySelectorAll('.hidden');
    hiddenElements.forEach((el) => observer.observe(el));

    const menuToggle = document.querySelector('.menu-toggle');
    const navbar = document.querySelector('.navbar');

    if (menuToggle && navbar) {
        menuToggle.addEventListener('click', () => {
            const isOpen = navbar.classList.toggle('open');
            menuToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('open');
                menuToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const yearElement = document.getElementById('year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
});
