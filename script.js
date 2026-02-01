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

// Wicked theme emojis
const wickedHappyEmojis = ['💚', '✨', '🎭', '🌟', '💫', '🎪'];
const wickedSadEmojis = ['🧙‍♀️', '🖤', '💀', '🌑'];
const wickedFloatingEmojis = ['🧹', '🔮', '⚡', '🌪️'];

// Audiology theme emojis
const audiologyHappyEmojis = ['🎧', '👂', '🔊', '🎵', '🎶', '📢'];
const audiologySadEmojis = ['🔇', '😶', '🙉', '❌'];
const audiologyFloatingEmojis = ['🎼', '🎤', '📻', '🔉'];

// Create initial happy dogs
function createDogs(count) {
    dogsContainer.innerHTML = '';
    
    // Use Wicked emojis if it's the Wicked theme, Audiology emojis if audiology theme
    let mainEmojis, floatEmojis;
    
    if (isWickedTheme) {
        mainEmojis = wickedHappyEmojis;
        floatEmojis = wickedFloatingEmojis;
    } else if (isAudiologyTheme) {
        mainEmojis = audiologyHappyEmojis;
        floatEmojis = audiologyFloatingEmojis;
    } else {
        mainEmojis = happyDogEmojis;
        floatEmojis = floatingDogEmojis;
    }
    
    for (let i = 0; i < count; i++) {
        const dog = document.createElement('div');
        dog.className = 'dog';
        
        const dogEmoji = document.createElement('div');
        dogEmoji.textContent = mainEmojis[i % mainEmojis.length];
        dogEmoji.className = 'dog-emoji';
        
        // Create floating dog
        const floatingDog = document.createElement('div');
        floatingDog.textContent = floatEmojis[i % floatEmojis.length];
        floatingDog.className = 'floating-dog-emoji';
        
        dog.appendChild(dogEmoji);
        dog.appendChild(floatingDog);
        dog.style.animationDelay = `${Math.random() * 2}s`;
        dogsContainer.appendChild(dog);
    }
}

// Initialize with custom dog count (set by router.js) or default to 8
let initialDogCount = 8;
let isWickedTheme = false;
let isAudiologyTheme = false;

// Wait for initialization
window.addEventListener('DOMContentLoaded', () => {
    initialDogCount = window.initialDogCount || 8;
    isWickedTheme = window.wickedTheme || false;
    isAudiologyTheme = window.audiologyTheme || false;
    createDogs(initialDogCount);
});

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
    
    // Play audio if it's the Wicked theme
    if (isWickedTheme) {
        // Use Web Speech API to "sing" with more natural rhythm
        if ('speechSynthesis' in window) {
            const lyricPhrases = [
                { text: "Dan-cing", pitch: 1.4, rate: 1.3, pause: 100 },
                { text: "through", pitch: 1.5, rate: 1.4, pause: 50 },
                { text: "life!", pitch: 1.8, rate: 1.2, pause: 400 },
                { text: "Skimming", pitch: 1.3, rate: 1.1, pause: 100 },
                { text: "the", pitch: 1.2, rate: 1.0, pause: 50 },
                { text: "surface!", pitch: 1.6, rate: 1.3, pause: 400 },
                { text: "Gliding", pitch: 1.4, rate: 1.2, pause: 100 },
                { text: "where turf", pitch: 1.3, rate: 1.0, pause: 100 },
                { text: "is smooth!", pitch: 1.7, rate: 1.4, pause: 500 },
                { text: "Life's more", pitch: 1.2, rate: 0.9, pause: 100 },
                { text: "pain-less,", pitch: 1.4, rate: 1.1, pause: 200 },
                { text: "for the", pitch: 1.1, rate: 0.95, pause: 100 },
                { text: "brain-less!", pitch: 1.9, rate: 1.5, pause: 600 },
                { text: "Why", pitch: 1.0, rate: 0.8, pause: 150 },
                { text: "think", pitch: 1.1, rate: 0.85, pause: 150 },
                { text: "too hard?", pitch: 1.3, rate: 0.9, pause: 500 },
                { text: "When it's", pitch: 1.2, rate: 1.0, pause: 100 },
                { text: "so", pitch: 1.4, rate: 1.1, pause: 100 },
                { text: "soothing,", pitch: 1.6, rate: 1.2, pause: 300 },
                { text: "dan-cing", pitch: 1.5, rate: 1.3, pause: 100 },
                { text: "through", pitch: 1.7, rate: 1.4, pause: 50 },
                { text: "life!", pitch: 2.0, rate: 1.6, pause: 200 }
            ];
            
            const voices = speechSynthesis.getVoices();
            const preferredVoice = voices.find(voice => 
                voice.name.includes('Samantha') || 
                voice.name.includes('Karen') || 
                voice.name.includes('Victoria') ||
                voice.name.includes('Fiona') ||
                voice.name.includes('Female')
            );
            
            let cumulativeDelay = 0;
            lyricPhrases.forEach((phrase) => {
                setTimeout(() => {
                    const utterance = new SpeechSynthesisUtterance(phrase.text);
                    utterance.pitch = phrase.pitch;
                    utterance.rate = phrase.rate;
                    utterance.volume = 0.95;
                    
                    if (preferredVoice) {
                        utterance.voice = preferredVoice;
                    }
                    
                    speechSynthesis.speak(utterance);
                }, cumulativeDelay);
                
                // More natural timing based on syllables and pauses
                cumulativeDelay += (phrase.text.length * 60) + phrase.pause;
            });
        }
    }
});

// No button click - Make dogs sad
noBtn.addEventListener('click', (e) => {
    e.preventDefault();
    
    if (isWickedTheme) {
        handleWickedNoClick();
        return;
    }
    
    if (isAudiologyTheme) {
        handleAudiologyNoClick();
        return;
    }
    
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

// Wicked theme: Evil things happen when you click No!
function handleWickedNoClick() {
    if (!dogsSad) {
        // First click - turn green magic into dark magic
        document.body.style.background = 'linear-gradient(135deg, #1a1a1a 0%, #2d5016 50%, #000000 100%)';
        
        const allDogs = document.querySelectorAll('.dog');
        allDogs.forEach((dog, index) => {
            dog.classList.add('melting');
            const dogEmoji = dog.querySelector('.dog-emoji');
            if (dogEmoji) {
                dogEmoji.textContent = '🧙‍♀️';
                dogEmoji.style.filter = 'grayscale(100%) brightness(0.5)';
            }
            const floatingDog = dog.querySelector('.floating-dog-emoji');
            if (floatingDog) {
                floatingDog.textContent = '🌑';
            }
        });
        
        warning.classList.add('show');
        warning.textContent = '⚠️ You\'ve chosen wickedness! The magic is turning dark! ⚠️';
        sadOverlay.classList.remove('hidden');
        
        noBtn.innerHTML = `
            Defying Gravity? 🌪️
            <span class="btn-subtitle">The darkness spreads...</span>
        `;
        
        dogsSad = true;
        
        // Sing evil song - dramatic and dark
        if ('speechSynthesis' in window) {
            const evilPhrases = [
                { text: "Something", pitch: 0.6, rate: 0.7, pause: 200 },
                { text: "has", pitch: 0.65, rate: 0.75, pause: 150 },
                { text: "changed", pitch: 0.7, rate: 0.8, pause: 300 },
                { text: "within", pitch: 0.75, rate: 0.85, pause: 150 },
                { text: "me!", pitch: 0.9, rate: 1.0, pause: 600 },
                { text: "Something", pitch: 0.6, rate: 0.7, pause: 200 },
                { text: "is", pitch: 0.65, rate: 0.75, pause: 100 },
                { text: "not", pitch: 0.7, rate: 0.8, pause: 150 },
                { text: "the", pitch: 0.75, rate: 0.85, pause: 100 },
                { text: "same!", pitch: 1.0, rate: 1.2, pause: 800 },
                { text: "I'm", pitch: 0.7, rate: 0.8, pause: 150 },
                { text: "through", pitch: 0.75, rate: 0.85, pause: 150 },
                { text: "with", pitch: 0.8, rate: 0.9, pause: 100 },
                { text: "playing", pitch: 0.85, rate: 0.95, pause: 150 },
                { text: "by the", pitch: 0.9, rate: 1.0, pause: 100 },
                { text: "rules!", pitch: 1.1, rate: 1.3, pause: 500 }
            ];
            
            const voices = speechSynthesis.getVoices();
            const darkVoice = voices.find(voice => 
                voice.name.includes('Fiona') ||
                voice.name.includes('Victoria') ||
                voice.name.includes('Karen') ||
                voice.name.includes('Female')
            );
            
            let cumulativeDelay = 500; // Start after the evil laugh
            evilPhrases.forEach((phrase) => {
                setTimeout(() => {
                    const utterance = new SpeechSynthesisUtterance(phrase.text);
                    utterance.pitch = phrase.pitch;
                    utterance.rate = phrase.rate;
                    utterance.volume = 1.0;
                    
                    if (darkVoice) {
                        utterance.voice = darkVoice;
                    }
                    
                    speechSynthesis.speak(utterance);
                }, cumulativeDelay);
                
                cumulativeDelay += (phrase.text.length * 80) + phrase.pause;
            });
        }
        
        // Evil laugh sound effect (visual)
        const evilLaugh = document.createElement('div');
        evilLaugh.textContent = 'MWAHAHAHA! 🧙‍♀️';
        evilLaugh.style.position = 'fixed';
        evilLaugh.style.top = '50%';
        evilLaugh.style.left = '50%';
        evilLaugh.style.transform = 'translate(-50%, -50%)';
        evilLaugh.style.fontSize = '4rem';
        evilLaugh.style.color = '#2d5016';
        evilLaugh.style.zIndex = '999';
        evilLaugh.style.animation = 'evilAppear 2s ease-out forwards';
        evilLaugh.style.textShadow = '0 0 20px #000';
        document.body.appendChild(evilLaugh);
        
        // Speak the evil laugh
        if ('speechSynthesis' in window) {
            const laughUtterance = new SpeechSynthesisUtterance('Mwa ha ha ha ha!');
            laughUtterance.pitch = 0.5;
            laughUtterance.rate = 0.6;
            laughUtterance.volume = 1.0;
            speechSynthesis.speak(laughUtterance);
        }
        
        setTimeout(() => {
            evilLaugh.remove();
        }, 2000);
        
    } else {
        // Second click - full evil mode
        alert('🧙‍♀️ No good deed goes unpunished! The magic has turned WICKED! Choose good and restore the light!');
        
        noBtn.innerHTML = `
            No One Mourns The Wicked... 💀
            <span class="btn-subtitle">It's too late!</span>
        `;
        
        // Sing "No Good Deed" - the ultimate evil anthem
        if ('speechSynthesis' in window) {
            const noGoodDeedPhrases = [
                { text: "No", pitch: 0.6, rate: 0.7, pause: 200 },
                { text: "good", pitch: 0.65, rate: 0.75, pause: 150 },
                { text: "deed", pitch: 0.7, rate: 0.8, pause: 300 },
                { text: "goes", pitch: 0.75, rate: 0.85, pause: 150 },
                { text: "un-punished!", pitch: 0.9, rate: 1.0, pause: 600 },
                { text: "No", pitch: 0.6, rate: 0.7, pause: 200 },
                { text: "good", pitch: 0.65, rate: 0.75, pause: 150 },
                { text: "deed", pitch: 0.7, rate: 0.8, pause: 300 },
                { text: "goes", pitch: 0.8, rate: 0.9, pause: 150 },
                { text: "un-punished!", pitch: 1.0, rate: 1.2, pause: 800 },
                { text: "That's", pitch: 0.7, rate: 0.8, pause: 150 },
                { text: "my", pitch: 0.75, rate: 0.85, pause: 150 },
                { text: "new", pitch: 0.8, rate: 0.9, pause: 150 },
                { text: "creed!", pitch: 1.1, rate: 1.3, pause: 500 }
            ];
            
            const voices = speechSynthesis.getVoices();
            const darkVoice = voices.find(voice => 
                voice.name.includes('Fiona') ||
                voice.name.includes('Victoria') ||
                voice.name.includes('Karen')
            );
            
            let cumulativeDelay = 0;
            noGoodDeedPhrases.forEach((phrase) => {
                setTimeout(() => {
                    const utterance = new SpeechSynthesisUtterance(phrase.text);
                    utterance.pitch = phrase.pitch;
                    utterance.rate = phrase.rate;
                    utterance.volume = 1.0;
                    
                    if (darkVoice) {
                        utterance.voice = darkVoice;
                    }
                    
                    speechSynthesis.speak(utterance);
                }, cumulativeDelay);
                
                cumulativeDelay += (phrase.text.length * 80) + phrase.pause;
            });
        }
        
        // Turn all emojis dark
        const allDogs = document.querySelectorAll('.dog');
        allDogs.forEach((dog) => {
            const dogEmoji = dog.querySelector('.dog-emoji');
            if (dogEmoji) {
                dogEmoji.textContent = '💀';
                dogEmoji.style.filter = 'grayscale(100%) hue-rotate(90deg)';
            }
        });
    }
    
    // Make Yes button glow green (Popular/Good)
    yesBtn.style.transform = 'scale(1.4)';
    yesBtn.style.animation = 'wickedGlow 0.5s ease-in-out infinite';
    yesBtn.style.boxShadow = '0 0 30px #22c55e, 0 0 60px #22c55e';
}

function makeDogsSad() {
    const allDogs = document.querySelectorAll('.dog');
    const sadEmojis = isWickedTheme ? wickedSadEmojis : sadDogEmojis;
    
    allDogs.forEach((dog, index) => {
        dog.classList.add('sad');
        // Change to sad dog emoji
        const dogEmoji = dog.querySelector('.dog-emoji');
        if (dogEmoji) {
            dogEmoji.textContent = sadEmojis[index % sadEmojis.length];
        }
    });
    
    warning.classList.add('show');
    sadOverlay.classList.remove('hidden');
    
    // Change background to darker
    document.body.style.background = 'linear-gradient(135deg, #94a3b8 0%, #64748b 50%, #475569 100%)';
}

function restoreDogs() {
    const allDogs = document.querySelectorAll('.dog');
    const happyEmojis = isWickedTheme ? wickedHappyEmojis : happyDogEmojis;
    
    allDogs.forEach((dog, index) => {
        dog.classList.remove('sad');
        // Change back to happy dog emoji
        const dogEmoji = dog.querySelector('.dog-emoji');
        if (dogEmoji) {
            dogEmoji.textContent = happyEmojis[index % happyEmojis.length];
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
    const celebrationEmojis = isWickedTheme ? ['💚', '✨', '🎭', '🌟', '💫', '🎪', '⭐', '🌈'] : happyDogEmojis;
    const celebrationCount = isWickedTheme ? 25 : 20;
    
    for (let i = 0; i < celebrationCount; i++) {
        const dog = document.createElement('div');
        dog.className = 'happy-dog';
        dog.textContent = celebrationEmojis[i % celebrationEmojis.length];
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

// NU-6 Hearing Test for Audiology Theme
const nu6Words = [
    'goal', 'day', 'jar', 'toe', 'tan',
    'sub', 'poor', 'nag', 'king', 'say',
    'mob', 'nice', 'food', 'voice', 'rath',
    'gap', 'bite', 'sheep', 'match', 'puff'
];

let currentTestWord = 0;
let testScore = 0;
let testWords = [];
let hasPassedTest = false;

function startHearingTest() {
    // Select 10 random words from NU-6 list
    testWords = [];
    const shuffled = [...nu6Words].sort(() => Math.random() - 0.5);
    testWords = shuffled.slice(0, 10);
    
    currentTestWord = 0;
    testScore = 0;
    hasPassedTest = false;
    
    const hearingTestOverlay = document.getElementById('hearingTest');
    hearingTestOverlay.classList.remove('hidden');
    
    document.getElementById('testScore').textContent = '0';
    document.getElementById('currentWord').textContent = '1';
    document.getElementById('progressFill').style.width = '0%';
    document.getElementById('testFeedback').textContent = '';
    document.getElementById('wordInput').value = '';
    document.getElementById('wordDisplay').textContent = 'Click to hear the word';
    
    setupTestControls();
}

function setupTestControls() {
    const playBtn = document.getElementById('playWordBtn');
    const submitBtn = document.getElementById('submitWordBtn');
    const wordInput = document.getElementById('wordInput');
    
    // Remove old listeners
    const newPlayBtn = playBtn.cloneNode(true);
    playBtn.parentNode.replaceChild(newPlayBtn, playBtn);
    const newSubmitBtn = submitBtn.cloneNode(true);
    submitBtn.parentNode.replaceChild(newSubmitBtn, submitBtn);
    
    // Play word with text-to-speech
    newPlayBtn.addEventListener('click', () => {
        if (currentTestWord < testWords.length) {
            const word = testWords[currentTestWord];
            
            if ('speechSynthesis' in window) {
                speechSynthesis.cancel(); // Stop any playing speech
                
                const utterance = new SpeechSynthesisUtterance(word);
                utterance.rate = 0.8;
                utterance.pitch = 1.0;
                utterance.volume = 1.0;
                
                speechSynthesis.speak(utterance);
                
                document.getElementById('wordDisplay').textContent = '🔊 Playing...';
                setTimeout(() => {
                    document.getElementById('wordDisplay').textContent = 'Type what you heard';
                }, 1000);
            }
        }
    });
    
    // Submit answer
    newSubmitBtn.addEventListener('click', checkAnswer);
    wordInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
}

function checkAnswer() {
    const wordInput = document.getElementById('wordInput');
    const userAnswer = wordInput.value.toLowerCase().trim();
    const correctWord = testWords[currentTestWord];
    const feedback = document.getElementById('testFeedback');
    
    if (!userAnswer) {
        feedback.textContent = '⚠️ Please type your answer';
        feedback.style.color = '#ff6b6b';
        return;
    }
    
    if (userAnswer === correctWord) {
        testScore++;
        feedback.textContent = '✅ Correct!';
        feedback.style.color = '#51cf66';
    } else {
        feedback.textContent = `❌ Incorrect. The word was "${correctWord}"`;
        feedback.style.color = '#ff6b6b';
    }
    
    document.getElementById('testScore').textContent = testScore;
    
    currentTestWord++;
    
    if (currentTestWord < testWords.length) {
        // Next word
        setTimeout(() => {
            document.getElementById('currentWord').textContent = currentTestWord + 1;
            document.getElementById('progressFill').style.width = ((currentTestWord / testWords.length) * 100) + '%';
            wordInput.value = '';
            feedback.textContent = '';
            document.getElementById('wordDisplay').textContent = 'Click to hear the word';
        }, 1500);
    } else {
        // Test complete
        setTimeout(() => {
            completeTest();
        }, 1500);
    }
}

function completeTest() {
    const feedback = document.getElementById('testFeedback');
    const hearingTestOverlay = document.getElementById('hearingTest');
    
    document.getElementById('progressFill').style.width = '100%';
    
    if (testScore >= 8) {
        // Passed - 80% or better
        hasPassedTest = true;
        feedback.innerHTML = `
            <h3 style="color: #51cf66;">🎉 Test Passed!</h3>
            <p>You got ${testScore}/10 correct (${testScore * 10}%)</p>
            <p>Your hearing is excellent! But maybe you should say YES instead? 💕</p>
        `;
        
        setTimeout(() => {
            hearingTestOverlay.classList.add('hidden');
            alert('You passed the hearing test! But are you sure you want to say No? 😢');
        }, 3000);
    } else {
        // Failed - must retake
        feedback.innerHTML = `
            <h3 style="color: #ff6b6b;">😢 Test Failed</h3>
            <p>You got ${testScore}/10 correct (${testScore * 10}%)</p>
            <p>You need 80% to pass. Let's try again with different words!</p>
        `;
        
        setTimeout(() => {
            startHearingTest();
        }, 3000);
    }
}

// Audiology theme: Hearing test before you can say No
function handleAudiologyNoClick() {
    if (!hasPassedTest) {
        startHearingTest();
        return;
    }
    
    // If test passed, proceed with sad response
    if (!dogsSad) {
        // First click - make emojis sad
        document.body.style.background = 'linear-gradient(135deg, #e3f2fd 0%, #90caf9 50%, #64b5f6 100%)';
        
        const allDogs = document.querySelectorAll('.dog');
        allDogs.forEach((dog) => {
            const dogEmoji = dog.querySelector('.dog-emoji');
            if (dogEmoji) {
                dogEmoji.textContent = audiologySadEmojis[Math.floor(Math.random() * audiologySadEmojis.length)];
            }
            const floatingDog = dog.querySelector('.floating-dog-emoji');
            if (floatingDog) {
                floatingDog.style.display = 'none';
            }
        });
        
        warning.classList.add('show');
        warning.textContent = '⚠️ The sounds are fading! Say yes to restore perfect hearing! ⚠️';
        sadOverlay.classList.remove('hidden');
        
        noBtn.innerHTML = `
            Still No? 🔇
            <span class="btn-subtitle">The silence is deafening...</span>
        `;
        
        dogsSad = true;
        
        // Play fading sound effect with speech
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance('The frequencies are dropping... I can barely hear you...');
            utterance.pitch = 0.7;
            utterance.rate = 0.7;
            utterance.volume = 0.5;
            speechSynthesis.speak(utterance);
        }
    } else {
        // Second click
        alert('🔇 The silence is deafening! Maybe you should say YES and restore the sound! 🎧💕');
        
        noBtn.innerHTML = `
            Complete Hearing Loss... 🙉
            <span class="btn-subtitle">Say YES!</span>
        `;
        
        const allDogs = document.querySelectorAll('.dog');
        allDogs.forEach((dog) => {
            const dogEmoji = dog.querySelector('.dog-emoji');
            if (dogEmoji) {
                dogEmoji.textContent = '🔇';
            }
        });
    }
    
    // Make Yes button stand out
    yesBtn.style.transform = 'scale(1.4)';
    yesBtn.style.animation = 'pulse 0.5s ease-in-out infinite';
}
