// ScheduleX Landing Page JavaScript

// Smooth scrolling para links internos
function scrollToSection(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Sistema de notificações
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'} me-2"></i>
            <span>${message}</span>
        </div>
    `;
    
    document.body.appendChild(notification);
    
    // Animar entrada
    setTimeout(() => notification.classList.add('show'), 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 5000);
}

// Animação de contadores
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');
    let animated = false;
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !animated) {
                animated = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-target'));
                    if (!isNaN(target)) {
                        const increment = target / 100;
                        let current = 0;
                        
                        const updateCounter = () => {
                            if (current < target) {
                                current += increment;
                                counter.textContent = Math.ceil(current) + (counter.textContent.includes('+') ? '+' : '');
                                requestAnimationFrame(updateCounter);
                            } else {
                                counter.textContent = target + (counter.textContent.includes('+') ? '+' : '');
                            }
                        };
                        
                        updateCounter();
                    }
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        observer.observe(heroSection);
    }
    
    // Also observe demo section for demo counters
    const demoSection = document.querySelector('.demo-section');
    if (demoSection) {
        observer.observe(demoSection);
    }
}

// Envio do formulário para WhatsApp
function sendToWhatsApp(formData) {
    const phoneNumber = '5583991791407'; // Substitua pelo número real
    const message = `
🔄 *Nova Solicitação - ScheduleX*

👤 *Nome:* ${formData.name}
📧 *Email:* ${formData.email}
📱 *Telefone:* ${formData.phone}
🏢 *Tipo de Negócio:* ${formData.business}
💬 *Mensagem:* ${formData.message || 'Não informado'}

---
*Enviado via ScheduleX Landing Page*
    `.trim();
    
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
}

// Validação do formulário
function validateForm(formData) {
    const requiredFields = ['name', 'email', 'phone', 'business'];
    
    for (const field of requiredFields) {
        if (!formData[field] || formData[field].trim() === '') {
            showNotification(`Por favor, preencha o campo ${field === 'name' ? 'Nome' : field === 'email' ? 'Email' : field === 'phone' ? 'Telefone' : 'Tipo de Negócio'}`, 'error');
            return false;
        }
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        showNotification('Por favor, insira um email válido', 'error');
        return false;
    }
    
    // Validação de telefone (formato brasileiro)
    const phoneRegex = /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}\-?[0-9]{4}$/;
    if (!phoneRegex.test(formData.phone.replace(/\D/g, ''))) {
        showNotification('Por favor, insira um telefone válido', 'error');
        return false;
    }
    
    return true;
}

// Máscara para telefone
function applyPhoneMask(input) {
    let value = input.value.replace(/\D/g, '');
    
    if (value.length <= 11) {
        value = value.replace(/(\d{2})(\d)/, '($1) $2');
        value = value.replace(/(\d{5})(\d)/, '$1-$2');
        value = value.replace(/(\d{4})(\d)/, '$1-$2');
    }
    
    input.value = value;
}

// Intersection Observer para animações
let observer;
let imageObserver;

// Inicializar observers
function initObservers() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                
                // Animar contadores quando a seção hero estiver visível
                if (entry.target.classList.contains('hero-section')) {
                    setTimeout(animateCounters, 500);
                }
            }
        });
    }, observerOptions);

    // Lazy loading para imagens
    imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });
}

// Mobile menu toggle
function toggleMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Prevenir scroll do body quando menu está aberto
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    }
}

// Parallax effect para hero section
function initParallax() {
    const heroSection = document.querySelector('.hero-section');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            heroSection.style.transform = `translateY(${rate}px)`;
        });
    }
}

// Performance optimization: Debounce scroll events
let scrollTimeout;
function debounceScroll() {
    if (scrollTimeout) {
        clearTimeout(scrollTimeout);
    }
    scrollTimeout = setTimeout(() => {
        // Scroll-based actions here
    }, 100);
}

// Testimonials carousel
function initTestimonialsCarousel() {
    let currentTestimonial = 0;
    const testimonials = document.querySelectorAll('.testimonial-card');
    
    if (testimonials.length > 1) {
        const showTestimonial = (index) => {
            testimonials.forEach((testimonial, i) => {
                testimonial.style.display = i === index ? 'block' : 'none';
            });
        };
        
        // Auto-rotate testimonials
        setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }, 5000);
    }
}

// SEO Optimization: Add structured data
function addStructuredData() {
    const structuredData = {
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "ScheduleX",
        "description": "Soluções de agendamento personalizadas para consultórios clínicos e salões de beleza",
        "url": "https://ScheduleX.com.br",
        "logo": "https://ScheduleX.com.br/images/logo.png",
        "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+55-11-99999-9999",
            "contactType": "customer service",
            "email": "contato@ScheduleX.com"
        },
        "sameAs": [
            "https://linkedin.com/company/ScheduleX",
            "https://facebook.com/ScheduleX",
            "https://instagram.com/ScheduleX"
        ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(structuredData);
    document.head.appendChild(script);
}

// Inicialização quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', function() {
    
    // Adicionar listeners para botões de scroll
    document.querySelectorAll('[data-scroll]').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const target = button.getAttribute('data-scroll');
            scrollToSection(target);
        });
    });
    
    // Adicionar listeners para botões com onclick
    document.querySelectorAll('button[onclick]').forEach(button => {
        const onclick = button.getAttribute('onclick');
        if (onclick.includes('scrollToSection')) {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const target = onclick.match(/scrollToSection\('([^']+)'\)/)[1];
                scrollToSection('#' + target);
            });
        }
    });

    // Observar elementos para animação
    document.querySelectorAll('.product-card, .benefit-card, .testimonial-card, .hero-section').forEach(el => {
        if (observer) {
            observer.observe(el);
        }
    });

    // Formulário de contato
    const contactForm = document.getElementById('whatsappForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const formData = {
                name: this.querySelector('#name').value.trim(),
                email: this.querySelector('#email').value.trim(),
                phone: this.querySelector('#phone').value.trim(),
                business: this.querySelector('#business').value,
                message: this.querySelector('#message').value.trim()
            };
            
            if (validateForm(formData)) {
                const submitBtn = this.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Enviando...';
                submitBtn.disabled = true;
                
                // Simular delay de processamento
                setTimeout(() => {
                    sendToWhatsApp(formData);
                    showNotification('Formulário enviado! Redirecionando para WhatsApp...', 'success');
                    this.reset();
                    submitBtn.innerHTML = originalText;
                    submitBtn.disabled = false;
                }, 1000);
            }
        });
    }

    // Máscara para telefone
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
        phoneInput.addEventListener('input', function() {
            applyPhoneMask(this);
        });
    }

    // Video placeholder click handler
    const videoPlaceholder = document.querySelector('.video-placeholder');
    if (videoPlaceholder) {
        videoPlaceholder.addEventListener('click', function() {
            showNotification('Demonstração em desenvolvimento. Em breve disponível!', 'info');
        });
    }

    // Mobile menu toggle
    const mobileMenuToggle = document.querySelector('.hamburger');
    if (mobileMenuToggle) {
        mobileMenuToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Fechar menu mobile quando um link for clicado
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            const navMenu = document.querySelector('.nav-menu');
            const hamburger = document.querySelector('.hamburger');
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    });
    
    // Fechar menu mobile quando clicar fora dele
    document.addEventListener('click', (e) => {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !hamburger.contains(e.target)) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Lazy loading para imagens
    const lazyImages = document.querySelectorAll('img[data-src]');
    if (imageObserver) {
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Inicializar funcionalidades
    initObservers();
    initParallax();
    initTestimonialsCarousel();
    addStructuredData();
    
    // Iniciar animação dos contadores (será executada quando visível)
    animateCounters();

    // Performance optimization: Debounce scroll events
    window.addEventListener('scroll', debounceScroll);

    // Adicionar CSS para notificações
    const notificationStyles = `
        <style>
            .notification {
                position: fixed;
                top: 2rem;
                right: 2rem;
                z-index: 1000;
                padding: 1rem 1.5rem;
                border-radius: 12px;
                box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
                transform: translateX(100%);
                transition: transform 0.3s ease;
                max-width: 400px;
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification-success {
                background: #d4edda;
                color: #155724;
                border: 1px solid #c3e6cb;
            }
            
            .notification-error {
                background: #f8d7da;
                color: #721c24;
                border: 1px solid #f5c6cb;
            }
            
            .notification-info {
                background: #d1ecf1;
                color: #0c5460;
                border: 1px solid #bee5eb;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
            }
            
            .animate-in {
                animation: fadeInUp 0.6s ease forwards;
            }
            
            @keyframes fadeInUp {
                from {
                    opacity: 0;
                    transform: translateY(30px);
                }
                to {
                    opacity: 1;
                    transform: translateY(0);
                }
            }
            
            .lazy {
                opacity: 0;
                transition: opacity 0.3s;
            }
            
            .lazy.loaded {
                opacity: 1;
            }

            .spinner-border {
                display: inline-block;
                width: 1rem;
                height: 1rem;
                vertical-align: text-bottom;
                border: 0.125em solid currentColor;
                border-right-color: transparent;
                border-radius: 50%;
                animation: spinner-border 0.75s linear infinite;
            }

            @keyframes spinner-border {
                to {
                    transform: rotate(360deg);
                }
            }

            .me-2 {
                margin-right: 0.5rem;
            }

            /* Mobile menu styles */
            @media (max-width: 768px) {
                .nav-menu {
                    position: fixed;
                    left: -100%;
                    top: 70px;
                    flex-direction: column;
                    background-color: white;
                    width: 100%;
                    text-align: center;
                    transition: 0.3s;
                    box-shadow: 0 10px 27px rgba(0, 0, 0, 0.05);
                    padding: 2rem 0;
                }

                .nav-menu.active {
                    left: 0;
                }

                .hamburger.active span:nth-child(2) {
                    opacity: 0;
                }

                .hamburger.active span:nth-child(1) {
                    transform: translateY(8px) rotate(45deg);
                }

                .hamburger.active span:nth-child(3) {
                    transform: translateY(-8px) rotate(-45deg);
                }
            }
        </style>
    `;
    
    document.head.insertAdjacentHTML('beforeend', notificationStyles);
});

// Back to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Show/hide back to top button
window.addEventListener('scroll', function() {
    const backToTopButton = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTopButton.classList.add('show');
    } else {
        backToTopButton.classList.remove('show');
    }
});

// Demo tab switching functionality
function switchDemoTab(tabName) {
    console.log('Switching to tab:', tabName);
    
    // Remove active class from all tabs and panes
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelectorAll('.tab-pane').forEach(pane => {
        pane.classList.remove('active');
    });
    
    // Add active class to selected tab and pane
    const selectedTab = document.querySelector(`[data-tab="${tabName}"]`);
    const selectedPane = document.getElementById(`${tabName}-tab`);
    
    if (selectedTab && selectedPane) {
        selectedTab.classList.add('active');
        selectedPane.classList.add('active');
        console.log('Tab switched successfully');
    } else {
        console.error('Tab or pane not found:', tabName);
    }
}

// Expor funções globalmente para uso em HTML
window.scrollToSection = scrollToSection;
window.showNotification = showNotification;
window.scrollToTop = scrollToTop;
window.switchDemoTab = switchDemoTab;

// Add event listeners for demo tab buttons
document.addEventListener('DOMContentLoaded', function() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabName = this.getAttribute('data-tab');
            switchDemoTab(tabName);
        });
    });
});

// LGPD Modal Functions
window.openLgpdModal = function() {
    const modal = document.getElementById('lgpdModal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
};

window.closeLgpdModal = function() {
    const modal = document.getElementById('lgpdModal');
    modal.style.display = 'none';
    document.body.style.overflow = '';
};

// Cookie Banner Functions
window.acceptCookies = function() {
    localStorage.setItem('cookiesAccepted', 'true');
    const banner = document.getElementById('cookieBanner');
    banner.classList.remove('show');
    showNotification('Cookies aceitos com sucesso!', 'success');
};

window.rejectCookies = function() {
    localStorage.setItem('cookiesAccepted', 'false');
    const banner = document.getElementById('cookieBanner');
    banner.classList.remove('show');
    showNotification('Cookies recusados. Algumas funcionalidades podem não funcionar corretamente.', 'warning');
};

// Show cookie banner if not previously accepted
setTimeout(() => {
    if (!localStorage.getItem('cookiesAccepted')) {
        const banner = document.getElementById('cookieBanner');
        banner.classList.add('show');
    }
}, 2000);

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    const modal = document.getElementById('lgpdModal');
    if (e.target === modal) {
        closeLgpdModal();
    }
});

// Close modal with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLgpdModal();
    }
});

// Image loading optimization and fallbacks
document.addEventListener('DOMContentLoaded', function() {
    // Handle testimonial images
    const testimonialImages = document.querySelectorAll('.testimonial-author img');
    
    testimonialImages.forEach(img => {
        img.addEventListener('error', function() {
            // Hide the image and adjust layout
            this.style.display = 'none';
            const authorInfo = this.nextElementSibling;
            if (authorInfo) {
                authorInfo.style.marginLeft = '0';
            }
        });
        
        img.addEventListener('load', function() {
            // Add a subtle animation when image loads
            this.style.opacity = '0';
            this.style.transition = 'opacity 0.3s ease';
            setTimeout(() => {
                this.style.opacity = '1';
            }, 100);
        });
    });
    
    // Lazy loading for images
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.remove('lazy');
                observer.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});
