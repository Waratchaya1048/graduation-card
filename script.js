const slides = document.querySelectorAll('.slide');
let current = 0;
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const bgm = document.getElementById('bgm');
const totalSlides = slides.length; 
const startOverlay = document.getElementById('startOverlay');

// 🛠️ ฟังก์ชันอัปเดตสถานะปุ่ม
function updateButtonState() {
    prevBtn.disabled = (current === 0);
    nextBtn.disabled = (current === totalSlides - 1);
}

// 💖 ฟังก์ชันเริ่มระบบ
function startAll() {
    startOverlay.classList.add('hidden');
    bgm.volume = 0.25;
    bgm.play().catch(err => console.error("Audio error:", err));
    updateButtonState();
}

// เมื่อโหลดหน้าเสร็จ
document.addEventListener('DOMContentLoaded', () => {
    slides[current].classList.add('active');
    updateButtonState();
});

// ➡️ ปุ่มถัดไป
nextBtn.addEventListener('click', () => {
    if (current < totalSlides - 1) {
        slides[current].classList.remove('active');
        current++; 
        slides[current].classList.add('active');
        updateButtonState();
        createHearts(); // 💕 เอฟเฟกต์หัวใจ
    }
});

// ⬅️ ปุ่มก่อนหน้า
prevBtn.addEventListener('click', () => {
    if (current > 0) {
        slides[current].classList.remove('active');
        current--; 
        slides[current].classList.add('active');
        updateButtonState();
        createHearts(); // 💕 เอฟเฟกต์หัวใจ
    }
});

// 💞 ฟังก์ชันสร้างหัวใจลอยขึ้น
function createHearts() {
  for (let i = 0; i < 6; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '💖';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (Math.random() * 20 + 20) + 'px';
    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 2000);
  }
}
