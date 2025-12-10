document.addEventListener("DOMContentLoaded", () => {
    // Плавный скролл по якорям
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", (e) => {
            const targetId = link.getAttribute("href").slice(1);
            if (!targetId) return;
            const targetElem = document.getElementById(targetId);
            if (!targetElem) return;

            e.preventDefault();
            const top = targetElem.getBoundingClientRect().top + window.scrollY - 72;
            window.scrollTo({
                top,
                behavior: "smooth"
            });
        });
    });

    // Параллакс фоновых слоёв
    const parallaxElems = document.querySelectorAll("[data-speed]");
    if (parallaxElems.length) {
        const handleParallax = () => {
            const scrollY = window.scrollY || window.pageYOffset;
            parallaxElems.forEach(elem => {
                const speed = parseFloat(elem.dataset.speed || "0");
                const translateY = scrollY * speed * -1;
                elem.style.transform = `translate3d(0, ${translateY}px, 0)`;
            });
        };

        handleParallax();
        window.addEventListener("scroll", handleParallax, { passive: true });
    }
});
