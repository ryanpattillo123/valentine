const yesBtn = document.getElementById('yesBtn');
const noBtn = document.getElementById('noBtn');
const celebration = document.getElementById('celebration');
const dogsContainer = document.getElementById('dogsContainer');
const warning = document.getElementById('warning');
const sadOverlay = document.getElementById('sadOverlay');
const happyDogsContainer = document.getElementById('happyDogs');

// Dog emojis - always work, no loading issues!
const happyDogEmojis = ['🐕', '🐶', '🐕‍🦺', '🦮', '🐩', '🐾'];
const sadDogEmojis = ['😢🐕', '😭🐶', '💔🐕', '😞🦮'];
const floatingDogEmojis = ['🐕', '🐶', '🦴', '🐾'];

// Create initial happy dogs
function createDogs(count) {
    dogsContainer.innerHTML = '';
    for (let i = 0; i < count; i++) {
        const dog = document.createElement('div');
        dog.className = 'dog';
        
        const dogEmoji = document.createElement('div');
        dogEmoji.textContent = happyDogEmojis[i % happyDogEmojis.length];
        dogEmoji.className = 'dog-emoji';
        
        // Create floating dog
        const floatingDog = document.createElement('div');
        floatingDog.textContent = floatingDogEmojis[i % floatingDogEmojis.length];
        floatingDog.className = 'floating-dog-emoji';
        
        dog.appendChild(dogEmoji);
        dog.appendChild(floatingDog);
        dog.style.animationDelay = `${Math.random() * 2}s`;
        dogsContainer.appendChild(dog);
    }
}

// Initialize with 8 dogs
createDogs(8);

let dogsSad = false;

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

// No button click - Make dogs sad
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (!dogsSad) {
        // First click - make dogs sad
        makeDogsSad();
        dogsSad = true;
        
        // Change button text
        noBtn.innerHTML = `
            Still No? 😰
            <span class="btn-subtitle">The dogs are crying...</span>
        `;
    } else {
        // Second click - make it worse
        createDogs(12);
        const allDogs = document.querySelectorAll('.dog');
        allDogs.forEach((dog, index) => {
            dog.classList.add('sad');
            const dogEmoji = dog.querySelector('.dog-emoji');
            if (dogEmoji) {
                dogEmoji.textContent = sadDogEmojis[index % sadDogEmojis.length];
            }
        });
        
        // Show dramatic message
        alert('💔 You made even more dogs cry! Please reconsider... 😢');
        
        noBtn.innerHTML = `
            Really?? 😭
            <span class="btn-subtitle">THEY'RE ALL CRYING!</span>
        `;
    }
    
    // Make Yes button bigger and more appealing
    yesBtn.style.transform = 'scale(1.3)';
    yesBtn.style.animation = 'pulse 0.5s ease-in-out infinite';
});

function makeDogsSad() {
    const allDogs = document.querySelectorAll('.dog');
    allDogs.forEach((dog, index) => {
        dog.classList.add('sad');
        // Change to sad dog emoji
        const dogEmoji = dog.querySelector('.dog-emoji');
        if (dogEmoji) {
            dogEmoji.textContent = sadDogEmojis[index % sadDogEmojis.length];
        }
    });
    
    warning.classList.add('show');
    sadOverlay.classList.remove('hidden');
    
    // Change background to darker
    document.body.style.background = 'linear-gradient(135deg, #94a3b8 0%, #64748b 50%, #475569 100%)';
}

function restoreDogs() {
    const allDogs = document.querySelectorAll('.dog');
    allDogs.forEach((dog, index) => {
        dog.classList.remove('sad');
        // Change back to happy dog emoji
        const dogEmoji = dog.querySelector('.dog-emoji');
        if (dogEmoji) {
            dogEmoji.textContent = happyDogEmojis[index % happyDogEmojis.length];
        }
    });
    
    warning.classList.remove('show');
    sadOverlay.classList.add('hidden');
    
    // Restore background
    document.body.style.background = 'linear-gradient(135deg, #ffd1dc 0%, #ffb6c1 50%, #ff69b4 100%)';
}

// Create happy dogs for celebration
function createHappyDogs() {
    happyDogsContainer.innerHTML = '';
    for (let i = 0; i < 20; i++) {
        const dog = document.createElement('div');
        dog.className = 'happy-dog';
        dog.textContent = happyDogEmojis[i % happyDogEmojis.length];
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
