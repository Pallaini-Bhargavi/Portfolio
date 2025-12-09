const htmlEl = document.documentElement;

// Init theme from localStorage / system
(function initTheme() {
    const storedTheme = localStorage.getItem('theme');
    if (storedTheme === 'dark') {
        htmlEl.classList.add('dark');
    } else if (storedTheme === 'light') {
        htmlEl.classList.remove('dark');
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        htmlEl.classList.add('dark');
    }
    updateThemeButtons();
})();

function updateThemeButtons() {
    const isDark = htmlEl.classList.contains('dark');
    const themeIcon = document.getElementById('themeIcon');
    const themeToggleMobile = document.getElementById('themeToggleMobile');
    if (themeIcon) themeIcon.textContent = isDark ? '☀️' : '🌙';
    if (themeToggleMobile) themeToggleMobile.textContent = isDark ? '☀️' : '🌙';
}

function toggleTheme() {
    const isDark = htmlEl.classList.toggle('dark');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeButtons();
}

const themeToggle = document.getElementById('themeToggle');
const themeToggleMobile = document.getElementById('themeToggleMobile');
if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
if (themeToggleMobile) themeToggleMobile.addEventListener('click', toggleTheme);

// Mobile nav toggle
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

if (navToggle && mobileMenu) {
    navToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
        });
    });
}

// Scroll reveal animations
const animatedSections = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver(
    entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-4');
                observer.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.15 }
);

animatedSections.forEach(section => {
    section.classList.add('opacity-0', 'translate-y-4', 'transition-all', 'duration-700');
    observer.observe(section);
});

// Footer year
const yearEl = document.getElementById('year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Popup handlers
function closePopup() {
    document.getElementById("successPopup").classList.add("hidden");
}

function showSuccessPopup(e) {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form);

    fetch(form.action, {
        method: "POST",
        body: formData
    })
        .then(() => {
            form.reset();
            document.getElementById("successPopup").classList.remove("hidden");
        })
        .catch(() => {
            alert("❌ Something went wrong. Please try again.");
        });
}
