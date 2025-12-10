/* ---------- SNOW EFFECT ---------- */
function createSnowflake() {
    const flake = document.createElement("div");
    flake.classList.add("snowflake");

    flake.style.left = Math.random() * 100 + "vw";
    flake.style.animationDuration = 3 + Math.random() * 4 + "s";
    flake.style.opacity = 0.4 + Math.random() * 0.6;

    document.querySelector(".snow-container").appendChild(flake);

    setTimeout(() => flake.remove(), 8000);
}

setInterval(createSnowflake, 120);
