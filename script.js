// Simple function to create stars that will definitely work
function createSimpleStars() {
    const starsContainer = document.getElementById('stars');
    
    // Clear any existing stars
    if (starsContainer) {
        starsContainer.innerHTML = '';
        
        // Create 300 stars - a good number for performance and aesthetics
        const starCount = 300;
        
        for (let i = 0; i < starCount; i++) {
            // Create star element
            const star = document.createElement('div');
            
            // Random star size class
            const sizeRandom = Math.random();
            if (sizeRandom < 0.6) {
                star.classList.add('star', 'small');
            } else if (sizeRandom < 0.9) {
                star.classList.add('star', 'medium');
            } else {
                star.classList.add('star', 'large');
            }
            
            // Random position
            star.style.left = `${Math.random() * 100}%`;
            star.style.top = `${Math.random() * 100}%`;
            
            // Random twinkling animation
            const twinkleClass = Math.random() < 0.33 ? 'twinkle-1' : 
                               Math.random() < 0.66 ? 'twinkle-2' : 'twinkle-3';
            star.classList.add(twinkleClass);
            
            // Add random animation delay
            star.style.animationDelay = `${Math.random() * 5}s`;
            
            // Add to container
            starsContainer.appendChild(star);
        }
    }
}

// Function to create shooting stars
function createShootingStars() {
    const starsContainer = document.getElementById('stars');
    
    if (starsContainer) {
        // Create a few shooting stars (not too many)
        const shootingStarCount = 6;
        
        for (let i = 0; i < shootingStarCount; i++) {
            setTimeout(() => {
                // Create shooting star element
                const shootingStar = document.createElement('div');
                shootingStar.className = 'shooting-star';
                
                // Set random position at top of screen
                const startX = Math.random() * window.innerWidth;
                const startY = Math.random() * (window.innerHeight / 3); // Start in top third
                
                shootingStar.style.left = `${startX}px`;
                shootingStar.style.top = `${startY}px`;
                
                // Set CSS variables for animation
                const angle = Math.random() * 60 - 30; // -30 to 30 degrees
                const duration = 1 + Math.random() * 2; // 1-3 seconds
                const delay = Math.random() * 15; // 0-15 second delay
                const tailLength = 50 + Math.random() * 100; // 50-150px
                const starLength = tailLength * (0.5 + Math.random() * 0.5); // 50-100% of tail
                const travelDistance = Math.max(window.innerWidth, window.innerHeight);
                const travelDistanceY = travelDistance * Math.tan(angle * Math.PI / 180);
                
                shootingStar.style.setProperty('--angle', `${angle}deg`);
                shootingStar.style.setProperty('--duration', `${duration}s`);
                shootingStar.style.setProperty('--delay', `${delay}s`);
                shootingStar.style.setProperty('--tail-length', `${tailLength}px`);
                shootingStar.style.setProperty('--star-length', `${starLength}px`);
                shootingStar.style.setProperty('--travel-distance', `${travelDistance}px`);
                shootingStar.style.setProperty('--travel-distance-y', `${travelDistanceY}px`);
                
                // Add to container
                starsContainer.appendChild(shootingStar);
                
                // Remove after animation completes
                setTimeout(() => {
                    shootingStar.remove();
                    // Create a new star to replace this one
                    createShootingStars();
                }, (duration + delay) * 1000);
                
            }, i * 3000); // Stagger creation every 3 seconds
        }
    }
}

// Call on page load
document.addEventListener('DOMContentLoaded', function() {
    // Call our stars function
    createSimpleStars();
    
    // Remove shooting stars
    // createShootingStars(); 
    
    // Type out name animation
    typeOutName();
    
    // Rest of your existing DOMContentLoaded code...
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (navToggle && navLinks) {
        navToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            navToggle.querySelector('i').classList.toggle('fa-bars');
            navToggle.querySelector('i').classList.toggle('fa-times');
        });

        // Close menu when clicking a link
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                navToggle.querySelector('i').classList.add('fa-bars');
                navToggle.querySelector('i').classList.remove('fa-times');
            });
        });
    }

    // Close alert button
    const alertCloseButton = document.querySelector('.alert-close');
    if (alertCloseButton) {
        alertCloseButton.addEventListener('click', () => {
            document.getElementById('custom-alert').classList.remove('show');
        });
    }

    window.addEventListener('scroll', updateActiveNav); // Scroll event for active nav
    initializeTheme();
    animateSkills();
    setupTypingAnimation();
    initStarParallax();
    
    // Optional: add parallax effect to stars
    if (window.matchMedia('(min-width: 768px)').matches) {
        document.addEventListener('mousemove', (e) => {
            const stars = document.querySelectorAll('.star');
            const mouseX = e.clientX / window.innerWidth - 0.5;
            const mouseY = e.clientY / window.innerHeight - 0.5;
            
            stars.forEach((star, index) => {
                // Make some stars move more than others
                const depth = index % 5 === 0 ? 0.05 : 
                             index % 3 === 0 ? 0.04 : 
                             index % 2 === 0 ? 0.03 : 0.02;
                
                const moveX = mouseX * depth * window.innerWidth;
                const moveY = mouseY * depth * window.innerHeight;
                
                star.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    }
});

// Smooth scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
});

// Theme toggle
const themeToggle = document.getElementById('theme-toggle');

// Enhanced theme toggle with localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Check if themeToggle exists before calling updateThemeIcon
    if (themeToggle) {
        updateThemeIcon(savedTheme);
    }
}

function updateThemeIcon(theme) {
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');
    if (icon) {
        icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    }
}

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });
}

// Active navigation highlight
function updateActiveNav() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 150) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// Custom alert function
function showCustomAlert(message, type = 'success') {
    const alert = document.getElementById('custom-alert');
    if (!alert) return;
    
    const messageEl = alert.querySelector('.alert-message');
    const icon = alert.querySelector('.alert-icon');
    
    messageEl.textContent = message;
    icon.className = `alert-icon fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}`;
    
    alert.classList.add('show');
    setTimeout(() => alert.classList.remove('show'), 5000);
}

// Email configuration
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

// Updated email sending function
async function sendEmail(formData) {
    try {
        const templateParams = {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_name: "Oyindamola Heritage Ajala",
            reply_to: formData.email
        };

        const response = await emailjs.send(
            EMAILJS_SERVICE_ID,
            EMAILJS_TEMPLATE_ID,
            templateParams,
            EMAILJS_PUBLIC_KEY
        );

        if (response.status === 200) {
            showCustomAlert('Message sent successfully! I will get back to you soon.', 'success');
        } else {
            throw new Error('Failed to send message');
        }
    } catch (error) {
        console.error('Email error:', error);
        showCustomAlert('Failed to send message. Please try again.', 'error');
    }
}

// Enhanced typing animation
function setupTypingAnimation() {
    const texts = document.querySelectorAll('.typing-text span');
    if (texts.length === 0) return;
    
    let currentIndex = 0;
    
    function updateText() {
        texts.forEach(text => text.classList.remove('active'));
        texts[currentIndex].classList.add('active');
        currentIndex = (currentIndex + 1) % texts.length;
    }
    
    updateText();
    setInterval(updateText, 3000);
}

// Enhanced contact form handling with loading state
const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const submitBtn = e.target.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        
        try {
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };
            
            await sendEmail(formData);
            e.target.reset();
        } catch (error) {
            console.error('Form submission error:', error);
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
    });
}

// Update skill animation
function animateSkills() {
    const skillItems = document.querySelectorAll('.skill-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.3 });
    
    skillItems.forEach(item => observer.observe(item));
}

// Add scroll reveal animation
const scrollReveal = ScrollReveal({
    distance: '50px',
    duration: 1500,
    easing: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)'
});

scrollReveal.reveal('.skill-category', {
    interval: 100,
    origin: 'bottom'
});

scrollReveal.reveal('.footer-section', {
    interval: 100,
    origin: 'bottom'
});

scrollReveal.reveal('#experience', {
    delay: 200,
    origin: 'bottom',
    distance: '50px',
    duration: 1000,
    easing: 'ease-in-out'
});

scrollReveal.reveal('.timeline-item', {
    interval: 200,
    origin: 'bottom',
    distance: '50px',
    duration: 1000,
    easing: 'ease-in-out'
});

// Initialize parallax effect for stars - Fixed version
function initStarParallax() {
    const stars = document.getElementById('stars');
    if (!stars) return;
    
    const starElements = document.querySelectorAll('.star');
    if (starElements.length === 0) return;
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        
        requestAnimationFrame(() => {
            starElements.forEach((star, index) => {
                // Use index to create different depths
                const depth = (index % 10) / 100 + 0.02;
                const moveX = mouseX * depth;
                const moveY = mouseY * depth;
                star.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
        });
    });
}

// Type out name with animation
function typeOutName() {
    const nameElement = document.querySelector('.typing-name');
    const cursorElement = document.querySelector('.typing-cursor');
    
    if (!nameElement || !cursorElement) return;
    
    const firstName = "Oyindamola";
    const lastName = "Àjàlá";
    let i = 0;
    let isTypingLastName = false;
    
    // Clear any existing content
    nameElement.textContent = '';
    
    // Make cursor visible
    cursorElement.style.opacity = '1';
    
    // Prepare the container to accommodate two lines
    nameElement.parentElement.style.minHeight = '7rem';
    nameElement.style.width = '100%';
    nameElement.style.textAlign = 'center';
    
    // Create separate spans for the first name, last name, and cursor
    const firstNameSpan = document.createElement('div');
    firstNameSpan.style.display = 'block';
    nameElement.appendChild(firstNameSpan);
    
    const lastNameSpan = document.createElement('div');
    lastNameSpan.style.display = 'block';
    nameElement.appendChild(lastNameSpan);
    
    // Type effect
    function typeLetter() {
        if (!isTypingLastName && i < firstName.length) {
            // Add the next letter of first name
            firstNameSpan.textContent = firstName.substring(0, i + 1);
            // Position cursor after the last typed character
            firstNameSpan.appendChild(cursorElement);
            i++;
            setTimeout(typeLetter, 150);
        } 
        else if (!isTypingLastName && i === firstName.length) {
            // First name is done, move to last name
            isTypingLastName = true;
            i = 0;
            setTimeout(typeLetter, 400); // Slightly longer pause before last name
        }
        else if (isTypingLastName && i < lastName.length) {
            // Add the next letter of last name
            lastNameSpan.textContent = lastName.substring(0, i + 1);
            // Position cursor after the last typed character
            lastNameSpan.appendChild(cursorElement);
            i++;
            setTimeout(typeLetter, 150);
        } 
        else {
            // When typing complete, keep cursor blinking
            cursorElement.style.animation = 'blink 0.7s infinite';
        }
    }
    
    // Start typing after a brief delay
    setTimeout(typeLetter, 800);
}
