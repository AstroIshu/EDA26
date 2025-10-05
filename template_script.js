// Dynamic Island Scroll Behavior
const dynamicIsland = document.getElementById("dynamic-island");
const section = document.querySelector(".section");

let lastScrollPosition = 0;
let ticking = false;

function handleScroll() {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
        dynamicIsland.classList.add("shrunk");
        section.classList.add("padded");
    } else {
        dynamicIsland.classList.remove("shrunk");
        section.classList.remove("padded");
    }
    lastScrollPosition = scrollPosition;
    ticking = false;
}

window.addEventListener("scroll", () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            handleScroll();
            ticking = false;
        });
        ticking = true;
    }
});

// Loader with Music Integration
document.addEventListener('DOMContentLoaded', () => {
    const loader = document.querySelector('.loader');
    const container = document.querySelector('.container');
    const backgroundMusic = document.getElementById('background-music');

    // Ensure animation plays for at least 2 seconds
    const minimumLoadTime = 2000;
    const loadStartTime = performance.now();

    // Music state management
    let isMusicPlaying = false;
    let userInteracted = false;

    // Function to handle music playback
    function toggleMusic(play) {
        if (!backgroundMusic) return;

        try {
            if (play) {
                backgroundMusic.volume = 0.3; // Set lower volume
                const playPromise = backgroundMusic.play();

                if (playPromise !== undefined) {
                    playPromise.catch(error => {
                        console.log('Autoplay prevented:', error);
                    });
                }
                isMusicPlaying = true;
            } else {
                backgroundMusic.pause();
                isMusicPlaying = false;
            }
        } catch (error) {
            console.error('Music error:', error);
        }
    }

    // Try to start music after user interaction
    function handleFirstInteraction() {
        if (!userInteracted) {
            userInteracted = true;
            toggleMusic(true);
        }
    }

    // Add interaction listeners for music
    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    window.addEventListener('load', () => {
        const elapsedTime = performance.now() - loadStartTime;
        const remainingTime = Math.max(0, minimumLoadTime - elapsedTime);

        // Wait for minimum time before hiding loader
        setTimeout(() => {
            loader.style.opacity = '0';
            container.classList.add('loaded');

            // Try to start music (will only work if user has interacted)
            toggleMusic(true);

            // Remove loader from DOM after fade out
            setTimeout(() => {
                loader.remove();
            }, 1000);
        }, remainingTime);
    });
});

// Starfield Background
const canvas = document.getElementById('starfield');

if (canvas) {
    const ctx = canvas.getContext('2d');
    let stars = [];

    function initStarfield() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        stars = [];
        
        // Different star shapes
        const shapes = ['rect', 'cross', 'square'];
        
        for (let i = 0; i < 150; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                size: Math.random() * 2 + 1,
                speed: Math.random() * 0.1 + 0.05,
                shape: shapes[Math.floor(Math.random() * shapes.length)],
                opacity: Math.random() * 0.5 + 0.5,
                flicker: Math.random() > 0.7 // Some stars will flicker
            });
        }
    }

    function drawStarfield() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            // Set star color with opacity (greenish tint)
            ctx.fillStyle = `rgba(132, 176, 103, ${star.flicker ? Math.abs(Math.sin(Date.now() * 0.002)) : star.opacity})`;
            
            // Draw different star shapes
            if (star.shape === 'rect') {
                ctx.fillRect(star.x, star.y, star.size, star.size);
            } else if (star.shape === 'cross') {
                ctx.beginPath();
                ctx.moveTo(star.x - star.size, star.y);
                ctx.lineTo(star.x + star.size, star.y);
                ctx.moveTo(star.x, star.y - star.size);
                ctx.lineTo(star.x, star.y + star.size);
                ctx.strokeStyle = ctx.fillStyle;
                ctx.stroke();
            } else if (star.shape === 'square') {
                ctx.fillRect(star.x - star.size / 2, star.y - star.size / 2, star.size, star.size);
            }
            
            // Move star to the left
            star.x -= star.speed;
            
            // Reset star to right side when it goes off screen
            if (star.x < 0) star.x = canvas.width;
        });
        
        requestAnimationFrame(drawStarfield);
    }

    // Initialize and start animation
    initStarfield();
    drawStarfield();

    // Handle window resize
    window.addEventListener('resize', () => {
        initStarfield();
    });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add click effects to buttons
document.querySelectorAll('.buttons a').forEach(button => {
    button.addEventListener('click', function() {
        this.style.transform = 'scale(0.95)';
        setTimeout(() => {
            this.style.transform = '';
        }, 150);
    });
});

// Console welcome message
console.log(`
╔══════════════════════════════════════╗
║        Welcome to EDA26 Template     ║
║     Built with ❤️ by AstroIshu       ║
╚══════════════════════════════════════╝
`);

// Export functions for external use (if needed)
window.TemplateUtils = {
    toggleMusic: (backgroundMusic && typeof toggleMusic !== 'undefined') ? toggleMusic : null,
    handleScroll: handleScroll,
    initStarfield: (canvas && typeof initStarfield !== 'undefined') ? initStarfield : null
};