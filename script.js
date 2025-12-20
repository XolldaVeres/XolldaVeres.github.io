/* ====== BotMaker — Parallax + Snow + Mobile menu ====== */
document.addEventListener("DOMContentLoaded", () => {
  initMobileNav();
  initSnow();
  initParallax();
});

/* ---- Mobile nav ---- */
function initMobileNav() {
  const burger = document.querySelector(".burger");
  const nav = document.getElementById("mobileNav");
  if (!burger || !nav) return;

  const toggle = () => {
    const opened = burger.getAttribute("aria-expanded") === "true";
    burger.setAttribute("aria-expanded", String(!opened));
    nav.style.display = opened ? "none" : "block";
  };

  burger.addEventListener("click", toggle);

  // закрываем по клику на пункт
  nav.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      burger.setAttribute("aria-expanded", "false");
      nav.style.display = "none";
    });
  });
}

/* ---- Snow (нормальный снег, не “пропал”) ---- */
function initSnow() {
  const container = document.querySelector(".snow");
  if (!container) return;

  // очищаем, если ты обновляешь скрипт “на лету”
  container.innerHTML = "";

  const isMobile = window.innerWidth < 980;
  const count = isMobile ? 70 : 140;

  for (let i = 0; i < count; i++) {
    const f = document.createElement("span");
    f.className = "snowflake";

    const size = 2 + Math.random() * 4;          // 2..6px
    const left = Math.random() * 100;            // %
    const dur = 8 + Math.random() * 12;          // 8..20s
    const delay = -Math.random() * dur;          // чтобы сразу “шёл”
    const drift = (-60 + Math.random() * 120);   // -60..60px

    f.style.width = `${size}px`;
    f.style.height = `${size}px`;
    f.style.left = `${left}%`;
    f.style.animationDuration = `${dur}s`;
    f.style.animationDelay = `${delay}s`;
    f.style.setProperty("--drift", `${drift}px`);
    f.style.opacity = "0";

    container.appendChild(f);
  }
}

/* ---- Strong Parallax (3 слоя, реакция на scroll + чуть на mouse) ---- */
function initParallax() {
  const layers = Array.from(document.querySelectorAll(".bg-layer"));
  if (!layers.length) return;

  let scrollY = window.scrollY || 0;
  let mouseX = 0;
  let mouseY = 0;
  let raf = null;

  function onScroll() {
    scrollY = window.scrollY || 0;
    requestTick();
  }

  function onMouseMove(e) {
    // мягкая реакция, чтобы “глубина” была даже без скролла
    const w = window.innerWidth || 1;
    const h = window.innerHeight || 1;
    mouseX = (e.clientX / w - 0.5) * 2; // -1..1
    mouseY = (e.clientY / h - 0.5) * 2; // -1..1
    requestTick();
  }

  function requestTick() {
    if (raf) return;
    raf = requestAnimationFrame(update);
  }

  function update() {
    raf = null;

    // ограничение, чтобы на больших страницах не улетало
    const s = Math.min(scrollY, 2400);

    layers.forEach((layer) => {
      const depth = parseFloat(layer.dataset.depth || "0.1");

      // scroll параллакс (основной)
      const ty = -(s * depth);

      // чуть “живости” от мыши
      const tx = mouseX * (depth * 16);
      const my = mouseY * (depth * 10);

      layer.style.transform = `translate3d(${tx}px, ${ty + my}px, 0) scale(1.05)`;
    });
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("mousemove", onMouseMove, { passive: true });
  window.addEventListener("resize", () => requestTick(), { passive: true });

  // стартовое состояние
  requestTick();
}
