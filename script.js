(() => {
  // -----------------------------
  // Mobile menu
  // -----------------------------
  const burgerBtn = document.getElementById("burgerBtn");
  const mobileMenu = document.getElementById("mobileMenu");

  if (burgerBtn && mobileMenu) {
    burgerBtn.addEventListener("click", () => {
      const isOpen = mobileMenu.style.display === "block";
      mobileMenu.style.display = isOpen ? "none" : "block";
      mobileMenu.setAttribute("aria-hidden", isOpen ? "true" : "false");
    });

    mobileMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        mobileMenu.style.display = "none";
        mobileMenu.setAttribute("aria-hidden", "true");
      });
    });
  }

  // -----------------------------
  // Parallax (scroll + mouse/tilt)
  // -----------------------------
  const slides = document.getElementById("slides");
  const bg = document.querySelector(".p-bg");
  const mid = document.querySelector(".p-mid");
  const front = document.querySelector(".p-front");
  const parallaxWrap = document.getElementById("parallax");

  function clamp(v, min, max) { return Math.max(min, Math.min(max, v)); }

  function onScroll() {
    const y = slides ? slides.scrollTop : window.scrollY;
    // Сильнее эффект (как ты хотел "прям параллакс")
    if (bg) bg.style.transform = `translate3d(0, ${y * 0.14}px, 0) scale(1.05)`;
    if (mid) mid.style.transform = `translate3d(0, ${y * 0.26}px, 0) scale(1.06)`;
    if (front) front.style.transform = `translate3d(0, ${y * 0.40}px, 0) scale(1.08)`;
  }

  // Mouse / touch depth
  let mx = 0, my = 0;
  function onMove(e) {
    if (!parallaxWrap) return;

    const rect = parallaxWrap.getBoundingClientRect();
    const px = (("touches" in e) ? e.touches[0].clientX : e.clientX) - rect.left;
    const py = (("touches" in e) ? e.touches[0].clientY : e.clientY) - rect.top;

    const nx = (px / rect.width) - 0.5;
    const ny = (py / rect.height) - 0.5;

    mx = clamp(nx, -0.5, 0.5);
    my = clamp(ny, -0.5, 0.5);

    // subtle but visible
    if (bg) bg.style.transform += ` translate3d(${mx * 8}px, ${my * 8}px, 0)`;
    if (mid) mid.style.transform += ` translate3d(${mx * 14}px, ${my * 14}px, 0)`;
    if (front) front.style.transform += ` translate3d(${mx * 22}px, ${my * 22}px, 0)`;
  }

  if (slides) slides.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  if (parallaxWrap) {
    parallaxWrap.addEventListener("mousemove", onMove, { passive: true });
    parallaxWrap.addEventListener("touchmove", onMove, { passive: true });
  }

  // initial
  onScroll();

  // -----------------------------
  // Snow (canvas, beautiful + light)
  // -----------------------------
  const canvas = document.getElementById("snowCanvas");
  const ctx = canvas ? canvas.getContext("2d") : null;

  function resize() {
    if (!canvas) return;
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    if (ctx) ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  let flakes = [];
  function initSnow() {
    if (!canvas || !ctx) return;

    const w = window.innerWidth;
    const h = window.innerHeight;
    const count = w < 520 ? 70 : w < 1000 ? 110 : 160;

    flakes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 2.4,
      s: 0.4 + Math.random() * 1.2, // speed
      a: 0.4 + Math.random() * 0.5, // alpha
      vx: -0.35 + Math.random() * 0.7
    }));
  }

  function stepSnow() {
    if (!canvas || !ctx) return;
    const w = window.innerWidth;
    const h = window.innerHeight;

    ctx.clearRect(0, 0, w, h);

    // light blur glow
    ctx.save();
    ctx.globalCompositeOperation = "lighter";

    for (const f of flakes) {
      f.y += f.s;
      f.x += f.vx + Math.sin((f.y / 60)) * 0.35;

      if (f.y > h + 10) {
        f.y = -10;
        f.x = Math.random() * w;
      }
      if (f.x < -20) f.x = w + 20;
      if (f.x > w + 20) f.x = -20;

      ctx.beginPath();
      ctx.globalAlpha = f.a;
      ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,1)";
      ctx.fill();
    }

    ctx.restore();

    requestAnimationFrame(stepSnow);
  }

  if (canvas && ctx) {
    resize();
    initSnow();
    stepSnow();

    window.addEventListener("resize", () => {
      resize();
      initSnow();
    });
  }
})();
