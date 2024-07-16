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




document.querySelectorAll(".line-button").forEach(function(button) {
    button.addEventListener("click", function() {
        window.location.href = "https://example.com"; // ここに遷移先のURLを指定
    });
});

document.querySelectorAll(".contact-line-button").forEach(function(button) {
    button.addEventListener("click", function() {
        window.location.href = "https://example.com"; // ここに遷移先のURLを指定
    });
});


function isMobile() {
    return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
}

// モバイルなら別のファイルにリダイレクト
if (isMobile()) {
    window.location.href = "mobile.html"; // モバイル用のファイル
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