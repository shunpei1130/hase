function toggleFaq(index) {
    const items = document.querySelectorAll('.faq-item');
    const item = items[index - 1];
    const isActive = item.classList.contains('active');

    if (isActive) {
        item.classList.remove('active');
        item.querySelector('.faq-toggle').textContent = '＋';
    } else {
        item.classList.add('active');
        item.querySelector('.faq-toggle').textContent = '−';
    }
}

// CSSの読み込み完了を待つ関数
function onCSSLoad(callback) {
    if (document.readyState === 'complete') {
        callback();
    } else {
        window.addEventListener('load', callback);
    }
}




document.querySelectorAll(".line-button").forEach(function(button) {
    button.addEventListener("click", function() {
        window.location.href = "https://line.me/R/ti/p/@032svnai"; // ここに遷移先のURLを指定
    });
});

document.querySelectorAll(".contact-line-button").forEach(function(button) {
    button.addEventListener("click", function() {
        window.location.href = "https://line.me/R/ti/p/@032svnai"; // ここに遷移先のURLを指定
    });
});

document.querySelectorAll(".contact-mail-button").forEach(function(button) {
    button.addEventListener("click", function() {
        window.location.href = "mailto:info@pooly.jp"; // ここに遷移先のURLを指定
    });
});


// デバイスがモバイルかどうかを判定する関数
function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// 現在のページがモバイルページかどうかを判定する関数
function isMobilePage() {
    return window.location.pathname.includes("mobile.html");
}

// モバイルなら別のファイルにリダイレクト
if (isMobile() && !isMobilePage()) {
    window.location.href = "mobile.html"; // モバイル用のファイル
} else {
    document.addEventListener("DOMContentLoaded", function() {
        document.body.style.display = "block"; // PC版の場合、ページが読み込まれた後に表示
    });
}


function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.backgroundColor = getRandomColor();
    confetti.style.left = Math.random() * window.innerWidth + 'px';
    confetti.style.top = Math.random() * window.innerHeight / 2 + 'px'; /* 上半分から紙吹雪を生成 */
    confetti.style.animationDuration = Math.random() * 3 + 2 + 's';
    document.body.appendChild(confetti);

    setTimeout(() => {
        confetti.remove();
    }, 5000);
}

function getRandomColor() {
    const colors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink'];
    return colors[Math.floor(Math.random() * colors.length)];
}

function startConfetti() {
    for (let i = 0; i < 100; i++) {
        setTimeout(createConfetti, i * 50);
    }
}


document.querySelectorAll(".aaa").forEach(function(button) {
    button.addEventListener("click", function() {
        window.location.href = "https://resignkun.com/terms"; // ここに遷移先のURLを指定
    });
});
document.querySelectorAll(".rectangle-be").forEach(function(button) {
    button.addEventListener("click", function() {
        window.location.href = "https://resignkun.com/law"; // ここに遷移先のURLを指定
    });
});
