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

// ============================================
// NETMAX FIBRA - SCRIPT PRINCIPAL
// ============================================

// Exibe mensagem no console indicando que o site foi carregado com sucesso
console.log("🚀 Netmax Website - Carregado com sucesso!");

// ============================================
// 1. WHATSAPP - CONFIGURAÇÃO CENTRALIZADA
// ============================================

// Objeto de configuração global contendo todas as constantes do site
const CONFIG = {
    whatsapp: {
        number: "554399149922", // Número do WhatsApp no formato internacional (55=BR, 43=DDD, 99149922=telefone)
        message: "Olá! Gostaria de saber mais sobre os planos da Netmax Fibra." // Mensagem padrão para contato
    }
};

// Função para gerar link do WhatsApp
// Parâmetro message (opcional): mensagem personalizada para enviar
// Retorna: URL completa para abrir conversa no WhatsApp
function getWhatsAppLink(message = null) {
    const baseUrl = `https://wa.me/${CONFIG.whatsapp.number}`; // URL base com o número
    if (message) {
        return `${baseUrl}?text=${encodeURIComponent(message)}`; // Adiciona mensagem codificada à URL
    }
    return baseUrl; // Retorna apenas a URL base se não houver mensagem
}

// ============================================
// 2. ANIMAÇÕES DE SCROLL (REVEAL)
// ============================================

// Aguarda o carregamento completo do DOM antes de executar
document.addEventListener('DOMContentLoaded', function() {
    
    // Seleciona todos os elementos que devem aparecer com animação durante o scroll
    const revealElements = document.querySelectorAll('.benefit-card, .highlight-section, .partner-logo');
    
    // Cria e adiciona um estilo CSS para controlar as animações
    const style = document.createElement('style');
    style.textContent = `
        .benefit-card, .highlight-section, .partner-logo {
            opacity: 0;                    /* Começa invisível */
            transform: translateY(30px);    /* Deslocado 30px para baixo */
            transition: all 0.6s ease-out;  /* Animação suave de 0.6s */
        }
        
        .revealed {
            opacity: 1;                     /* Fica visível */
            transform: translateY(0);        /* Volta à posição original */
        }
    `;
    document.head.appendChild(style); // Adiciona o estilo ao head do documento
    
    // Função que verifica quais elementos devem ser revelados baseado na posição do scroll
    const revealOnScroll = function() {
        const windowHeight = window.innerHeight; // Altura visível da janela
        const revealThreshold = 150; // Distância da borda para ativar a revelação
        
        // Percorre todos os elementos que devem ser revelados
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top; // Posição do topo do elemento
            
            // Se o elemento está próximo de entrar na tela, revela-o
            if (elementTop < windowHeight - revealThreshold) {
                element.classList.add('revealed');
            }
        });
    };
    
    // Adiciona listeners para verificar a posição durante o scroll e ao carregar
    window.addEventListener('scroll', revealOnScroll);
    window.addEventListener('load', revealOnScroll);
    revealOnScroll(); // Executa imediatamente para revelar elementos já visíveis
});

// ============================================
// 3. CONTADOR REGRESSIVO PARA PROMOÇÃO
// ============================================

// Função auto-executável para criar o contador promocional
(function criarContadorPromocao() {
    // Verifica se já existe um contador na página para não duplicar
    if (document.querySelector('.promo-counter')) return;
    
    // Seleciona a seção hero (principal) do site
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return; // Sai da função se não encontrar a seção hero
    
    // Define a data alvo: 7 dias a partir da data atual
    const dataAlvo = new Date();
    dataAlvo.setDate(dataAlvo.getDate() + 7);
    
    // HTML do contador promocional
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
    
    // Insere o contador após os botões da seção hero
    const heroButtons = document.querySelector('.hero-buttons');
    if (heroButtons) {
        heroButtons.insertAdjacentHTML('afterend', counterHTML);
    }
    
    // Estilo CSS do contador promocional
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
    `;
    document.head.appendChild(counterStyle); // Adiciona o estilo ao head
    
    // Função que atualiza os valores do contador
    function atualizarContador() {
        const agora = new Date().getTime(); // Timestamp atual
        const distancia = dataAlvo - agora; // Diferença em milissegundos
        
        if (distancia < 0) {
            // Se passou da data, reinicia para mais 7 dias
            dataAlvo.setDate(dataAlvo.getDate() + 7);
            return atualizarContador();
        }
        
        // Calcula dias, horas, minutos e segundos restantes
        const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
        const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
        const segundos = Math.floor((distancia % (1000 * 60)) / 1000);
        
        // Seleciona os elementos HTML que mostram os valores
        const daysEl = document.querySelector('.counter-days');
        const hoursEl = document.querySelector('.counter-hours');
        const minutesEl = document.querySelector('.counter-minutes');
        const secondsEl = document.querySelector('.counter-seconds');
        
        // Atualiza os valores, adicionando zero à esquerda se necessário
        if (daysEl) daysEl.textContent = String(dias).padStart(2, '0');
        if (hoursEl) hoursEl.textContent = String(horas).padStart(2, '0');
        if (minutesEl) minutesEl.textContent = String(minutos).padStart(2, '0');
        if (secondsEl) secondsEl.textContent = String(segundos).padStart(2, '0');
    }
    
    // Atualiza o contador a cada segundo (1000ms)
    setInterval(atualizarContador, 1000);
    atualizarContador(); // Executa imediatamente na inicialização
})();

// ============================================
// 4. TOOLTIP MELHORADO PARA WHATSAPP
// ============================================

// Seleciona o elemento de tooltip do WhatsApp
const whatsappTooltip = document.querySelector('.whatsapp-tooltip');
if (whatsappTooltip) {
    const originalText = whatsappTooltip.textContent; // Salva o texto original
    
    // Altera o texto quando o mouse entra no elemento
    whatsappTooltip.addEventListener('mouseenter', function() {
        this.textContent = 'Fale com um consultor! 📱';
    });
    
    // Restaura o texto original quando o mouse sai
    whatsappTooltip.addEventListener('mouseleave', function() {
        this.textContent = originalText;
    });
}

// ============================================
// 5. REGISTRO DE CLIQUES (ANALYTICS)
// ============================================

// Função para registrar interações do usuário (analytics)
function registrarClique(elemento, acao) {
    console.log(`📊 Analytics: ${acao} - ${new Date().toLocaleString()}`);
    // Aqui você poderia implementar o envio para um servidor de analytics
}

// Aguarda o DOM carregar para adicionar os listeners de clique
document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os botões importantes e adiciona listener de clique
    document.querySelectorAll('.btn-primary, .whatsapp-float, .assinante-link').forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Determina qual tipo de botão foi clicado baseado nas classes CSS
            const acao = this.classList.contains('btn-primary') ? 'Botão Assinar' :
                        this.classList.contains('whatsapp-float') ? 'WhatsApp Float' : 'Central Assinante';
            registrarClique(this, acao); // Registra o clique
        });
    });
});

// ============================================
// 6. VALIDAÇÃO DE IMAGENS CARREGADAS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const imagens = document.querySelectorAll('img'); // Seleciona todas as imagens
    let imagensCarregadas = 0; // Contador de imagens carregadas com sucesso
    let imagensComErro = 0; // Contador de imagens com erro de carregamento
    
    // Adiciona listeners para cada imagem
    imagens.forEach(img => {
        // Evento disparado quando há erro no carregamento da imagem
        img.addEventListener('error', function() {
            imagensComErro++;
            console.warn(`⚠️ Imagem não carregou: ${this.src}`);
            // Opção comentada para substituir por imagem padrão em caso de erro
            // this.src = 'caminho/para/imagem-padrao.jpg';
        });
        
        // Evento disparado quando a imagem carrega com sucesso
        img.addEventListener('load', function() {
            imagensCarregadas++;
            console.log(`✅ Imagem carregada: ${this.alt || 'sem descrição'}`);
        });
    });
    
    // Após o carregamento total da página, exibe relatório final
    window.addEventListener('load', function() {
        console.log(`📸 Total de imagens: ${imagens.length} | Carregadas: ${imagensCarregadas} | Erros: ${imagensComErro}`);
    });
});

// ============================================
// 7. SCROLL SUAVE PARA LINKS INTERNOS
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Seleciona todos os links que começam com # (âncoras internas)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault(); // Previne o comportamento padrão do link
            
            // Seleciona o elemento alvo baseado no href
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                // Rola suavemente até o elemento alvo
                target.scrollIntoView({
                    behavior: 'smooth', // Animação suave
                    block: 'start' // Alinha o topo do elemento ao topo da janela
                });
            }
        });
    });
});

// ============================================
// 8. DETECÇÃO DE DISPOSITIVO MÓVEL
// ============================================

// Função que detecta se o usuário está usando um dispositivo móvel
function isMobileDevice() {
    return (window.innerWidth <= 768) || // Tela pequena
           ('ontouchstart' in window) || // Suporte a toque
           (navigator.maxTouchPoints > 0) || // Múltiplos pontos de toque
           (navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i)); // User agent de dispositivos móveis
}

// Se for dispositivo móvel, adiciona classe ao body e loga no console
if (isMobileDevice()) {
    document.body.classList.add('mobile-device');
    console.log("📱 Dispositivo móvel detectado - Otimizações ativadas");
}

// ============================================
// 9. MENSAGEM DE BOAS-VINDAS NO CONSOLE
// ============================================

// Mensagens estilizadas no console para desenvolvedores
console.log('%c🎯 Netmax Fibra - Conectando você ao conhecimento', 'color: #FFD000; font-size: 16px; font-weight: bold;');
console.log('%c📱 WhatsApp configurado: 43 99914-9922', 'color: #25D366; font-size: 14px;');
console.log('%c💡 Dica: Pressione F12 para mais informações', 'color: #888; font-size: 12px;');

// ============================================
// 10. MENU MOBILE (HAMBÚRGUER) - NOVO!
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            // Alterna a classe 'show' no menu para exibi-lo ou ocultá-lo
            navMenu.classList.toggle('show');
            
            // Alterna o ícone do botão (opcional, para melhor UX)
            const icon = menuToggle.querySelector('i');
            if (navMenu.classList.contains('show')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times'); // Muda para ícone de "X"
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars'); // Volta para o ícone de hambúrguer
            }
        });

        // Fecha o menu se o usuário clicar em um link (opcional, bom para UX)
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
                const icon = menuToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
});

// ============================================
// 11. MODAL DA NETMAX TV - CONTROLE (ORIGINAL)
// ============================================

// Função para abrir o modal original da Netmax TV
function abrirModal() {
    const modal = document.getElementById('tvModal'); // Seleciona o modal pelo ID
    if (modal) {
        modal.style.display = 'flex'; // Mostra o modal com display flex
        
        // Pequeno atraso para permitir a transição CSS
        setTimeout(() => {
            modal.classList.add('show'); // Adiciona classe que ativa a animação
        }, 10);
        
        document.body.style.overflow = 'hidden'; // Impede rolagem da página
    }
}

// Função para fechar o modal original
function fecharModal() {
    const modal = document.getElementById('tvModal');
    if (modal) {
        modal.classList.remove('show'); // Remove classe de animação
        
        // Aguarda a animação terminar antes de ocultar completamente
        setTimeout(() => {
            modal.style.display = 'none'; // Esconde o modal
        }, 300); // 300ms corresponde à duração da transição CSS
        
        document.body.style.overflow = ''; // Restaura rolagem da página
    }
}

// ============================================
// 12. NOVO MODAL DE ATIVAÇÃO - CONTROLE
// ============================================

// Função para abrir o modal de ativação
function abrirModalAtivacao() {
    const modal = document.getElementById('tvAtivacaoModal'); // Seleciona o modal de ativação
    if (modal) {
        modal.style.display = 'flex'; // Mostra o modal
        
        // Pequeno atraso para permitir a transição CSS
        setTimeout(() => {
            modal.classList.add('show'); // Ativa animação
        }, 10);
        
        document.body.style.overflow = 'hidden'; // Impede rolagem
    }
}

// Função para fechar o modal de ativação
function fecharModalAtivacao() {
    const modal = document.getElementById('tvAtivacaoModal');
    if (modal) {
        modal.classList.remove('show'); // Remove animação
        
        // Aguarda animação terminar
        setTimeout(() => {
            modal.style.display = 'none'; // Esconde o modal
        }, 300);
        
        document.body.style.overflow = ''; // Restaura rolagem
    }
}

// ============================================
// 13. FECHAR MODAIS CLICANDO NA ÁREA ESCURA
// ============================================

// Listener global para cliques na janela
window.addEventListener('click', function(event) {
    // Fecha modal original se clicar na área escura (overlay)
    const modalOriginal = document.getElementById('tvModal');
    if (event.target === modalOriginal) {
        fecharModal();
    }
    
    // Fecha modal de ativação se clicar na área escura
    const modalAtivacao = document.getElementById('tvAtivacaoModal');
    if (event.target === modalAtivacao) {
        fecharModalAtivacao();
    }
});
