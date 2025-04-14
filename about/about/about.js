document.addEventListener('DOMContentLoaded', function() {
    // Initialize all components
    initSmoothScroll();
    initFloatingNav();
    initScrollAnimations();
    initTeamMembers();
    initStatsCounter();
    initTestimonialSlider();
    initScrollDownButton();

    // Set initial active nav item
    setActiveNavItem();
});

// Smooth scroll for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // Update URL without page reload
                history.pushState(null, null, targetId);
            }
        });
    });
}

// Floating navigation functionality
function initFloatingNav() {
    const nav = document.querySelector('.floating-nav');
    if (!nav) return;

    // Highlight active section in nav
    window.addEventListener('scroll', function() {
        setActiveNavItem();
    });
}

function setActiveNavItem() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.floating-nav a');
    let currentSection = '';

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        if (window.scrollY >= sectionTop - 200 && 
            window.scrollY < sectionTop + sectionHeight - 200) {
            currentSection = '#' + section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentSection) {
            link.classList.add('active');
        }
    });
}

// Scroll animations
function initScrollAnimations() {
    const animateElements = document.querySelectorAll(
        '.about-section, .team-section, .stats-section, .testimonials-section'
    );

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });

    animateElements.forEach(el => {
        observer.observe(el);
    });
}

// Team member interactions
function initTeamMembers() {
    const teamMembers = document.querySelectorAll('.team-member');
    
    teamMembers.forEach(member => {
        // Hover effect
        member.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        member.addEventListener('mouseleave', function() {
            if (!this.classList.contains('active')) {
                this.style.transform = 'translateY(0)';
            }
        });
        
        // Click effect
        member.addEventListener('click', function() {
            teamMembers.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
    });
}

// Animated stats counter
function initStatsCounter() {
    const statItems = document.querySelectorAll('.stat-item');
    let counted = false;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                animateCounters();
            }
        });
    }, { threshold: 0.5 });

    statItems.forEach(item => {
        observer.observe(item);
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    const speed = 200;
    
    counters.forEach(counter => {
        const target = +counter.getAttribute('data-count');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 1);
        } else {
            counter.innerText = target;
        }
    });
}

// Testimonial slider
function initTestimonialSlider() {
    const testimonials = document.querySelectorAll('.testimonial');
    if (testimonials.length <= 1) return;

    let currentIndex = 0;
    const testimonialContainer = document.querySelector('.testimonials-slider');
    
    // Auto-rotate testimonials
    setInterval(() => {
        showNextTestimonial();
    }, 5000);

    function showNextTestimonial() {
        testimonials[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % testimonials.length;
        testimonials[currentIndex].classList.add('active');
    }
}

// Scroll down button
function initScrollDownButton() {
    const scrollDownBtn = document.querySelector('.scroll-down');
    if (!scrollDownBtn) return;

    scrollDownBtn.addEventListener('click', function() {
        window.scrollTo({
            top: document.querySelector('.about-section').offsetTop - 80,
            behavior: 'smooth'
        });
    });
}

// Add parallax effect to header
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (header) {
        const scrollPosition = window.scrollY;
        header.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
});
