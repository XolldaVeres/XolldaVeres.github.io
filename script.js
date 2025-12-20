document.addEventListener("DOMContentLoaded", () => {
  initHeroParallax();
  initSnow();
});

/* ================= HERO PARALLAX (SCROLL ONLY) ================= */

function initHeroParallax() {
  const bg = document.querySelector(".parallax-layer.bg");
  const mid = document.querySelector(".parallax-layer.mid");

  if (!bg || !mid) return;

  const isMobile = window.innerWidth < 768;

  // На мобилках делаем фон статичным
  if (isMobile) {
    bg.style.transform = "translateY(0)";
    mid.style.transform = "translateY(0)";
    return;
  }

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;

    // Мягкий параллакс без разлёта
    bg.style.transform = `translateY(${scrollTop * 0.15}px)`;
    mid.style.transform = `translateY(${scrollTop * 0.3}px)`;
  });
}

/* ================= SNOW ================= */

function initSnow() {
  const container = document.querySelector(".snow-container");
  if (!container) return;

  const isMobile = window.innerWidth < 768;
  const flakesCount = isMobile ? 40 : 90;

  for (let i = 0; i < flakesCount; i++) {
    const flake = document.createElement("span");
    flake.className = "snowflake";

    const size = Math.random() * 3 + 2;
    flake.style.width = `${size}px`;
    flake.style.height = `${size}px`;

    flake.style.left = `${Math.random() * 100}%`;

    const duration = Math.random() * 10 + 8;
    flake.style.animationDuration = `${duration}s`;

    flake.style.animationDelay = `${Math.random() * duration * -1}s`;

    container.appendChild(flake);
  }
}
