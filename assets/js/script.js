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

console.log("🚀 Netmax Website - Carregado com sucesso!");
s
// ============================================
// 1. WHATSAPP - CONFIGURAÇÃO CENTRALIZADA
// ============================================
const CONFIG = {
  whatsapp: {
    number: "554399149922",
    message: "Olá! Gostaria de saber mais sobre os planos da Netmax Fibra.",
  },
};

// Função para gerar link do WhatsApp
function getWhatsAppLink(message = null) {
  const baseUrl = `https://wa.me/${CONFIG.whatsapp.number}`;
  if (message) {
    return `${baseUrl}?text=${encodeURIComponent(message)}`;
  }
  return baseUrl;
}

// ============================================
// 2. ANIMAÇÕES DE SCROLL (REVEAL) - OTIMIZADO PARA MOBILE
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  // Elementos que aparecem conforme rolam a página
  const revealElements = document.querySelectorAll(
    ".benefit-card, .highlight-section, .partner-logo",
  );

  // Adicionar classe CSS para animação
  const style = document.createElement("style");
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
        
        /* Desativa animações em dispositivos com preferência por menos movimento */
        @media (prefers-reduced-motion: reduce) {
            .benefit-card, .highlight-section, .partner-logo {
                transition: none;
                opacity: 1;
                transform: none;
            }
        }
        
        /* Em telas muito pequenas, reduz o efeito para melhor performance */
        @media (max-width: 480px) {
            .benefit-card, .highlight-section, .partner-logo {
                transition: all 0.3s ease-out;
            }
        }
    `;
  document.head.appendChild(style);

  // Função para revelar elementos no scroll
  const revealOnScroll = function () {
    const windowHeight = window.innerHeight;
    // Ajusta o threshold para dispositivos móveis
    const revealThreshold = window.innerWidth <= 768 ? 100 : 150;

    revealElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top;

      if (elementTop < windowHeight - revealThreshold) {
        element.classList.add("revealed");
      }
    });
  };

  // Inicializar e adicionar evento de scroll com throttle para melhor performance
  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        revealOnScroll();
        ticking = false;
      });
      ticking = true;
    }
  });
  window.addEventListener("load", revealOnScroll);
  revealOnScroll(); // Chamar imediatamente
});

// ============================================
// 3. CONTADOR REGRESSIVO PARA PROMOÇÃO - OTIMIZADO
// ============================================
(function criarContadorPromocao() {
  // Verificar se já existe um contador
  if (document.querySelector(".promo-counter")) return;

  // Verificar se estamos na página inicial (opcional)
  const heroSection = document.querySelector(".hero");
  if (!heroSection) return;

  // Data alvo: 7 dias a partir de agora
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

  // Inserir após o botão
  const heroButtons = document.querySelector(".hero-buttons");
  if (heroButtons) {
    heroButtons.insertAdjacentHTML("afterend", counterHTML);
  }

  // Estilo do contador já existe no CSS principal, mas garantimos que está presente
  // Função para atualizar o contador
  function atualizarContador() {
    const agora = new Date().getTime();
    const distancia = dataAlvo - agora;

    if (distancia < 0) {
      // Se passou da data, reiniciar para +7 dias
      dataAlvo.setDate(dataAlvo.getDate() + 7);
      return atualizarContador();
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor(
      (distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
    );
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    const daysEl = document.querySelector(".counter-days");
    const hoursEl = document.querySelector(".counter-hours");
    const minutesEl = document.querySelector(".counter-minutes");
    const secondsEl = document.querySelector(".counter-seconds");

    if (daysEl) daysEl.textContent = String(dias).padStart(2, "0");
    if (hoursEl) hoursEl.textContent = String(horas).padStart(2, "0");
    if (minutesEl) minutesEl.textContent = String(minutos).padStart(2, "0");
    if (secondsEl) secondsEl.textContent = String(segundos).padStart(2, "0");
  }

  // Atualizar a cada segundo
  setInterval(atualizarContador, 1000);
  atualizarContador();
})();

// ============================================
// 4. TOOLTIP MELHORADO PARA WHATSAPP - ADAPTADO PARA MOBILE
// ============================================
const whatsappTooltip = document.querySelector(".whatsapp-tooltip");
if (whatsappTooltip) {
  const originalText = whatsappTooltip.textContent;

  // Em dispositivos móveis, não exibir tooltip no hover (não existe hover)
  if (window.innerWidth > 768) {
    whatsappTooltip.addEventListener("mouseenter", function () {
      this.textContent = "Fale com um consultor! 📱";
    });

    whatsappTooltip.addEventListener("mouseleave", function () {
      this.textContent = originalText;
    });
  }
}

// ============================================
// 5. REGISTRO DE CLIQUES (ANALYTICS) - OTIMIZADO
// ============================================
function registrarClique(elemento, acao) {
  console.log(`📊 Analytics: ${acao} - ${new Date().toLocaleString()}`);
  // Aqui você poderia enviar para um servidor de analytics
}

// Registrar cliques em elementos importantes com debounce para evitar múltiplos registros
let ultimoRegistro = {};
document.addEventListener("DOMContentLoaded", function () {
  document
    .querySelectorAll(".btn-primary, .whatsapp-float, .assinante-link")
    .forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const acao = this.classList.contains("btn-primary")
          ? "Botão Assinar"
          : this.classList.contains("whatsapp-float")
            ? "WhatsApp Float"
            : "Central Assinante";

        // Evitar registros duplicados muito próximos
        const agora = Date.now();
        const chave = `${acao}_${this.textContent}`;
        if (!ultimoRegistro[chave] || agora - ultimoRegistro[chave] > 1000) {
          registrarClique(this, acao);
          ultimoRegistro[chave] = agora;
        }
      });
    });
});

// ============================================
// 6. VALIDAÇÃO DE IMAGENS CARREGADAS - OTIMIZADA
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  const imagens = document.querySelectorAll("img");
  let imagensCarregadas = 0;
  let imagensComErro = 0;
  let totalImagens = imagens.length;

  // Função para verificar se todas as imagens foram processadas
  function verificarConclusao() {
    if (imagensCarregadas + imagensComErro === totalImagens) {
      console.log(
        `📸 Total de imagens: ${totalImagens} | Carregadas: ${imagensCarregadas} | Erros: ${imagensComErro}`,
      );
    }
  }

  imagens.forEach((img) => {
    // Se a imagem já estiver carregada
    if (img.complete) {
      if (img.naturalWidth === 0) {
        imagensComErro++;
        console.warn(`⚠️ Imagem não carregou: ${img.src}`);
      } else {
        imagensCarregadas++;
      }
      verificarConclusao();
    } else {
      img.addEventListener("error", function () {
        imagensComErro++;
        console.warn(`⚠️ Imagem não carregou: ${this.src}`);
        verificarConclusao();
      });

      img.addEventListener("load", function () {
        imagensCarregadas++;
        console.log(`✅ Imagem carregada: ${this.alt || "sem descrição"}`);
        verificarConclusao();
      });
    }
  });
});

// ============================================
// 7. SCROLL SUAVE PARA LINKS INTERNOS - OTIMIZADO
// ============================================
document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      // Evitar links vazios ou apenas "#"
      if (targetId === "#" || targetId === "") return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        // Ajustar o offset para dispositivos móveis (considerando header fixo)
        const headerOffset = window.innerWidth <= 768 ? 80 : 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  });
});

// ============================================
// 8. DETECÇÃO DE DISPOSITIVO MÓVEL - MELHORADA
// ============================================
function isMobileDevice() {
  return (
    window.innerWidth <= 768 ||
    "ontouchstart" in window ||
    navigator.maxTouchPoints > 0 ||
    navigator.userAgent.match(
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i,
    )
  );
}

function isTabletDevice() {
  return (
    (window.innerWidth > 768 && window.innerWidth <= 1024) ||
    navigator.userAgent.match(/iPad|Android(?!.*Mobile)/i)
  );
}

// Adicionar classes ao body para estilos específicos
document.body.classList.add(
  isMobileDevice() ? "mobile-device" : "desktop-device",
);
if (isTabletDevice()) {
  document.body.classList.add("tablet-device");
}

console.log(
  `${isMobileDevice() ? "📱 Dispositivo móvel" : "💻 Desktop"} detectado - Otimizações ativadas`,
);

// ============================================
// 9. MENSAGEM DE BOAS-VINDAS NO CONSOLE
// ============================================
console.log(
  "%c🎯 Netmax Fibra - Conectando você ao conhecimento",
  "color: #FFD000; font-size: 16px; font-weight: bold;",
);
console.log(
  "%c📱 WhatsApp configurado: 43 99914-9922",
  "color: #25D366; font-size: 14px;",
);
console.log(
  "%c💡 Dica: Pressione F12 para mais informações",
  "color: #888; font-size: 12px;",
);

// ============================================
// 10. MODAL DA NETMAX TV - CONTROLE (ORIGINAL)
// ============================================
function abrirModal() {
  const modal = document.getElementById("tvModal");
  if (modal) {
    modal.style.display = "flex";
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
    document.body.style.overflow = "hidden";
    // Prevenir scroll do fundo no iOS
    if (isMobileDevice()) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    }
  }
}

function fecharModal() {
  const modal = document.getElementById("tvModal");
  if (modal) {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
    document.body.style.overflow = "";
    // Restaurar scroll no iOS
    if (isMobileDevice()) {
      document.body.style.position = "";
      document.body.style.width = "";
    }
  }
}

// ============================================
// 11. NOVO MODAL DE ATIVAÇÃO - CONTROLE
// ============================================
function abrirModalAtivacao() {
  const modal = document.getElementById("tvAtivacaoModal");
  if (modal) {
    modal.style.display = "flex";
    setTimeout(() => {
      modal.classList.add("show");
    }, 10);
    document.body.style.overflow = "hidden";
    // Prevenir scroll do fundo no iOS
    if (isMobileDevice()) {
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    }
  }
}

function fecharModalAtivacao() {
  const modal = document.getElementById("tvAtivacaoModal");
  if (modal) {
    modal.classList.remove("show");
    setTimeout(() => {
      modal.style.display = "none";
    }, 300);
    document.body.style.overflow = "";
    // Restaurar scroll no iOS
    if (isMobileDevice()) {
      document.body.style.position = "";
      document.body.style.width = "";
    }
  }
}

// ============================================
// 12. FECHAR MODAIS CLICANDO NA ÁREA ESCURA
// ============================================
window.addEventListener("click", function (event) {
  // Fechar modal original
  const modalOriginal = document.getElementById("tvModal");
  if (event.target === modalOriginal) {
    fecharModal();
  }

  // Fechar novo modal de ativação
  const modalAtivacao = document.getElementById("tvAtivacaoModal");
  if (event.target === modalAtivacao) {
    fecharModalAtivacao();
  }
});

// ============================================
// 13. OTIMIZAÇÃO PARA REDIMENSIONAMENTO DE TELA
// ============================================
let resizeTimer;
window.addEventListener("resize", function () {
  // Debounce para não executar muitas vezes
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(function () {
    // Atualizar classes de dispositivo
    document.body.classList.remove(
      "mobile-device",
      "desktop-device",
      "tablet-device",
    );
    document.body.classList.add(
      isMobileDevice() ? "mobile-device" : "desktop-device",
    );
    if (isTabletDevice()) {
      document.body.classList.add("tablet-device");
    }

    // Recalcular animações
    const revealElements = document.querySelectorAll(
      ".benefit-card, .highlight-section, .partner-logo",
    );
    revealElements.forEach((el) => {
      el.classList.remove("revealed");
    });

    // Reaplicar reveal
    setTimeout(() => {
      const event = new Event("scroll");
      window.dispatchEvent(event);
    }, 100);

    console.log(
      `🔄 Tela redimensionada: ${window.innerWidth}x${window.innerHeight}`,
    );
  }, 250);
});

// ============================================
// 14. PREVENIR CLIQUE EM BOTÕES DUPLICADOS (TOUCH DEVICES)
// ============================================
document
  .querySelectorAll("button, .btn-primary, .btn-secondary, .action-card")
  .forEach((el) => {
    let isClicked = false;
    el.addEventListener("click", function (e) {
      if (isClicked) {
        e.preventDefault();
        e.stopPropagation();
        return false;
      }
      isClicked = true;
      setTimeout(() => {
        isClicked = false;
      }, 500);
    });
  });
