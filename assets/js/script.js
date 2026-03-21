// ===================================================================
// 		NETMAX FIBRA - PÁGINA 
// ===================================================================
// 		Objetivo: Controlar todas as funcionalidades interativas do site
//                da Netmax Fibra, incluindo modais, contador promocional,
//                animações, integração com WhatsApp, analytics e 
//                menu mobile.
// 		Autor : Rodrigo Barbosa
// 		Data  : 23/02/2026
// ===================================================================

console.log("🚀 Netmax Website - Carregado com sucesso!");

// ============================================
// 1. WHATSAPP - CONFIGURAÇÃO CENTRALIZADA
// ============================================

const CONFIG = {
    whatsapp: {
        number: "554399149922",
        message: "Olá! Gostaria de saber mais sobre os planos da Netmax Fibra."
    }
};

function getWhatsAppLink(message = null) {
    const baseUrl = `https://wa.me/${CONFIG.whatsapp.number}`;
    if (message) {
        return `${baseUrl}?text=${encodeURIComponent(message)}`;
    }
    return baseUrl;
}

// ============================================
// 2. ANIMAÇÕES DE SCROLL (REVEAL)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const revealElements = document.querySelectorAll('.benefit-card, .highlight-section, .partner-logo');
    
    const style = document.createElement('style');
    style.textContent = `
        .benefit-card, .highlight-section, .partner-logo {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.6s ease-out;
        }
        
        .revealed {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(style);
    
    const revealOnScroll = function() {
        const windowHeight = window.innerHeight;
        const revealThreshold = 150;
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - revealThreshold) {
                element.classList.add('revealed');
            }
        });
    };
    
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    revealOnScroll();
});

// ============================================
// 3. CONTADOR REGRESSIVO PARA PROMOÇÃO
// ============================================

(function criarContadorPromocao() {
    if (document.querySelector('.promo-counter')) return;
    
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;
    
    const dataAlvo = new Date();
    dataAlvo.setDate(dataAlvo.getDate() + 7);
    
    const counterHTML = `
        <div class="promo-counter">
            <h3>🔥 OFERTA POR TEMPO LIMITADO!</h3>
            <div class="counter-timer">
                <div class="counter-unit">
                    <span class="counter-days">00</span>
                    <span>Dias</span>
                </div>
                <div class="counter-unit">
                    <span class="counter-hours">00</span>
                    <span>Horas</span>
                </div>
                <div class="counter-unit">
                    <span class="counter-minutes">00</span>
                    <span>Min</span>
                </div>
                <div class="counter-unit">
                    <span class="counter-seconds">00</span>
                    <span>Seg</span>
                </div>
            </div>
        </div>
    `;
    
    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
        heroButtons.insertAdjacentHTML('afterend', counterHTML);
    }
    
    const counterStyle = document.createElement('style');
    counterStyle.textContent = `
        .promo-counter {
            text-align: center;
            margin-top: 30px;
            padding: 20px;
            background: linear-gradient(135deg, #FFD000, #FFA500);
            border-radius: 50px;
            box-shadow: 0 10px 30px rgba(255, 208, 0, 0.3);
            animation: pulse-glow 2s infinite;
        }
        
        .promo-counter h3 {
            color: #000;
            margin-bottom: 15px;
            font-size: 1.5rem;
            font-weight: bold;
        }
        
        .counter-timer {
            display: flex;
            justify-content: center;
            gap: 30px;
            flex-wrap: wrap;
        }
        
        .counter-unit {
            display: flex;
            flex-direction: column;
            align-items: center;
            background: rgba(0, 0, 0, 0.8);
            padding: 15px 25px;
            border-radius: 15px;
            min-width: 100px;
        }
        
        .counter-unit span:first-child {
            font-size: 2.5rem;
            font-weight: bold;
            color: #FFD000;
            line-height: 1;
        }
        
        .counter-unit span:last-child {
            font-size: 0.9rem;
            color: #fff;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        @keyframes pulse-glow {
            0% { box-shadow: 0 10px 30px rgba(255, 208, 0, 0.3); }
            50% { box-shadow: 0 10px 50px rgba(255, 208, 0, 0.6); }
            100% { box-shadow: 0 10px 30px rgba(255, 208, 0, 0.3); }
        }
        
        @media (max-width: 768px) {
            .counter-timer { gap: 10px; }
            .counter-unit { padding: 10px 15px; min-width: 70px; }
            .counter-unit span:first-child { font-size: 1.8rem; }
        }
        
        @media (max-width: 480px) {
            .counter-unit { padding: 6px 10px; min-width: 55px; }
            .counter-unit span:first-child { font-size: 1.2rem; }
            .counter-unit span:last-child { font-size: 0.7rem; }
        }
    `;
    document.head.appendChild(counterStyle);
    
    function atualizarContador() {
        const agora = new Date().getTime();
        const distancia = dataAlvo - agora;
        
        if (distancia < 0) {
            dataAlvo.setDate(dataAlvo.getDate() + 7);
            return atualizarContador();
        }
        
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
        
        const daysEl = document.querySelector('.counter-days');
        const hoursEl = document.querySelector('.counter-hours');
        const minutesEl = document.querySelector('.counter-minutes');
        const secondsEl = document.querySelector('.counter-seconds');
        
        if (daysEl) daysEl.textContent = String(dias).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(horas).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutos).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(segundos).padStart(2, '0');
    }
    
    setInterval(atualizarContador, 1000);
    atualizarContador();
})();

// ============================================
// 4. TOOLTIP MELHORADO PARA WHATSAPP
// ============================================

const whatsappTooltip = document.querySelector('.whatsapp-tooltip');
if (whatsappTooltip) {
    const originalText = whatsappTooltip.textContent;
    
    whatsappTooltip.addEventListener('mouseenter', function() {
        this.textContent = 'Fale com um consultor! 📱';
    });
    
    whatsappTooltip.addEventListener('mouseleave', function() {
        this.textContent = originalText;
    });
}

// ============================================
// 5. REGISTRO DE CLIQUES (ANALYTICS)
// ============================================

function registrarClique(elemento, acao) {
    console.log(`📊 Analytics: ${acao} - ${new Date().toLocaleString()}`);
}

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.btn-primary, .whatsapp-float, .assinante-link').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const acao = this.classList.contains('btn-primary') ? 'Botão Assinar' :
                        this.classList.contains('whatsapp-float') ? 'WhatsApp Float' : 'Central Assinante';
            registrarClique(this, acao);
        });
    });
});

// ============================================
// 6. VALIDAÇÃO DE IMAGENS CARREGADAS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const imagens = document.querySelectorAll('img');
    let imagensCarregadas = 0;
    let imagensComErro = 0;
    
    imagens.forEach(img => {
        img.addEventListener('error', function() {
            imagensComErro++;
            console.warn(`⚠️ Imagem não carregou: ${this.src}`);
        });
        
        img.addEventListener('load', function() {
            imagensCarregadas++;
            console.log(`✅ Imagem carregada: ${this.alt || 'sem descrição'}`);
        });
    });
    
    window.addEventListener('load', function() {
        console.log(`📸 Total de imagens: ${imagens.length} | Carregadas: ${imagensCarregadas} | Erros: ${imagensComErro}`);
    });
});

// ============================================
// 7. SCROLL SUAVE PARA LINKS INTERNOS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});

// ============================================
// 8. DETECÇÃO DE DISPOSITIVO MÓVEL
// ============================================

function isMobileDevice() {
    return (window.innerWidth <= 768) ||
           ('ontouchstart' in window) ||
           (navigator.maxTouchPoints > 0) ||
           (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i));
}

if (isMobileDevice()) {
    document.body.classList.add('mobile-device');
    console.log("📱 Dispositivo móvel detectado - Otimizações ativadas");
}

// ============================================
// 9. MENSAGEM DE BOAS-VINDAS NO CONSOLE
// ============================================

console.log('%c🎯 Netmax Fibra - Conectando você ao conhecimento', 'color: #FFD000; font-size: 16px; font-weight: bold;');
console.log('%c📱 WhatsApp configurado: 43 99914-9922', 'color: #25D366; font-size: 14px;');
console.log('%c💡 Dica: Pressione F12 para mais informações', 'color: #888; font-size: 12px;');

// ============================================
// 10. MENU MOBILE (HAMBÚRGUER)
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
            
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
        
        // Fecha o menu ao clicar fora dele (para melhor UX)
        document.addEventListener('click', function(event) {
            if (!navMenu.contains(event.target) && !menuToggle.contains(event.target) && navMenu.classList.contains('show')) {
                navMenu.classList.remove('show');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            }
        });
    }
});

// ============================================
// 11. MODAL DA NETMAX TV - CONTROLE
// ============================================

function abrirModal() {
    const modal = document.getElementById('tvModal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

function fecharModal() {
    const modal = document.getElementById('tvModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }
}

// ============================================
// 12. MODAL DE ATIVAÇÃO - CONTROLE
// ============================================

function abrirModalAtivacao() {
    const modal = document.getElementById('tvAtivacaoModal');
    if (modal) {
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
        document.body.style.overflow = 'hidden';
    }
}

function fecharModalAtivacao() {
    const modal = document.getElementById('tvAtivacaoModal');
    if (modal) {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 300);
        document.body.style.overflow = '';
    }
}

// ============================================
// 13. FECHAR MODAIS CLICANDO NA ÁREA ESCURA
// ============================================

window.addEventListener('click', function(event) {
    const modalOriginal = document.getElementById('tvModal');
    if (event.target === modalOriginal) {
        fecharModal();
    }
    
    const modalAtivacao = document.getElementById('tvAtivacaoModal');
    if (event.target === modalAtivacao) {
        fecharModalAtivacao();
    }
});

// ============================================
// 14. OTIMIZAÇÃO DE PERFORMANCE PARA SCROLL
// ============================================

let ticking = false;
const optimizedRevealOnScroll = function() {
    if (!ticking) {
        window.requestAnimationFrame(function() {
            const revealElements = document.querySelectorAll('.benefit-card, .highlight-section, .partner-logo');
            const windowHeight = window.innerHeight;
            const revealThreshold = 150;
            
            revealElements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                if (elementTop < windowHeight - revealThreshold && !element.classList.contains('revealed')) {
                    element.classList.add('revealed');
                }
            });
            ticking = false;
        });
        ticking = true;
    }
};

window.addEventListener('scroll', optimizedRevealOnScroll);
window.addEventListener('resize', optimizedRevealOnScroll);

// ============================================
// 15. PREVENIR CLIQUE EM LINKS QUEBRADOS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('a[href="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            console.warn('⚠️ Link não configurado:', this.textContent);
        });
    });
});

// ============================================
// 16. LAZY LOADING OTIMIZADO PARA IMAGENS
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
