function initIntroTyping() {
    const intro = document.getElementById("intro");
    const typedCode = document.getElementById("typed-code");

    if (!intro || !typedCode) return;

    const lines = [
        "const developer = {",
        "  name: 'Vasilii Osipov',",
        "  role: 'Python / AI Automation Developer',",
        "  focus: ['telegram bots', 'ai tools', 'automation'],",
        "  strengths: ['logic', 'user scenarios', 'working systems']",
        "};",
        "",
        "portfolio.init();"
    ].join("\n");

    let index = 0;
    const speed = 18;

    typedCode.textContent = ""; // Очищаем перед печатью

    function type() {
        if (index < lines.length) {
            typedCode.textContent += lines.charAt(index);
            index++;
            setTimeout(type, speed);
        } else {
            setTimeout(() => {
                intro.classList.add("is-hidden");
            }, 700);
        }
    }

    setTimeout(type, 250);
}