// ===============================
// ПАРАЛЛАКС ФОНА
// ===============================
(function () {
    const layers = document.querySelectorAll(".parallax-layer");

    if (!layers.length) return;

    const factors = {
        "layer-stars": 0.08,
        "layer-grid": 0.04,
        "layer-glow": 0.02,
    };

    function onScroll() {
        const y = window.scrollY || window.pageYOffset;

        layers.forEach((layer) => {
            let factor = 0.04;
            for (const cls of layer.classList) {
                if (factors[cls]) {
                    factor = factors[cls];
                    break;
                }
            }
            const translateY = y * factor * -1;
            layer.style.transform = `translate3d(0, ${translateY}px, 0)`;
        });
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
})();

// ===============================
// ПАРАЛЛАКС КАРТОЧКИ HERO (легкий tilt)
// ===============================
(function () {
    const card = document.querySelector(".hero-card");
    if (!card) return;

    function handleMove(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        const rotateX = (y / rect.height) * -6;
        const rotateY = (x / rect.width) * 6;

        card.style.transform = `translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }

    function reset() {
        card.style.transform = "translateY(0) rotateX(0deg) rotateY(0deg)";
    }

    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", reset);
})();

// ===============================
// Мобильное меню
// ===============================
(function () {
    const burger = document.getElementById("burger");
    const nav = document.getElementById("mainNav");
    if (!burger || !nav) return;

    burger.addEventListener("click", () => {
        burger.classList.toggle("active");
        nav.classList.toggle("open");
    });

    nav.addEventListener("click", (e) => {
        if (e.target.tagName === "A") {
            burger.classList.remove("active");
            nav.classList.remove("open");
        }
    });
})();
