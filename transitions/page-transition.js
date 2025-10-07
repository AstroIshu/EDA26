/**
 * ========================================
 * UNIVERSAL PAGE TRANSITION SYSTEM
 * ========================================
 * 
 * Easy-to-use page transition system for seamless navigation
 * Supports fade, slide, scale, and blur transitions
 * 
 * Usage:
 * 1. Include the CSS and JS files in your HTML
 * 2. Call PageTransition.init() when page loads
 * 3. Use data-transition attributes or call methods directly
 */

class PageTransitionSystem {
    constructor() {
        this.isTransitioning = false;
        this.overlay = null;
        this.defaultDuration = 800; // milliseconds
        this.transitionType = 'fade'; // default transition type
        
        this.init();
    }

    /**
     * Initialize the transition system
     */
    init() {
        this.createOverlay();
        this.bindEvents();
        this.handlePageLoad();
        console.log('🎬 Page Transition System initialized!');
    }

    /**
     * Create the transition overlay
     */
    createOverlay() {
        this.overlay = document.createElement('div');
        this.overlay.className = 'page-transition-overlay';
        this.overlay.innerHTML = `
            <div class="transition-loader"></div>
        `;
        document.body.appendChild(this.overlay);
    }

    /**
     * Bind click events to elements with transition attributes
     */
    bindEvents() {
        document.addEventListener('click', (e) => {
            const element = e.target.closest('[data-transition-url]');
            if (element && !this.isTransitioning) {
                e.preventDefault();
                
                const url = element.getAttribute('data-transition-url');
                const type = element.getAttribute('data-transition-type') || this.transitionType;
                const duration = parseInt(element.getAttribute('data-transition-duration')) || this.defaultDuration;
                
                this.navigateWithTransition(url, type, duration);
            }
        });
    }

    /**
     * Handle page load fade-in
     */
    handlePageLoad() {
        // Add fade-in class to body or main content
        const body = document.body;
        const mainContent = document.querySelector('main, .main-content, #mainContent, .container');
        
        if (mainContent) {
            mainContent.classList.add('fade-in-transition');
            // Trigger fade-in after a short delay
            setTimeout(() => {
                mainContent.classList.add('active');
            }, 100);
        } else {
            body.classList.add('fade-in-transition');
            setTimeout(() => {
                body.classList.add('active');
            }, 100);
        }
    }

    /**
     * Navigate to URL with transition effect
     * @param {string} url - Target URL
     * @param {string} type - Transition type (fade, slide, scale, blur)
     * @param {number} duration - Transition duration in milliseconds
     */
    navigateWithTransition(url, type = 'fade', duration = this.defaultDuration) {
        if (this.isTransitioning) return;
        
        this.isTransitioning = true;
        console.log(`🚀 Transitioning to ${url} with ${type} effect`);

        // Step 1: Fade out current content
        this.fadeOutCurrentPage(type, duration);

        // Step 2: Show overlay
        setTimeout(() => {
            this.overlay.classList.add('active');
        }, duration * 0.3);

        // Step 3: Navigate to new page
        setTimeout(() => {
            window.location.href = url;
        }, duration);
    }

    /**
     * Fade out current page content
     * @param {string} type - Transition type
     * @param {number} duration - Duration in milliseconds
     */
    fadeOutCurrentPage(type, duration) {
        const elements = this.getPageElements();
        
        elements.forEach((element, index) => {
            setTimeout(() => {
                switch(type) {
                    case 'slide-left':
                        element.classList.add('slide-transition', 'slide-left');
                        break;
                    case 'slide-right':
                        element.classList.add('slide-transition', 'slide-right');
                        break;
                    case 'slide-up':
                        element.classList.add('slide-transition', 'slide-up');
                        break;
                    case 'slide-down':
                        element.classList.add('slide-transition', 'slide-down');
                        break;
                    case 'scale':
                        element.classList.add('scale-transition');
                        break;
                    case 'blur':
                        element.classList.add('blur-transition');
                        break;
                    case 'fade':
                    default:
                        element.classList.add('fade-out-transition');
                        break;
                }
            }, index * 50); // Stagger the animations
        });
    }

    /**
     * Get main page elements for transition
     * @returns {Array} Array of DOM elements
     */
    getPageElements() {
        // Try to find main content containers
        const selectors = [
            '.main-content',
            '#mainContent',
            '.container:not(.page-transition-overlay)',
            'main',
            'header',
            'nav',
            '.title-container',
            '.marquee-container',
            '.content'
        ];

        const elements = [];
        selectors.forEach(selector => {
            const found = document.querySelectorAll(selector);
            found.forEach(el => {
                if (!elements.includes(el) && el !== this.overlay) {
                    elements.push(el);
                }
            });
        });

        // If no specific elements found, use direct children of body
        if (elements.length === 0) {
            const bodyChildren = Array.from(document.body.children);
            bodyChildren.forEach(child => {
                if (child !== this.overlay && !child.classList.contains('page-transition-overlay')) {
                    elements.push(child);
                }
            });
        }

        return elements;
    }

    /**
     * Manually trigger transition to URL
     * @param {string} url - Target URL
     * @param {object} options - Transition options
     */
    transitionTo(url, options = {}) {
        const {
            type = 'fade',
            duration = this.defaultDuration,
            delay = 0
        } = options;

        setTimeout(() => {
            this.navigateWithTransition(url, type, duration);
        }, delay);
    }

    /**
     * Add transition to specific element
     * @param {HTMLElement} element - Element to add transition to
     * @param {string} url - Target URL
     * @param {object} options - Transition options
     */
    addTransitionToElement(element, url, options = {}) {
        const {
            type = 'fade',
            duration = this.defaultDuration
        } = options;

        element.setAttribute('data-transition-url', url);
        element.setAttribute('data-transition-type', type);
        element.setAttribute('data-transition-duration', duration);
    }

    /**
     * Set default transition type
     * @param {string} type - Default transition type
     */
    setDefaultTransition(type) {
        this.transitionType = type;
    }

    /**
     * Set default duration
     * @param {number} duration - Default duration in milliseconds
     */
    setDefaultDuration(duration) {
        this.defaultDuration = duration;
    }
}

// Create global instance
const PageTransition = new PageTransitionSystem();

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = PageTransitionSystem;
}

// Make available globally
window.PageTransition = PageTransition;

console.log('%c🎭 Universal Page Transition System Loaded!', 'color: #4584b4; font-size: 14px; font-weight: bold;');
console.log('%c📖 Usage: Add data-transition-url="path" to any clickable element', 'color: white; font-size: 12px;');