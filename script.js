const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');
const dogsContainer = document.getElementById('dogsContainer');
const warning = document.getElementById('warning');
const sadOverlay = document.getElementById('sadOverlay');
const happyDogsContainer = document.getElementById('happyDogs');

// Real dog GIFs!
const happyDogGifs = [
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXp2eWx6ZjBxdHVtYmN2cTF5dWJ6ZGt5YnZ5dWJ6ZGt5YnZ5dWJ6ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/mCRJDo24UvJMA/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXp2eWx6ZjBxdHVtYmN2cTF5dWJ6ZGt5YnZ5dWJ6ZGt5YnZ5dWJ6ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/4Zo41lhzKt6iZ8xff9/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXp2eWx6ZjBxdHVtYmN2cTF5dWJ6ZGt5YnZ5dWJ6ZGt5YnZ5dWJ6ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xT9IgvEOwRzUcZDRiU/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXp2eWx6ZjBxdHVtYmN2cTF5dWJ6ZGt5YnZ5dWJ6ZGt5YnZ5dWJ6ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/pPs4HwdYb46fWfmSSy/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXp2eWx6ZjBxdHVtYmN2cTF5dWJ6ZGt5YnZ5dWJ6ZGt5YnZ5dWJ6ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/l3q2MDnkLri1t7i5a/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXp2eWx6ZjBxdHVtYmN2cTF5dWJ6ZGt5YnZ5dWJ6ZGt5YnZ5dWJ6ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/KctrWMQ7u9D2du0YmD/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXp2eWx6ZjBxdHVtYmN2cTF5dWJ6ZGt5YnZ5dWJ6ZGt5YnZ5dWJ6ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/xUA7b7v9ngUmGHSxj2/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXp2eWx6ZjBxdHVtYmN2cTF5dWJ6ZGt5YnZ5dWJ6ZGt5YnZ5dWJ6ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/QvBoMEcQ7DQXK/giphy.gif'
];

const sadDogGifs = [
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXp2eWx6ZjBxdHVtYmN2cTF5dWJ6ZGt5YnZ5dWJ6ZGt5YnZ5dWJ6ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/d2lcHJTG5Tscg/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXp2eWx6ZjBxdHVtYmN2cTF5dWJ6ZGt5YnZ5dWJ6ZGt5YnZ5dWJ6ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kaBU6pgv0OsPHz2yxy/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXp2eWx6ZjBxdHVtYmN2cTF5dWJ6ZGt5YnZ5dWJ6ZGt5YnZ5dWJ6ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/8McNH1aXZnVyE/giphy.gif',
    'https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXp2eWx6ZjBxdHVtYmN2cTF5dWJ6ZGt5YnZ5dWJ6ZGt5YnZ5dWJ6ZCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/j9GASQ5ocrIRicUFmj/giphy.gif'
];

// Create initial happy dogs
function createDogs(count) {
    dogsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const dog = document.createElement('div');
        dog.className = 'dog';
        
        const img = document.createElement('img');
        img.src = happyDogGifs[i % happyDogGifs.length];
        img.alt = 'Happy dog';
        img.className = 'dog-img';
        
        const treat = document.createElement('span');
        treat.className = 'treat';
        treat.textContent = '🦴';
        
        dog.appendChild(img);
        dog.appendChild(treat);
        dog.style.animationDelay = `${Math.random() * 2}s`;
        dogsContainer.appendChild(dog);
    }
}

// Initialize with 8 dogs
createDogs(8);

// Yes button click handler - SAVE THE DOGS!
yesBtn.addEventListener('click', () => {
    celebration.classList.remove('hidden');
    createHappyDogs();
    
    // Create treats falling animation
    createTreatRain();
    
    // Make all dogs super happy
    const allDogs = document.querySelectorAll('.dog');
    allDogs.forEach(dog => {
        dog.classList.add('super-happy');
    });
});

// No button hover - Make dogs sad
noBtn.addEventListener('mouseenter', () => {
    const allDogs = document.querySelectorAll('.dog');
    allDogs.forEach((dog, index) => {
        dog.classList.add('sad');
        // Change to sad dog GIF
        const img = dog.querySelector('.dog-img');
        if (img) {
            img.src = sadDogGifs[index % sadDogGifs.length];
        }
    });
    
    warning.classList.add('show');
    sadOverlay.classList.remove('hidden');
    
    // Change background to darker
    document.body.style.background = 'linear-gradient(135deg, #94a3b8 0%, #64748b 50%, #475569 100%)';
});

// No button leave - Restore dogs
noBtn.addEventListener('mouseleave', () => {
    const allDogs = document.querySelectorAll('.dog');
    allDogs.forEach((dog, index) => {
        dog.classList.remove('sad');
        // Change back to happy dog GIF
        const img = dog.querySelector('.dog-img');
        if (img) {
            img.src = happyDogGifs[index % happyDogGifs.length];
        }
    });
    
    warning.classList.remove('show');
    sadOverlay.classList.add('hidden');
    
    // Restore background
    document.body.style.background = 'linear-gradient(135deg, #ffd1dc 0%, #ffb6c1 50%, #ff69b4 100%)';
});

// Make No button even worse on click
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    // Create more sad dogs
    createDogs(12);
    const allDogs = document.querySelectorAll('.dog');
    allDogs.forEach(dog => {
        dog.classList.add('sad');
    });
    
    // Show dramatic message
    alert('💔 You made the dogs cry! Please reconsider... 😢');
    
    // Make Yes button bigger and more appealing
    yesBtn.style.transform = 'scale(1.3)';
    yesBtn.style.animation = 'pulse 0.5s ease-in-out infinite';
});

// Create happy dogs for celebration
function createHappyDogs() {
    happyDogsContainer.innerHTML = '';
    for (let i = 0; i < 12; i++) {
        const dog = document.createElement('div');
        dog.className = 'happy-dog';
        
        const img = document.createElement('img');
        img.src = happyDogGifs[i % happyDogGifs.length];
        img.alt = 'Happy dog';
        img.className = 'celebration-dog-img';
        
        dog.appendChild(img);
        dog.style.animationDelay = `${Math.random() * 1}s`;
        happyDogsContainer.appendChild(dog);
    }
}

// Create falling treats animation
function createTreatRain() {
    const treats = ['🦴', '🥩', '🌭', '🍖'];
    const celebrationEl = document.getElementById('celebration');
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            const treat = document.createElement('div');
            treat.style.position = 'absolute';
            treat.style.fontSize = '2rem';
            treat.style.left = Math.random() * 100 + '%';
            treat.style.top = '-50px';
            treat.textContent = treats[Math.floor(Math.random() * treats.length)];
            treat.style.animation = 'treatFall 3s linear forwards';
            treat.style.zIndex = '1';
            celebrationEl.appendChild(treat);
            
            setTimeout(() => {
                treat.remove();
            }, 3000);
        }, i * 100);
    }
}

// Add treat fall animation dynamically
const style = document.createElement('style');
style.textContent = `
    @keyframes treatFall {
        0% {
            top: -50px;
            transform: rotate(0deg);
            opacity: 1;
        }
        100% {
            top: 110%;
            transform: rotate(360deg);
            opacity: 0.8;
        }
    }
`;
document.head.appendChild(style);

// Add dog interactions - pet the dogs!
dogsContainer.addEventListener('click', (e) => {
    if (e.target.classList.contains('dog') && !e.target.classList.contains('sad')) {
        e.target.style.transform = 'scale(1.5)';
        setTimeout(() => {
            e.target.style.transform = 'scale(1)';
        }, 300);
        
        // Add a heart temporarily
        const heart = document.createElement('span');
        heart.textContent = '❤️';
        heart.style.position = 'absolute';
        heart.style.fontSize = '2rem';
        heart.style.animation = 'float 1s ease-out forwards';
        e.target.appendChild(heart);
        
        setTimeout(() => {
            heart.remove();
        }, 1000);
    }
});
