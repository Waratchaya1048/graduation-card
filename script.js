const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('nextBtn');
const bgm = document.getElementById('bgm');
const startOverlay = document.getElementById('startOverlay');
let current = 0;

// เริ่มทั้งหมด
function startAll() {
  startOverlay.classList.add('hidden');
  bgm.volume = 0.25;
  bgm.play().catch(err => console.log(err));
}

// ปรับสถานะปุ่ม
function updateButton() {
  if (current === slides.length - 1) {
    nextBtn.style.display = 'none';
  } else {
    nextBtn.style.display = 'inline-block';
  }
}

// เปลี่ยนสไลด์
nextBtn.addEventListener('click', (e) => {
  if (current < slides.length - 1) {
    slides[current].classList.remove('active');
    current++;
    slides[current].classList.add('active');
    updateButton();
    createHearts(e);
  }
});

// เอฟเฟกต์หัวใจ
function createHearts(e) {
  for (let i = 0; i < 5; i++) {
    const heart = document.createElement('div');
    heart.classList.add('heart');
    heart.textContent = '💖';
    heart.style.left = `${e.clientX + (Math.random() * 50 - 25)}px`;
    heart.style.top = `${e.clientY + (Math.random() * 50 - 25)}px`;
    heart.style.fontSize = `${Math.random() * 20 + 20}px`;
    document.body.appendChild(heart);
    setTimeout(() => heart.remove(), 2000);
  }
}

document.addEventListener('DOMContentLoaded', updateButton);
