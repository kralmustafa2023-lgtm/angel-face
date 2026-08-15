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
    // iOS KEYPAD LOVE LOCK SCREEN LOGIC
    // Şifre 2502 = İrem | Şifre 1234 = Sen (değiştir!)
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

        // ── İki kullanıcının şifreleri ──
        const CODES = {
            '2502': 'irem',   // İrem'in şifresi: doğum günü 25 Şubat
            '1508': 'ben'     // Senin şifren: doğum günü 15 Ağustos
        };

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

        function handleCorrectCode(userName) {
            // Kullanıcı kimliğini kaydet — chat bunu kullanacak
            sessionStorage.setItem('af_user', userName);

            triggerHeartBurst();
            lockScreen.classList.add('is-unlocked');
            document.body.style.overflow = '';
            
            // Force scroll to the very top immediately on unlock
            window.scrollTo({ top: 0, behavior: 'instant' });
            
            // Boot Chat & Call Engines now that user is authenticated
            if (typeof window.bootChatEngine === 'function') window.bootChatEngine();
            if (typeof window.bootWebRTCEngine === 'function') window.bootWebRTCEngine();
            
            // Auto play music on unlock (if allowed)
            const audio = document.getElementById('bg-audio');
            const player = document.getElementById('audio-player');
            if (audio) {
                audio.volume = 0.4;
                audio.play().then(() => {
                    if (player) player.classList.add('is-playing');
                }).catch(() => {});
            }

            setTimeout(triggerHeartBurst, 400);
        }

        function enterDigit(digit) {
            if (typedCode.length >= 4) return;
            
            typedCode.push(digit);
            updateDots();

            if (typedCode.length === 4) {
                const entered = typedCode.join('');
                const user = CODES[entered];
                if (user) {
                    setTimeout(() => handleCorrectCode(user), 200);
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

/* ============================================================
   FIREBASE REALTIME CHAT ENGINE
   WhatsApp-Style: Text + Photo/Video + Voice Notes
   ============================================================ */

window.bootChatEngine = function () {
    'use strict';
    'use strict';

    // ──────────────────────────────────────────────────────────
    // FIREBASE CONFIG — Buraya kendi Firebase config'ini yapıştır!
    // Firebase Console > Project Settings > Your Apps > Web App > firebaseConfig
    // ──────────────────────────────────────────────────────────
    const FIREBASE_CONFIG = {
        apiKey:            "AIzaSyDk9W4N7eO2bJwgjDoih52waavnqtHyrrw",
        authDomain:        "angel-face-4b2a7.firebaseapp.com",
        databaseURL:       "https://angel-face-4b2a7-default-rtdb.firebaseio.com",
        projectId:         "angel-face-4b2a7",
        storageBucket:     "angel-face-4b2a7.firebasestorage.app",
        messagingSenderId: "988012476022",
        appId:             "1:988012476022:web:50f8b03d2b4cd220675157"
    };

    // Hangi kullanıcı giriş yaptı?
    function getMyName() {
        // sessionStorage'dan al (lock screen tarafından set edildi)
        const stored = sessionStorage.getItem('af_user');
        if (stored) return stored;
        // Fallback: URL param
        const params = new URLSearchParams(window.location.search);
        return params.get('user') || 'ben';
    }

    const MY_NAME = getMyName();
    const CHAT_PATH = 'angelface_chat/messages';

    // Firebase başlatılıp başlatılmadığını kontrol et
    let db, storage, firebaseReady = false;

    function initFirebase() {
        try {
            if (FIREBASE_CONFIG.apiKey === 'BURAYA_API_KEY') {
                console.warn('⚠️ Firebase config henüz girilmemiş. Lütfen script.js içine kendi config bilgilerini yapıştır.');
                document.getElementById('chat-status').textContent = 'bağlantı ayarlanıyor...';
                document.getElementById('chat-status').style.color = '#facc15';
                return false;
            }
            if (!firebase.apps.length) {
                firebase.initializeApp(FIREBASE_CONFIG);
            }
            db = firebase.database();
            storage = firebase.storage();
            firebaseReady = true;
            return true;
        } catch (e) {
            console.error('Firebase başlatma hatası:', e);
            return false;
        }
    }

    // ──────────────────────────────────────────────────────────
    // DOM REFERENCES
    // ──────────────────────────────────────────────────────────
    const fab          = document.getElementById('chat-fab');
    const modal        = document.getElementById('chat-modal');
    const backdrop     = document.getElementById('chat-backdrop');
    const closeBtn     = document.getElementById('chat-close');
    const messagesEl   = document.getElementById('chat-messages');
    const textInput    = document.getElementById('chat-text-input');
    const sendBtn      = document.getElementById('chat-send-btn');
    const fileInput    = document.getElementById('chat-file-input');
    const voiceBtn     = document.getElementById('chat-voice-btn');
    const recBar       = document.getElementById('chat-recording-bar');
    const statusEl     = document.getElementById('chat-status');
    const fabBadge     = document.getElementById('chat-fab-badge');

    let isOpen = false;
    let mediaRecorder = null;
    let audioChunks = [];
    let isRecording = false;
    let unreadCount = 0;
    let lastSeenTs = Date.now();

    // ──────────────────────────────────────────────────────────
    // OPEN / CLOSE CHAT
    // ──────────────────────────────────────────────────────────
    function openModal() {
        isOpen = true;
        modal.classList.add('is-active');
        backdrop.classList.add('is-active');
        fabBadge.style.display = 'none';
        unreadCount = 0;
        scrollToBottom();

        // Mark all unread messages from the other person as seen
        db.ref(CHAT_PATH).once('value', snap => {
            snap.forEach(child => {
                const msg = child.val();
                if (msg.sender !== MY_NAME && !msg.seen) {
                    child.ref.update({ seen: true });
                }
            });
        });
    }

    function closeChat() {
        isOpen = false;
        modal.classList.remove('is-active');
        backdrop.classList.remove('is-active');
        lastSeenTs = Date.now();
    }

    fab.addEventListener('click', () => isOpen ? closeChat() : openModal());
    closeBtn.addEventListener('click', closeChat);
    backdrop.addEventListener('click', closeChat);

    // Enter ile gönder
    textInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendTextMessage();
        }
    });
    sendBtn.addEventListener('click', sendTextMessage);

    // ──────────────────────────────────────────────────────────
    // FORMAT TIME
    // ──────────────────────────────────────────────────────────
    function formatTime(ts) {
        const d = new Date(ts);
        return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
    }

    function formatDateSep(ts) {
        const d = new Date(ts);
        const today = new Date();
        if (d.toDateString() === today.toDateString()) return 'Bugün';
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        if (d.toDateString() === yesterday.toDateString()) return 'Dün';
        return d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' });
    }

    // ──────────────────────────────────────────────────────────
    // SCROLL TO BOTTOM
    // ──────────────────────────────────────────────────────────
    function scrollToBottom() {
        messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    // ──────────────────────────────────────────────────────────
    // RENDER A MESSAGE BUBBLE
    // ──────────────────────────────────────────────────────────
    let lastDateStr = '';

    // ──────────────────────────────────────────────────────────
    // EMOJI REACTIONS (WhatsApp-Style)
    // ──────────────────────────────────────────────────────────
    let touchTimer = null;
    let activeReactionMessageKey = null;

    function bindBubbleReactionEvents(bubble, messageKey) {
        // Desktop Right Click (Context Menu)
        bubble.addEventListener('contextmenu', (e) => {
            e.preventDefault();
            showReactionPopup(bubble, messageKey, e.clientX, e.clientY);
        });

        // Mobile Long Press
        bubble.addEventListener('touchstart', (e) => {
            if (touchTimer) clearTimeout(touchTimer);
            touchTimer = setTimeout(() => {
                const touch = e.touches[0];
                showReactionPopup(bubble, messageKey, touch.clientX, touch.clientY);
            }, 600); // 600ms long press
        }, { passive: true });

        bubble.addEventListener('touchend', () => {
            if (touchTimer) clearTimeout(touchTimer);
        });

        bubble.addEventListener('touchmove', () => {
            if (touchTimer) clearTimeout(touchTimer);
        });
    }

    function showReactionPopup(bubbleElement, messageKey, clientX, clientY) {
        closeReactionPopup();

        activeReactionMessageKey = messageKey;

        const reactionBar = document.createElement('div');
        reactionBar.className = 'chat-reaction-bar is-active';
        reactionBar.id = 'dynamic-reaction-bar';

        const emojis = ['❤️', '👍', '😂', '😮', '😢', '🙏'];
        emojis.forEach(emoji => {
            const span = document.createElement('span');
            span.className = 'react-emoji';
            span.textContent = emoji;
            span.addEventListener('click', () => {
                sendReaction(messageKey, emoji);
                closeReactionPopup();
            });
            reactionBar.appendChild(span);
        });

        document.body.appendChild(reactionBar);

        // Also show action bar (delete etc) below the emoji bar
        showMsgActionBar(bubbleElement, messageKey);

        const bubbleRect = bubbleElement.getBoundingClientRect();
        const popupRect = reactionBar.getBoundingClientRect();

        let left = bubbleRect.left + (bubbleRect.width / 2) - (popupRect.width / 2);
        let top = bubbleRect.top - popupRect.height - 8;

        if (left < 10) left = 10;
        if (left + popupRect.width > window.innerWidth - 10) {
            left = window.innerWidth - popupRect.width - 10;
        }

        if (top < 10) {
            top = bubbleRect.bottom + 8;
        }

        reactionBar.style.left = `${left}px`;
        reactionBar.style.top = `${top}px`;

        // Listen for click outside to close
        setTimeout(() => {
            document.addEventListener('click', handleOutsideClickForReaction);
        }, 50);
    }

    function closeReactionPopup() {
        const existing = document.getElementById('dynamic-reaction-bar');
        if (existing) existing.remove();
        const actionBar = document.getElementById('dynamic-msg-action-bar');
        if (actionBar) actionBar.remove();
        document.removeEventListener('click', handleOutsideClickForReaction);
        activeReactionMessageKey = null;
    }

    function handleOutsideClickForReaction(e) {
        const popup = document.getElementById('dynamic-reaction-bar');
        const actionBar = document.getElementById('dynamic-msg-action-bar');
        const clickedInPopup = (popup && popup.contains(e.target)) || (actionBar && actionBar.contains(e.target));
        if (!clickedInPopup) {
            closeReactionPopup();
        }
    }

    function showMsgActionBar(bubbleElement, messageKey) {
        const isMe = bubbleElement.classList.contains('chat-bubble--out');

        const actionBar = document.createElement('div');
        actionBar.className = 'msg-action-bar';
        actionBar.id = 'dynamic-msg-action-bar';

        // Copy text (only for text bubbles)
        const textNode = bubbleElement.childNodes[0];
        if (textNode && textNode.nodeType === Node.TEXT_NODE && textNode.textContent.trim()) {
            const copyBtn = document.createElement('button');
            copyBtn.innerHTML = '📋 Kopyala';
            copyBtn.addEventListener('click', () => {
                navigator.clipboard.writeText(textNode.textContent.trim()).catch(() => {});
                closeReactionPopup();
            });
            actionBar.appendChild(copyBtn);
        }

        // Delete for me only
        const deleteForMeBtn = document.createElement('button');
        deleteForMeBtn.innerHTML = '🙈 Bende Sil';
        deleteForMeBtn.className = 'danger';
        deleteForMeBtn.addEventListener('click', () => {
            closeReactionPopup();
            // Store locally hidden messages in sessionStorage
            const hidden = JSON.parse(sessionStorage.getItem('af_hidden_msgs') || '[]');
            if (!hidden.includes(messageKey)) hidden.push(messageKey);
            sessionStorage.setItem('af_hidden_msgs', JSON.stringify(hidden));
            const bubble = messagesEl.querySelector(`[data-key="${messageKey}"]`);
            if (bubble) bubble.remove();
        });
        actionBar.appendChild(deleteForMeBtn);

        // Delete for everyone (only own messages)
        if (isMe) {
            const deleteForAllBtn = document.createElement('button');
            deleteForAllBtn.innerHTML = '🗑️ İkimizden Sil';
            deleteForAllBtn.className = 'danger';
            deleteForAllBtn.addEventListener('click', () => {
                const confirmed = confirm('Bu mesajı ikimizden de silmek istediğine emin misin?');
                if (confirmed) {
                    db.ref(`${CHAT_PATH}/${messageKey}`).remove();
                }
                closeReactionPopup();
            });
            actionBar.appendChild(deleteForAllBtn);
        }

        document.body.appendChild(actionBar);

        const reactionBar = document.getElementById('dynamic-reaction-bar');
        let top, left;

        if (reactionBar) {
            const rbRect = reactionBar.getBoundingClientRect();
            top = rbRect.bottom + 6;
            left = rbRect.left;
        } else {
            const bubbleRect = bubbleElement.getBoundingClientRect();
            top = bubbleRect.bottom + 6;
            left = bubbleRect.left;
        }

        const abRect = actionBar.getBoundingClientRect();
        if (left + abRect.width > window.innerWidth - 10) {
            left = window.innerWidth - abRect.width - 10;
        }
        if (left < 10) left = 10;

        actionBar.style.left = `${left}px`;
        actionBar.style.top = `${top}px`;
    }

    function sendReaction(messageKey, emoji) {
        if (!firebaseReady) return;
        const reactionRef = db.ref(`${CHAT_PATH}/${messageKey}/reactions/${MY_NAME}`);
        reactionRef.once('value').then(snap => {
            if (snap.exists() && snap.val() === emoji) {
                reactionRef.remove();
            } else {
                reactionRef.set(emoji);
            }
        });
    }

    // ──────────────────────────────────────────────────────────
    // PRESENCE SYSTEM
    // ──────────────────────────────────────────────────────────
    function setupPresence() {
        if (!firebaseReady) return;

        const myPresenceRef = db.ref(`angelface_chat/presence/${MY_NAME}`);
        const targetPresenceRef = db.ref(`angelface_chat/presence/${TARGET_NAME}`);
        const connectedRef = db.ref(".info/connected");

        connectedRef.on("value", (snap) => {
            if (snap.val() === true) {
                myPresenceRef.onDisconnect().set({
                    online: false,
                    lastSeen: firebase.database.ServerValue.TIMESTAMP
                }).then(() => {
                    myPresenceRef.set({
                        online: true,
                        lastSeen: firebase.database.ServerValue.TIMESTAMP
                    });
                });
            }
        });

        // Listen to target's presence
        targetPresenceRef.on("value", (snap) => {
            if (snap.exists()) {
                const data = snap.val();
                if (data.online) {
                    statusEl.textContent = 'çevrimiçi ✓';
                    statusEl.style.color = '#4ade80';
                } else {
                    if (data.lastSeen) {
                        statusEl.textContent = `son görülme: ${formatLastSeen(data.lastSeen)}`;
                    } else {
                        statusEl.textContent = 'çevrimdışı';
                    }
                    statusEl.style.color = 'rgba(255,255,255,0.4)';
                }
            } else {
                statusEl.textContent = 'çevrimdışı';
                statusEl.style.color = 'rgba(255,255,255,0.4)';
            }
        });
    }

    function formatLastSeen(ts) {
        const d = new Date(ts);
        const today = new Date();
        const timeStr = d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
        
        if (d.toDateString() === today.toDateString()) {
            return `bugün ${timeStr}`;
        }
        const yesterday = new Date(today);
        yesterday.setDate(today.getDate() - 1);
        if (d.toDateString() === yesterday.toDateString()) {
            return `dün ${timeStr}`;
        }
        return `${d.getDate()} ${d.toLocaleDateString('tr-TR', { month: 'short' })} ${timeStr}`;
    }

    // ──────────────────────────────────────────────────────────
    // RENDER A MESSAGE BUBBLE
    // ──────────────────────────────────────────────────────────
    function renderMessage(msg, key) {
        // Single-sided chat history check
        const clearTs = myProfileData.clearChatTs || 0;
        if (msg.ts <= clearTs) return;

        // Check locally hidden messages
        const hidden = JSON.parse(sessionStorage.getItem('af_hidden_msgs') || '[]');
        if (hidden.includes(key)) return;

        const isMe = msg.sender === MY_NAME;
        const bubbleClass = isMe ? 'chat-bubble--out' : 'chat-bubble--in';

        // Date separator
        const dateStr = formatDateSep(msg.ts);
        if (dateStr !== lastDateStr) {
            lastDateStr = dateStr;
            const sep = document.createElement('div');
            sep.className = 'chat-date-sep';
            sep.textContent = dateStr;
            messagesEl.appendChild(sep);
        }

        const bubble = document.createElement('div');
        bubble.className = `chat-bubble ${bubbleClass}`;
        bubble.dataset.key = key;

        let ticksHtml = '';
        if (isMe) {
            const seenClass = msg.seen ? 'is-seen' : '';
            ticksHtml = `
            <span class="chat-msg__status ${seenClass}">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 6L7 17l-5-5"/>
                    <path d="M22 10l-5.5 5.5"/>
                </svg>
            </span>`;
        }

        const metaHtml = `<div class="chat-msg__meta"><span class="chat-msg__time">${formatTime(msg.ts)}</span>${ticksHtml}</div>`;

        if (msg.type === 'text') {
            bubble.innerHTML = `${escapeHtml(msg.text)}${metaHtml}`;
        } else if (msg.type === 'image') {
            bubble.innerHTML = `<img src="${msg.url}" class="chat-bubble__media" alt="fotoğraf" loading="lazy">${metaHtml}`;
            bubble.querySelector('img').addEventListener('click', () => window.open(msg.url, '_blank'));
        } else if (msg.type === 'video') {
            bubble.innerHTML = `<video src="${msg.url}" class="chat-bubble__media" controls playsinline></video>${metaHtml}`;
        } else if (msg.type === 'voice') {
            bubble.innerHTML = `<audio src="${msg.url}" class="chat-bubble__audio" controls></audio>${metaHtml}`;
        }

        // Render emoji reactions if they exist
        const reactions = msg.reactions || {};
        const reactionKeys = Object.keys(reactions);
        if (reactionKeys.length > 0) {
            bubble.classList.add('has-reactions');
            const reactionsContainer = document.createElement('div');
            reactionsContainer.className = 'chat-msg__reactions';
            
            const uniqueEmojis = [];
            reactionKeys.forEach(user => {
                const em = reactions[user];
                if (!uniqueEmojis.includes(em)) {
                    uniqueEmojis.push(em);
                }
            });
            
            uniqueEmojis.forEach(em => {
                const span = document.createElement('span');
                span.className = 'reaction-item';
                span.textContent = em;
                reactionsContainer.appendChild(span);
            });

            reactionsContainer.addEventListener('click', (e) => {
                e.stopPropagation();
                if (reactions[MY_NAME]) {
                    db.ref(`${CHAT_PATH}/${key}/reactions/${MY_NAME}`).remove();
                }
            });

            bubble.appendChild(reactionsContainer);
        }

        messagesEl.appendChild(bubble);

        // Bind emoji reactions triggers
        bindBubbleReactionEvents(bubble, key);

        // Unread badge when modal is closed
        if (!isOpen && !isMe) {
            unreadCount++;
            fabBadge.textContent = unreadCount > 9 ? '9+' : unreadCount;
            fabBadge.style.display = 'flex';
        }
    }

    function escapeHtml(str) {
        return String(str)
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
    }

    // ──────────────────────────────────────────────────────────
    // LISTEN FOR MESSAGES (Realtime)
    // ──────────────────────────────────────────────────────────
    function startListening() {
        const ref = db.ref(CHAT_PATH).orderByChild('ts').limitToLast(5000);

        // Load all existing messages first
        ref.once('value', (snap) => {
            messagesEl.innerHTML = '<div class="chat-welcome"><div class="chat-welcome__icon">💌</div><p>Sana özel şifreli mesajlaşma kanalı.</p><p>Sadece ikimiz için... ❤️</p></div>';
            lastDateStr = '';
            snap.forEach((child) => {
                renderMessage(child.val(), child.key);
            });
            scrollToBottom();
        });

        // Then listen for new ones
        ref.on('child_added', (snap) => {
            const val = snap.val();
            // Skip if it was already rendered in once()
            const existing = messagesEl.querySelector(`[data-key="${snap.key}"]`);
            if (!existing) {
                renderMessage(val, snap.key);
                if (isOpen) scrollToBottom();
            }

            // If chat is open and message is from the other person, mark as seen
            if (isOpen && val.sender !== MY_NAME && !val.seen) {
                snap.ref.update({ seen: true });
            }
        });

        // Listen for updates (like seen status changing or reactions)
        ref.on('child_changed', (snap) => {
            const val = snap.val();
            const bubble = messagesEl.querySelector(`.chat-bubble[data-key="${snap.key}"]`);
            if (!bubble) return;

            // Update seen status
            if (val.seen) {
                const statusEl = bubble.querySelector('.chat-msg__status');
                if (statusEl) statusEl.classList.add('is-seen');
            }

            // Update reactions dynamically
            const existingReactions = bubble.querySelector('.chat-msg__reactions');
            if (existingReactions) {
                existingReactions.remove();
                bubble.classList.remove('has-reactions');
            }

            const reactions = val.reactions || {};
            const reactionKeys = Object.keys(reactions);
            if (reactionKeys.length > 0) {
                bubble.classList.add('has-reactions');
                const reactionsContainer = document.createElement('div');
                reactionsContainer.className = 'chat-msg__reactions';
                
                const uniqueEmojis = [];
                reactionKeys.forEach(user => {
                    const em = reactions[user];
                    if (!uniqueEmojis.includes(em)) {
                        uniqueEmojis.push(em);
                    }
                });
                
                uniqueEmojis.forEach(em => {
                    const span = document.createElement('span');
                    span.className = 'reaction-item';
                    span.textContent = em;
                    reactionsContainer.appendChild(span);
                });

                reactionsContainer.addEventListener('click', (e) => {
                    e.stopPropagation();
                    if (reactions[MY_NAME]) {
                        db.ref(`${CHAT_PATH}/${snap.key}/reactions/${MY_NAME}`).remove();
                    }
                });

                bubble.appendChild(reactionsContainer);
            }
        });

        // Sohbet geçmişi silindiğinde anlık güncelle
        ref.on('child_removed', (snap) => {
            const bubble = messagesEl.querySelector(`[data-key="${snap.key}"]`);
            if (bubble) {
                bubble.remove();
            }
            // Eğer tüm mesajlar silindiyse karşılama ekranını geri getir
            if (messagesEl.querySelectorAll('.chat-bubble').length === 0) {
                messagesEl.innerHTML = '<div class="chat-welcome"><div class="chat-welcome__icon">💌</div><p>Sana özel şifreli mesajlaşma kanalı.</p><p>Sadece ikimiz için... ❤️</p></div>';
                lastDateStr = '';
            }
        });
    }

    // ──────────────────────────────────────────────────────────
    // SEND TEXT
    // ──────────────────────────────────────────────────────────
    function sendTextMessage() {
        if (!firebaseReady) {
            alert('Firebase henüz bağlı değil! Lütfen script.js\'e config bilgilerini gir.');
            return;
        }
        const text = textInput.value.trim();
        if (!text) return;
        textInput.value = '';

        db.ref(CHAT_PATH).push({
            type: 'text',
            text: text,
            sender: MY_NAME,
            ts: Date.now()
        });
    }

    // ──────────────────────────────────────────────────────────
    // IMAGE COMPRESSION HELPER
    // ──────────────────────────────────────────────────────────
    async function compressImage(file, maxWidth = 1000, maxHeight = 1000, quality = 0.7) {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event) => {
                const img = new Image();
                img.src = event.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    let width = img.width;
                    let height = img.height;
                    
                    if (width > height) {
                        if (width > maxWidth) {
                            height *= maxWidth / width;
                            width = maxWidth;
                        }
                    } else {
                        if (height > maxHeight) {
                            width *= maxHeight / height;
                            height = maxHeight;
                        }
                    }
                    
                    canvas.width = width;
                    canvas.height = height;
                    
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    
                    canvas.toBlob((blob) => {
                        resolve(blob || file);
                    }, 'image/jpeg', quality);
                };
            };
        });
    }

    // ──────────────────────────────────────────────────────────
    // USER DYNAMIC PROFILES
    // ──────────────────────────────────────────────────────────
    const PROFILE_PATH = 'angelface_chat/profiles';
    const TARGET_NAME = MY_NAME === 'irem' ? 'ben' : 'irem';

    const chatHeaderAvatar = document.getElementById('chat-header-avatar');
    const chatHeaderName   = document.querySelector('.chat-modal__header-name');
    
    const profileModal     = document.getElementById('profile-modal');
    const profileClose     = document.getElementById('profile-close');
    const profileEditBtn   = document.getElementById('chat-profile-edit-btn');
    const profileSaveBtn   = document.getElementById('profile-save-btn');
    const profileNameInput = document.getElementById('profile-display-name');
    const profileFile      = document.getElementById('profile-avatar-file');
    const profilePreview   = document.getElementById('profile-avatar-preview');

    let myProfileData = { displayName: MY_NAME === 'irem' ? 'İrem' : 'Canım', avatarUrl: '' };
    let tempAvatarBlob = null;

    function setupProfiles() {
        // Listen to our own profile (realtime changes)
        db.ref(`${PROFILE_PATH}/${MY_NAME}`).on('value', snap => {
            if (snap.exists()) {
                const newData = snap.val();
                const newClearTs = newData.clearChatTs || 0;
                const oldClearTs = myProfileData.clearChatTs || 0;

                myProfileData = newData;

                // Only re-render if clearChatTs actually increased (not on first load)
                // We check that oldClearTs > 0 OR newClearTs is genuinely different
                if (newClearTs > 0 && newClearTs > oldClearTs) {
                    messagesEl.innerHTML = '<div class="chat-welcome"><div class="chat-welcome__icon">💌</div><p>Sana özel şifreli mesajlaşma kanalı.</p><p>Sadece ikimiz için... ❤️</p></div>';
                    lastDateStr = '';

                    db.ref(CHAT_PATH).orderByChild('ts').limitToLast(5000).once('value', messagesSnap => {
                        messagesEl.innerHTML = '<div class="chat-welcome"><div class="chat-welcome__icon">💌</div><p>Sana özel şifreli mesajlaşma kanalı.</p><p>Sadece ikimiz için... ❤️</p></div>';
                        lastDateStr = '';
                        messagesSnap.forEach(child => {
                            const msg = child.val();
                            if (msg.ts > newClearTs) {
                                renderMessage(msg, child.key);
                            }
                        });
                        scrollToBottom();
                    });
                }

                // Keep inputs in sync when modal is opened and user is not editing them
                if (profileNameInput && document.activeElement !== profileNameInput) {
                    profileNameInput.value = myProfileData.displayName || '';
                }
                const targetNameInput = document.getElementById('profile-target-name');
                if (targetNameInput && document.activeElement !== targetNameInput) {
                    targetNameInput.value = myProfileData.targetNickName || '';
                }

                // Refresh header display name
                db.ref(`${PROFILE_PATH}/${TARGET_NAME}`).once('value', targetSnap => {
                    const data = targetSnap.val() || {};
                    const displayName = myProfileData.targetNickName || data.displayName || (TARGET_NAME === 'irem' ? 'İrem' : 'Canım');
                    if (chatHeaderName) {
                        chatHeaderName.textContent = `${displayName} 💜`;
                    }
                });
            } else {
                db.ref(`${PROFILE_PATH}/${MY_NAME}`).set(myProfileData);
            }
        });

        // Listen to other person's profile to update header
        db.ref(`${PROFILE_PATH}/${TARGET_NAME}`).on('value', snap => {
            if (snap.exists()) {
                const data = snap.val();
                const displayName = myProfileData.targetNickName || data.displayName || (TARGET_NAME === 'irem' ? 'İrem' : 'Canım');
                if (chatHeaderName) {
                    chatHeaderName.textContent = `${displayName} 💜`;
                }
                if (chatHeaderAvatar) {
                    if (data.avatarUrl) {
                        chatHeaderAvatar.innerHTML = `<img src="${data.avatarUrl}" style="width:100%;height:100%;object-fit:cover;border-radius:50%">`;
                    } else {
                        chatHeaderAvatar.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`;
                    }
                }
            }
        });

        // Open Profile Edit Modal
        if (profileEditBtn) {
            profileEditBtn.addEventListener('click', () => {
                profileNameInput.value = myProfileData.displayName || '';
                const targetNameInput = document.getElementById('profile-target-name');
                if (targetNameInput) {
                    targetNameInput.value = myProfileData.targetNickName || '';
                }
                if (myProfileData.avatarUrl) {
                    profilePreview.innerHTML = `<img src="${myProfileData.avatarUrl}">`;
                } else {
                    profilePreview.innerHTML = '❤️';
                }
                tempAvatarBlob = null;
                profileModal.classList.add('is-active');
            });
        }

        // Close Profile Modal
        if (profileClose) {
            profileClose.addEventListener('click', () => {
                profileModal.classList.remove('is-active');
            });
        }

        // Profile Avatar file selector
        if (profileFile) {
            profileFile.addEventListener('change', async (e) => {
                const file = e.target.files[0];
                if (!file) return;
                
                const compressed = await compressImage(file, 200, 200, 0.85);
                tempAvatarBlob = compressed;
                
                const reader = new FileReader();
                reader.readAsDataURL(compressed);
                reader.onload = (event) => {
                    profilePreview.innerHTML = `<img src="${event.target.result}">`;
                };
            });
        }

        // Save Profile
        if (profileSaveBtn) {
            profileSaveBtn.addEventListener('click', async () => {
                const newName = profileNameInput.value.trim();
                if (!newName) {
                    alert('Lütfen bir isim girin.');
                    return;
                }

                const targetNameInput = document.getElementById('profile-target-name');
                const newTargetName = targetNameInput ? targetNameInput.value.trim() : '';

                profileSaveBtn.disabled = true;
                profileSaveBtn.textContent = 'Kaydediliyor...';

                try {
                    let avatarUrl = myProfileData.avatarUrl || '';
                    if (tempAvatarBlob) {
                        const avatarName = `angelface_profiles/${MY_NAME}_avatar_${Date.now()}.jpg`;
                        const ref = storage.ref(avatarName);
                        await ref.put(tempAvatarBlob);
                        avatarUrl = await ref.getDownloadURL();
                    }

                    await db.ref(`${PROFILE_PATH}/${MY_NAME}`).set({
                        displayName: newName,
                        avatarUrl: avatarUrl,
                        targetNickName: newTargetName,
                        clearChatTs: myProfileData.clearChatTs || 0
                    });

                    profileModal.classList.remove('is-active');
                } catch (err) {
                    console.error('Profil kaydetme hatası:', err);
                    alert('Profil kaydedilemedi.');
                } finally {
                    profileSaveBtn.disabled = false;
                    profileSaveBtn.textContent = 'Değişiklikleri Kaydet';
                }
            });
        }

        // Sohbet Geçmişini Temizle (Tek Taraflı / Single-Sided)
        const clearChatBtn = document.getElementById('profile-clear-chat-btn');
        if (clearChatBtn) {
            clearChatBtn.addEventListener('click', () => {
                const confirmed = confirm('Sohbet geçmişini silmek istediğine emin misin? Bu işlem senin için sohbeti temizler ancak karşı tarafta mesajlar kalmaya devam eder! ❤️');
                if (confirmed) {
                    const clearTs = Date.now();
                    db.ref(`${PROFILE_PATH}/${MY_NAME}`).update({
                        clearChatTs: clearTs
                    })
                    .then(() => {
                        alert('Sohbet geçmişi başarıyla temizlendi! ✨');
                        profileModal.classList.remove('is-active');
                    })
                    .catch((err) => {
                        console.error('Sohbet temizleme hatası:', err);
                        alert('Sohbet temizlenirken bir hata oluştu.');
                    });
                }
            });
        }
    }

    // ──────────────────────────────────────────────────────────
    // SEND FILE (Image / Video)
    // ──────────────────────────────────────────────────────────
    fileInput.addEventListener('change', async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        fileInput.value = '';

        if (!firebaseReady) {
            alert('Firebase henüz bağlı değil!');
            return;
        }

        const isVideo = file.type.startsWith('video/');
        
        // Video size limit (15MB)
        if (isVideo && file.size > 15 * 1024 * 1024) {
            alert('Video çok büyük! Lütfen 15MB\'tan küçük bir video seç.');
            return;
        }

        // Show uploading indicator
        const loadBubble = document.createElement('div');
        loadBubble.className = 'chat-bubble chat-bubble--out chat-bubble--uploading';
        loadBubble.textContent = '⏳ Yükleniyor: %0';
        messagesEl.appendChild(loadBubble);
        scrollToBottom();

        try {
            let fileToUpload = file;
            let ext = file.name.split('.').pop();
            
            // Image compression
            if (file.type.startsWith('image/')) {
                loadBubble.textContent = '⚡ Fotoğraf optimize ediliyor...';
                fileToUpload = await compressImage(file, 1200, 1200, 0.7);
                ext = 'jpg';
            }

            const fileName = `angelface_media/${Date.now()}_${MY_NAME}.${ext}`;
            const ref = storage.ref(fileName);
            const uploadTask = ref.put(fileToUpload);

            uploadTask.on('state_changed', 
                (snapshot) => {
                    const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                    loadBubble.textContent = `⏳ Yükleniyor: %${progress}`;
                }, 
                (error) => {
                    loadBubble.textContent = '❌ Yükleme başarısız.';
                    console.error('Yükleme hatası:', error);
                }, 
                async () => {
                    const url = await ref.getDownloadURL();
                    loadBubble.remove();
                    await db.ref(CHAT_PATH).push({
                        type: isVideo ? 'video' : 'image',
                        url: url,
                        sender: MY_NAME,
                        ts: Date.now()
                    });
                }
            );
        } catch (err) {
            loadBubble.textContent = '❌ Optimize edilemedi veya yüklenemedi.';
            console.error('Dosya yükleme hatası:', err);
        }
    });

    // ──────────────────────────────────────────────────────────
    // VOICE NOTE (MediaRecorder API)
    // ──────────────────────────────────────────────────────────
    voiceBtn.addEventListener('click', async () => {
        if (!firebaseReady) {
            alert('Firebase henüz bağlı değil!');
            return;
        }

        if (isRecording) {
            if (mediaRecorder && mediaRecorder.state !== 'inactive') {
                mediaRecorder.stop();
            }
            return;
        }

        try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            audioChunks = [];
            const mimeType = getSupportedMimeType();
            
            const options = mimeType ? { mimeType } : {};
            mediaRecorder = new MediaRecorder(stream, options);

            mediaRecorder.addEventListener('dataavailable', (e) => {
                if (e.data.size > 0) audioChunks.push(e.data);
            });

            mediaRecorder.addEventListener('stop', async () => {
                isRecording = false;
                voiceBtn.classList.remove('is-recording');
                if (voiceBtn.querySelector('.voice-icon')) voiceBtn.querySelector('.voice-icon').style.display = '';
                if (voiceBtn.querySelector('.stop-icon')) voiceBtn.querySelector('.voice-icon').style.display = 'none';
                recBar.classList.remove('is-active');
                stream.getTracks().forEach(t => t.stop());

                if (audioChunks.length === 0) return;

                const blobOptions = mimeType ? { type: mimeType } : {};
                const blob = new Blob(audioChunks, blobOptions);
                const ext = mimeType.includes('mp4') ? 'mp4' : mimeType.includes('webm') ? 'webm' : 'ogg';
                const fileName = `angelface_voice/${Date.now()}_${MY_NAME}.${ext}`;

                const loadBubble = document.createElement('div');
                loadBubble.className = 'chat-bubble chat-bubble--out chat-bubble--uploading';
                loadBubble.textContent = '⏳ Sesli mesaj yükleniyor: %0';
                messagesEl.appendChild(loadBubble);
                scrollToBottom();

                try {
                    const ref = storage.ref(fileName);
                    const uploadTask = ref.put(blob);
                    
                    uploadTask.on('state_changed', 
                        (snapshot) => {
                            const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
                            loadBubble.textContent = `⏳ Sesli mesaj yükleniyor: %${progress}`;
                        }, 
                        (error) => {
                            loadBubble.textContent = '❌ Sesli mesaj gönderilemedi.';
                            console.error('Ses yükleme hatası:', error);
                        }, 
                        async () => {
                            const url = await ref.getDownloadURL();
                            loadBubble.remove();
                            await db.ref(CHAT_PATH).push({
                                type: 'voice',
                                url: url,
                                sender: MY_NAME,
                                ts: Date.now()
                            });
                        }
                    );
                } catch (err) {
                    loadBubble.textContent = '❌ Sesli mesaj gönderilemedi.';
                    console.error('Ses yükleme hatası:', err);
                }
            });

            mediaRecorder.start();
            isRecording = true;
            voiceBtn.classList.add('is-recording');
            if (voiceBtn.querySelector('.voice-icon')) voiceBtn.querySelector('.voice-icon').style.display = 'none';
            if (voiceBtn.querySelector('.stop-icon')) voiceBtn.querySelector('.stop-icon').style.display = '';
            recBar.classList.add('is-active');

        } catch (err) {
            alert('Mikrofon erişimi reddedildi. Lütfen tarayıcı ayarlarından izin ver.');
            console.error('Mikrofon hatası:', err);
        }
    });

    function getSupportedMimeType() {
        const types = [
            'audio/webm;codecs=opus', 
            'audio/webm', 
            'audio/ogg;codecs=opus', 
            'audio/ogg',
            'audio/mp4',
            'audio/aac',
            'audio/wav'
        ];
        return types.find(t => MediaRecorder.isTypeSupported(t)) || '';
    }

    // ──────────────────────────────────────────────────────────
    // INIT
    // ──────────────────────────────────────────────────────────
    const ready = initFirebase();
    if (ready) {
        // First load our own profile to get clearChatTs and targetNickName
        db.ref(`${PROFILE_PATH}/${MY_NAME}`).once('value').then(snap => {
            if (snap.exists()) {
                myProfileData = snap.val();
            } else {
                db.ref(`${PROFILE_PATH}/${MY_NAME}`).set(myProfileData);
            }
            
            // Now start listening to messages and presence tracking
            startListening();
            setupPresence();
            
            // Setup realtime listeners for profile updates
            setupProfiles();
        });
    }

};

/* ============================================================
   WEBRTC VIDEO & AUDIO CALLING SYSTEM
   ============================================================ */

window.bootWebRTCEngine = function() {
    'use strict';

    // Get Firebase from window (initialized in previous IIFE)
    const db = window.firebase ? window.firebase.database() : null;
    if (!db) return;

    function getMyName() {
        const stored = sessionStorage.getItem('af_user');
        if (stored) return stored;
        const params = new URLSearchParams(window.location.search);
        return params.get('user') || 'ben';
    }

    const MY_NAME = getMyName();
    const TARGET_NAME = MY_NAME === 'irem' ? 'ben' : 'irem';
    const CALL_PATH = 'angelface_chat/calls';

    // DOM Elements
    const btnCallAudio = document.getElementById('chat-call-audio');
    const btnCallVideo = document.getElementById('chat-call-video');
    
    const modalIncoming = document.getElementById('call-incoming');
    const incomingType = document.getElementById('call-incoming-type');
    const btnReject = document.getElementById('call-reject');
    const btnAcceptAudio = document.getElementById('call-accept-audio');
    const btnAcceptVideo = document.getElementById('call-accept-video');

    const screenCall = document.getElementById('call-screen');
    const remoteVideo = document.getElementById('call-remote-video');
    const localVideo = document.getElementById('call-local-video');
    const callTimer = document.getElementById('call-screen-timer');
    const btnCtrlMute = document.getElementById('call-ctrl-mute');
    const btnCtrlEnd = document.getElementById('call-ctrl-end');
    const btnCtrlCam = document.getElementById('call-ctrl-cam');

    // WebRTC Variables
    let peerConnection = null;
    let localStream = null;
    let remoteStream = null;
    let currentCallId = null;
    let isVideoCall = false;
    let timerInterval = null;
    let callStartTime = 0;

    const configuration = {
        iceServers: [
            { urls: 'stun:stun.l.google.com:19302' },
            { urls: 'stun:stun1.l.google.com:19302' }
        ]
    };

    // ──────────────────────────────────────────────────────────
    // MEDIA & UI HELPERS
    // ──────────────────────────────────────────────────────────

    async function getMedia(video) {
        try {
            const constraints = {
                audio: true,
                video: video ? {
                    facingMode: 'user',
                    width: { ideal: 640 },
                    height: { ideal: 480 }
                } : false
            };
            const stream = await navigator.mediaDevices.getUserMedia(constraints);
            localStream = stream;
            localVideo.srcObject = stream;
            if (!video) {
                localVideo.style.display = 'none';
            } else {
                localVideo.style.display = 'block';
            }
            return stream;
        } catch (err) {
            console.error('Error accessing media devices.', err);
            // Fallback: try simple video true if constraints fail
            if (video) {
                try {
                    const stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: true });
                    localStream = stream;
                    localVideo.srcObject = stream;
                    localVideo.style.display = 'block';
                    return stream;
                } catch (fallbackErr) {
                    console.error('Fallback media devices failed.', fallbackErr);
                    alert('Kamera veya mikrofon erişimi reddedildi.');
                }
            } else {
                alert('Mikrofon erişimi reddedildi.');
            }
            return null;
        }
    }

    function stopMedia() {
        if (localStream) {
            localStream.getTracks().forEach(track => track.stop());
            localStream = null;
        }
        localVideo.srcObject = null;
        remoteVideo.srcObject = null;
    }

    function startTimer() {
        callStartTime = Date.now();
        callTimer.textContent = '00:00';
        timerInterval = setInterval(() => {
            const diff = Math.floor((Date.now() - callStartTime) / 1000);
            const m = Math.floor(diff / 60).toString().padStart(2, '0');
            const s = (diff % 60).toString().padStart(2, '0');
            callTimer.textContent = `${m}:${s}`;
        }, 1000);
    }

    function stopTimer() {
        clearInterval(timerInterval);
        callTimer.textContent = '00:00';
    }

    function showActiveCallScreen(video) {
        screenCall.classList.add('is-active');
        if (!video) {
            remoteVideo.style.display = 'none';
            localVideo.style.display = 'none';
        } else {
            remoteVideo.style.display = 'block';
            localVideo.style.display = 'block';
        }
        // Reset controls
        btnCtrlMute.classList.remove('is-muted');
        btnCtrlCam.classList.remove('is-cam-off');
    }

    function hideActiveCallScreen() {
        screenCall.classList.remove('is-active');
        stopTimer();
    }

    function resetCall() {
        if (peerConnection) {
            peerConnection.close();
            peerConnection = null;
        }
        stopMedia();
        hideActiveCallScreen();
        modalIncoming.classList.remove('is-active');
        currentCallId = null;
        
        // Remove Firebase listener for this specific call to prevent memory leaks
        db.ref(CALL_PATH).off('child_removed');
    }

    // ──────────────────────────────────────────────────────────
    // WEBRTC PEER CONNECTION SETUP
    // ──────────────────────────────────────────────────────────

    function createPeerConnection() {
        peerConnection = new RTCPeerConnection(configuration);

        // Add local tracks
        localStream.getTracks().forEach(track => {
            peerConnection.addTrack(track, localStream);
        });

        // Handle remote tracks
        peerConnection.ontrack = event => {
            if (event.streams && event.streams[0]) {
                remoteVideo.srcObject = event.streams[0];
            } else {
                if (!remoteStream) {
                    remoteStream = new MediaStream();
                    remoteVideo.srcObject = remoteStream;
                }
                remoteStream.addTrack(event.track);
            }
        };

        // ICE Candidates
        peerConnection.onicecandidate = event => {
            if (event.candidate && currentCallId) {
                const candidatesRef = db.ref(`${CALL_PATH}/${currentCallId}/${MY_NAME}Candidates`);
                candidatesRef.push(event.candidate.toJSON());
            }
        };

        // Connection State
        peerConnection.onconnectionstatechange = () => {
            if (peerConnection.connectionState === 'connected') {
                startTimer();
            } else if (peerConnection.connectionState === 'disconnected' || peerConnection.connectionState === 'failed') {
                endCall();
            }
        };
    }

    // ──────────────────────────────────────────────────────────
    // MAKE A CALL (OFFER)
    // ──────────────────────────────────────────────────────────

    async function startCall(video) {
        isVideoCall = video;
        const stream = await getMedia(video);
        if (!stream) return;

        showActiveCallScreen(video);
        createPeerConnection();

        // Create Firebase document for the call
        const callRef = db.ref(CALL_PATH).push();
        currentCallId = callRef.key;
        
        // Remove call if caller disconnects or closes tab
        callRef.onDisconnect().remove();

        const offer = await peerConnection.createOffer();
        await peerConnection.setLocalDescription(offer);

        const callData = {
            caller: MY_NAME,
            target: TARGET_NAME,
            video: video,
            offer: {
                type: offer.type,
                sdp: offer.sdp
            },
            status: 'calling',
            timestamp: firebase.database.ServerValue.TIMESTAMP
        };

        await callRef.set(callData);

        // Listen for Answer
        callRef.on('value', snapshot => {
            const data = snapshot.val();
            if (!data) {
                // Call was deleted/rejected
                resetCall();
                return;
            }
            
            if (data.status === 'answered' && data.answer && !peerConnection.currentRemoteDescription) {
                const answerDesc = new RTCSessionDescription(data.answer);
                peerConnection.setRemoteDescription(answerDesc);
            }
        });

        // Listen for Remote ICE Candidates
        db.ref(`${CALL_PATH}/${currentCallId}/${TARGET_NAME}Candidates`).on('child_added', snapshot => {
            const candidate = new RTCIceCandidate(snapshot.val());
            peerConnection.addIceCandidate(candidate);
        });
        
        listenForCallEnd();
    }

    btnCallAudio.addEventListener('click', () => startCall(false));
    btnCallVideo.addEventListener('click', () => startCall(true));

    // ──────────────────────────────────────────────────────────
    // RECEIVE A CALL (INCOMING & ANSWER)
    // ──────────────────────────────────────────────────────────

    function listenForIncomingCalls() {
        // PHASE 1: Mevcut eski aramaları oku, temizle ve atla
        // child_added ilk bağlanınca mevcut TÜM kayıtları tetikler.
        // Bunu önlemek için önce mevcut key'leri topluyoruz.
        const callsRef = db.ref(CALL_PATH);
        const existingKeys = new Set();

        callsRef.once('value', existingSnapshot => {
            // Mevcut tüm anahtarları topla
            if (existingSnapshot.exists()) {
                existingSnapshot.forEach(child => {
                    existingKeys.add(child.key);
                    // Eski aramaları temizle
                    const call = child.val();
                    const now = Date.now();
                    const callTime = call.timestamp || now;
                    if (now - callTime > 45000) {
                        child.ref.remove();
                    }
                });
            }

            // PHASE 2: Artık sadece YENİ gelen aramaları dinle
            callsRef.on('child_added', snapshot => {
                // Boot sırasında mevcut olan kayıtları atla
                if (existingKeys.has(snapshot.key)) {
                    existingKeys.delete(snapshot.key);
                    return;
                }

                const call = snapshot.val();
                if (!call) return;

                // Ek güvenlik: 45 saniyeden eski aramayı yine yoksay
                const now = Date.now();
                const callTime = call.timestamp || now;
                if (now - callTime > 45000) {
                    snapshot.ref.remove();
                    return;
                }

                if (call.target === MY_NAME && call.status === 'calling') {
                    currentCallId = snapshot.key;
                    isVideoCall = call.video;
                    incomingType.textContent = isVideoCall ? 'Görüntülü Arama' : 'Sesli Arama';
                    modalIncoming.classList.add('is-active');

                    // Arama silinirse modal'ı kapat
                    snapshot.ref.on('value', snap => {
                        if (!snap.val() && currentCallId === snapshot.key) {
                            modalIncoming.classList.remove('is-active');
                            resetCall();
                        }
                    });
                }
            });
        });
    }

    async function answerCall(video) {
        modalIncoming.classList.remove('is-active');
        
        // Target can choose to answer a video call with audio only
        const actualVideo = isVideoCall && video; 
        
        const stream = await getMedia(actualVideo);
        if (!stream) {
            // Reject if media fails
            rejectCall();
            return;
        }

        showActiveCallScreen(actualVideo);
        createPeerConnection();

        const callRef = db.ref(`${CALL_PATH}/${currentCallId}`);
        const snapshot = await callRef.once('value');
        const callData = snapshot.val();

        if (!callData || !callData.offer) {
            resetCall();
            return;
        }

        // Set Remote Description
        const offerDesc = new RTCSessionDescription(callData.offer);
        await peerConnection.setRemoteDescription(offerDesc);

        // Create Answer
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);

        // Save Answer
        await callRef.update({
            status: 'answered',
            answer: {
                type: answer.type,
                sdp: answer.sdp
            }
        });

        // Listen for Remote ICE Candidates
        db.ref(`${CALL_PATH}/${currentCallId}/${TARGET_NAME}Candidates`).on('child_added', snap => {
            const candidate = new RTCIceCandidate(snap.val());
            peerConnection.addIceCandidate(candidate);
        });
        
        listenForCallEnd();
    }

    function rejectCall() {
        if (currentCallId) {
            db.ref(`${CALL_PATH}/${currentCallId}`).remove();
        }
        modalIncoming.classList.remove('is-active');
        resetCall();
    }

    btnAcceptAudio.addEventListener('click', () => answerCall(false));
    btnAcceptVideo.addEventListener('click', () => answerCall(true));
    btnReject.addEventListener('click', rejectCall);

    // ──────────────────────────────────────────────────────────
    // END CALL & CONTROLS
    // ──────────────────────────────────────────────────────────

    function endCall() {
        if (currentCallId) {
            db.ref(`${CALL_PATH}/${currentCallId}`).remove();
        }
        resetCall();
    }
    
    function listenForCallEnd() {
        // If the call node is removed by the other peer, end our call too
        db.ref(CALL_PATH).on('child_removed', snapshot => {
            if (snapshot.key === currentCallId) {
                resetCall();
            }
        });
    }

    btnCtrlEnd.addEventListener('click', endCall);

    btnCtrlMute.addEventListener('click', () => {
        if (!localStream) return;
        const audioTrack = localStream.getAudioTracks()[0];
        if (audioTrack) {
            audioTrack.enabled = !audioTrack.enabled;
            btnCtrlMute.classList.toggle('is-muted', !audioTrack.enabled);
        }
    });

    btnCtrlCam.addEventListener('click', () => {
        if (!localStream) return;
        const videoTrack = localStream.getVideoTracks()[0];
        if (videoTrack) {
            videoTrack.enabled = !videoTrack.enabled;
            btnCtrlCam.classList.toggle('is-cam-off', !videoTrack.enabled);
        }
    });

    // Start listening for incoming calls on init
    listenForIncomingCalls();

};

