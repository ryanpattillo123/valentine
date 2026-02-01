const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');
const valentineGif = document.getElementById('valentineGif');

let noClickCount = 0;
let yesBtnSize = 1;

// Messages that appear on the No button
const noMessages = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again!",
    "Don't be shy!",
    "Give it a chance!",
    "Pretty please?",
    "You'll regret it!",
    "Last chance!",
    "I'll cry 😢",
    "..."
];

// Different cute/sad GIFs that change when hovering over No
const sadGifs = [
    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcHBxdmN5aWU4ZG5rZjhvdHlpYnI2eGZ5cXZ6YzJ6M3F6cXl6YzJ6YyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/MDJ9IbxxvDUQM/giphy.gif",
    "https://media.giphy.com/media/L95W4wv8nnb9K/giphy.gif",
    "https://media.giphy.com/media/kgKrO1A3JbWTK/giphy.gif",
    "https://media.giphy.com/media/ROF8OQvDmxytW/giphy.gif"
];

// Yes button click handler
yesBtn.addEventListener('click', () => {
    celebration.classList.remove('hidden');
    createHeartRain();
    
    // Play celebration sound (optional - commented out as it needs audio file)
    // const audio = new Audio('celebration.mp3');
    // audio.play();
});

// Make the No button run away from the cursor
noBtn.addEventListener('mouseenter', () => {
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    const btnRect = noBtn.getBoundingClientRect();
    
    // Calculate random position within container
    const maxX = containerRect.width - btnRect.width - 40; // 40 for padding
    const maxY = 200; // vertical range
    
    const randomX = Math.random() * maxX - maxX/2;
    const randomY = Math.random() * maxY - maxY/2;
    
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px)`;
    
    // Change the button text
    noClickCount++;
    if (noClickCount < noMessages.length) {
        noBtn.textContent = noMessages[noClickCount];
    }
    
    // Make Yes button bigger with each No hover
    yesBtnSize += 0.1;
    yesBtn.style.transform = `scale(${yesBtnSize})`;
    
    // Change to a sad GIF
    const randomGif = sadGifs[Math.floor(Math.random() * sadGifs.length)];
    valentineGif.src = randomGif;
    
    // Shrink the No button
    const currentScale = 1 - (noClickCount * 0.1);
    if (currentScale > 0.3) {
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(${currentScale})`;
    } else {
        // Make it nearly impossible to click
        noBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(0.3)`;
    }
});

// Make No button even harder to click on mobile
noBtn.addEventListener('touchstart', (e) => {
    e.preventDefault();
    const touch = e.touches[0];
    
    // Move the button away from touch
    const container = document.querySelector('.container');
    const containerRect = container.getBoundingClientRect();
    
    const randomX = Math.random() * 200 - 100;
    const randomY = Math.random() * 200 - 100;
    
    noBtn.style.transform = `translate(${randomX}px, ${randomY}px) scale(${Math.max(0.3, 1 - noClickCount * 0.1)})`;
    
    noClickCount++;
    if (noClickCount < noMessages.length) {
        noBtn.textContent = noMessages[noClickCount];
    }
    
    yesBtnSize += 0.15;
    yesBtn.style.transform = `scale(${yesBtnSize})`;
});

// If they somehow click No, make it do nothing or make Yes bigger
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    yesBtnSize += 0.3;
    yesBtn.style.transform = `scale(${yesBtnSize})`;
    
    // Shake animation
    noBtn.style.animation = 'shake 0.5s';
    setTimeout(() => {
        noBtn.style.animation = '';
    }, 500);
});

// Create falling hearts animation
function createHeartRain() {
    const heartRain = document.querySelector('.heart-rain');
    const hearts = ['❤️', '💕', '💖', '💗', '💝', '💘', '💓'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = hearts[Math.floor(Math.random() * hearts.length)];
            heart.style.left = Math.random() * 100 + '%';
            heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
            heart.style.fontSize = (Math.random() * 2 + 1) + 'rem';
            heartRain.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 5000);
        }, i * 100);
    }
}

// Add shake animation to CSS dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
