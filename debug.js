// Debug script para ScheduleExpress Landing Page

console.log('Debug script carregado');

// Verificar se as funções estão disponíveis
window.addEventListener('load', function() {
    console.log('Página carregada completamente');
    
    // Verificar funções principais
    console.log('scrollToSection disponível:', typeof scrollToSection);
    console.log('toggleMobileMenu disponível:', typeof toggleMobileMenu);
    console.log('showNotification disponível:', typeof showNotification);
    
    // Verificar elementos importantes
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const contactForm = document.getElementById('whatsappForm');
    
    console.log('Hamburger encontrado:', !!hamburger);
    console.log('Nav menu encontrado:', !!navMenu);
    console.log('Formulário encontrado:', !!contactForm);
    
    // Verificar botões
    const buttons = document.querySelectorAll('button[onclick]');
    console.log('Botões com onclick encontrados:', buttons.length);
    
    buttons.forEach((button, index) => {
        console.log(`Botão ${index + 1}:`, button.getAttribute('onclick'));
    });
    
    // Testar scroll
    if (typeof scrollToSection === 'function') {
        console.log('Função scrollToSection está funcionando');
    } else {
        console.error('Função scrollToSection não está disponível');
    }
    
    // Testar menu mobile
    if (typeof toggleMobileMenu === 'function') {
        console.log('Função toggleMobileMenu está funcionando');
    } else {
        console.error('Função toggleMobileMenu não está disponível');
    }
});

// Capturar erros globais
window.addEventListener('error', function(e) {
    console.error('Erro capturado:', e.error);
    console.error('Arquivo:', e.filename);
    console.error('Linha:', e.lineno);
    console.error('Coluna:', e.colno);
});

// Capturar erros de promise
window.addEventListener('unhandledrejection', function(e) {
    console.error('Promise rejeitada:', e.reason);
}); 