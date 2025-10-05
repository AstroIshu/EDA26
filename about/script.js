// Wait for GSAP plugins to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize SplitText for the paragraph in text-block
    const st = SplitText.create(".text-block p", { type: "chars", charsClass: "char" });

    // Set data-content attribute for each character
    st.chars.forEach((char) => {
        gsap.set(char, { attr: { "data-content": char.innerHTML } });
    });

    // Get the text block container
    const textBlock = document.querySelector(".text-block");

    // Add pointer move event listener for scramble effect
    if (textBlock) {
        textBlock.onpointermove = (e) => {
            st.chars.forEach((char) => {
                const rect = char.getBoundingClientRect();
                const cx = rect.left + rect.width / 2;
                const cy = rect.top + rect.height / 2;
                const dx = e.clientX - cx;
                const dy = e.clientY - cy;
                const dist = Math.sqrt(dx * dx + dy * dy);
                
                if (dist < 100) {
                    gsap.to(char, {
                        overwrite: true,
                        duration: 1.2 - dist / 100,
                        scrambleText: {
                            text: char.dataset.content,
                            chars: ".:",
                            speed: 0.5,
                        },
                        ease: 'none'
                    });
                }
            });
        };
    }

    // Timeline animations
    gsap.registerPlugin(ScrollTrigger);

    // Animate timeline items as they come into view
    gsap.from(".timeline-item", {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".timeline-section",
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    // Animate individual timeline articles
    gsap.from("article", {
        x: -30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".timeline-section",
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    // Animate dots and lines
    gsap.from(".dot", {
        scale: 0,
        duration: 0.4,
        stagger: 0.05,
        ease: "back.out(1.7)",
        scrollTrigger: {
            trigger: ".timeline-section",
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    gsap.from(".line", {
        scaleY: 0,
        transformOrigin: "top",
        duration: 0.6,
        stagger: 0.05,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".timeline-section",
            start: "top 70%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
        }
    });

    // Animate text-block on scroll
    gsap.from(".text-block", {
        y: 30,
        opacity: 0,
        duration: 1,
        ease: "power2.out",
        scrollTrigger: {
            trigger: ".text-block",
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });

    console.log('About page animations loaded');
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
