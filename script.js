/* ============================================================
   ANGEL FACE - Premium Romantic Counter
   JavaScript Engine - Ultra Professional Edition
   ============================================================ */

(function () {
    'use strict';

    // ──────────────────────────────────────────────
    // CONFIGURATION
    // ──────────────────────────────────────────────
    const DATES = {
        first: new Date('2026-05-16T14:28:00+03:00'),   // İlk mesaj
        last:  new Date('2026-05-20T17:25:00+03:00'),    // Son konuşma
    };

    // ──────────────────────────────────────────────
    // LOADING SCREEN
    // ──────────────────────────────────────────────
    const loader = document.getElementById('loader');

    function hideLoader() {
        if (loader) {
            loader.classList.add('is-hidden');
            setTimeout(() => {
                loader.style.display = 'none';
            }, 700);
        }
    }

    // Hide loader when everything is ready
    window.addEventListener('load', () => {
        // Small delay to let fonts render and initial paint settle
        setTimeout(hideLoader, 800);
        window.scrollTo(0, 0);
    });

    // Fallback: hide loader after 3 seconds no matter what
    setTimeout(() => {
        hideLoader();
        window.scrollTo(0, 0);
    }, 3000);

    // ──────────────────────────────────────────────
    // STARFIELD BACKGROUND
    // ──────────────────────────────────────────────
    function createStarfield() {
        const container = document.getElementById('starfield');
        if (!container) return;

        const starCount = 80;
        const fragment = document.createDocumentFragment();

        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            const size = Math.random() * 2.5 + 1;
            star.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: ${Math.random() > 0.7 ? 'hsla(340, 100%, 80%, 0.6)' : Math.random() > 0.5 ? 'hsla(270, 90%, 85%, 0.5)' : 'hsla(0, 0%, 100%, 0.4)'};
                border-radius: 50%;
                top: ${Math.random() * 100}%;
                left: ${Math.random() * 100}%;
                animation: twinkle ${Math.random() * 4 + 3}s ease-in-out ${Math.random() * 5}s infinite;
                pointer-events: none;
            `;
            fragment.appendChild(star);
        }

        container.appendChild(fragment);
    }

    createStarfield();

    // ──────────────────────────────────────────────
    // UTILITY: Time difference calculator
    // ──────────────────────────────────────────────
    function getTimeDifference(fromDate) {
        const now = new Date();
        let totalMs = now - fromDate;
        if (totalMs < 0) totalMs = 0;

        const totalSeconds = Math.floor(totalMs / 1000);
        const totalMinutes = Math.floor(totalMs / 60000);
        const totalHours   = Math.floor(totalMs / 3600000);
        const totalDays    = Math.floor(totalMs / 86400000);

        const days    = Math.floor(totalSeconds / 86400);
        const hours   = Math.floor((totalSeconds % 86400) / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return { days, hours, minutes, seconds, totalDays, totalHours, totalMinutes, totalSeconds };
    }

    // ──────────────────────────────────────────────
    // FORMAT helpers
    // ──────────────────────────────────────────────
    function padZero(num, len) {
        len = len || 2;
        return String(num).padStart(len, '0');
    }

    function formatNumber(num) {
        return num.toLocaleString('tr-TR');
    }

    // ──────────────────────────────────────────────
    // DOM ELEMENTS
    // ──────────────────────────────────────────────
    const els = {
        firstDays:         document.getElementById('first-days'),
        firstHours:        document.getElementById('first-hours'),
        firstMinutes:      document.getElementById('first-minutes'),
        firstSeconds:      document.getElementById('first-seconds'),
        firstTotalDays:    document.getElementById('first-total-days'),
        firstTotalHours:   document.getElementById('first-total-hours'),
        firstTotalMinutes: document.getElementById('first-total-minutes'),
        firstTotalSeconds: document.getElementById('first-total-seconds'),

        lastDays:          document.getElementById('last-days'),
        lastHours:         document.getElementById('last-hours'),
        lastMinutes:       document.getElementById('last-minutes'),
        lastSeconds:       document.getElementById('last-seconds'),
        lastTotalDays:     document.getElementById('last-total-days'),
        lastTotalHours:    document.getElementById('last-total-hours'),
        lastTotalMinutes:  document.getElementById('last-total-minutes'),
        lastTotalSeconds:  document.getElementById('last-total-seconds'),
    };

    // ──────────────────────────────────────────────
    // COUNTER UPDATE WITH SMOOTH ANIMATION
    // ──────────────────────────────────────────────
    function animateValue(el, newValue) {
        if (!el) return;
        if (el.textContent === newValue) return;

        // Micro-animation: slide up then settle
        el.style.transition = 'none';
        el.style.transform = 'translateY(6px)';
        el.style.opacity = '0.4';

        // Force reflow
        void el.offsetWidth;

        el.textContent = newValue;
        el.style.transition = 'transform 350ms cubic-bezier(0.34, 1.56, 0.64, 1), opacity 350ms ease';
        el.style.transform = 'translateY(0)';
        el.style.opacity = '1';
    }

    function updateCounters() {
        // First message counter
        const first = getTimeDifference(DATES.first);
        animateValue(els.firstDays,    padZero(first.days, 3));
        animateValue(els.firstHours,   padZero(first.hours));
        animateValue(els.firstMinutes, padZero(first.minutes));
        animateValue(els.firstSeconds, padZero(first.seconds));
        
        animateValue(els.firstTotalDays,    formatNumber(first.totalDays));
        animateValue(els.firstTotalHours,   formatNumber(first.totalHours));
        animateValue(els.firstTotalMinutes, formatNumber(first.totalMinutes));
        animateValue(els.firstTotalSeconds, formatNumber(first.totalSeconds));

        // Last message counter
        const last = getTimeDifference(DATES.last);
        animateValue(els.lastDays,    padZero(last.days, 3));
        animateValue(els.lastHours,   padZero(last.hours));
        animateValue(els.lastMinutes, padZero(last.minutes));
        animateValue(els.lastSeconds, padZero(last.seconds));
        
        animateValue(els.lastTotalDays,    formatNumber(last.totalDays));
        animateValue(els.lastTotalHours,   formatNumber(last.totalHours));
        animateValue(els.lastTotalMinutes, formatNumber(last.totalMinutes));
        animateValue(els.lastTotalSeconds, formatNumber(last.totalSeconds));
    }

    // Initial call + high-frequency interval for perfect precision (no lag)
    updateCounters();
    setInterval(updateCounters, 250);

    // ──────────────────────────────────────────────
    // SCROLL REVEAL (Intersection Observer)
    // ──────────────────────────────────────────────
    function setupScrollReveal() {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -60px 0px',
            threshold: 0.1,
        };

        const observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Don't unobserve – keep animation trigger active if user scrolls back up
                }
            });
        }, observerOptions);

        // Observe counter cards with staggered delay
        var cards = document.querySelectorAll('.counter-card');
        cards.forEach(function (card, index) {
            card.style.transitionDelay = (index * 0.15) + 's';
            observer.observe(card);
        });

        // Observe stats bridge
        var statsBridge = document.querySelector('.stats-bridge__card');
        if (statsBridge) observer.observe(statsBridge);
    }

    setupScrollReveal();

    // ──────────────────────────────────────────────
    // SCROLL HINT – click to scroll
    // ──────────────────────────────────────────────
    var scrollHint = document.getElementById('scroll-hint');
    if (scrollHint) {
        scrollHint.addEventListener('click', function () {
            var timeline = document.getElementById('timeline');
            if (timeline) {
                timeline.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    }

    // ──────────────────────────────────────────────
    // FLOATING HEARTS CANVAS (Optimized)
    // ──────────────────────────────────────────────
    var canvas = document.getElementById('hearts-canvas');
    var ctx = canvas.getContext('2d');
    var hearts = [];
    var mouseX = -1000;
    var mouseY = -1000;
    var canvasW, canvasH;
    var MAX_HEARTS = 40;

    var HEART_COLORS = [
        { h: 340, s: 100, l: 70 },   // rose
        { h: 340, s: 100, l: 82 },   // light rose
        { h: 270, s: 90,  l: 75 },   // violet
        { h: 280, s: 60,  l: 72 },   // lavender
        { h: 320, s: 90,  l: 72 },   // pink
        { h: 45,  s: 100, l: 72 },   // gold (rare)
    ];

    function resizeCanvas() {
        canvasW = canvas.width = window.innerWidth;
        canvasH = canvas.height = window.innerHeight;
    }

    function randomColor() {
        // Gold is rare
        if (Math.random() > 0.92) return HEART_COLORS[5];
        return HEART_COLORS[Math.floor(Math.random() * 5)];
    }

    function createHeart() {
        var size = Math.random() * 12 + 5;
        var clr = randomColor();
        return {
            x:           Math.random() * canvasW,
            y:           canvasH + size + Math.random() * 60,
            size:        size,
            speedX:      (Math.random() - 0.5) * 0.35,
            speedY:      -(Math.random() * 0.6 + 0.2),
            opacity:     Math.random() * 0.35 + 0.08,
            maxOpacity:  Math.random() * 0.35 + 0.08,
            color:       clr,
            rotation:    Math.random() * Math.PI * 2,
            rotSpeed:    (Math.random() - 0.5) * 0.015,
            wobble:      Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.015 + 0.004,
            wobbleAmp:   Math.random() * 0.6 + 0.2,
            life:        0,
        };
    }

    function drawHeart(h) {
        ctx.save();
        ctx.translate(h.x, h.y);
        ctx.rotate(h.rotation);

        var s = h.size / 15;
        ctx.scale(s, s);

        ctx.beginPath();
        ctx.moveTo(0, -4);
        ctx.bezierCurveTo(-8, -14, -18, -6, -10, 4);
        ctx.bezierCurveTo(-6,  10,   0,  16,   0, 16);
        ctx.bezierCurveTo( 0,  16,   6,  10,  10,  4);
        ctx.bezierCurveTo(18,  -6,   8, -14,   0, -4);
        ctx.closePath();

        var c = h.color;
        ctx.fillStyle = 'hsla(' + c.h + ', ' + c.s + '%, ' + c.l + '%, ' + h.opacity + ')';
        ctx.shadowColor = 'hsla(' + c.h + ', ' + c.s + '%, ' + c.l + '%, ' + (h.opacity * 0.4) + ')';
        ctx.shadowBlur = 12;
        ctx.fill();
        ctx.restore();
    }

    function updateHearts() {
        for (var i = hearts.length - 1; i >= 0; i--) {
            var h = hearts[i];

            h.life++;
            h.wobble += h.wobbleSpeed;
            h.x += h.speedX + Math.sin(h.wobble) * h.wobbleAmp;
            h.y += h.speedY;
            h.rotation += h.rotSpeed;

            // Gentle fade in at start
            if (h.life < 30) {
                h.opacity = h.maxOpacity * (h.life / 30);
            }

            // Mouse repulsion
            var dx = h.x - mouseX;
            var dy = h.y - mouseY;
            var dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 100 && dist > 0) {
                var force = (100 - dist) / 100 * 1.2;
                h.x += (dx / dist) * force;
                h.y += (dy / dist) * force;
            }

            // Fade out near top
            if (h.y < canvasH * 0.12) {
                h.opacity -= 0.004;
            }

            // Remove off-screen or fully faded
            if (h.y < -h.size * 2 || h.opacity <= 0) {
                hearts.splice(i, 1);
            }
        }

        // Spawn to maintain count
        while (hearts.length < MAX_HEARTS) {
            hearts.push(createHeart());
        }
    }

    function renderCanvas() {
        ctx.clearRect(0, 0, canvasW, canvasH);
        updateHearts();
        for (var i = 0; i < hearts.length; i++) {
            drawHeart(hearts[i]);
        }
        requestAnimationFrame(renderCanvas);
    }

    // Mouse tracking
    document.addEventListener('mousemove', function (e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    document.addEventListener('mouseleave', function () {
        mouseX = -1000;
        mouseY = -1000;
    });

    // Touch support
    document.addEventListener('touchmove', function (e) {
        if (e.touches.length > 0) {
            mouseX = e.touches[0].clientX;
            mouseY = e.touches[0].clientY;
        }
    }, { passive: true });

    document.addEventListener('touchend', function () {
        mouseX = -1000;
        mouseY = -1000;
    });

    // Initialize canvas
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Seed initial hearts across viewport
    for (var i = 0; i < MAX_HEARTS; i++) {
        var h = createHeart();
        h.y = Math.random() * canvasH;
        h.opacity = Math.random() * 0.2 + 0.04;
        h.maxOpacity = h.opacity;
        h.life = 60; // skip fade-in for initial batch
        hearts.push(h);
    }

    renderCanvas();

    // ──────────────────────────────────────────────
    // PARALLAX ON SCROLL (subtle hero fade/shift)
    // ──────────────────────────────────────────────
    var hero = document.getElementById('hero');
    var ticking = false;

    window.addEventListener('scroll', function () {
        if (!ticking) {
            requestAnimationFrame(function () {
                var scrollY = window.pageYOffset || window.scrollY;
                if (hero) {
                    hero.style.transform = 'translateY(' + (scrollY * 0.3) + 'px)';
                    hero.style.opacity = Math.max(1 - scrollY / 550, 0);
                }
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });

    // ──────────────────────────────────────────────
    // DOCUMENT TITLE HEARTBEAT (Tab title animation)
    // ──────────────────────────────────────────────
    var titleHearts = ['💜', '💗', '💖', '💕'];
    var titleIndex = 0;

    setInterval(function () {
        document.title = titleHearts[titleIndex] + ' Angel Face ' + titleHearts[titleIndex];
        titleIndex = (titleIndex + 1) % titleHearts.length;
    }, 2000);

    // ──────────────────────────────────────────────
    // CANVAS HEART BURST (ON UNLOCK)
    // ──────────────────────────────────────────────
    function triggerHeartBurst() {
        const burstCount = 30;
        for (let i = 0; i < burstCount; i++) {
            const size = Math.random() * 15 + 8;
            const clr = randomColor();
            hearts.push({
                x: canvasW / 2,
                y: canvasH / 2,
                size: size,
                speedX: (Math.random() - 0.5) * 7,
                speedY: (Math.random() - 0.5) * 7 - 3,
                opacity: 1,
                maxOpacity: 1,
                color: clr,
                rotation: Math.random() * Math.PI * 2,
                rotSpeed: (Math.random() - 0.5) * 0.08,
                wobble: Math.random() * Math.PI * 2,
                wobbleSpeed: Math.random() * 0.05 + 0.02,
                wobbleAmp: Math.random() * 1.5 + 0.5,
                life: 0
            });
        }
    }

    // ──────────────────────────────────────────────
    // iOS KEYPAD LOVE LOCK SCREEN LOGIC (Şifre: 2502)
    // ──────────────────────────────────────────────
    function setupLockScreen() {
        const lockScreen = document.getElementById('lock-screen');
        const lockCard = document.querySelector('.lock-screen__card');
        const dots = document.querySelectorAll('.passcode-dot');
        const keys = document.querySelectorAll('.keypad__btn');
        const deleteKey = document.getElementById('keypad-delete');
        const hintKey = document.getElementById('keypad-hint');
        const hintBox = document.getElementById('lock-hint-box');

        if (!lockScreen) return;

        let typedCode = [];
        const CORRECT_CODE = '2502'; // 25 Şubat (Sevgilinin Doğum Günü)

        // Disable scrolling initially
        document.body.style.overflow = 'hidden';

        function updateDots() {
            dots.forEach((dot, index) => {
                if (index < typedCode.length) {
                    dot.classList.add('is-active');
                } else {
                    dot.classList.remove('is-active');
                }
            });
        }

        function handleWrongCode() {
            lockCard.classList.add('error-shake');
            dots.forEach(d => d.classList.add('is-error'));
            if (navigator.vibrate) navigator.vibrate(200);

            setTimeout(() => {
                lockCard.classList.remove('error-shake');
                dots.forEach(d => {
                    d.classList.remove('is-error');
                    d.classList.remove('is-active');
                });
                typedCode = [];
            }, 600);
        }

        function handleCorrectCode() {
            triggerHeartBurst();
            lockScreen.classList.add('is-unlocked');
            document.body.style.overflow = '';
            
            // Force scroll to the very top immediately on unlock to prevent any browser jump
            window.scrollTo({ top: 0, behavior: 'instant' });
            
            // Auto play music on unlock (if allowed)
            const audio = document.getElementById('bg-audio');
            const player = document.getElementById('audio-player');
            if (audio) {
                audio.volume = 0.4;
                audio.play().then(() => {
                    if (player) player.classList.add('is-playing');
                }).catch(err => {
                    console.log("Auto-play blocked by browser. Music will play on first click.");
                });
            }

            setTimeout(triggerHeartBurst, 400);
        }

        function enterDigit(digit) {
            if (typedCode.length >= 4) return;
            
            typedCode.push(digit);
            updateDots();

            if (typedCode.length === 4) {
                const entered = typedCode.join('');
                if (entered === CORRECT_CODE) {
                    setTimeout(handleCorrectCode, 200);
                } else {
                    setTimeout(handleWrongCode, 200);
                }
            }
        }

        function pressDelete() {
            if (typedCode.length > 0) {
                typedCode.pop();
                updateDots();
            }
        }

        // Click on buttons
        keys.forEach(btn => {
            btn.addEventListener('click', () => {
                const key = btn.getAttribute('data-key');
                if (key !== null) {
                    enterDigit(key);
                }
            });
        });

        if (deleteKey) {
            deleteKey.addEventListener('click', pressDelete);
        }

        if (hintKey && hintBox) {
            hintKey.addEventListener('click', () => {
                hintBox.classList.toggle('is-hidden');
            });
        }

        // Support physical keyboard keys with high-end key highlight reflections
        document.addEventListener('keydown', (e) => {
            if (lockScreen.classList.contains('is-unlocked')) return;

            if (e.key >= '0' && e.key <= '9') {
                const btn = document.querySelector(`.keypad__btn[data-key="${e.key}"]`);
                if (btn) {
                    btn.classList.add('is-active');
                    setTimeout(() => btn.classList.remove('is-active'), 150);
                }
                enterDigit(e.key);
            } else if (e.key === 'Backspace') {
                const btn = document.getElementById('keypad-delete');
                if (btn) {
                    btn.classList.add('is-active');
                    setTimeout(() => btn.classList.remove('is-active'), 150);
                }
                pressDelete();
            }
        });
    }

    setupLockScreen();

    // ──────────────────────────────────────────────
    // GLASSMORPHIC ROMANTIC MUSIC PLAYER
    // ──────────────────────────────────────────────
    function setupAudioPlayer() {
        const player = document.getElementById('audio-player');
        const toggle = document.getElementById('audio-toggle');
        const audio = document.getElementById('bg-audio');

        if (!player || !toggle || !audio) return;

        toggle.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
                player.classList.add('is-playing');
            } else {
                audio.pause();
                player.classList.remove('is-playing');
            }
        });
    }

    setupAudioPlayer();

    // ──────────────────────────────────────────────
    // PROFESSIONAL CRISP LIGHTBOX SYSTEM (Bulanıklık Yok)
    // ──────────────────────────────────────────────
    function setupLightbox() {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const closeBtn = document.getElementById('lightbox-close');
        const polaroids = document.querySelectorAll('.polaroid');

        if (!lightbox || !lightboxImg || !lightboxCaption || polaroids.length === 0) return;

        polaroids.forEach(card => {
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                
                const img = card.querySelector('.polaroid__img');
                const title = card.querySelector('.polaroid__caption h3');
                const desc = card.querySelector('.polaroid__caption p');

                if (img && title && desc) {
                    lightboxImg.src = img.src;
                    lightboxCaption.innerHTML = `<strong>${title.textContent}</strong><br>${desc.textContent}`;
                    lightbox.classList.add('is-active');
                    document.body.style.overflow = 'hidden'; // Lock scrolling
                }
            });
        });

        function closeLightbox() {
            lightbox.classList.remove('is-active');
            // Restore scroll only if lock screen is unlocked
            const lockScreen = document.getElementById('lock-screen');
            if (lockScreen && lockScreen.classList.contains('is-unlocked')) {
                document.body.style.overflow = '';
            }
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', closeLightbox);
        }

        lightbox.addEventListener('click', (e) => {
            if (e.target !== lightboxImg && e.target !== lightboxCaption) {
                closeLightbox();
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('is-active')) {
                closeLightbox();
            }
        });
    }

    setupLightbox();

    // ──────────────────────────────────────────────
    // 3D ENVELOPE & LETTER CONTROLLER (Büyütme Efektli)
    // ──────────────────────────────────────────────
    function setupLoveLetter() {
        const envelope = document.getElementById('envelope');
        const btn = document.getElementById('envelope-btn');
        const letter = document.getElementById('letter');
        const modal = document.getElementById('letter-modal');
        const modalClose = document.getElementById('letter-modal-close');
        const modalBackdrop = document.querySelector('.letter-modal__backdrop');

        if (!envelope || !btn || !letter || !modal) return;

        function openEnvelope() {
            envelope.classList.add('is-open');
            btn.textContent = 'Mektubu Oku 🔍';
            btn.style.background = 'linear-gradient(135deg, var(--clr-rose), hsla(270, 80%, 55%, 0.9))';
            btn.style.boxShadow = '0 0 20px var(--clr-rose-glow)';
        }

        function closeEnvelope() {
            envelope.classList.remove('is-open');
            btn.textContent = 'Zarfı Aç 💌';
            btn.style.background = '';
            btn.style.boxShadow = '';
        }

        function openLetterModal() {
            modal.classList.add('is-active');
            document.body.style.overflow = 'hidden'; // Lock scrolling
        }

        function closeLetterModal() {
            modal.classList.remove('is-active');
            // Only restore scroll if lock screen is unlocked and lightbox is not open
            const lockScreen = document.getElementById('lock-screen');
            const lightbox = document.getElementById('lightbox');
            const isUnlocked = lockScreen && lockScreen.classList.contains('is-unlocked');
            const isLightboxActive = lightbox && lightbox.classList.contains('is-active');
            
            if (isUnlocked && !isLightboxActive) {
                document.body.style.overflow = '';
            }
        }

        // Button action
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = envelope.classList.contains('is-open');
            if (!isOpen) {
                openEnvelope();
            } else {
                openLetterModal();
            }
        });

        // Envelope direct click action
        envelope.addEventListener('click', (e) => {
            e.stopPropagation();
            const isOpen = envelope.classList.contains('is-open');
            if (!isOpen) {
                openEnvelope();
            } else {
                closeEnvelope();
            }
        });

        // Letter click inside the open envelope
        letter.addEventListener('click', (e) => {
            const isOpen = envelope.classList.contains('is-open');
            if (isOpen) {
                e.stopPropagation(); // prevent closing the envelope
                openLetterModal();
            }
        });

        // Modal Close action
        if (modalClose) {
            modalClose.addEventListener('click', closeLetterModal);
        }
        if (modalBackdrop) {
            modalBackdrop.addEventListener('click', closeLetterModal);
        }

        // Close modal on escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('is-active')) {
                closeLetterModal();
            }
        });
    }

    setupLoveLetter();

    // ──────────────────────────────────────────────
    // RANDOM LOVE NOTES WIDGET
    // ──────────────────────────────────────────────
    const LOVE_NOTES = [
        "Kalbimdeki yerin her geçen saniye daha da büyüyor... Seni çok özlüyorum.",
        "Hayatıma girdiğin o ilk günü (16 Mayıs) dün gibi hatırlıyorum. O an tüm dünyam değişti.",
        "Sesini her duyduğumda, kelimelerin ruhuma dokunuyor. Sen benim en güzel melodimsin.",
        "Aramızdaki mesafeler ne kadar uzun olursa olsun, kalplerimizin ritmi hep aynı.",
        "Gülüşün, karanlık gecelerimi aydınlatan en parlak yıldızdan bile daha güzel.",
        "Gözlerimi kapattığımda aklıma gelen ilk, açtığımda ise yanımda olmasını dilediğim tek şeysin.",
        "Seni sevmek, hayatımın en doğru ve en güzel kararıydı. İyi ki varsın meleğim...",
        "Birlikte geçirdiğimiz her an, ömrümün en değerli hazinesi.",
        "Dünyanın en güzel manzarası, senin yanındayken gözlerinde gördüğüm o eşsiz parıltı.",
        "Sen benim sığındığım en güvenli liman, aldığım en huzurlu nefessin.",
        "Sensiz geçen saniyeleri sayıyorum ama sevgimizin büyüklüğü beni her an ayakta tutuyor."
    ];

    function setupSecretNotes() {
        const btn = document.getElementById('secret-note-btn');
        const text = document.getElementById('secret-note-text');
        if (!btn || !text) return;

        let currentIdx = -1;

        btn.addEventListener('click', () => {
            text.classList.add('fade-out');

            setTimeout(() => {
                let nextIdx;
                do {
                    nextIdx = Math.floor(Math.random() * LOVE_NOTES.length);
                } while (nextIdx === currentIdx);

                currentIdx = nextIdx;
                text.textContent = `"${LOVE_NOTES[currentIdx]}"`;
                text.classList.remove('fade-out');
            }, 300);
        });
    }

    setupSecretNotes();

})();
