function initReveal() {
    const items = document.querySelectorAll(".reveal");
    if (!items.length) return;
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) {
                e.target.classList.add("is-visible");
                observer.unobserve(e.target);
            }
        });
    }, { threshold: 0.14 });
    items.forEach((el) => observer.observe(el));
}

function initMobileMenu() {
    const burger = document.getElementById("burger");
    const mobileMenu = document.getElementById("mobile-menu");
    if (!burger || !mobileMenu) return;
    burger.addEventListener("click", () => {
        mobileMenu.classList.toggle("is-open");
    });
    mobileMenu.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("is-open");
        });
    });
}

function initTiltCard() {
    const card = document.querySelector(".profile-card");
    if (!card) return;
    card.addEventListener("mousemove", (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotateX = ((y / rect.height) - 0.5) * -8;
        const rotateY = ((x / rect.width) - 0.5) * 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });
    card.addEventListener("mouseleave", () => {
        card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg)";
    });
}

function initCopyPhone() {
    const btn = document.getElementById("copyPhoneBtn");
    if (!btn) return;
    btn.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText("+79990804597");
            const titleSpan = btn.querySelector(".contact-link__title");
            const originalText = titleSpan.innerHTML;
            titleSpan.innerHTML = "✅ Скопировано!";
            setTimeout(() => {
                titleSpan.innerHTML = originalText;
            }, 2000);
        } catch (err) {
            console.error("Ошибка копирования:", err);
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    if (typeof initIntroTyping === "function") initIntroTyping();
    initReveal();
    initMobileMenu();
    initTiltCard();
    initCopyPhone();
});