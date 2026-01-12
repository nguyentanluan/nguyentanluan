// --- BÀI 1: Đổi nền ---
const bgBtn = document.getElementById('bg-toggle');
bgBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
});

// --- BÀI 2: Menu Highlight & BÀI 3: Fade-in ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');
const boxes = document.querySelectorAll('.box');

window.addEventListener('scroll', () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        // Kiểm tra vị trí cuộn
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }

        // Bài 3 Logic: Hiện box khi cuộn tới
        const rect = section.getBoundingClientRect();
        if (rect.top < window.innerHeight - 100) {
            const sectionBoxes = section.querySelectorAll('.box');
            sectionBoxes.forEach(box => box.classList.add('show'));
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

// --- BÀI 4: Nút nhảy lên ---
const jumpBtn = document.querySelector('.jump-btn');
jumpBtn.addEventListener('mouseover', () => {
    jumpBtn.classList.add('animate');
});
jumpBtn.addEventListener('animationend', () => {
    jumpBtn.classList.remove('animate');
});

// --- BÀI 5: Di chuyển theo chuột ---
const circle = document.querySelector('.circle');
window.addEventListener('mousemove', (e) => {
    // Trừ đi 15px để tâm vòng tròn nằm đúng đầu chuột (30px/2)
    circle.style.left = `${e.clientX - 15}px`;
    circle.style.top = `${e.clientY - 15}px`;
});