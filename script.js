function createStars() {
    const stars = document.getElementById('stars');
    const numberOfStars = 800; // Increased from 400 to 800 stars
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        // More varied star properties
        const size = Math.random() * 4; // Increased max size to 4px
        const twinkleDuration = 2 + Math.random() * 6; // More varied twinkle duration
        
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.opacity = 0.1 + Math.random() * 0.9; // Increased maximum opacity
        star.style.setProperty('--twinkle-duration', `${twinkleDuration}s`);
        
        stars.appendChild(star);
    }
}

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
    updateThemeIcon(savedTheme);
}

function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
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

// Initialize parallax effect for stars
function initStarParallax() {
    const stars = document.getElementById('stars');
    const starElements = document.querySelectorAll('.star');
    
    document.addEventListener('mousemove', (e) => {
        const mouseX = (e.clientX / window.innerWidth - 0.5) * 20;
        const mouseY = (e.clientY / window.innerHeight - 0.5) * 20;
        
        requestAnimationFrame(() => {
            starElements.forEach(star => {
                const depth = parseFloat(star.style.transform.match(/translateZ\((\d+)px\)/)[1]) / 100;
                const moveX = mouseX * depth;
                const moveY = mouseY * depth;
                star.style.transform = `translate(${moveX}px, ${moveY}px) translateZ(${depth * 100}px)`;
            });
        });
    });
}

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

document.addEventListener('DOMContentLoaded', () => {
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
    document.querySelector('.alert-close').addEventListener('click', () => {
        document.getElementById('custom-alert').classList.remove('show');
    });

    window.addEventListener('scroll', updateActiveNav); // Scroll event for active nav
    initializeTheme();
    animateSkills();
    setupTypingAnimation();
    initStarParallax();
    createStars();
});
