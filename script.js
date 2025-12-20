const bg = document.querySelector(".layer-bg");
const mid = document.querySelector(".layer-mid");
const front = document.querySelector(".layer-front");

window.addEventListener("scroll", () => {
    const y = window.scrollY;

    if (bg) bg.style.transform = `translateY(${y * 0.15}px)`;
    if (mid) mid.style.transform = `translateY(${y * 0.35}px)`;
    if (front) front.style.transform = `translateY(${y * 0.6}px)`;
});
