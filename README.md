# Website Project

A modern, responsive website built with HTML, CSS, and JavaScript.

## 📁 Project Structure

```
EDA26/
├── index.html          # Main HTML file
├── css/
│   ├── style.css       # Main stylesheet
│   └── responsive.css  # Responsive design styles
├── js/
│   └── script.js       # Main JavaScript functionality
├── images/             # Image assets
├── assets/             # Other assets (icons, favicon, etc.)
├── pages/              # Additional HTML pages
└── README.md          # Project documentation
```

## 🚀 Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Modern CSS**: Uses CSS Grid, Flexbox, and CSS variables
- **Interactive Navigation**: Smooth scrolling and mobile hamburger menu
- **Contact Form**: Functional contact form with validation
- **Animations**: Smooth animations and transitions
- **SEO Friendly**: Proper meta tags and semantic HTML
- **Cross-browser Compatible**: Works on all modern browsers

## 🛠️ Technologies Used

- **HTML5**: Semantic markup and accessibility features
- **CSS3**: Modern styling with Grid, Flexbox, and animations
- **JavaScript ES6+**: Modern JavaScript with async/await and modules
- **Responsive Design**: Mobile-first approach

## 📱 Responsive Breakpoints

- **Desktop**: 1200px and above
- **Tablet**: 768px to 1199px
- **Mobile**: 480px to 767px
- **Small Mobile**: 320px to 479px

## 🎨 Color Scheme

- **Primary**: #007bff (Blue)
- **Secondary**: #0056b3 (Dark Blue)
- **Success**: #28a745 (Green)
- **Error**: #dc3545 (Red)
- **Background**: #fff (White)
- **Text**: #333 (Dark Gray)
- **Light Background**: #f8f9fa (Light Gray)

## 📦 Getting Started

1. **Clone or download** the project files
2. **Open** `index.html` in your web browser
3. **Start customizing** the content, styles, and functionality

### Development Setup

For development, you can use any local server. Here are a few options:

#### Using Python (if installed):
```bash
# Python 3
python -m http.server 8000

# Python 2
python -m SimpleHTTPServer 8000
```

#### Using Node.js (if installed):
```bash
# Install a simple server globally
npm install -g http-server

# Run the server
http-server -p 8000
```

#### Using VS Code Live Server extension:
1. Install the "Live Server" extension
2. Right-click on `index.html`
3. Select "Open with Live Server"

## 🎯 Customization Guide

### Changing Colors
Edit the color values in `css/style.css`:
```css
/* Update these values to change the color scheme */
:root {
    --primary-color: #007bff;
    --secondary-color: #0056b3;
    /* Add more CSS variables as needed */
}
```

### Adding New Sections
1. Add the HTML structure to `index.html`
2. Add corresponding styles to `css/style.css`
3. Update navigation links if needed

### Customizing JavaScript
The main functionality is in `js/script.js`:
- **Navigation**: Mobile menu and smooth scrolling
- **Form handling**: Contact form validation and submission
- **Animations**: Scroll-triggered animations
- **Utilities**: Helper functions for common tasks

## 📄 File Descriptions

### HTML Files
- `index.html`: Main landing page with all sections

### CSS Files
- `css/style.css`: Main stylesheet with all component styles
- `css/responsive.css`: Media queries for responsive design

### JavaScript Files
- `js/script.js`: Main functionality including navigation, forms, and animations

### Directories
- `images/`: Store your image files here
- `assets/`: Store icons, favicon, fonts, and other assets
- `pages/`: Additional HTML pages (if needed)

## 🔧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Internet Explorer 11+ (limited support)

## 📝 To-Do / Future Enhancements

- [ ] Add favicon and app icons
- [ ] Implement actual form backend
- [ ] Add more page templates
- [ ] Integrate with CMS
- [ ] Add blog functionality
- [ ] Implement dark mode
- [ ] Add more animations
- [ ] Optimize for better performance
- [ ] Add PWA features

## 📧 Contact Form Backend

The contact form currently shows a simulation. To make it functional, you'll need to:

1. **Create a backend endpoint** (Node.js, PHP, Python, etc.)
2. **Update the JavaScript** to send real requests
3. **Add proper error handling**
4. **Implement spam protection**

Example backend integration:
```javascript
// Replace the simulation in script.js with:
fetch('/api/contact', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name, email, message })
})
.then(response => response.json())
.then(data => {
    showNotification('Message sent successfully!', 'success');
    contactForm.reset();
})
.catch(error => {
    showNotification('Error sending message. Please try again.', 'error');
});
```

## 🎓 Learning Resources

- [MDN Web Docs](https://developer.mozilla.org/)
- [CSS-Tricks](https://css-tricks.com/)
- [JavaScript.info](https://javascript.info/)
- [W3Schools](https://www.w3schools.com/)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and submit pull requests for any improvements.

---

**Happy coding!** 🎉