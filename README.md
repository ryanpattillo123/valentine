# Valentine's Day Website 💝🐶

A fun, interactive Valentine's Day website where dogs help you ask someone to be your Valentine!

## Features

- 🐕 Animated dog emojis that bounce and float
- 💔 Dogs become sad when you click "No"
- 🎉 Celebration animation when you click "Yes"
- 📱 Fully responsive and mobile-friendly
- 🎯 Personalized pages for different people

## Personalized Pages

The website supports custom pages for different people. Each person gets their own personalized experience!

### How to Use

1. **Main page**: `index.html` - Generic Valentine's page
2. **Cassie's page**: `cassie.html` - 10 dogs, custom message
3. **Alex's page**: `alex.html` - 8 dogs, custom message
4. **Sam's page**: `sam.html` - 12 dogs, custom message

### Adding New People

To add a new person, edit `router.js` and add a new entry:

```javascript
'newname': {
    name: 'New Name',
    dogCount: 8,
    message: 'Hey New Name! 💝',
    subtitle: 'Custom subtitle here!',
    yesText: 'Yes!',
    noText: 'No...',
    celebrationText: 'Yay! Custom celebration message!'
}
```

Then create a new HTML file: `newname.html` (copy from any existing person's HTML file).

## Running Locally

```bash
cd /Users/ryanpattillo/Documents/valentine
python3 -m http.server 8000
```

Then open:
- http://localhost:8000 (main page)
- http://localhost:8000/cassie.html (Cassie's page)
- http://localhost:8000/alex.html (Alex's page)
- http://localhost:8000/sam.html (Sam's page)

## Files

- `index.html` - Main page
- `styles.css` - All styling and animations
- `script.js` - Main functionality (dogs, buttons, animations)
- `router.js` - Personalization routing system
- `[name].html` - Individual personalized pages
