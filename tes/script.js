// Smooth scrolling untuk navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Tutup mobile menu jika terbuka
            const navMenu = document.getElementById('nav-menu');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
            }
        }
    });
});

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

// Animasi typing effect untuk hero title (opsional)
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
    animateSkillBars();
    
    // Optional: Typing effect untuk hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        typeWriter(heroTitle, originalText, 50);
    }
    
    // Add scroll event untuk mengubah navbar style
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'var(--shadow)';
        }
    });
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