document.addEventListener("DOMContentLoaded", () => {
    createSnow();
});

function createSnow() {
    const container = document.querySelector(".snow-container");
    const count = window.innerWidth < 768 ? 50 : 120;

    for (let i = 0; i < count; i++) {
        const flake = document.createElement("span");
        flake.className = "snowflake";

        const size = Math.random() * 3 + 2;
        flake.style.width = size + "px";
        flake.style.height = size + "px";
        flake.style.left = Math.random() * 100 + "%";
        flake.style.animationDuration = 8 + Math.random() * 12 + "s";
        flake.style.animationDelay = -Math.random() * 20 + "s";

        container.appendChild(flake);
    }
}
