/* ========================================
   PORTFOLIO - MAIN JAVASCRIPT
   Author: Eider Sánchez Montalvo
   Year: 2025
======================================== */

'use strict';

/* ========================================
   CONFIGURACIÓN DE CERTIFICACIONES
======================================== */
const certificationsData = {
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
        image: 'assets/images/certifications/oracle-dev.jpg',
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
   DOM CONTENT LOADED
======================================== */
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar todos los componentes
    initNavigation();
    initCertifications();
    initAnimations();
    initBackToTop();
    updateCurrentYear();
    initTypingAnimation();
    initScrollEffects();
    initSkillsSlider();
    initProjectsSlider();
});

/* ========================================
   NAVEGACIÓN
======================================== */
function initNavigation() {
    const header = document.getElementById('header');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id]');

    // Navegación sticky y scroll effects
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        // Header sticky con efecto al scroll
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active nav links según la sección visible
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
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

    // Menú móvil toggle
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
            
            const expanded = navToggle.getAttribute('aria-expanded') === 'true';
            navToggle.setAttribute('aria-expanded', !expanded);
            
            // Prevenir scroll cuando el menú está abierto
            document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
        });

        // Cerrar menú al hacer click en un link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            });
        });

        // Cerrar menú al hacer click fuera
        document.addEventListener('click', (e) => {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target)) {
                navMenu.classList.remove('active');
                navToggle.classList.remove('active');
                navToggle.setAttribute('aria-expanded', 'false');
                document.body.style.overflow = '';
            }
        });
    }

    // Scroll suave para todos los enlaces con ancla
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

/* ========================================
   MODAL DE CERTIFICACIONES
======================================== */
function initCertifications() {
    const certItems = document.querySelectorAll('.cert-item');
    const certModal = document.getElementById('certModal');
    const certModalOverlay = document.getElementById('certModalOverlay');
    const certModalClose = document.getElementById('certModalClose');
    const certImage = document.getElementById('certImage');
    const certModalTitle = document.getElementById('certModalTitle');
    const certDescription = document.getElementById('certDescription');
    const certDate = document.getElementById('certDate');

    if (!certModal) return;

    // Abrir modal al hacer click en certificación
    certItems.forEach(item => {
        item.addEventListener('click', function() {
            const certId = this.getAttribute('data-cert');
            const certData = certificationsData[certId];

            if (certData) {
                // Actualizar contenido del modal
                certModalTitle.textContent = certData.title;
                certImage.src = certData.image;
                certImage.alt = certData.title;
                certDescription.textContent = certData.description;
                certDate.textContent = `${certData.institution} - ${certData.date}`;

                // Mostrar modal
                certModal.classList.add('active');
                document.body.style.overflow = 'hidden';

                // Agregar evento de carga de imagen
                certImage.onerror = function() {
                    this.style.display = 'none';
                    const placeholder = document.createElement('div');
                    placeholder.className = 'cert-image-placeholder';
                    placeholder.innerHTML = '<i class="fas fa-certificate"></i><p>Imagen no disponible</p>';
                    this.parentNode.appendChild(placeholder);
                };
            }
        });
    });

    // Función para cerrar modal
    function closeModal() {
        certModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Cerrar modal con botón X
    if (certModalClose) {
        certModalClose.addEventListener('click', closeModal);
    }

    // Cerrar modal al hacer click en el overlay
    if (certModalOverlay) {
        certModalOverlay.addEventListener('click', closeModal);
    }

    // Cerrar modal con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && certModal.classList.contains('active')) {
            closeModal();
        }
    });
}

/* ========================================
   ANIMACIÓN DE NÚMEROS (STATS)
======================================== */
function initAnimations() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    if (statNumbers.length === 0) return;

    const animateNumber = (element) => {
        const target = parseInt(element.getAttribute('data-count'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const updateNumber = () => {
            current += increment;
            if (current < target) {
                element.textContent = Math.floor(current);
                requestAnimationFrame(updateNumber);
            } else {
                // Agregar el "+" para números mayores a 1
                element.textContent = target + (target > 1 ? '+' : '');
            }
        };
        
        updateNumber();
    };

    // Intersection Observer para animar cuando sea visible
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target.querySelector('.stat-number');
                if (statNumber && !statNumber.classList.contains('animated')) {
                    statNumber.classList.add('animated');
                    animateNumber(statNumber);
                }
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observar todas las tarjetas de stats
    document.querySelectorAll('.stat-card').forEach(card => {
        statsObserver.observe(card);
    });
}

/* ========================================
   BOTÓN BACK TO TOP
======================================== */
function initBackToTop() {
    const backToTop = document.getElementById('backToTop');
    
    if (!backToTop) return;

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });

    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/* ========================================
   ACTUALIZAR AÑO ACTUAL
======================================== */
function updateCurrentYear() {
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
}

/* ========================================
   ANIMACIÓN DE TYPING
======================================== */
function initTypingAnimation() {
    const typingElement = document.querySelector('.typing-animation');
    
    if (!typingElement) return;

    const words = [
        'Desarrollador de Software Junior',
        'Backend Developer',
        'Estudiante de Ingeniería',
        'Tech Enthusiast'
    ];
    
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            typingElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typingSpeed = 50;
        } else {
            typingElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typingSpeed = 100;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            // Palabra completa, esperar antes de borrar
            typingSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            // Palabra borrada completamente
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
    }

    // Iniciar la animación
    type();
}

/* ========================================
   EFECTOS DE SCROLL (AOS-like)
======================================== */
function initScrollEffects() {
    const elementsToAnimate = document.querySelectorAll('[data-aos]');
    
    if (elementsToAnimate.length === 0) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        scrollObserver.observe(element);
    });

    // Agregar clase cuando se anima
    const style = document.createElement('style');
    style.textContent = `
        .aos-animate {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
    document.head.appendChild(style);
}

/* ========================================
   LAZY LOADING DE IMÁGENES
======================================== */
function initLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });

        images.forEach(img => imageObserver.observe(img));
    }
}

/* ========================================
   PRELOADER (Opcional)
======================================== */
function initPreloader() {
    const preloader = document.getElementById('preloader');
    
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.style.opacity = '0';
                setTimeout(() => {
                    preloader.style.display = 'none';
                }, 300);
            }, 500);
        });
    }
}

/* ========================================
   DETECCIÓN DE SCROLL DIRECTION
======================================== */
let lastScrollTop = 0;

function detectScrollDirection() {
    const header = document.getElementById('header');
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 100) {
        // Scrolling down
        header.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        header.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
}

// Opcional: descomentar si quieres ocultar el header al hacer scroll down
// window.addEventListener('scroll', detectScrollDirection);

/* ========================================
   MANEJO DE ERRORES GLOBAL
======================================== */
window.addEventListener('error', function(e) {
    console.error('Error detectado:', e.message);
    // Aquí podrías agregar un sistema de logging o notificaciones
});

/* ========================================
   PERFORMANCE MONITORING
======================================== */
if ('performance' in window) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`⚡ Página cargada en ${pageLoadTime}ms`);
    });
}

/* ========================================
   UTILIDADES ADICIONALES
======================================== */

// Detectar modo de navegación (teclado vs mouse)
function detectNavigationMode() {
    let usingKeyboard = false;

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Tab') {
            usingKeyboard = true;
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', () => {
        usingKeyboard = false;
        document.body.classList.remove('keyboard-navigation');
    });
}

detectNavigationMode();

// Copiar email al clipboard (función de utilidad)
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Email copiado al portapapeles');
        }).catch(err => {
            console.error('Error al copiar:', err);
        });
    } else {
        // Fallback para navegadores antiguos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showNotification('Email copiado al portapapeles');
        } catch (err) {
            console.error('Error al copiar:', err);
        }
        document.body.removeChild(textArea);
    }
}

// Mostrar notificación temporal
function showNotification(message, duration = 3000) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, var(--color-primary), var(--color-secondary));
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 0.5rem;
        box-shadow: 0 10px 25px rgba(0,0,0,0.3);
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, duration);
}

// Agregar animaciones CSS para notificaciones
const notificationStyles = document.createElement('style');
notificationStyles.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(notificationStyles);

/* ========================================
   EXPORTAR FUNCIONES (si es necesario)
======================================== */
// Si usas módulos ES6, puedes exportar funciones aquí
// export { copyToClipboard, showNotification };

/* ========================================
   DEBUG MODE (Solo desarrollo)
======================================== */
const DEBUG_MODE = false; // Cambiar a false en producción

if (DEBUG_MODE) {
    console.log('🚀 Portfolio inicializado');
    console.log('📱 Ancho de ventana:', window.innerWidth);
    console.log('📊 Stats encontrados:', document.querySelectorAll('.stat-number').length);
    console.log('🎓 Certificaciones:', Object.keys(certificationsData).length);
}

/* ========================================
   SKILLS SLIDER
======================================== */
function initSkillsSlider() {
    const slider = document.getElementById('skillsSlider');
    const container = slider?.querySelector('.skills-container');
    const prevBtn = document.getElementById('skillsPrev');
    const nextBtn = document.getElementById('skillsNext');
    const dotsContainer = document.getElementById('skillsDots');
    
    if (!slider || !container) return;
    
    const categories = container.querySelectorAll('.skill-category');
    let currentIndex = 0;
    let itemsPerView = 4;
    let startX = 0;
    let isDragging = false;
    
    // Determine items per view based on screen size
    function updateItemsPerView() {
        const width = window.innerWidth;
        if (width <= 480) {
            itemsPerView = 1;
        } else if (width <= 768) {
            itemsPerView = 1;
        } else if (width <= 1024) {
            itemsPerView = 2;
        } else {
            itemsPerView = 4;
        }
        updateSlider();
    }
    
    // Update slider position
    function updateSlider() {
        const totalPages = Math.ceil(categories.length / itemsPerView);
        currentIndex = Math.min(currentIndex, totalPages - 1);
        
        const translateX = -(currentIndex * 100);
        container.style.transform = `translateX(${translateX}%)`;
        
        // Update buttons state
        if (prevBtn && nextBtn) {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= totalPages - 1;
        }
        
        // Update dots
        updateDots(totalPages);
    }
    
    // Create and update dots
    function updateDots(totalPages) {
        if (!dotsContainer) return;
        
        dotsContainer.innerHTML = '';
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.className = `slider-dot ${i === currentIndex ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Ir a página ${i + 1}`);
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        }
    }
    
    // Navigation handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(categories.length / itemsPerView);
            if (currentIndex < totalPages - 1) {
                currentIndex++;
                updateSlider();
            }
        });
    }
    
    // Touch events for mobile
    slider.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    });
    
    slider.addEventListener('touchmove', (e) => {
        if (!isDragging) return;
    });
    
    slider.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        isDragging = false;
        
        const endX = e.changedTouches[0].clientX;
        const diff = startX - endX;
        const totalPages = Math.ceil(categories.length / itemsPerView);
        
        if (Math.abs(diff) > 50) {
            if (diff > 0 && currentIndex < totalPages - 1) {
                currentIndex++;
            } else if (diff < 0 && currentIndex > 0) {
                currentIndex--;
            }
            updateSlider();
        }
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        const totalPages = Math.ceil(categories.length / itemsPerView);
        if (e.key === 'ArrowLeft' && currentIndex > 0) {
            currentIndex--;
            updateSlider();
        } else if (e.key === 'ArrowRight' && currentIndex < totalPages - 1) {
            currentIndex++;
            updateSlider();
        }
    });
    
    // Resize handler
    window.addEventListener('resize', updateItemsPerView);
    
    // Initialize
    updateItemsPerView();
}

/* ========================================
   PROJECTS SLIDER (Mobile Only)
======================================== */
function initProjectsSlider() {
    const slider = document.getElementById('projectsSlider');
    const prevBtn = document.querySelector('.projects-prev');
    const nextBtn = document.querySelector('.projects-next');
    const dotsContainer = document.getElementById('projectsDots');
    
    if (!slider) return;
    
    const projects = slider.querySelectorAll('.project-card');
    let currentIndex = 0;
    
    // Only activate on mobile (≤768px)
    function checkMobile() {
        return window.innerWidth <= 768;
    }
    
    // Update slider position
    function updateSlider() {
        if (!checkMobile()) return;
        
        slider.scrollTo({
            left: currentIndex * slider.offsetWidth,
            behavior: 'smooth'
        });
        
        // Update buttons
        if (prevBtn && nextBtn) {
            prevBtn.disabled = currentIndex === 0;
            nextBtn.disabled = currentIndex >= projects.length - 1;
        }
        
        // Update dots
        updateDots();
    }
    
    // Create and update dots
    function updateDots() {
        if (!dotsContainer || !checkMobile()) return;
        
        dotsContainer.innerHTML = '';
        projects.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.className = `slider-dot ${i === currentIndex ? 'active' : ''}`;
            dot.setAttribute('aria-label', `Ir al proyecto ${i + 1}`);
            dot.addEventListener('click', () => {
                currentIndex = i;
                updateSlider();
            });
            dotsContainer.appendChild(dot);
        });
    }
    
    // Navigation handlers
    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentIndex > 0) {
                currentIndex--;
                updateSlider();
            }
        });
    }
    
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentIndex < projects.length - 1) {
                currentIndex++;
                updateSlider();
            }
        });
    }
    
    // Scroll sync
    let scrollTimeout;
    slider.addEventListener('scroll', () => {
        if (!checkMobile()) return;
        
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            const newIndex = Math.round(slider.scrollLeft / slider.offsetWidth);
            if (newIndex !== currentIndex) {
                currentIndex = newIndex;
                updateDots();
                
                // Update buttons
                if (prevBtn && nextBtn) {
                    prevBtn.disabled = currentIndex === 0;
                    nextBtn.disabled = currentIndex >= projects.length - 1;
                }
            }
        }, 100);
    });
    
    // Initialize if mobile
    if (checkMobile()) {
        updateDots();
        if (prevBtn) prevBtn.disabled = true;
    }
    
    // Resize handler
    window.addEventListener('resize', () => {
        if (checkMobile()) {
            currentIndex = 0;
            updateSlider();
        } else {
            if (dotsContainer) dotsContainer.innerHTML = '';
        }
    });
}
