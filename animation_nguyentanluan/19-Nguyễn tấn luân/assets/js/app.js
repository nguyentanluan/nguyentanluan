/* ===== DARK MODE ===== */
document.getElementById("toggleTheme").onclick = () => {
    document.body.classList.toggle("dark");
};

/* ===== SCROLL SPY ===== */
const sections = document.querySelectorAll("section");
const links = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(sec => {
        if (scrollY >= sec.offsetTop - 100) {
            current = sec.id;
        }
    });

    links.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* ===== SCROLL REVEAL ===== */
const cards = document.querySelectorAll(".card");

window.addEventListener("scroll", () => {
    cards.forEach(card => {
        if (card.getBoundingClientRect().top < window.innerHeight - 100) {
            card.classList.add("show");
        }
    });
});

/* ===== CURSOR ===== */
const cursor = document.querySelector(".cursor");

document.addEventListener("mousemove", e => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top  = e.clientY + "px";
});
