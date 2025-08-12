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

// Lazy loading for images - REMOVED OPACITY EFFECTS
document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('img[src]');
    
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                
                // Images load immediately without opacity animation
                // Add error handling only
                img.onerror = () => {
                    console.warn(`Failed to load image: ${img.src}`);
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
`;

// Inject loading styles
const styleSheet = document.createElement('style');
styleSheet.textContent = loadingStyles;
document.head.appendChild(styleSheet);

// Enhanced Language Toggle Functionality - Complete Implementation
class LanguageToggle {
    constructor() {
        this.currentLang = 'es';
        this.translations = this.initializeTranslations();
        this.init();
    }

    initializeTranslations() {
        return {
            es: {
                // Navigation
                'nav-home': 'Home',
                'nav-tours': 'Tours',
                'nav-about': 'Sobre Nosotros',
                'nav-testimonials': 'Testimonios',
                'nav-contact': 'Contacto',
                
                // Hero Section
                'hero-title': 'Descubre la Magia de Bolivia',
                'hero-subtitle': 'Vive experiencias únicas con los mejores tours desde La Paz',
                'hero-btn-tours': 'Explorar Tours',
                'hero-btn-gallery': 'Ver Galería',
                
                // Trust Badges
                'badge-1': 'Agencia Autorizada',
                'badge-2': '5 Años de Experiencia',
                'badge-3': '500+ Clientes Satisfechos',
                'badge-4': '4.9/5 Rating Promedio',
                'badge-5': 'Soporte 24/7',
                
                // Tours Section
                'tours-title': 'Nuestros Tours',
                'tours-subtitle': 'Explora los destinos más increíbles de Bolivia con nuestros tours especializados',
                'tour-btn': 'Reservar por WhatsApp',
                
                // Tour Features
                'feature-full-day': '1 día completo',
                'feature-day': '1 día',
                'feature-half-day': 'Medio día',
                'feature-small-groups': 'Grupos pequeños',
                'feature-bike': 'En bicicleta',
                'feature-hiking': 'Caminata',
                'feature-trekking': 'Senderismo',
                'feature-climbing': 'Montañismo',
                'feature-boat': 'En barco',
                
                // Tour Descriptions
                'tour-uyuni-desc': 'Experimenta la magia del desierto de sal más grande del mundo en un día completo. Incluye almuerzo y atardecer espectacular.',
                'tour-death-road-desc': 'Aventura extrema en bicicleta por la carretera más peligrosa del mundo. Una experiencia llena de adrenalina y paisajes únicos.',
                'tour-moon-valley-desc': 'Formaciones rocosas únicas cerca de La Paz que parecen de otro planeta. Paisajes surrealistas y caminatas espectaculares.',
                'tour-souls-valley-desc': 'Exploración de formaciones geológicas misteriosas y senderos únicos. Un lugar mágico lleno de leyendas y belleza natural.',
                'tour-charquini-desc': 'Aventura de montañismo en una de las montañas más accesibles cerca de La Paz. Vistas panorámicas espectaculares de la cordillera.',
                'tour-sun-island-desc': 'Visita la isla sagrada de los incas en el Lago Titicaca. Historia, cultura y paisajes impresionantes en el lago navegable más alto del mundo.',
                
                // Gallery Section
                'gallery-title': 'Galería de Bolivia',
                'gallery-subtitle': 'Descubre la belleza natural de Bolivia a través de nuestras fotografías',
                
                // Why Choose Us Section
                'why-choose-title': '¿Por Qué Elegirnos?',
                'why-choose-subtitle': 'Razones que nos convierten en tu mejor opción para explorar Bolivia',
                'reason-1-title': 'Agencia Certificada',
                'reason-1-desc': 'Contamos con todas las licencias y certificaciones oficiales para operar turismo en Bolivia',
                'reason-2-title': 'Guías Expertos',
                'reason-2-desc': 'Nuestros guías locales conocen cada rincón y te mostrarán lugares secretos fuera de las rutas tradicionales',
                'reason-3-title': 'Seguridad Total',
                'reason-3-desc': 'Todos nuestros tours incluyen seguro de viaje, equipos de seguridad y protocolos establecidos',
                'reason-4-title': 'Precios Justos',
                'reason-4-desc': 'Ofrecemos las mejores tarifas del mercado sin comprometer la calidad del servicio',
                'reason-5-title': 'Atención 24/7',
                'reason-5-desc': 'Estamos disponibles en todo momento para resolver cualquier consulta o emergencia',
                'reason-6-title': 'Turismo Responsable',
                'reason-6-desc': 'Promovemos el turismo sostenible y el respeto por las comunidades locales y el medio ambiente',
                
                // About Section
                'about-title': 'Sobre Hola Bolivia Travel',
                'about-desc': 'Somos una agencia de viajes especializada en tours por Bolivia, con base en La Paz. Nuestro objetivo es mostrar la belleza y diversidad cultural de nuestro país a través de experiencias auténticas y memorables.',
                'about-feature-1-title': 'Experiencia Local',
                'about-feature-1-desc': 'Guías locales con conocimiento profundo de cada destino',
                'about-feature-2-title': 'Seguridad Garantizada',
                'about-feature-2-desc': 'Tours seguros con todos los permisos y seguros necesarios',
                'about-feature-3-title': 'Atención Personalizada',
                'about-feature-3-desc': 'Grupos pequeños para una experiencia más íntima',
                'stat-1': 'Clientes Satisfechos',
                'stat-2': 'Destinos',
                'stat-3': 'Años de Experiencia',
                'stat-4': 'Rating Promedio',
                
                // Testimonials Section
                'testimonials-title': 'Lo Que Dicen Nuestros Clientes',
                'testimonials-subtitle': 'Experiencias reales de viajeros que han explorado Bolivia con nosotros',
                
                // Contact Section
                'contact-title': 'Contáctanos',
                'contact-subtitle': '¿Listo para tu próxima aventura? Estamos aquí para ayudarte a planificar el viaje perfecto',
                'contact-location': 'Ubicación',
                'contact-phone': 'Teléfono',
                'contact-email': 'Email',
                'contact-hours': 'Horarios',
                'contact-cta-title': '¡Comienza tu aventura hoy!',
                'contact-cta-desc': 'Contactanos a través de cualquiera de estos medios y te ayudaremos a crear la experiencia perfecta en Bolivia.',
                'contact-whatsapp': 'WhatsApp',
                'contact-call': 'Llamar Ahora',
                'contact-email-btn': 'Enviar Email',
                'contact-social-title': 'Síguenos en nuestras redes',
                'contact-quote': '"Cada viaje es una nueva historia por descubrir"'
            },
            en: {
                // Navigation
                'nav-home': 'Home',
                'nav-tours': 'Tours',
                'nav-about': 'About Us',
                'nav-testimonials': 'Testimonials',
                'nav-contact': 'Contact',
                
                // Hero Section
                'hero-title': 'Discover the Magic of Bolivia',
                'hero-subtitle': 'Live unique experiences with the best tours from La Paz',
                'hero-btn-tours': 'Explore Tours',
                'hero-btn-gallery': 'View Gallery',
                
                // Trust Badges
                'badge-1': 'Authorized Agency',
                'badge-2': '5 Years Experience',
                'badge-3': '500+ Satisfied Clients',
                'badge-4': '4.9/5 Average Rating',
                'badge-5': '24/7 Support',
                
                // Tours Section
                'tours-title': 'Our Tours',
                'tours-subtitle': 'Explore Bolivia\'s most incredible destinations with our specialized tours',
                'tour-btn': 'Book via WhatsApp',
                
                // Tour Features
                'feature-full-day': 'full day',
                'feature-day': '1 day',
                'feature-half-day': 'half day',
                'feature-small-groups': 'Small groups',
                'feature-bike': 'By bike',
                'feature-hiking': 'Hiking',
                'feature-trekking': 'Trekking',
                'feature-climbing': 'Climbing',
                'feature-boat': 'By boat',
                
                // Tour Descriptions
                'tour-uyuni-desc': 'Experience the magic of the world\'s largest salt desert in a full day. Includes lunch and spectacular sunset.',
                'tour-death-road-desc': 'Extreme cycling adventure on the world\'s most dangerous road. An experience full of adrenaline and unique landscapes.',
                'tour-moon-valley-desc': 'Unique rock formations near La Paz that look like they\'re from another planet. Surreal landscapes and spectacular hikes.',
                'tour-souls-valley-desc': 'Exploration of mysterious geological formations and unique trails. A magical place full of legends and natural beauty.',
                'tour-charquini-desc': 'Mountaineering adventure on one of the most accessible mountains near La Paz. Spectacular panoramic views of the mountain range.',
                'tour-sun-island-desc': 'Visit the sacred island of the Incas on Lake Titicaca. History, culture and impressive landscapes on the world\'s highest navigable lake.',
                
                // Gallery Section
                'gallery-title': 'Bolivia Gallery',
                'gallery-subtitle': 'Discover Bolivia\'s natural beauty through our photography',
                
                // Why Choose Us Section
                'why-choose-title': 'Why Choose Us?',
                'why-choose-subtitle': 'Reasons that make us your best choice to explore Bolivia',
                'reason-1-title': 'Certified Agency',
                'reason-1-desc': 'We have all the official licenses and certifications to operate tourism in Bolivia',
                'reason-2-title': 'Expert Guides',
                'reason-2-desc': 'Our local guides know every corner and will show you secret places off the traditional routes',
                'reason-3-title': 'Total Safety',
                'reason-3-desc': 'All our tours include travel insurance, safety equipment and established protocols',
                'reason-4-title': 'Fair Prices',
                'reason-4-desc': 'We offer the best market rates without compromising service quality',
                'reason-5-title': '24/7 Support',
                'reason-5-desc': 'We are available at all times to resolve any questions or emergencies',
                'reason-6-title': 'Responsible Tourism',
                'reason-6-desc': 'We promote sustainable tourism and respect for local communities and the environment',
                
                // About Section
                'about-title': 'About Hola Bolivia Travel',
                'about-desc': 'We are a travel agency specialized in tours throughout Bolivia, based in La Paz. Our goal is to show the beauty and cultural diversity of our country through authentic and memorable experiences.',
                'about-feature-1-title': 'Local Experience',
                'about-feature-1-desc': 'Local guides with deep knowledge of each destination',
                'about-feature-2-title': 'Guaranteed Safety',
                'about-feature-2-desc': 'Safe tours with all necessary permits and insurance',
                'about-feature-3-title': 'Personalized Attention',
                'about-feature-3-desc': 'Small groups for a more intimate experience',
                'stat-1': 'Satisfied Clients',
                'stat-2': 'Destinations',
                'stat-3': 'Years of Experience',
                'stat-4': 'Average Rating',
                
                // Testimonials Section
                'testimonials-title': 'What Our Clients Say',
                'testimonials-subtitle': 'Real experiences from travelers who have explored Bolivia with us',
                
                // Contact Section
                'contact-title': 'Contact Us',
                'contact-subtitle': 'Ready for your next adventure? We\'re here to help you plan the perfect trip',
                'contact-location': 'Location',
                'contact-phone': 'Phone',
                'contact-email': 'Email',
                'contact-hours': 'Hours',
                'contact-cta-title': 'Start your adventure today!',
                'contact-cta-desc': 'Contact us through any of these means and we will help you create the perfect experience in Bolivia.',
                'contact-whatsapp': 'WhatsApp',
                'contact-call': 'Call Now',
                'contact-email-btn': 'Send Email',
                'contact-social-title': 'Follow us on our networks',
                'contact-quote': '"Every trip is a new story to discover"'
            }
        };
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupLanguageToggle());
        } else {
            this.setupLanguageToggle();
        }
    }

    setupLanguageToggle() {
        const langBtns = document.querySelectorAll('.nav-lang-btn');
        
        langBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = btn.id === 'lang-es' ? 'es' : 'en';
                this.switchLanguage(lang);
            });
        });

        // Set initial language from localStorage or default to Spanish
        const savedLang = localStorage.getItem('preferredLanguage') || 'es';
        this.switchLanguage(savedLang);
    }

    switchLanguage(lang) {
        if (!this.translations[lang]) return;
        
        this.currentLang = lang;
        
        // Update button states
        document.querySelectorAll('.nav-lang-btn').forEach(btn => {
            btn.classList.toggle('active', btn.id === `lang-${lang}`);
        });
        
        // Update all translatable elements
        this.updateDataAttributeElements(lang);
        this.updateNavigationMenu(lang);
        this.updateSectionHeaders(lang);
        this.updateTourFeatures(lang);
        this.updateTourDescriptions(lang);
        this.updateTrustBadges(lang);
        this.updateReasonCards(lang);
        this.updateAboutSection(lang);
        this.updateContactSection(lang);
        this.updateButtons(lang);
        
        // Save language preference
        localStorage.setItem('preferredLanguage', lang);
    }

    updateDataAttributeElements(lang) {
        const translatableElements = document.querySelectorAll('[data-es][data-en]');
        translatableElements.forEach(element => {
            const text = element.getAttribute(`data-${lang}`);
            if (text) {
                element.textContent = text;
            }
        });
    }

    updateNavigationMenu(lang) {
        const navLinks = document.querySelectorAll('.nav-link');
        const navKeys = ['nav-home', 'nav-tours', 'nav-about', 'nav-testimonials', 'nav-contact'];
        
        navLinks.forEach((link, index) => {
            if (this.translations[lang][navKeys[index]]) {
                link.textContent = this.translations[lang][navKeys[index]];
            }
        });
    }

    updateSectionHeaders(lang) {
        // Tours section
        const toursSection = document.querySelector('#tours .section-header');
        if (toursSection) {
            const h2 = toursSection.querySelector('h2');
            const p = toursSection.querySelector('p');
            if (h2) h2.textContent = this.translations[lang]['tours-title'];
            if (p) p.textContent = this.translations[lang]['tours-subtitle'];
        }

        // Gallery section
        const gallerySection = document.querySelector('#galeria .section-header');
        if (gallerySection) {
            const h2 = gallerySection.querySelector('h2');
            const p = gallerySection.querySelector('p');
            if (h2) h2.textContent = this.translations[lang]['gallery-title'];
            if (p) p.textContent = this.translations[lang]['gallery-subtitle'];
        }

        // Why choose us section - FIXED SELECTOR
        const whyChooseSection = document.querySelector('.why-choose_us .section-header');
        if (whyChooseSection) {
            const h2 = whyChooseSection.querySelector('h2');
            const p = whyChooseSection.querySelector('p');
            if (h2) h2.textContent = this.translations[lang]['why-choose-title'];
            if (p) p.textContent = this.translations[lang]['why-choose-subtitle'];
        }

        // About section
        const aboutSection = document.querySelector('#sobre-nosotros h2');
        if (aboutSection) {
            aboutSection.textContent = this.translations[lang]['about-title'];
        }

        // Testimonials section
        const testimonialsSection = document.querySelector('#testimonios .section-header');
        if (testimonialsSection) {
            const h2 = testimonialsSection.querySelector('h2');
            const p = testimonialsSection.querySelector('p');
            if (h2) h2.textContent = this.translations[lang]['testimonials-title'];
            if (p) p.textContent = this.translations[lang]['testimonials-subtitle'];
        }

        // Contact section
        const contactSection = document.querySelector('#contacto .section-header');
        if (contactSection) {
            const h2 = contactSection.querySelector('h2');
            const p = contactSection.querySelector('p');
            if (h2) h2.textContent = this.translations[lang]['contact-title'];
            if (p) p.textContent = this.translations[lang]['contact-subtitle'];
        }
    }

    updateTourFeatures(lang) {
        const features = document.querySelectorAll('.tour-features span');
        
        features.forEach(feature => {
            const iconElement = feature.querySelector('i');
            if (!iconElement) return;
            
            const iconClass = iconElement.className;
            const textNode = feature.lastChild;
            if (textNode && textNode.nodeType === Node.TEXT_NODE) {
                const text = textNode.textContent.trim();
                
                // Map text to translation keys
                const featureMap = {
                    '1 día completo': 'feature-full-day',
                    '1 día': 'feature-day',
                    'Medio día': 'feature-half-day',
                    'Grupos pequeños': 'feature-small-groups',
                    'En bicicleta': 'feature-bike',
                    'Caminata': 'feature-hiking',
                    'Senderismo': 'feature-trekking',
                    'Montañismo': 'feature-climbing',
                    'En barco': 'feature-boat',
                    'full day': 'feature-full-day',
                    '1 day': 'feature-day',
                    'half day': 'feature-half-day',
                    'Small groups': 'feature-small-groups',
                    'By bike': 'feature-bike',
                    'Hiking': 'feature-hiking',
                    'Trekking': 'feature-trekking',
                    'Climbing': 'feature-climbing',
                    'By boat': 'feature-boat'
                };
                
                const key = featureMap[text];
                if (key && this.translations[lang][key]) {
                    textNode.textContent = ' ' + this.translations[lang][key];
                }
            }
        });
    }

    updateTourDescriptions(lang) {
        const tourCards = document.querySelectorAll('.tour-card');
        const descKeys = [
            'tour-uyuni-desc',
            'tour-death-road-desc', 
            'tour-moon-valley-desc',
            'tour-souls-valley-desc',
            'tour-charquini-desc',
            'tour-sun-island-desc'
        ];
        
        tourCards.forEach((card, index) => {
            const description = card.querySelector('.tour-content p');
            if (description && this.translations[lang][descKeys[index]]) {
                description.textContent = this.translations[lang][descKeys[index]];
            }
        });
    }

    updateTrustBadges(lang) {
        const badges = document.querySelectorAll('.badge span');
        const badgeKeys = ['badge-1', 'badge-2', 'badge-3', 'badge-4', 'badge-5'];
        
        badges.forEach((badge, index) => {
            if (this.translations[lang][badgeKeys[index]]) {
                badge.textContent = this.translations[lang][badgeKeys[index]];
            }
        });
    }

    updateReasonCards(lang) {
        const reasonCards = document.querySelectorAll('.reason-card');
        
        reasonCards.forEach((card, index) => {
            const title = card.querySelector('h3');
            const desc = card.querySelector('p');
            const titleKey = `reason-${index + 1}-title`;
            const descKey = `reason-${index + 1}-desc`;
            
            if (title && this.translations[lang][titleKey]) {
                title.textContent = this.translations[lang][titleKey];
            }
            if (desc && this.translations[lang][descKey]) {
                desc.textContent = this.translations[lang][descKey];
            }
        });
    }

    updateAboutSection(lang) {
        const aboutDesc = document.querySelector('#sobre-nosotros .about-text p');
        if (aboutDesc) {
            aboutDesc.textContent = this.translations[lang]['about-desc'];
        }

        const features = document.querySelectorAll('#sobre-nosotros .feature');
        const featureKeys = [
            ['about-feature-1-title', 'about-feature-1-desc'],
            ['about-feature-2-title', 'about-feature-2-desc'],
            ['about-feature-3-title', 'about-feature-3-desc']
        ];

        features.forEach((feature, index) => {
            const title = feature.querySelector('h4');
            const desc = feature.querySelector('p');
            
            if (title && this.translations[lang][featureKeys[index][0]]) {
                title.textContent = this.translations[lang][featureKeys[index][0]];
            }
            if (desc && this.translations[lang][featureKeys[index][1]]) {
                desc.textContent = this.translations[lang][featureKeys[index][1]];
            }
        });

        const stats = document.querySelectorAll('.stat p');
        const statKeys = ['stat-1', 'stat-2', 'stat-3', 'stat-4'];
        
        stats.forEach((stat, index) => {
            if (this.translations[lang][statKeys[index]]) {
                stat.textContent = this.translations[lang][statKeys[index]];
            }
        });
    }

    updateContactSection(lang) {
        const contactDetails = document.querySelectorAll('.contact-details h4');
        const contactKeys = ['contact-location', 'contact-phone', 'contact-email', 'contact-hours'];
        
        contactDetails.forEach((detail, index) => {
            if (this.translations[lang][contactKeys[index]]) {
                detail.textContent = this.translations[lang][contactKeys[index]];
            }
        });

        const ctaTitle = document.querySelector('.contact-cta h3');
        const ctaDesc = document.querySelector('.contact-cta > p');
        const socialTitle = document.querySelector('.social-section h4');
        const quote = document.querySelector('.contact-quote p');
        
        if (ctaTitle) ctaTitle.textContent = this.translations[lang]['contact-cta-title'];
        if (ctaDesc) ctaDesc.textContent = this.translations[lang]['contact-cta-desc'];
        if (socialTitle) socialTitle.textContent = this.translations[lang]['contact-social-title'];
        if (quote) quote.textContent = this.translations[lang]['contact-quote'];
    }

    updateButtons(lang) {
        const tourButtons = document.querySelectorAll('.btn-outline');
        tourButtons.forEach(btn => {
            const icon = btn.querySelector('i');
            if (icon && icon.classList.contains('fa-whatsapp')) {
                btn.innerHTML = `<i class="fab fa-whatsapp"></i> ${this.translations[lang]['tour-btn']}`;
            }
        });

        const contactButtons = document.querySelectorAll('.btn-contact span');
        const buttonKeys = ['contact-whatsapp', 'contact-call', 'contact-email-btn'];
        
        contactButtons.forEach((btn, index) => {
            if (this.translations[lang][buttonKeys[index]]) {
                btn.textContent = this.translations[lang][buttonKeys[index]];
            }
        });
    }
}

// Initialize the language toggle system
document.addEventListener('DOMContentLoaded', () => {
    new LanguageToggle();
});

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
                
                // Images load immediately without opacity animation
                // Add error handling only
                img.onerror = () => {
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