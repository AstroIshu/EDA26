// Dynamic Island Scroll Behavior with Debounce
const dynamicIsland = document.getElementById("dynamic-island");
const section = document.querySelector(".section");

let lastScrollPosition = 0;
let ticking = false;

function handleScroll() {
    const scrollPosition = window.scrollY;
    if (scrollPosition > 50) {
        dynamicIsland.classList.add("shrunk");
        if (section) {
            section.classList.add("padded");
        }
    } else {
        dynamicIsland.classList.remove("shrunk");
        if (section) {
            section.classList.remove("padded");
        }
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

// Carousel Scroll Buttons and Markers
document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const leftBtn = document.querySelector('.scroll-btn.left');
    const rightBtn = document.querySelector('.scroll-btn.right');
    const markerGroup = document.querySelector('.scroll-marker-group');
    const slides = document.querySelectorAll('.carousel-item');

    // Check if all elements exist
    if (!carousel || !leftBtn || !rightBtn || !markerGroup) {
        console.warn('Carousel elements not found');
        return;
    }

    // Dynamically add markers based on number of slides
    slides.forEach((slide, index) => {
        const marker = document.createElement('div');
        marker.classList.add('scroll-marker');
        marker.setAttribute('data-slide', index);
        markerGroup.appendChild(marker);
    });

    // Update button states
    const updateButtons = () => {
        const isAtStart = carousel.scrollLeft <= 0;
        const isAtEnd = carousel.scrollLeft >= (carousel.scrollWidth - carousel.clientWidth - 1);
        
        leftBtn.disabled = isAtStart;
        rightBtn.disabled = isAtEnd;
        
        // Update button visibility based on state
        leftBtn.style.opacity = isAtStart ? '0.3' : '1';
        rightBtn.style.opacity = isAtEnd ? '0.3' : '1';
    };

    // Scroll to specific slide
    const scrollToSlide = (slideIndex) => {
        const slideWidth = carousel.clientWidth;
        carousel.scrollTo({
            left: slideIndex * slideWidth,
            behavior: 'smooth'
        });
    };

    // Event listeners for buttons
    leftBtn.addEventListener('click', () => {
        carousel.scrollBy({ 
            left: -carousel.clientWidth, 
            behavior: 'smooth' 
        });
    });

    rightBtn.addEventListener('click', () => {
        carousel.scrollBy({ 
            left: carousel.clientWidth, 
            behavior: 'smooth' 
        });
    });

    // Event listeners for markers
    const markers = markerGroup.querySelectorAll('.scroll-marker');
    markers.forEach((marker, index) => {
        marker.addEventListener('click', () => {
            scrollToSlide(index);
        });
        
        // Add pointer cursor
        marker.style.cursor = 'pointer';
    });

    // Listen for scroll to update buttons and active marker
    carousel.addEventListener('scroll', () => {
        updateButtons();
        
        // Update active marker
        const currentSlide = Math.round(carousel.scrollLeft / carousel.clientWidth);
        markers.forEach((marker, index) => {
            if (index === currentSlide) {
                marker.classList.add('active');
            } else {
                marker.classList.remove('active');
            }
        });
    });

    // Handle keyboard navigation
    carousel.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            e.preventDefault();
            leftBtn.click();
        } else if (e.key === 'ArrowRight') {
            e.preventDefault();
            rightBtn.click();
        }
    });

    // Initial update
    updateButtons();
    
    // Set initial active marker
    const firstMarker = markerGroup.querySelector('.scroll-marker');
    if (firstMarker) {
        firstMarker.classList.add('active');
    }

    console.log('Carousel initialized successfully');
});