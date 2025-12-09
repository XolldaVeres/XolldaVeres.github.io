// Простая анимация "частиц" на фоне
const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

let particles = [];
for (let i = 0; i < 80; i++) {
    particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        s: Math.random() * 1.2 + 0.2,
        v: Math.random() * 0.4 + 0.1
    });
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "rgba(255,255,255,0.6)";

    particles.forEach(p => {
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.s, 0, Math.PI * 2);
        ctx.fill();

        p.y += p.v;
        if (p.y > canvas.height) p.y = 0;
    });

    requestAnimationFrame(animate);
}

animate();
