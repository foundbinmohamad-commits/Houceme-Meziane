/* ============================================
   وظائف شاشة الدخول - Splash Screen JavaScript
   ============================================ */

/**
 * بدء اللعبة والانتقال من شاشة الدخول
 */
function startGame() {
    const splashScreen = document.getElementById('splashScreen');
    const gameContainer = document.getElementById('gameContainer');

    // إضافة تأثير الاختفاء
    splashScreen.style.animation = 'fadeOut 0.6s ease-out forwards';

    // الانتقال للعبة بعد انتهاء التأثير
    setTimeout(() => {
        splashScreen.style.display = 'none';
        gameContainer.style.display = 'flex';
    }, 600);

    // تشغيل صوت انتقال (اختياري)
    playTransitionSound();
}

/**
 * العودة إلى شاشة الدخول
 */
function backToSplash() {
    const splashScreen = document.getElementById('splashScreen');
    const gameContainer = document.getElementById('gameContainer');

    gameContainer.style.animation = 'fadeOut 0.6s ease-out forwards';

    setTimeout(() => {
        gameContainer.style.display = 'none';
        splashScreen.style.display = 'flex';
        splashScreen.style.animation = 'fadeIn 0.6s ease-out';
    }, 600);

    playTransitionSound();
}

/**
 * تشغيل صوت الانتقال بين الشاشات
 */
function playTransitionSound() {
    // يمكن استبدال هذا برابط صوت حقيقي
    try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);

        oscillator.frequency.value = 587.33; // نوتة D5
        oscillator.type = 'sine';

        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

        oscillator.start(audioContext.currentTime);
        oscillator.stop(audioContext.currentTime + 0.1);
    } catch (e) {
        console.log('لا يمكن تشغيل الصوت');
    }
}

/**
 * مراقبة حجم الشاشة والتكيف معها
 */
window.addEventListener('resize', () => {
    // إعادة حساب المواضع إذا لزم الأمر
    console.log(`حجم الشاشة: ${window.innerWidth}x${window.innerHeight}`);
});

/**
 * معالجة اختصارات لوحة المفاتيح
 */
document.addEventListener('keydown', (event) => {
    // الضغط على Enter لبدء اللعبة
    if (event.key === 'Enter') {
        const splashScreen = document.getElementById('splashScreen');
        if (splashScreen.style.display !== 'none') {
            startGame();
        }
    }

    // الضغط على Escape للعودة
    if (event.key === 'Escape') {
        const gameContainer = document.getElementById('gameContainer');
        if (gameContainer.style.display !== 'none') {
            backToSplash();
        }
    }
});

/**
 * التحقق من دعم الميزات
 */
function checkBrowserSupport() {
    // التحقق من دعم Canvas
    const canvas = document.createElement('canvas');
    const hasCanvas = !!(canvas.getContext && canvas.getContext('2d'));

    // التحقق من دعم Web Audio API
    const hasAudio = !!(window.AudioContext || window.webkitAudioContext);

    console.log(`دعم Canvas: ${hasCanvas}`);
    console.log(`دعم Web Audio: ${hasAudio}`);

    return {
        canvas: hasCanvas,
        audio: hasAudio
    };
}

/**
 * تحميل الموارد الأولية
 */
function preloadAssets() {
    // تحميل الصور أو الأصوات هنا إذا لزم الأمر
    console.log('تحميل الموارد...');
}

/**
 * إضافة تأثيرات الماوس على الأزرار
 */
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');

    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05) translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        button.addEventListener('click', function() {
            // تأثير نقر
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 100);
        });
    });

    // التحقق من دعم المتصفح
    const support = checkBrowserSupport();

    // تحميل الموارد
    preloadAssets();

    console.log('تم تحضير شاشة الدخول بنجاح! 🎰');
});

/**
 * معالج الأخطاء العام
 */
window.addEventListener('error', (event) => {
    console.error('حدث خطأ:', event.error);
});

/**
 * تتبع تفاعل المستخدم
 */
let userInteractionCount = 0;

document.addEventListener('click', () => {
    userInteractionCount++;
    console.log(`عدد النقرات: ${userInteractionCount}`);
});