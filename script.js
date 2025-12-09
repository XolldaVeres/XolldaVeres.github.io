const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();

let stars = [];
for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.3,
        speed: Math.random() * 0.4 + 0.1
    });
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    stars.forEach(s => {
        ctx.fillStyle = "white";
        ctx.fillRect(s.x, s.y, s.size, s.size);

        s.y += s.speed;
        if (s.y > canvas.height) s.y = 0;
    });

    requestAnimationFrame(draw);
}

draw();

/* Параллакс — лёгкое движение при скролле */
window.addEventListener("scroll", () => {
    const offset = window.scrollY * 0.2;
    canvas.style.transform = `translateY(${offset}px)`;
});
