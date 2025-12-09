// -------- ПАРАЛЛАКС-ЗВЁЗДЫ --------
const canvas = document.getElementById("stars-canvas");
const ctx = canvas.getContext("2d");

let stars = [];
const STAR_COUNT = 120;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

function initStars() {
  stars = [];
  for (let i = 0; i < STAR_COUNT; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.2 + 0.4,
      speed: Math.random() * 0.25 + 0.05,
      alpha: Math.random() * 0.8 + 0.2
    });
  }
}
initStars();

let lastScrollY = window.scrollY;

function animate() {
  const scrollY = window.scrollY;
  const scrollDelta = scrollY - lastScrollY;
  lastScrollY = scrollY;

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const star of stars) {
    star.y += scrollDelta * star.speed * 0.2;

    if (star.y < -10) star.y = canvas.height + 10;
    if (star.y > canvas.height + 10) star.y = -10;

    ctx.globalAlpha = star.alpha;
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
    ctx.fill();
  }

  ctx.globalAlpha = 1;
  requestAnimationFrame(animate);
}
animate();
