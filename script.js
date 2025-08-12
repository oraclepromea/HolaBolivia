// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerHeight = document.querySelector('.header').offsetHeight;
            const targetPosition = target.offsetTop - headerHeight - 20; // Extra 20px padding
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.98)';
        header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    } else {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.boxShadow = 'none';
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.tour-card, .testimonial-card, .feature, .stat');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        tour: document.getElementById('tour').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    if (!formData.name || !formData.email || !formData.tour || !formData.message) {
        showNotification('Por favor completa todos los campos requeridos.', 'error');
        return;
    }
    
    if (!isValidEmail(formData.email)) {
        showNotification('Por favor ingresa un email válido.', 'error');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual backend integration)
    setTimeout(() => {
        showNotification('¡Mensaje enviado correctamente! Te contactaremos pronto.', 'success');
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 350px;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    `;
    
    if (type === 'success') {
        notification.style.background = '#28a745';
    } else if (type === 'error') {
        notification.style.background = '#dc3545';
    } else {
        notification.style.background = '#17a2b8';
    }
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Tour card interactions
document.querySelectorAll('.btn-outline').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const tourCard = this.closest('.tour-card');
        const tourTitle = tourCard.querySelector('h3').textContent;
        
        showNotification(`Más información sobre ${tourTitle} próximamente disponible.`, 'info');
    });
});

// Statistics counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.stat h3');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const suffix = counter.textContent.replace(/[\d\s]/g, '');
        let current = 0;
        const increment = target / 50;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                counter.textContent = Math.ceil(current) + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target + suffix;
            }
        };
        
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.stats');
    if (statsSection) {
        statsObserver.observe(statsSection);
    }
});

// Lazy loading for images
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.3s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Add CSS for loading animation
const loadingStyles = `
    body:not(.loaded) {
        overflow: hidden;
    }
    
    body:not(.loaded)::before {
        content: '';
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
    }
    
    body:not(.loaded)::after {
        content: '';
        width: 50px;
        height: 50px;
        border: 3px solid #f3f3f3;
        border-top: 3px solid #ff6b35;
        border-radius: 50%;
        animation: spin 1s linear infinite;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 10001;
    }
    
    @keyframes spin {
        0% { transform: translate(-50%, -50%) rotate(0deg); }
        100% { transform: translate(-50%, -50%) rotate(360deg); }
    }
`;

// Inject loading styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// Language Toggle Functionality
const langBtns = document.querySelectorAll('.lang-btn');
const translatableElements = document.querySelectorAll('[data-es][data-en]');

let currentLang = 'es';

langBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const lang = btn.id === 'lang-es' ? 'es' : 'en';
        if (lang !== currentLang) {
            switchLanguage(lang);
        }
    });
});

function switchLanguage(lang) {
    currentLang = lang;
    
    // Update button states
    langBtns.forEach(btn => {
        btn.classList.toggle('active', btn.id === `lang-${lang}`);
    });
    
    // Update text content
    translatableElements.forEach(element => {
        const text = element.getAttribute(`data-${lang}`);
        if (text) {
            element.textContent = text;
        }
    });
    
    // Update navigation menu
    const navLinks = document.querySelectorAll('.nav-link');
    const navTranslations = {
        es: ['Home', 'Tours', 'Sobre Nosotros', 'Testimonios', 'Contacto'],
        en: ['Home', 'Tours', 'About Us', 'Testimonials', 'Contact']
    };
    
    navLinks.forEach((link, index) => {
        if (navTranslations[lang][index]) {
            link.textContent = navTranslations[lang][index];
        }
    });
    
    // Update section headers
    updateSectionHeaders(lang);
    
    // Update tour features
    updateTourFeatures(lang);
    
    // Update trust badges
    updateTrustBadges(lang);
}

function updateSectionHeaders(lang) {
    const headers = {
        es: {
            'tours-header': 'Nuestros Tours',
            'tours-desc': 'Explora los destinos más increíbles de Bolivia con nuestros tours especializados',
            'about-header': 'Sobre Hola Bolivia Travel',
            'testimonials-header': 'Lo Que Dicen Nuestros Clientes',
            'testimonials-desc': 'Experiencias reales de viajeros que han explorado Bolivia con nosotros',
            'contact-header': 'Contáctanos',
            'contact-desc': '¿Listo para tu próxima aventura? Estamos aquí para ayudarte a planificar el viaje perfecto'
        },
        en: {
            'tours-header': 'Our Tours',
            'tours-desc': 'Explore Bolivia\'s most incredible destinations with our specialized tours',
            'about-header': 'About Hola Bolivia Travel',
            'testimonials-header': 'What Our Clients Say',
            'testimonials-desc': 'Real experiences from travelers who have explored Bolivia with us',
            'contact-header': 'Contact Us',
            'contact-desc': 'Ready for your next adventure? We\'re here to help you plan the perfect trip'
        }
    };
    
    // Update section headers that don't have data attributes
    const toursSection = document.querySelector('#tours .section-header');
    if (toursSection) {
        toursSection.querySelector('h2').textContent = headers[lang]['tours-header'];
        toursSection.querySelector('p').textContent = headers[lang]['tours-desc'];
    }
    
    const aboutSection = document.querySelector('#sobre-nosotros h2');
    if (aboutSection) {
        aboutSection.textContent = headers[lang]['about-header'];
    }
    
    const testimonialsSection = document.querySelector('#testimonios .section-header');
    if (testimonialsSection) {
        testimonialsSection.querySelector('h2').textContent = headers[lang]['testimonials-header'];
        testimonialsSection.querySelector('p').textContent = headers[lang]['testimonials-desc'];
    }
    
    const contactSection = document.querySelector('#contacto .section-header');
    if (contactSection) {
        contactSection.querySelector('h2').textContent = headers[lang]['contact-header'];
        contactSection.querySelector('p').textContent = headers[lang]['contact-desc'];
    }
}

function updateTourFeatures(lang) {
    const features = document.querySelectorAll('.tour-features span');
    const translations = {
        es: {
            'día completo': 'día completo',
            '1 día': '1 día',
            'Medio día': 'Medio día',
            'Grupos pequeños': 'Grupos pequeños',
            'En bicicleta': 'En bicicleta',
            'Caminata': 'Caminata',
            'Senderismo': 'Senderismo',
            'Montañismo': 'Montañismo',
            'En barco': 'En barco'
        },
        en: {
            'día completo': 'full day',
            '1 día': '1 day',
            'Medio día': 'half day',
            'Grupos pequeños': 'Small groups',
            'En bicicleta': 'By bike',
            'Caminata': 'Hiking',
            'Senderismo': 'Trekking',
            'Montañismo': 'Climbing',
            'En barco': 'By boat'
        }
    };
    
    features.forEach(feature => {
        const text = feature.textContent.trim();
        const iconElement = feature.querySelector('i');
        const textWithoutIcon = text.replace(/^\s*/, '').substring(1).trim();
        
        if (translations[lang][textWithoutIcon]) {
            feature.innerHTML = `<i class="${iconElement.className}"></i> ${translations[lang][textWithoutIcon]}`;
        }
    });
}

function updateTrustBadges(lang) {
    const badges = document.querySelectorAll('.badge span');
    const translations = {
        es: [
            'Agencia Autorizada',
            '5 Años de Experiencia',
            '500+ Clientes Satisfechos',
            '4.9/5 Rating Promedio',
            'Soporte 24/7'
        ],
        en: [
            'Authorized Agency',
            '5 Years Experience',
            '500+ Satisfied Clients',
            '4.9/5 Average Rating',
            '24/7 Support'
        ]
    };
    
    badges.forEach((badge, index) => {
        if (translations[lang][index]) {
            badge.textContent = translations[lang][index];
        }
    });
}

// Enhanced Gallery with Lightbox Effect
document.addEventListener('DOMContentLoaded', () => {
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const img = item.querySelector('img');
            const overlay = item.querySelector('.gallery-overlay');
            const title = overlay.querySelector('h3').textContent;
            const desc = overlay.querySelector('p').textContent;
            
            createLightbox(img.src, title, desc);
        });
    });
});

function createLightbox(imageSrc, title, description) {
    const lightbox = document.createElement('div');
    lightbox.className = 'lightbox';
    lightbox.innerHTML = `
        <div class="lightbox-content">
            <span class="lightbox-close">&times;</span>
            <img src="${imageSrc}" alt="${title}">
            <div class="lightbox-info">
                <h3>${title}</h3>
                <p>${description}</p>
            </div>
        </div>
    `;
    
    // Add lightbox styles
    lightbox.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.9);
        z-index: 10000;
        display: flex;
        align-items: center;
        justify-content: center;
        animation: fadeIn 0.3s ease;
    `;
    
    const content = lightbox.querySelector('.lightbox-content');
    content.style.cssText = `
        position: relative;
        max-width: 90%;
        max-height: 90%;
        text-align: center;
    `;
    
    const img = lightbox.querySelector('img');
    img.style.cssText = `
        max-width: 100%;
        max-height: 80vh;
        border-radius: 10px;
        box-shadow: 0 20px 40px rgba(0,0,0,0.5);
    `;
    
    const close = lightbox.querySelector('.lightbox-close');
    close.style.cssText = `
        position: absolute;
        top: -40px;
        right: 0;
        color: white;
        font-size: 40px;
        font-weight: bold;
        cursor: pointer;
        z-index: 10001;
    `;
    
    const info = lightbox.querySelector('.lightbox-info');
    info.style.cssText = `
        color: white;
        margin-top: 1rem;
    `;
    
    document.body.appendChild(lightbox);
    
    // Close lightbox
    close.addEventListener('click', () => {
        document.body.removeChild(lightbox);
    });
    
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
            document.body.removeChild(lightbox);
        }
    });
}

// Enhanced Mobile Menu with better animation
function enhanceMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    mobileMenu.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevent body scroll when menu is open
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
    
    // Close menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
}

// Enhanced scroll animations
function enhanceScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Add stagger animation for grid items
                if (entry.target.classList.contains('tour-card') || 
                    entry.target.classList.contains('reason-card') ||
                    entry.target.classList.contains('gallery-item')) {
                    
                    const delay = Array.from(entry.target.parentNode.children)
                                      .indexOf(entry.target) * 100;
                    entry.target.style.transitionDelay = `${delay}ms`;
                }
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.addEventListener('DOMContentLoaded', () => {
        const animateElements = document.querySelectorAll(`
            .tour-card, 
            .testimonial-card, 
            .feature, 
            .stat, 
            .reason-card,
            .gallery-item,
            .contact-card,
            .contact-cta
        `);
        
        animateElements.forEach(el => {
            el.style.opacity = '0';
            el.style.transform = 'translateY(30px)';
            el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            observer.observe(el);
        });
    });
}

// Performance optimization - Lazy load images
function implementLazyLoading() {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Add loading animation
                img.style.opacity = '0';
                img.style.transition = 'opacity 0.5s ease';
                
                img.onload = () => {
                    img.style.opacity = '1';
                };
                
                // Add error handling
                img.onerror = () => {
                    img.style.opacity = '0.5';
                    console.warn(`Failed to load image: ${img.src}`);
                };
                
                imageObserver.unobserve(img);
            }
        });
    });
    
    images.forEach(img => {
        imageObserver.observe(img);
    });
}

// Initialize all enhancements
document.addEventListener('DOMContentLoaded', () => {
    enhanceMobileMenu();
    enhanceScrollAnimations();
    implementLazyLoading();
    
    // Add smooth scroll behavior for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});