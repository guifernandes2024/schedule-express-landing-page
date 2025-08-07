// Debug script para verificar problemas no mobile
console.log('Debug script carregado');

// Verificar se os elementos existem
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM carregado');
    
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const counters = document.querySelectorAll('.stat-number');
    
    console.log('Hamburger:', hamburger);
    console.log('Nav Menu:', navMenu);
    console.log('Counters:', counters.length);
    
    // Verificar se o hamburger tem event listener
    if (hamburger) {
        console.log('Hamburger encontrado, adicionando listener');
        hamburger.addEventListener('click', function() {
            console.log('Hamburger clicado');
            console.log('Menu antes:', navMenu.classList.contains('active'));
            toggleMobileMenu();
            console.log('Menu depois:', navMenu.classList.contains('active'));
        });
    }
    
    // Verificar contadores
    counters.forEach((counter, index) => {
        console.log(`Counter ${index}:`, counter.textContent, 'Target:', counter.getAttribute('data-target'));
    });
    
    // Verificar se a função animateCounters existe
    if (typeof animateCounters === 'function') {
        console.log('Função animateCounters encontrada');
    } else {
        console.log('ERRO: Função animateCounters não encontrada');
    }
    
    // Verificar se a função toggleMobileMenu existe
    if (typeof toggleMobileMenu === 'function') {
        console.log('Função toggleMobileMenu encontrada');
    } else {
        console.log('ERRO: Função toggleMobileMenu não encontrada');
    }
    
    // Verificar CSS aplicado
    const computedStyle = window.getComputedStyle(navMenu);
    console.log('Nav menu display:', computedStyle.display);
    console.log('Nav menu position:', computedStyle.position);
    console.log('Nav menu z-index:', computedStyle.zIndex);
});

// Função para testar animação dos contadores
function testCounterAnimation() {
    console.log('Testando animação dos contadores');
    if (typeof animateCounters === 'function') {
        animateCounters();
    }
}

// Função para testar menu mobile
function testMobileMenu() {
    console.log('Testando menu mobile');
    if (typeof toggleMobileMenu === 'function') {
        toggleMobileMenu();
    }
}

// Expor funções para teste no console
window.testCounterAnimation = testCounterAnimation;
window.testMobileMenu = testMobileMenu; 