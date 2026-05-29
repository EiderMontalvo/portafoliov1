'use strict';

/* ========================================
   CONFIGURACIÓN
======================================== */
const CONFIG = {
    DEBUG_MODE: false,
    SCROLL_OFFSET: 100,
    NOTIFICATION_DURATION: 3000,
    TYPING_SPEED: {
        type: 100,
        delete: 50,
        pause: 2000
    }
};

const CERTIFICATIONS = {
    'mtpe-backend': {
        title: 'Certificado Back-End Development (Nivel Básico)',
        institution: 'Ministerio de Trabajo y Promoción del Empleo (MTPE)',
        date: '2025',
        image: 'assets/images/certifications/mtpe-backend.jpg',
        description: 'Certificación en desarrollo backend otorgada por el MTPE, cubriendo fundamentos de programación del lado del servidor, APIs REST y gestión de bases de datos.'
    },
    'oracle-java': {
        title: 'Java Orientado a Objetos G9',
        institution: 'Oracle Next Education (Alura & Oracle)',
        date: '2025',
        image: 'assets/images/certifications/oracle-java.jpg',
        description: 'Certificación del programa ONE de Oracle en programación Java, enfocada en Programación Orientada a Objetos, estructuras de datos, herencia, polimorfismo y mejores prácticas de desarrollo.'
    },
    'oracle-dev': {
        title: 'Desarrollo Personal G9',
        institution: 'Oracle Next Education (Alura & Oracle)',
        date: '2025',
        image: 'assets/images/certifications/desarrollopersonal.jpg',
        description: 'Certificación en desarrollo profesional y soft skills del programa ONE, cubriendo metodologías ágiles, trabajo en equipo, comunicación efectiva y gestión de proyectos.'
    },
    'cisco-python': {
        title: 'Fundamentos de Python 2',
        institution: 'SENATI / Cisco',
        date: '2024',
        image: 'assets/images/certifications/cisco-python.jpg',
        description: 'Certificación en fundamentos de programación con Python otorgada por Cisco Networking Academy, cubriendo sintaxis, estructuras de datos, funciones, módulos y conceptos de programación orientada a objetos.'
    }
};

/* ========================================
   INICIALIZACIÓN
======================================== */
function initApp() {
    initNavigation();
    initCertifications();
    initBackToTop();
    initTypingAnimation();
    initScrollEffects();
    initScrollIndicators();
    initAutoScroll();
    updateCurrentYear();
    initYapaCountdown();

    if (CONFIG.DEBUG_MODE) {
        console.log('Portfolio inicializado');
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
} else {
    initApp();
}

/* ========================================
   NAVEGACIÓN
======================================== */
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    if (!header) return;

    // Scroll effects
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Header sticky
        if (currentScroll > CONFIG.SCROLL_OFFSET) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active nav links
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (currentScroll >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });

        lastScroll = currentScroll;
    });

    // Mobile menu toggle
    if (navToggle && navMenu) {
        const toggleMenu = (show) => {
            navMenu.classList.toggle('active', show);
            navToggle.classList.toggle('active', show);
            navToggle.setAttribute('aria-expanded', show);
            document.body.style.overflow = show ? 'hidden' : '';
        };

        navToggle.addEventListener('click', () => {
            toggleMenu(!navMenu.classList.contains('active'));
        });

        // Close menu on link click
        navLinks.forEach(link => {
            link.addEventListener('click', () => toggleMenu(false));
        });

        // Close menu on outside click
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                toggleMenu(false);
            }
        });
    }

    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerHeight = header.offsetHeight;
                    const targetPosition = target.offsetTop - headerHeight;
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

//Modal de certificaciones
function initCertifications() {
    const certItems = document.querySelectorAll('.cert-item');
    const modal = document.getElementById('certModal');
    const overlay = document.getElementById('certModalOverlay');
    const closeBtn = document.getElementById('certModalClose');

    if (!modal) return;

    const elements = {
        image: document.getElementById('certImage'),
        title: document.getElementById('certModalTitle'),
        description: document.getElementById('certDescription'),
        date: document.getElementById('certDate')
    };

    const closeModal = () => {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    };

    const openModal = (certData) => {
        // Actualizar contenido de texto inmediatamente
        elements.title.textContent = certData.title;
        elements.description.textContent = certData.description;
        elements.date.textContent = `${certData.institution} - ${certData.date}`;
        
        // Ocultar imagen mientras carga
        elements.image.style.opacity = '0';
        
        // Abrir modal
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
        
        // Precargar imagen antes de mostrarla
        const img = new Image();
        img.onload = function() {
            elements.image.src = certData.image;
            elements.image.alt = certData.title;
            elements.image.style.opacity = '1';
        };
        img.onerror = function () {
            elements.image.style.display = 'none';
            const placeholder = document.createElement('div');
            placeholder.className = 'cert-image-placeholder';
            placeholder.innerHTML = '<i class="fas fa-certificate"></i><p>Imagen no disponible</p>';
            elements.image.parentNode.appendChild(placeholder);
        };
        img.src = certData.image;
    };

    // Event listeners
    certItems.forEach(item => {
        item.addEventListener('click', function () {
            const certId = this.getAttribute('data-cert');
            const certData = CERTIFICATIONS[certId];
            if (certData) openModal(certData);
        });
    });

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (overlay) overlay.addEventListener('click', closeModal);

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ========================================
   BACK TO TOP
======================================== */
function initBackToTop() {
    const btn = document.getElementById('backToTop');
    if (!btn) return;

    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.pageYOffset > 300);
    });

    btn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

/* ========================================
   TYPING ANIMATION
======================================== */
function initTypingAnimation() {
    const element = document.querySelector('.typing-animation');
    if (!element) return;

    const words = [
        'Desarrollador de Software Junior',
        'Backend Developer',
        'Aspiro a Full Stack',
        'Tech Enthusiast'
    ];

    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = CONFIG.TYPING_SPEED.type;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            element.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = CONFIG.TYPING_SPEED.delete;
        } else {
            element.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = CONFIG.TYPING_SPEED.type;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typingSpeed = CONFIG.TYPING_SPEED.pause;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    type();
}

/* ========================================
   SCROLL EFFECTS (AOS-like)
======================================== */
function initScrollEffects() {
    const elements = document.querySelectorAll('[data-aos]');
    if (elements.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    // Add CSS
    const style = document.createElement('style');
    style.textContent = `
        [data-aos] {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        .aos-animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);

    elements.forEach(element => observer.observe(element));
}

/* ========================================
   SCROLL INDICATORS
======================================== */
function initScrollIndicators() {
    // Skills scroll dots
    const skillsGrid = document.querySelector('.skills-grid');
    const skillsDots = document.querySelectorAll('.skills-scroll-wrapper .scroll-dot');

    if (skillsGrid && skillsDots.length > 0) {
        skillsGrid.addEventListener('scroll', () => {
            const scrollPercentage = (skillsGrid.scrollLeft / (skillsGrid.scrollWidth - skillsGrid.clientWidth)) * 100;
            const activeIndex = Math.round((scrollPercentage / 100) * (skillsDots.length - 1));

            skillsDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        });
    }

    // Projects scroll dots
    const projectsGrid = document.querySelector('.projects-grid');
    const projectsDots = document.querySelectorAll('.projects-scroll-container .scroll-dot');

    if (projectsGrid && projectsDots.length > 0) {
        projectsGrid.addEventListener('scroll', () => {
            const scrollPercentage = (projectsGrid.scrollLeft / (projectsGrid.scrollWidth - projectsGrid.clientWidth)) * 100;
            const activeIndex = Math.round((scrollPercentage / 100) * (projectsDots.length - 1));

            projectsDots.forEach((dot, index) => {
                dot.classList.toggle('active', index === activeIndex);
            });
        });
    }
}

/* ========================================
   UTILIDADES
======================================== */
function updateCurrentYear() {
    const yearElement = document.getElementById('currentYear');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Contador para proyecto Yapa
function initYapaCountdown() {
    const timerElement = document.getElementById('yapa-countdown-timer');
    if (!timerElement) return;

    // Lanzamiento en 3 días (Ajustado al 1 de Junio 2026)
    const launchDate = new Date('2026-06-01T12:00:00').getTime();

    function updateTimer() {
        const now = new Date().getTime();
        const distance = launchDate - now;

        if (distance < 0) {
            timerElement.innerHTML = "¡Ya disponible!";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    updateTimer();
    setInterval(updateTimer, 1000);
}

// Detectar navegación por teclado
function detectKeyboardNavigation() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        document.body.classList.remove('keyboard-navigation');
    });
}

detectKeyboardNavigation();

/* ========================================
   MANEJO DE ERRORES
======================================== */
window.addEventListener('error', (e) => {
    if (CONFIG.DEBUG_MODE) {
        console.error('Error:', e.message);
    }
});

/* ========================================
   PERFORMANCE MONITORING
======================================== */
if (CONFIG.DEBUG_MODE && 'performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Página cargada en ${pageLoadTime}ms`);
    });
}

function initAutoScroll() {
    if (window.innerWidth > 768) return;

    const skillsGrid = document.querySelector('.skills-grid');
    const projectsGrid = document.querySelector('.projects-grid');

    function autoScroll(container, speed = 3000) {
        if (!container) return;

        let scrollAmount = 0;
        const maxScroll = container.scrollWidth - container.clientWidth;
        let direction = 1;

        const scroll = setInterval(() => {
            if (scrollAmount >= maxScroll) {
                direction = -1;
            } else if (scrollAmount <= 0) {
                direction = 1;
            }

            scrollAmount += direction * (container.clientWidth * 0.85);
            container.scrollTo({
                left: scrollAmount,
                behavior: 'smooth'
            });
        }, speed);

        // Pausar al interactuar
        container.addEventListener('touchstart', () => clearInterval(scroll));
        container.addEventListener('mousedown', () => clearInterval(scroll));
    }

    if (skillsGrid) autoScroll(skillsGrid, 4000);
    if (projectsGrid) autoScroll(projectsGrid, 5000);
}