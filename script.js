document.addEventListener("DOMContentLoaded", () => {
    initSnow();
});

function initSnow() {
    const container = document.querySelector(".snow-container");
    if (!container) return;

    const count = window.innerWidth < 768 ? 40 : 90;

    for (let i = 0; i < count; i++) {
        const s = document.createElement("span");
        s.className = "snowflake";
        s.style.left = Math.random() * 100 + "%";
        s.style.width = s.style.height = 2 + Math.random() * 3 + "px";
        s.style.animationDuration = 8 + Math.random() * 10 + "s";
        s.style.animationDelay = -Math.random() * 10 + "s";
        container.appendChild(s);
    }
}
