document.addEventListener("DOMContentLoaded", () => {
    initParallax();
    initSnow();
});

/* ПАРАЛЛАКС СЛОИ */

function initParallax() {
    const layers = document.querySelectorAll("[data-speed]");
    if (!layers.length) return;

    window.addEventListener("scroll", () => {
        const offset = window.scrollY;
        layers.forEach((layer) => {
            const speed = parseFloat(layer.dataset.speed) || 0;
            layer.style.transform = `translateY(${offset * speed}px)`;
        });
    });
}

/* СНЕГ */

function initSnow() {
    const container = document.querySelector(".snow-container");
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const flakesCount = isMobile ? 50 : 110;

    for (let i = 0; i < flakesCount; i++) {
        const flake = document.createElement("span");
        flake.className = "snowflake";

        const size = 2 + Math.random() * 3; // 2–5 px
        flake.style.width = `${size}px`;
        flake.style.height = `${size}px`;

        flake.style.left = `${Math.random() * 100}%`;

        const duration = 8 + Math.random() * 10; // 8–18 s
        flake.style.animationDuration = `${duration}s`;

        // небольшой разброс по "дрейфу"
        const drift = -20 + Math.random() * 40;
        flake.style.setProperty("--drift", `${drift}px`);

        // стартуем анимацию не всем одновременно
        flake.style.animationDelay = `${-Math.random() * duration}s`;

        container.appendChild(flake);
    }
}
