
// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Animasi skill bars saat scroll
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    skillBars.forEach(bar => {
        const level = bar.getAttribute('data-level');
        bar.style.width = level + '%';
    });
}

// Intersection Observer untuk animasi saat scroll
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            if (entry.target.classList.contains('skills')) {
                animateSkillBars();
            }
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observe sections untuk animasi
document.querySelectorAll('section').forEach(section => {
    observer.observe(section);
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Simulasi pengiriman form
        const formData = new FormData(this);
        const formObject = Object.fromEntries(formData);
        
        // Tampilkan pesan sukses
        alert('Pesan berhasil dikirim! Terima kasih telah menghubungi saya.');
        this.reset();
    });
}

// Animasi typing effect untuk hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    type();
}

// Jalankan typing effect saat halaman dimuat
document.addEventListener('DOMContentLoaded', function() {
    // Inisialisasi skill bars
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
    
});

// Handle resize event untuk responsive design
window.addEventListener('resize', function() {
    if (window.innerWidth > 768) {
        navMenu.classList.remove('active');
    }
});

// Tambahkan class animasi untuk elements saat scroll
function checkScroll() {
    const elements = document.querySelectorAll('.project-card, .timeline-content, .skill-category');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementBottom = element.getBoundingClientRect().bottom;
        
        if (elementTop < window.innerHeight - 100 && elementBottom > 0) {
            element.classList.add('animate-in');
        }
    });
}

// Panggil checkScroll saat scroll
window.addEventListener('scroll', checkScroll);
// Panggil sekali saat halaman dimuat
window.addEventListener('load', checkScroll);

// Dark/Light Mode Toggle
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    themeToggle.className = 'theme-toggle';
    themeToggle.innerHTML = '🌙';
    themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');

    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.documentElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        updateThemeIcon(newTheme);
    });

    function updateThemeIcon(theme) {
        themeToggle.innerHTML = theme === 'dark' ? '🌙' : '☀️';
    }
}

// Loading Screen
// Loading Screen Sederhana dan Andal
function initLoadingScreenHandler() {
    const loadingScreen = document.getElementById('loadingScreen') || document.querySelector('.loading-screen');

    // Fungsi untuk menyembunyikan loading
    function hideLoading() {
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
    }
    window.addEventListener('load', hideLoading);
    setTimeout(hideLoading, 3000);
}

// Enhanced Scroll Effects
// Enhanced Scroll Effects - PERBAIKAN
function initScrollEffects() {
    // Progress Bar
    const progressContainer = document.createElement('div');
    progressContainer.className = 'progress-container';
    const progressBar = document.createElement('div');
    progressBar.className = 'progress-bar';
    progressContainer.appendChild(progressBar);
    document.body.appendChild(progressContainer);

    // Update progress bar on scroll
    window.addEventListener('scroll', () => {
        const winHeight = window.innerHeight;
        const docHeight = document.documentElement.scrollHeight;
        const scrollTop = window.pageYOffset;
        const scrollPercent = (scrollTop / (docHeight - winHeight)) * 100;
        progressBar.style.width = scrollPercent + '%';

        // Navbar background on scroll - PERBAIKAN
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
            // Tambahkan shadow lebih tebal saat scroll
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.15)';
        } else {
            navbar.classList.remove('scrolled');
            navbar.style.boxShadow = 'var(--shadow)';
        }
    });

    // Enhanced scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fadeInUp');
                
                // Animate skill bars when skills section is in view
                if (entry.target.classList.contains('skills')) {
                    animateSkillBars();
                }
            }
        });
    }, observerOptions);

    // Observe all sections and cards
    document.querySelectorAll('section, .project-card, .timeline-item, .skill-category').forEach(el => {
        observer.observe(el);
    });
}
// Enhanced Form Validation
function enhanceContactForm() {
    const contactForm = document.querySelector('.contact-form');
    if (!contactForm) return;

    const inputs = contactForm.querySelectorAll('input, textarea');
    
    inputs.forEach(input => {
        // Add focus effects
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });

        // Real-time validation
        input.addEventListener('input', function() {
            validateField(this);
        });
    });

    function validateField(field) {
        const value = field.value.trim();
        let isValid = true;
        let errorMessage = '';

        if (field.type === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            isValid = emailRegex.test(value);
            errorMessage = isValid ? '' : 'Format email tidak valid';
        } else if (field.type === 'text' && field.placeholder === 'Nama Lengkap') {
            isValid = value.length >= 2;
            errorMessage = isValid ? '' : 'Nama harus minimal 2 karakter';
        } else if (field.tagName === 'TEXTAREA') {
            isValid = value.length >= 10;
            errorMessage = isValid ? '' : 'Pesan harus minimal 10 karakter';
        }

        // Show/hide error message
        let errorElement = field.parentElement.querySelector('.error-message');
        if (!errorElement && !isValid) {
            errorElement = document.createElement('span');
            errorElement.className = 'error-message';
            field.parentElement.appendChild(errorElement);
        }

        if (errorElement) {
            errorElement.textContent = errorMessage;
            field.parentElement.classList.toggle('error', !isValid);
        }

        return isValid;
    }

    // Enhanced form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Validate all fields
        let allValid = true;
        inputs.forEach(input => {
            if (!validateField(input)) {
                allValid = false;
            }
        });

        if (allValid) {
            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Mengirim...';
            submitBtn.disabled = true;

            // Simulate API call
            setTimeout(() => {
                // Show success message
                showNotification('Pesan berhasil dikirim! Saya akan membalas segera.', 'success');
                this.reset();
                
                // Reset button
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 2000);
        } else {
            showNotification('Harap perbaiki kesalahan pada form.', 'error');
        }
    });
}

// Notification System
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    // Add styles if not already present
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                right: 20px;
                padding: 15px 20px;
                border-radius: 8px;
                color: white;
                z-index: 10000;
                transform: translateX(150%);
                transition: transform 0.3s ease;
                max-width: 300px;
            }
            .notification.success { background: #10b981; }
            .notification.error { background: #ef4444; }
            .notification.info { background: #3b82f6; }
            .notification.show { transform: translateX(0); }
        `;
        document.head.appendChild(style);
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Initialize all enhancements when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initLoadingScreenHandler();
    initScrollEffects();
    enhanceContactForm();
    
    // Add pulse animation to CTA buttons
    const ctaButtons = document.querySelectorAll('.btn-primary');
    ctaButtons.forEach(btn => {
        btn.classList.add('animate-pulse');
    });
});

function initParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { value: 100, density: { enable: true, value_area: 800 } },
                color: { value: "#e26014" },
                shape: { type: "circle" },
                opacity: { value: 50, random: true },
                size: { value: 3, random: true },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#e26014",
                    opacity: 0.5,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 1,
                    direction: "none",
                    random: true,
                    out_mode: "out"
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { enable: true, mode: "grab" },
                    onclick: { enable: true, mode: "push" }
                }
            },
            retina_detect: true
        });
    }
}

window.addEventListener('load', initParticles);