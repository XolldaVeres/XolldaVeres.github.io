* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: system-ui, -apple-system, BlinkMacSystemFont, sans-serif;
    background: #050812;
    color: #fff;
}

/* HEADER */
.header {
    position: fixed;
    top: 0;
    width: 100%;
    background: rgba(5,8,18,0.8);
    backdrop-filter: blur(10px);
    z-index: 20;
}

.header-inner {
    max-width: 1200px;
    margin: auto;
    padding: 14px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.header nav a {
    color: #cfd6f0;
    margin-left: 18px;
    text-decoration: none;
}

/* PARALLAX */
.parallax-hero {
    position: relative;
    height: 100vh;
    overflow: hidden;
}

.parallax-layer {
    position: absolute;
    inset: 0;
    background-size: cover;
    background-position: center;
    will-change: transform;
}

.layer-bg {
    background-image: url("images/parallax-bg.jpg");
    z-index: 1;
}

.layer-mid {
    background-image: url("images/parallax-mid.png");
    opacity: 0.6;
    z-index: 2;
}

.layer-front {
    background-image: url("images/parallax-front.png");
    opacity: 0.8;
    z-index: 3;
}

.parallax-hero::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
        to bottom,
        rgba(5,8,18,0.5),
        rgba(5,8,18,0.85)
    );
    z-index: 4;
}

/* HERO CONTENT */
.hero-content {
    position: relative;
    z-index: 5;
    max-width: 900px;
    margin: auto;
    padding: 0 20px;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
}

.badge {
    color: #9ad3ff;
    margin-bottom: 14px;
    font-weight: 600;
}

.hero-content h1 {
    font-size: 44px;
    margin-bottom: 16px;
    line-height: 1.15;
}

.hero-content h1 span {
    color: #ffb25c;
}

.hero-content p {
    font-size: 18px;
    color: #cfd6f0;
    margin-bottom: 26px;
}

.hero-buttons {
    display: flex;
    gap: 14px;
    margin-bottom: 16px;
}

.hero-note {
    color: #9aa4d1;
    font-size: 14px;
}

/* BUTTONS */
.btn {
    padding: 14px 26px;
    border-radius: 999px;
    font-weight: 600;
    text-decoration: none;
}

.btn.main {
    background: linear-gradient(135deg, #ff6a3d, #ffb25c);
    color: #000;
}

.btn.ghost {
    border: 1px solid #fff;
    color: #fff;
}

/* SECTIONS */
.section {
    padding: 90px 20px;
    max-width: 1200px;
    margin: auto;
}

.section h2 {
    font-size: 32px;
    margin-bottom: 10px;
}

.subtitle {
    color: #aab1d4;
    margin-bottom: 30px;
}

/* CARDS */
.cards {
    display: grid;
    grid-template-columns: repeat(4,1fr);
    gap: 20px;
}

.card {
    background: #0b1224;
    padding: 22px;
    border-radius: 18px;
}

/* PORTFOLIO */
.portfolio {
    display: grid;
    grid-template-columns: repeat(3,1fr);
    gap: 20px;
}

.portfolio-item {
    background: #0b1224;
    padding: 16px;
    border-radius: 18px;
}

.portfolio-item img {
    width: 100%;
    border-radius: 14px;
    margin-bottom: 10px;
}

/* PRICES */
.prices {
    display: grid;
    gap: 16px;
}

.price {
    background: #0b1224;
    padding: 20px;
    border-radius: 16px;
    display: flex;
    justify-content: space-between;
}

.price.highlight {
    border: 1px solid #ffb25c;
}

/* CONTACT */
.contact {
    text-align: center;
}

/* FOOTER */
.footer {
    padding: 30px;
    text-align: center;
    color: #9aa4d1;
}

/* ADAPTIVE */
@media (max-width: 900px) {
    .cards,
    .portfolio {
        grid-template-columns: 1fr;
    }

    .hero-content h1 {
        font-size: 32px;
    }
}
