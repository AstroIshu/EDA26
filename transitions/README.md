# Universal Page Transition System

A lightweight, reusable page transition system for seamless navigation across your website.

## Features

- 🎭 Multiple transition types (fade, slide, scale, blur)
- ⚡ Easy integration with data attributes
- 🎨 Customizable duration and effects
- 📱 Responsive and smooth animations
- 🔧 Programmatic API for advanced usage

## Quick Setup

### 1. Include Files
Add these to the `<head>` of every page:

```html
<!-- Page Transition System -->
<link rel="stylesheet" href="./transitions/page-transition.css">
<script src="./transitions/page-transition.js"></script>
```

### 2. Basic Usage
Add `data-transition-url` to any clickable element:

```html
<!-- Simple fade transition -->
<a href="#" data-transition-url="./pages/about.html">About</a>

<!-- Custom transition type -->
<button data-transition-url="./pages/contact.html" 
        data-transition-type="slide-left">Contact</button>

<!-- Custom duration -->
<a href="#" data-transition-url="./pages/gallery.html" 
   data-transition-type="scale" 
   data-transition-duration="1000">Gallery</a>
```

## Transition Types

- `fade` - Simple opacity fade (default)
- `slide-left` - Slide content to the left
- `slide-right` - Slide content to the right  
- `slide-up` - Slide content upward
- `slide-down` - Slide content downward
- `scale` - Scale effect with opacity
- `blur` - Blur effect with opacity

## Programmatic Usage

### Navigate with transition
```javascript
// Simple navigation
PageTransition.transitionTo('./pages/about.html');

// With options
PageTransition.transitionTo('./pages/contact.html', {
    type: 'slide-left',
    duration: 1000,
    delay: 500
});
```

### Add transition to element
```javascript
const button = document.getElementById('myButton');
PageTransition.addTransitionToElement(button, './pages/gallery.html', {
    type: 'scale',
    duration: 800
});
```

### Configure defaults
```javascript
PageTransition.setDefaultTransition('slide-left');
PageTransition.setDefaultDuration(1000);
```

## Integration Examples

### Replace existing onClick handlers
**Before:**
```html
<button onclick="window.location.href='./pages/about.html'">About</button>
```

**After:**
```html
<button data-transition-url="./pages/about.html" 
        data-transition-type="fade">About</button>
```

### Update your current Enter button
**Before:**
```html
<a class="dazzle fluid" href="../3d/3dmain.html" id="enterButton">
    <span class="fluid">ENTER</span>
</a>
```

**After:**
```html
<a class="dazzle fluid" href="#" 
   data-transition-url="../3d/3dmain.html"
   data-transition-type="fade"
   data-transition-duration="1000"
   id="enterButton">
    <span class="fluid">ENTER</span>
</a>
```

## Customization

### Custom CSS
Override styles in your own CSS file:

```css
.page-transition-overlay {
    background: your-custom-gradient;
}

.transition-loader {
    border-top-color: your-brand-color;
}
```

### Custom JavaScript
Listen for transition events:

```javascript
document.addEventListener('click', (e) => {
    if (e.target.hasAttribute('data-transition-url')) {
        console.log('Page transition started!');
        // Your custom logic here
    }
});
```

## Browser Support

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 11+
- ✅ Edge 79+

## File Structure

```
transitions/
├── page-transition.css    # Transition styles
├── page-transition.js     # Transition logic
└── README.md             # This documentation
```