/* ===== BÀI 1: ĐỔI NỀN ===== */
const toggleBtn = document.getElementById("toggleTheme");
toggleBtn.onclick = () => {
    document.body.classList.toggle("dark");
};

/* ===== BÀI 2: MENU ACTIVE KHI CUỘN ===== */
const sections = document.querySelectorAll("section");
const menuLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (scrollY >= sectionTop - 100) {
            current = section.getAttribute("id");
        }
    });

    menuLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === "#" + current) {
            link.classList.add("active");
        }
    });
});

/* ===== BÀI 3: FADE-IN KHI CUỘN ===== */
const boxes = document.querySelectorAll(".box");

function showBoxes() {
    boxes.forEach(box => {
        const rect = box.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            box.classList.add("show");
        }
    });
}

window.addEventListener("scroll", showBoxes);

/* ===== BÀI 4: NÚT NHẢY ===== */
const jumpBtn = document.querySelector(".jump");

jumpBtn.addEventListener("mouseover", () => {
    jumpBtn.classList.add("animate");
});

jumpBtn.addEventListener("animationend", () => {
    jumpBtn.classList.remove("animate");
});

/* ===== BÀI 5: HÌNH TRÒN THEO CHUỘT ===== */
const circle = document.querySelector(".circle");

document.addEventListener("mousemove", (e) => {
    circle.style.left = e.clientX + "px";
    circle.style.top = e.clientY + "px";
});
