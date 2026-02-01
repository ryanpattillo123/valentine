// Simple client-side router for personalized Valentine pages
const routes = {
    'cassie': {
        name: 'Cassie',
        dogCount: 10,
        message: 'Hey Cassie! 💝',
        subtitle: 'These adorable dogs are hoping you\'ll be my Valentine!',
        yesText: 'Yes, I\'d love to! 💕',
        noText: 'Sorry...',
        celebrationText: 'Yay Cassie! You made the dogs so happy! 🎉'
    },
    'alex': {
        name: 'Alex',
        dogCount: 8,
        message: 'Hi Alex! 💝',
        subtitle: 'Will you make these puppies happy and be my Valentine?',
        yesText: 'Absolutely! 🥰',
        noText: 'I don\'t think so...',
        celebrationText: 'Alex said yes! The dogs are celebrating! 🎊'
    },
    'sam': {
        name: 'Sam',
        dogCount: 12,
        message: 'Sam! 💝',
        subtitle: 'These dogs need your help... will you be my Valentine?',
        yesText: 'Of course! 💖',
        noText: 'Maybe not...',
        celebrationText: 'Sam, you\'re the best! The dogs love you! 🐶💕'
    },
    'wicked': {
        name: 'Galentine',
        dogCount: 15,
        message: 'Would you be my Galentine? 💚✨',
        subtitle: 'Let\'s defy gravity together... For good! 🎭',
        yesText: 'Popular! 💚',
        noText: 'Wicked...',
        celebrationText: 'You\'re wonderful! We\'re dancing through life together! 💚✨🎭',
        theme: 'wicked',
        containerLabel: 'The magic awaits your answer...'
    }
};

// Get the person from URL path
function getPersonFromPath() {
    const path = window.location.pathname;
    console.log('DEBUG: Current path:', path);
    const match = path.match(/\/([^\/]+)/);
    console.log('DEBUG: Match:', match);
    if (match && match[1]) {
        const person = match[1].toLowerCase().replace('.html', '');
        console.log('DEBUG: Detected person:', person);
        return person;
    }
    console.log('DEBUG: No person detected, using default');
    return null;
}

// Get route config or default
function getRouteConfig() {
    const person = getPersonFromPath();
    console.log('DEBUG: Looking for route config for:', person);
    if (person && routes[person]) {
        console.log('DEBUG: Found route config:', routes[person]);
        return routes[person];
    }
    // Default config
    console.log('DEBUG: Using default config');
    return {
        name: 'Someone Special',
        dogCount: 8,
        message: 'Will you be my Valentine? 💝',
        subtitle: 'The dogs are counting on you...',
        yesText: 'YES! 🦴',
        noText: 'No 😢',
        celebrationText: 'YAAAY! 🎉💕🎊 You saved all the dogs! They\'re so happy! 🐕🦴'
    };
}

// Apply personalization to the page
function personalizePage() {
    const config = getRouteConfig();
    
    // Update title
    document.querySelector('.title').textContent = config.message;
    document.querySelector('.subtitle').textContent = config.subtitle;
    
    // Update buttons
    const yesBtn = document.getElementById('yesBtn');
    const noBtn = document.getElementById('noBtn');
    
    if (config.theme === 'wicked') {
        // Wicked theme customization
        yesBtn.innerHTML = `
            ${config.yesText}
            <span class="btn-subtitle">Choose good! 💚</span>
        `;
        yesBtn.classList.add('wicked-yes-btn');
        
        noBtn.innerHTML = `
            ${config.noText}
            <span class="btn-subtitle">Choose evil... 🖤</span>
        `;
        noBtn.classList.add('wicked-no-btn');
        
        // Apply Wicked theme to body
        document.body.classList.add('wicked-theme');
    } else {
        yesBtn.innerHTML = `
            ${config.yesText}
            <span class="btn-subtitle">Give all dogs treats!</span>
        `;
        
        noBtn.innerHTML = `
            ${config.noText}
            <span class="btn-subtitle">Take away their treats...</span>
        `;
    }
    
    // Update celebration message
    document.querySelector('.celebration-content p').textContent = config.celebrationText;
    
    // Create dogs with custom count
    window.initialDogCount = config.dogCount;
    window.wickedTheme = config.theme === 'wicked';
    
    // Update page title
    document.title = `Be My Valentine, ${config.name}? 🐶💝`;
}

// Initialize on page load
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', personalizePage);
} else {
    personalizePage();
}
