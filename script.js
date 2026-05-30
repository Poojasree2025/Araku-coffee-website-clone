// ── NAVBAR SCROLL SHOW/HIDE ──
const navbar = document.getElementById("navbar");
const hero = document.getElementById("hero");

window.addEventListener("scroll", () => {
    const heroHeight = hero.offsetHeight;
    if (window.scrollY > heroHeight - 100) {
        navbar.classList.add("show");
    } else {
        navbar.classList.remove("show");
    }
});

// ── HERO SLIDER ──
const slides = document.querySelectorAll('.slide');
const dotsContainer = document.getElementById('dots');
let current = 0;
let autoTimer;

slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot' + (i === 0 ? ' active' : '');
    d.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    d.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(d);
});

function goTo(index) {
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
    resetAuto();
}

document.getElementById('prevBtn').addEventListener('click', () => goTo(current - 1));
document.getElementById('nextBtn').addEventListener('click', () => goTo(current + 1));

function resetAuto() {
    clearInterval(autoTimer);
    autoTimer = setInterval(() => goTo(current + 1), 5000);
}
resetAuto();

document.addEventListener('keydown', e => {
    if (e.key === 'ArrowLeft') goTo(current - 1);
    if (e.key === 'ArrowRight') goTo(current + 1);
});

let touchStartX = 0;
const slider = document.getElementById('heroSlider');
slider.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
slider.addEventListener('touchend', e => {
    const dx = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(dx) > 50) goTo(dx < 0 ? current + 1 : current - 1);
});

// ── NEWSLETTER ──
function handleNewsletterSubmit(e) {
    e.preventDefault();
    const input = e.target.querySelector('.newsletter-input');
    const success = document.getElementById('newsletterSuccess');
    if (input.value) {
        success.textContent = 'Thank you — welcome to the ARAKU community.';
        input.value = '';
        setTimeout(() => { success.textContent = ''; }, 5000);
    }
}