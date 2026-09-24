/**
 * VIRAL BIRTHDAY INTERACTIVE SCRIPT 2024 - 2026
 * Features:
 * - Passcode Security (Default: 923248)
 * - Music Synthesizer & Sound Effects
 * - Floating Hearts & Sparkles Canvas
 * - Tap to Unbox Surprise Gift
 * - Blow Out the Cake Candles
 * - Typewriter Letter Effect
 * - Interactive Flip Memory Polaroids
 * - WhatsApp direct message routing with quick replies
 */

// ==========================================
// 1. CONFIGURATION (Bisa diedit langsung di sini)
// ==========================================
const DEFAULT_CONFIG = {
  secretCode: "923248", // Sandi akses sesuai permintaan
  recipientName: "Bidadari Cantik ✨", // Nama orang yang ulang tahun
  senderName: "Aku yang selalu mendoakanmu 💖",
  whatsappNumber: "6285200000206", // Nomor WhatsApp kamu: +62 852 0000 0206
  customMusicUrl: "", // Isi jika ingin ganti lagu MP3 sendiri
  letterText: `Selamat bertambah usia yaa! 🎂✨

Di hari yang sangat istimewa ini, aku cuma mau bilang terima kasih banyak sudah lahir ke dunia dan menjadi sosok yang begitu luar biasa.

Semoga di usiamu yang baru ini, setiap langkahmu dipenuhi kebahagiaan, rezekimu dilipatgandakan, semua impian serta doamu segera dikabulkan oleh Allah SWT, dan hatimu selalu dijauhkan dari rasa sedih.

Tetaplah jadi dirimu yang manis, ceria, dan selalu menyebarkan energi positif buat orang-orang di sekitarmu. Jangan pernah lupa kalau kamu itu sangat berharga! 🌸

Sekali lagi, Happy Birthday! 🥳🎉🎁`
};

// Ambil konfigurasi tersimpan atau URL query parameter (?phone=628xxx&name=...)
const urlParams = new URLSearchParams(window.location.search);
let savedConfig = JSON.parse(localStorage.getItem('bday_config') || '{}');

// Jika masih ada nomor dummy lama, perbarui otomatis ke nomor baru
if (savedConfig.whatsappNumber === "6281234567890") {
  savedConfig.whatsappNumber = DEFAULT_CONFIG.whatsappNumber;
  localStorage.setItem('bday_config', JSON.stringify(savedConfig));
}

window.CONFIG = {
  secretCode: DEFAULT_CONFIG.secretCode,
  recipientName: urlParams.get('name') || savedConfig.recipientName || DEFAULT_CONFIG.recipientName,
  senderName: savedConfig.senderName || DEFAULT_CONFIG.senderName,
  whatsappNumber: urlParams.get('phone') || savedConfig.whatsappNumber || DEFAULT_CONFIG.whatsappNumber,
  customMusicUrl: savedConfig.customMusicUrl || DEFAULT_CONFIG.customMusicUrl,
  letterText: savedConfig.letterText || DEFAULT_CONFIG.letterText
};

// ==========================================
// 2. STATE & INITIALIZATION
// ==========================================
let enteredPasscode = "";
let isUnlocked = false;
let isCandleBlown = false;
let isLetterTyped = false;

document.addEventListener('DOMContentLoaded', () => {
  applyConfigToDOM();
  initParticles();
  initKeypad();
  initCake();
  initGiftBox();
  initWhatsApp();
  initMusicWidget();
  initSettingsModal();
});

// Update DOM elements with configured values
function applyConfigToDOM() {
  document.querySelectorAll('.recipient-name-target').forEach(el => {
    el.textContent = window.CONFIG.recipientName;
  });
}

// ==========================================
// 3. KEYPAD & PASSCODE LOGIC (SANDI: 923248)
// ==========================================
function initKeypad() {
  const keys = document.querySelectorAll('.key-btn');
  const dots = document.querySelectorAll('.passcode-dot');
  const errorMsg = document.getElementById('passcode-error');
  const lockCard = document.querySelector('.lock-card');

  function updateDots() {
    dots.forEach((dot, index) => {
      if (index < enteredPasscode.length) {
        dot.classList.add('filled');
      } else {
        dot.classList.remove('filled');
      }
    });
  }

  function handleInput(val) {
    if (isUnlocked) return;
    if (window.bdayAudio) window.bdayAudio.init();

    if (val === 'clear') {
      enteredPasscode = "";
      updateDots();
      errorMsg.textContent = "";
      return;
    }

    if (val === 'backspace') {
      enteredPasscode = enteredPasscode.slice(0, -1);
      updateDots();
      errorMsg.textContent = "";
      return;
    }

    if (enteredPasscode.length < 6) {
      enteredPasscode += val;
      updateDots();
      errorMsg.textContent = "";

      // Sound pop kecil saat tap
      if (window.bdayAudio) window.bdayAudio.playTone(400 + enteredPasscode.length * 60, window.bdayAudio.ctx.currentTime, 0.15);

      // Cek jika sudah 6 digit
      if (enteredPasscode.length === 6) {
        setTimeout(validatePasscode, 250);
      }
    }
  }

  function validatePasscode() {
    if (enteredPasscode === window.CONFIG.secretCode) {
      // BERHASIL UNLOCK
      unlockWebsite();
    } else {
      // SALAH KODE
      lockCard.classList.add('shake');
      errorMsg.textContent = "Ups! Sandi salah nih 😜 Coba lagi ya!";
      if (window.bdayAudio) {
        window.bdayAudio.playTone(220, window.bdayAudio.ctx.currentTime, 0.3, 'sawtooth');
      }
      setTimeout(() => {
        lockCard.classList.remove('shake');
        enteredPasscode = "";
        updateDots();
      }, 700);
    }
  }

  keys.forEach(btn => {
    btn.addEventListener('click', () => {
      const val = btn.getAttribute('data-key');
      handleInput(val);
    });
  });

  // Support input dari keyboard fisik
  window.addEventListener('keydown', (e) => {
    if (isUnlocked) return;
    if (e.key >= '0' && e.key <= '9') {
      handleInput(e.key);
    } else if (e.key === 'Backspace') {
      handleInput('backspace');
    } else if (e.key === 'Escape') {
      handleInput('clear');
    }
  });

  // Interaksi Petunjuk Sandi Rahasia
  const hintToggleBtn = document.getElementById('hint-toggle-btn');
  const hintRevealBox = document.getElementById('hint-reveal-box');
  const btnAutoFill = document.getElementById('btn-auto-fill');

  if (hintToggleBtn && hintRevealBox) {
    hintToggleBtn.addEventListener('click', () => {
      hintRevealBox.classList.toggle('show');
      if (hintRevealBox.classList.contains('show')) {
        hintToggleBtn.innerHTML = '✨ Petunjuk Terbuka (Tutup ✕)';
        if (window.bdayAudio) window.bdayAudio.playPop();
      } else {
        hintToggleBtn.innerHTML = '💡 Butuh Petunjuk Sandi? Klik di sini';
      }
    });
  }

  if (btnAutoFill) {
    btnAutoFill.addEventListener('click', () => {
      enteredPasscode = window.CONFIG.secretCode;
      updateDots();
      if (window.bdayAudio) window.bdayAudio.playPop();
      setTimeout(validatePasscode, 200);
    });
  }
}

function unlockWebsite() {
  isUnlocked = true;
  const overlay = document.getElementById('lockscreen');
  overlay.classList.add('unlocked');

  // Trigger audio & confetti
  if (window.bdayAudio) {
    window.bdayAudio.playPop();
    window.bdayAudio.playBirthdayMelody();
    document.getElementById('music-widget').classList.add('playing');
  }

  triggerConfetti();

  setTimeout(() => {
    overlay.style.display = 'none';
    startTypewriter();
  }, 700);
}

// ==========================================
// 4. MUSIC CONTROLLER WIDGET
// ==========================================
function initMusicWidget() {
  const widget = document.getElementById('music-widget');
  widget.addEventListener('click', () => {
    if (!window.bdayAudio) return;
    const isPlaying = window.bdayAudio.toggle();
    if (isPlaying) {
      widget.classList.add('playing');
    } else {
      widget.classList.remove('playing');
    }
  });
}

// ==========================================
// 5. MYSTERY GIFT BOX
// ==========================================
function initGiftBox() {
  const giftBox = document.getElementById('gift-box');
  const revealCard = document.getElementById('gift-reveal');
  let opened = false;

  giftBox.addEventListener('click', () => {
    if (opened) return;
    opened = true;
    giftBox.classList.add('opened');
    if (window.bdayAudio) window.bdayAudio.playPop();
    triggerConfetti();

    setTimeout(() => {
      revealCard.classList.add('show');
    }, 400);
  });
}

// ==========================================
// 6. CAKE & CANDLE BLOW INTERACTION
// ==========================================
function initCake() {
  const cake = document.getElementById('cake');
  const blowBtn = document.getElementById('blow-candle-btn');
  const wishMsg = document.getElementById('wish-message');
  const candles = document.querySelectorAll('.candle');

  function blowCandle() {
    if (isCandleBlown) return;
    isCandleBlown = true;

    if (window.bdayAudio) window.bdayAudio.playBlow();

    candles.forEach(c => c.classList.add('blown-out'));
    blowBtn.innerHTML = '<span>🎉 Lilin Padam! Permohonan Dibuat ✨</span>';
    blowBtn.style.background = 'rgba(255, 255, 255, 0.2)';

    setTimeout(() => {
      wishMsg.classList.add('show');
      triggerConfetti();
    }, 500);
  }

  cake.addEventListener('click', blowCandle);
  blowBtn.addEventListener('click', blowCandle);
}

// ==========================================
// 7. TYPEWRITER EFFECT FOR THE LETTER
// ==========================================
function startTypewriter() {
  if (isLetterTyped) return;
  isLetterTyped = true;

  const target = document.getElementById('typewriter-letter');
  const text = window.CONFIG.letterText;
  let index = 0;
  target.innerHTML = "";

  function type() {
    if (index < text.length) {
      const char = text.charAt(index);
      if (char === '\n') {
        target.innerHTML += '<br>';
      } else {
        target.innerHTML += char;
      }
      index++;
      setTimeout(type, 30);
    }
  }

  setTimeout(type, 800);
}

// ==========================================
// 8. WHATSAPP FEEDBACK ROUTING (FITUR UTAMA)
// ==========================================
function initWhatsApp() {
  const textarea = document.getElementById('wa-message-input');
  const chips = document.querySelectorAll('.chip-btn');
  const sendBtn = document.getElementById('send-wa-btn');

  // Quick Chips click handler
  chips.forEach(chip => {
    chip.addEventListener('click', () => {
      const chipText = chip.getAttribute('data-text');
      textarea.value = chipText;
      textarea.focus();
      if (window.bdayAudio) window.bdayAudio.playPop();
    });
  });

  // Kirim Pesan ke WhatsApp
  sendBtn.addEventListener('click', () => {
    let userMsg = textarea.value.trim();
    if (!userMsg) {
      userMsg = "Makasih banyaaak ya atas kejutan websitenya! Lucu dan terharu banget 🥺💖";
    }

    // Nomor WA yang dikonfigurasi (bersihkan spasi, strip, tanda +)
    let phone = window.CONFIG.whatsappNumber.replace(/[^0-9]/g, '');

    // Format pesan WhatsApp yang rapi dan manis
    const fullText = `Halo! 🎂✨\n\nAku barusan udah buka web ulang tahun spesial yang kamu bikin buat aku! 💖\n\n"${userMsg}"\n\nMakasih banyak yaa atas ucapan dan doanya! 🥰`;

    const encodedText = encodeURIComponent(fullText);
    const waUrl = `https://wa.me/${phone}?text=${encodedText}`;

    triggerConfetti();
    if (window.bdayAudio) window.bdayAudio.playPop();

    // Buka WhatsApp di tab baru / aplikasi WA
    setTimeout(() => {
      window.open(waUrl, '_blank');
    }, 400);
  });
}

// ==========================================
// 9. CONFETTI BURST (CDN + FALLBACK)
// ==========================================
function triggerConfetti() {
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ff6b8b', '#ffc75f', '#845ec2', '#25D366', '#ffffff']
    });
    setTimeout(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 }
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 }
      });
    }, 250);
  }
}

// ==========================================
// 10. FLOATING HEARTS & PARTICLES BACKGROUND
// ==========================================
function initParticles() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  const particles = [];
  const particleCount = 28;

  for (let i = 0; i < particleCount; i++) {
    particles.push({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 12 + 6,
      speedY: Math.random() * 0.8 + 0.3,
      speedX: (Math.random() - 0.5) * 0.5,
      type: Math.random() > 0.5 ? 'heart' : 'sparkle',
      opacity: Math.random() * 0.6 + 0.2,
      rotation: Math.random() * Math.PI * 2
    });
  }

  function drawHeart(x, y, size, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(size / 15, size / 15);
    ctx.fillStyle = `rgba(255, 107, 139, ${opacity})`;
    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.bezierCurveTo(-10, -10, -15, 5, 0, 15);
    ctx.bezierCurveTo(15, 5, 10, -10, 0, 0);
    ctx.fill();
    ctx.restore();
  }

  function drawSparkle(x, y, size, opacity) {
    ctx.save();
    ctx.translate(x, y);
    ctx.fillStyle = `rgba(255, 199, 95, ${opacity})`;
    ctx.beginPath();
    ctx.arc(0, 0, size / 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  function animate() {
    ctx.clearRect(0, 0, width, height);

    particles.forEach(p => {
      p.y -= p.speedY;
      p.x += p.speedX;

      if (p.y < -20) {
        p.y = height + 20;
        p.x = Math.random() * width;
      }

      if (p.type === 'heart') {
        drawHeart(p.x, p.y, p.size, p.opacity);
      } else {
        drawSparkle(p.x, p.y, p.size, p.opacity);
      }
    });

    requestAnimationFrame(animate);
  }

  animate();
}

// ==========================================
// 11. MODAL SETTING (UNTUK GANTI NOMOR WA / NAMA)
// ==========================================
function initSettingsModal() {
  const trigger = document.getElementById('settings-btn');
  const modal = document.getElementById('settings-modal-backdrop');
  const closeBtn = document.getElementById('modal-close-btn');
  const saveBtn = document.getElementById('modal-save-btn');

  const inputName = document.getElementById('cfg-name');
  const inputPhone = document.getElementById('cfg-phone');
  const inputMusic = document.getElementById('cfg-music');

  if (!trigger) return;

  trigger.addEventListener('click', () => {
    inputName.value = window.CONFIG.recipientName;
    inputPhone.value = window.CONFIG.whatsappNumber;
    inputMusic.value = window.CONFIG.customMusicUrl || "";
    modal.classList.add('open');
  });

  closeBtn.addEventListener('click', () => {
    modal.classList.remove('open');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('open');
  });

  saveBtn.addEventListener('click', () => {
    window.CONFIG.recipientName = inputName.value.trim() || DEFAULT_CONFIG.recipientName;
    window.CONFIG.whatsappNumber = inputPhone.value.trim() || DEFAULT_CONFIG.whatsappNumber;
    window.CONFIG.customMusicUrl = inputMusic.value.trim();

    localStorage.setItem('bday_config', JSON.stringify({
      recipientName: window.CONFIG.recipientName,
      whatsappNumber: window.CONFIG.whatsappNumber,
      customMusicUrl: window.CONFIG.customMusicUrl,
      letterText: window.CONFIG.letterText
    }));

    applyConfigToDOM();
    modal.classList.remove('open');
    alert("Pengaturan nomor WA dan nama berhasil disimpan! ✨");
  });
}
