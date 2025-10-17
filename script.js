const slides = document.querySelectorAll('.slide');
let current = 0;
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const bgm = document.getElementById('bgm');
const totalSlides = slides.length; 
const startOverlay = document.getElementById('startOverlay'); // ดึง element Overlay

// 🛠️ ฟังก์ชันสำหรับอัปเดตสถานะปุ่ม (Disable/Enable)
function updateButtonState() {
    prevBtn.disabled = (current === 0);
    nextBtn.disabled = (current === totalSlides - 1);
}

// 💖 ฟังก์ชันใหม่: ทำงานเมื่อผู้ใช้คลิกปุ่ม 'เริ่มเลย'
function startAll() {
    // 1. ซ่อน Overlay
    startOverlay.classList.add('hidden'); 

    // 2. เริ่มเล่นเพลง
    bgm.volume = 0.25;
    bgm.play().catch(error => {
        // ในกรณีที่ play() ล้มเหลว (ไม่น่าเกิดขึ้นเพราะมาจากการคลิกของผู้ใช้แล้ว)
        console.error("Audio playback failed:", error);
    });

    // 3. ตั้งค่าปุ่มเริ่มต้น (ซึ่งปกติทำใน DOMContentLoaded แต่ย้ายมาทำที่นี่เพื่อให้แน่ใจ)
    updateButtonState(); 
}

// ⬇️ เปลี่ยน DOMContentLoaded ให้เรียกแค่ updateButtonState() 
document.addEventListener('DOMContentLoaded', () => {
    // กำหนดให้สไลด์แรกแสดงผลเมื่อหน้าโหลด
    slides[current].classList.add('active');
    
    // ⚠️ ไม่ต้องเรียก updateButtonState() ที่นี่ เพราะจะถูกเรียกใน startAll() แทน
    // แต่เราเรียกเพื่อตั้งค่าปุ่มอย่างรวดเร็ว (แม้จะถูก Overlay บังอยู่)
    updateButtonState();
});

// ➡️ ปุ่ม "ถัดไป" (Next Button)
nextBtn.addEventListener('click', () => {
    if (current < totalSlides - 1) {
        slides[current].classList.remove('active');
        current++; 
        slides[current].classList.add('active');
        updateButtonState();
    }
});

// ⬅️ ปุ่ม "ก่อนหน้า" (Previous Button)
prevBtn.addEventListener('click', () => {
    if (current > 0) {
        slides[current].classList.remove('active');
        current--; 
        slides[current].classList.add('active');
        updateButtonState();
    }
});

// 💡 เนื่องจากฟังก์ชัน startAll() ถูกเรียกโดย onclick="startAll()" ใน HTML 
// เราจึงไม่จำเป็นต้องเพิ่ม Event Listener สำหรับปุ่ม 'เริ่มเลย' ใน JavaScript อีกครับ