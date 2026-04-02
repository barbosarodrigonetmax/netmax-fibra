/* ===================================================================
   NETMAX FIBRA - PÁGINA 
   ===================================================================
   Objetivo: Gerenciar todas as interações do site Netmax Fibra, incluindo FAQ, 
             modais, scroll suave, contadores, animações e funcionalidades das 
             páginas de produtos (Netmax TV, JornalZ, NEWS Periódicos).
   Autor    : Rodrigo Barbosa
   Data     : 23/02/2026
   =================================================================== */

// Aguarda o DOM (Document Object Model) ser completamente carregado antes de executar qualquer script
// Isso garante que todos os elementos HTML estejam disponíveis para manipulação
document.addEventListener("DOMContentLoaded", function () {
  /* ============================================ */
  /* 1. INICIALIZAÇÃO DO FAQ ACCORDION (ESTANTE DIGITAL E TV) */
  /* ============================================ */
  // Função responsável por configurar o comportamento de acordeão (accordion) para perguntas frequentes
  function initFaq() {
    // Seleciona todos os elementos que possuem as classes 'estante-faq-item' ou 'tv-faq-item'
    // O seletor CSS com vírgula permite buscar múltiplas classes simultaneamente
    const faqItems = document.querySelectorAll(
      ".estante-faq-item, .tv-faq-item",
    );

    // Itera sobre cada item encontrado para configurar o evento de clique
    faqItems.forEach((item) => {
      // Remove event listeners duplicados clonando o nó (elemento)
      // cloneNode(true) cria uma cópia profunda do elemento (inclui todos os filhos)
      const newItem = item.cloneNode(true);
      // Substitui o elemento antigo pelo novo clone, removendo eventos anteriores
      item.parentNode.replaceChild(newItem, item);

      // Adiciona evento de clique ao novo elemento
      newItem.addEventListener("click", function (e) {
        // Previne que o evento se propague para elementos pai
        e.stopPropagation();
        // Alterna (adiciona se não existir, remove se existir) a classe 'active'
        // Essa classe controla a exibição da resposta no CSS
        this.classList.toggle("active");

        // Código comentado que permitiria fechar outros itens ao abrir um novo
        // Mantém apenas o item atual aberto (funcionalidade exclusiva)
      });
    });
  }

  // Executa a função de inicialização do FAQ
  initFaq();

  /* ============================================ */
  /* 2. CONFIGURAÇÃO ESPECÍFICA DO FAQ DA NETMAX TV (COM TOGGLE MANUAL) */
  /* ============================================ */
  // Função dedicada para o FAQ da TV, com controle manual de exibição (display)
  function initTvFaq() {
    // Seleciona apenas os itens de FAQ específicos da Netmax TV
    const tvFaqItems = document.querySelectorAll(".tv-faq-item");

    // Itera sobre cada item de FAQ da TV
    tvFaqItems.forEach((item) => {
      // Busca o parágrafo dentro do item (contém a resposta)
      const p = item.querySelector("p");
      // Busca o ícone (elemento i) para animação de rotação
      const icon = item.querySelector("i");

      // Garante que o estado inicial esteja correto (resposta oculta)
      if (p && !item.classList.contains("active")) {
        p.style.display = "none"; // Esconde o parágrafo
        if (icon) icon.style.transform = "rotate(0deg)"; // Ícone sem rotação
      }

      // Adiciona evento de clique para cada item
      item.addEventListener("click", function (e) {
        e.stopPropagation(); // Impede propagação do evento

        // Busca novamente o parágrafo e ícone (garantia de atualização)
        const p = this.querySelector("p");
        const icon = this.querySelector("i");

        // Verifica se o parágrafo está oculto (display none ou vazio)
        if (p.style.display === "none" || p.style.display === "") {
          p.style.display = "block"; // Exibe a resposta
          if (icon) icon.style.transform = "rotate(180deg)"; // Rotaciona ícone
          this.classList.add("active"); // Marca item como ativo
        } else {
          p.style.display = "none"; // Esconde a resposta
          if (icon) icon.style.transform = "rotate(0deg)"; // Rotaciona ícone de volta
          this.classList.remove("active"); // Remove marcação de ativo
        }
      });
    });
  }

  // Executa a configuração específica do FAQ da TV
  initTvFaq();

  /* ============================================ */
  /* 3. MODAIS NETMAX TV - GERENCIAMENTO DE JANELAS MODAIS */
  /* ============================================ */

  // Referência para o modal principal da TV
  const tvModal = document.getElementById("tvModal");
  // Referência para o modal de ativação da TV
  const tvAtivacaoModal = document.getElementById("tvAtivacaoModal");

  // Função global para abrir o modal principal
  window.abrirModal = function () {
    if (tvModal) {
      // Verifica se o modal existe no DOM
      tvModal.style.display = "flex"; // Exibe o modal (display flex para centralização)
      // setTimeout com 10ms permite que o display seja aplicado antes da animação
      setTimeout(() => {
        tvModal.classList.add("show"); // Adiciona classe para animação de fade-in
      }, 10);
      document.body.style.overflow = "hidden"; // Impede scroll da página de fundo
    }
  };

  // Função global para abrir o modal de ativação
  window.abrirModalAtivacao = function () {
    if (tvAtivacaoModal) {
      tvAtivacaoModal.style.display = "flex";
      setTimeout(() => {
        tvAtivacaoModal.classList.add("show");
      }, 10);
      document.body.style.overflow = "hidden";
    }
  };

  // Função global para fechar o modal principal
  window.fecharModal = function () {
    if (tvModal) {
      tvModal.classList.remove("show"); // Remove classe de animação
      // Aguarda a animação terminar (300ms) antes de ocultar completamente
      setTimeout(() => {
        tvModal.style.display = "none";
        document.body.style.overflow = ""; // Restaura o scroll da página
      }, 300);
    }
  };

  // Função global para fechar o modal de ativação
  window.fecharModalAtivacao = function () {
    if (tvAtivacaoModal) {
      tvAtivacaoModal.classList.remove("show");
      setTimeout(() => {
        tvAtivacaoModal.style.display = "none";
        document.body.style.overflow = "";
      }, 300);
    }
  };

  // Função auxiliar para fechar modal ao clicar no overlay (fundo escuro)
  const closeModalOnOverlay = function (modal, closeFn) {
    if (modal) {
      modal.addEventListener("click", function (e) {
        // Verifica se o clique foi exatamente no modal (overlay) e não no conteúdo interno
        if (e.target === modal) {
          closeFn(); // Chama a função de fechamento específica
        }
      });
    }
  };

  // Configura o fechamento por overlay para ambos os modais
  closeModalOnOverlay(tvModal, fecharModal);
  closeModalOnOverlay(tvAtivacaoModal, fecharModalAtivacao);

  // Configura o fechamento dos modais pressionando a tecla ESC
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      // Verifica se a tecla pressionada é ESC
      if (tvModal && tvModal.style.display === "flex") fecharModal();
      if (tvAtivacaoModal && tvAtivacaoModal.style.display === "flex")
        fecharModalAtivacao();
    }
  });

  /* ============================================ */
  /* 4. SCROLL SUAVE PARA ÂNCORAS - NAVEGAÇÃO FLUIDA */
  /* ============================================ */

  // Função global para rolagem suave até uma seção específica
  window.scrollToSection = function (elementId) {
    // Tenta encontrar o elemento pelo ID
    const element = document.getElementById(elementId);
    if (element) {
      const offset = 80; // Deslocamento para compensar o header fixo
      // Obtém a posição do elemento relativa à viewport
      const elementPosition = element.getBoundingClientRect().top;
      // Calcula a posição absoluta considerando o scroll atual e o offset
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      // Executa a rolagem suave
      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth", // Comportamento suave (navegadores modernos)
      });
    }
  };

  // Configura scroll suave para todos os links que começam com #
  // O seletor exclui links que são apenas "#" (vazios)
  document
    .querySelectorAll('a[href^="#"]:not([href="#"])')
    .forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        // Extrai o ID alvo removendo o caractere '#'
        const targetId = this.getAttribute("href").substring(1);
        const targetElement = document.getElementById(targetId);

        // Se o elemento alvo existe, previne o comportamento padrão e faz scroll suave
        if (targetElement) {
          e.preventDefault(); // Impede o salto brusco padrão
          const offset = 80;
          const elementPosition = targetElement.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - offset;

          window.scrollTo({
            top: offsetPosition,
            behavior: "smooth",
          });
        }
      });
    });

  /* ============================================ */
  /* 5. PÁGINA 404 - FUNÇÃO DE SURPRESA (HUMOR) */
  /* ============================================ */

  // Função global para exibir mensagens humorísticas na página de erro 404
  window.surpresa = function () {
    const resultado = document.getElementById("resultado");
    if (resultado) {
      // Array com mensagens engraçadas relacionadas ao universo Netmax
      const piadas = [
        "📚 Achou que ia encontrar a página? Está na fila do pão!",
        "💻 A página fugiu com a sua conexão!",
        "🚀 404: O erro mais rápido da Netmax!",
        "🔍 Página não encontrada. Tentou reiniciar o modem?",
        "📖 A página está lendo um livro na Estante Digital. Aguarde...",
        "📺 A página está assistindo Netmax TV. Volte mais tarde!",
        "⚡ 1000 megas de velocidade, mas a página não alcançou!",
        "🎁 É o benefício secreto! Brincadeira, é só erro 404 mesmo.",
        "🔄 Página em manutenção. Ou não. Nunca saberemos.",
        "💛 Desenvolvido com amor, mas essa página não.",
      ];
      // Seleciona aleatoriamente uma mensagem do array
      const piadaAleatoria = piadas[Math.floor(Math.random() * piadas.length)];
      resultado.innerHTML = piadaAleatoria; // Insere a mensagem no elemento
      resultado.style.opacity = "0"; // Reseta opacidade para animação
      setTimeout(() => {
        resultado.style.opacity = "1"; // Aplica fade-in na mensagem
      }, 50);
    }
  };

  // Função global para voltar à página inicial
  window.voltar = function () {
    window.location.href = "index.html"; // Redireciona para o index
  };

  /* ============================================ */
  /* 6. CONTADOR PROMOCIONAL (TIMER PARA OFERTAS) */
  /* ============================================ */

  function initPromoCounter() {
    // Busca o elemento que deve conter o contador
    const counterElement = document.querySelector(
      ".promo-counter .counter-timer",
    );
    if (!counterElement) return; // Sai da função se o contador não existir

    // Define a data alvo: 30 dias a partir da data/hora atual
    const targetDate = new Date();
    targetDate.setDate(targetDate.getDate() + 30);

    // Função que atualiza o display do contador a cada segundo
    function updateCounter() {
      const now = new Date(); // Data/hora atual
      const diff = targetDate - now; // Diferença em milissegundos

      // Se a promoção já expirou, exibe mensagem de encerramento
      if (diff <= 0) {
        counterElement.innerHTML =
          '<div class="counter-unit"><span>PROMOÇÃO</span><span>ENCERRADA!</span></div>';
        return;
      }

      // Cálculos para converter milissegundos em dias, horas, minutos e segundos
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor(
        (diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
      );
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      // Atualiza o HTML do contador com os valores calculados
      counterElement.innerHTML = `
                <div class="counter-unit"><span>${days}</span><span>DIAS</span></div>
                <div class="counter-unit"><span>${hours}</span><span>HORAS</span></div>
                <div class="counter-unit"><span>${minutes}</span><span>MIN</span></div>
                <div class="counter-unit"><span>${seconds}</span><span>SEG</span></div>
            `;
    }

    updateCounter(); // Executa imediatamente para não esperar 1 segundo
    setInterval(updateCounter, 1000); // Configura atualização a cada segundo
  }

  initPromoCounter();

  /* ============================================ */
  /* 7. HEADER RESPONSIVO - OCULTAR/MOSTRAR NO SCROLL */
  /* ============================================ */

  let lastScrollTop = 0; // Armazena a última posição do scroll
  const header = document.querySelector(".header"); // Referência ao header

  if (header) {
    window.addEventListener("scroll", function () {
      // Obtém a posição atual do scroll (compatível com diferentes navegadores)
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Aplica o comportamento apenas em dispositivos móveis (largura até 768px)
      if (window.innerWidth <= 768) {
        // Se rolou para baixo e passou de 100px, esconde o header
        if (scrollTop > lastScrollTop && scrollTop > 100) {
          header.style.transform = "translateY(-100%)"; // Move para fora da tela
        } else {
          header.style.transform = "translateY(0)"; // Mostra novamente
        }
      }
      lastScrollTop = scrollTop; // Atualiza a última posição
    });
  }

  /* ============================================ */
  /* 8. ANIMAÇÃO DE ENTRADA (FADE-IN) PARA CARDS */
  /* ============================================ */

  function initFadeInAnimation() {
    // Seleciona todos os elementos que devem ter animação de entrada
    const elements = document.querySelectorAll(
      ".benefit-card, .estante-feature-card, .tv-feature-card, .jornalz-feature-card, .news-feature-card, .diferencial-card",
    );

    // Cria um observer que monitora quando os elementos entram na viewport
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // Quando o elemento se torna visível na tela
          if (entry.isIntersecting) {
            entry.target.style.opacity = "1"; // Torna visível
            entry.target.style.transform = "translateY(0)"; // Remove deslocamento
            observer.unobserve(entry.target); // Para de observar este elemento
          }
        });
      },
      { threshold: 0.1, rootMargin: "50px" }, // Dispara quando 10% visível ou com margem de 50px
    );

    // Aplica estilos iniciais (invisível e deslocado) e inicia observação
    elements.forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      observer.observe(el);
    });
  }

  initFadeInAnimation();

  /* ============================================ */
  /* 9. TRATAMENTO DE IMAGENS QUEBRADAS (FALLBACK) */
  /* ============================================ */

  function handleBrokenImages() {
    const images = document.querySelectorAll("img"); // Todas as imagens da página
    images.forEach((img) => {
      // Adiciona evento 'error' que dispara quando a imagem não carrega
      img.addEventListener("error", function () {
        // Verifica se já tentou o fallback para evitar loop infinito
        if (!this.hasAttribute("data-fallback-tried")) {
          this.setAttribute("data-fallback-tried", "true"); // Marca como tentado
          this.style.display = "none"; // Oculta a imagem quebrada
          console.warn("Imagem não carregou:", this.src); // Log de aviso
        }
      });
    });
  }

  handleBrokenImages();

  /* ============================================ */
  /* 10. PREVENÇÃO DE CLICK DUPLICADO EM BOTÕES */
  /* ============================================ */

  const buttons = document.querySelectorAll(".btn-primary, .btn-secondary");
  buttons.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      // Se o botão já possui o atributo 'data-clicked', bloqueia novo clique
      if (this.hasAttribute("data-clicked")) {
        e.preventDefault(); // Impede ação do botão
        return;
      }
      this.setAttribute("data-clicked", "true"); // Marca como clicado
      // Após 3 segundos, libera o botão para novo clique
      setTimeout(() => {
        this.removeAttribute("data-clicked");
      }, 3000);
    });
  });

  /* ============================================ */
  /* 11. JORNALZ - CONFIGURAÇÃO DE BOTÕES E SCROLL */
  /* ============================================ */

  // Botão "ACESSAR JORNALZ" da seção hero
  const acessarJornalzHero = document.querySelector(
    '.jornalz-hero-buttons .btn-primary[onclick*="jornalz.com.br"]',
  );
  if (acessarJornalzHero) {
    acessarJornalzHero.removeAttribute("onclick"); // Remove onclick inline
    acessarJornalzHero.addEventListener("click", function () {
      window.open("https://www.jornalz.com.br/", "_blank"); // Abre em nova aba
    });
  }

  // Botão "ACESSAR JORNALZ AGORA" da seção CTA
  const acessarJornalzCta = document.querySelector(
    '.jornalz-cta-box .btn-primary[onclick*="jornalz.com.br"]',
  );
  if (acessarJornalzCta) {
    acessarJornalzCta.removeAttribute("onclick");
    acessarJornalzCta.addEventListener("click", function () {
      window.open("https://www.jornalz.com.br/", "_blank");
    });
  }

  // Botão "SAIBA MAIS" do JornalZ - scroll suave
  const saibaMaisJornalzBtn = document.querySelector(
    ".jornalz-hero-buttons .btn-secondary",
  );
  if (saibaMaisJornalzBtn) {
    saibaMaisJornalzBtn.removeAttribute("onclick");
    saibaMaisJornalzBtn.addEventListener("click", function () {
      const element = document.getElementById("saiba-mais");
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  }

  /* ============================================ */
  /* 12. NEWS PERIÓDICOS - BOTÕES E INTERAÇÕES */
  /* ============================================ */

  // Botão "ACESSAR AGORA" do hero de NEWS
  const acessarNewsHero = document.querySelector(".btn-access-news");
  if (acessarNewsHero) {
    acessarNewsHero.addEventListener("click", function () {
      window.open("https://www.jornalz.com.br/", "_blank");
    });
  }

  // Botão "ACESSAR NEWS PERIÓDICOS AGORA" do CTA
  const acessarNewsCta = document.querySelector(".btn-access-news-cta");
  if (acessarNewsCta) {
    acessarNewsCta.addEventListener("click", function () {
      window.open("https://www.jornalz.com.br/", "_blank");
    });
  }

  // Scroll suave para botão "SAIBA MAIS" do NEWS
  const saibaMaisNewsBtn = document.querySelector(".btn-saiba-mais-news");
  if (saibaMaisNewsBtn) {
    saibaMaisNewsBtn.addEventListener("click", function () {
      const element = document.getElementById("saiba-mais-target");
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  }

  // Efeito hover animado no botão do CTA de NEWS
  const newsCtaBtn = document.querySelector(".news-cta-box .btn-primary");
  if (newsCtaBtn) {
    newsCtaBtn.addEventListener("mouseover", function () {
      this.style.background = "#FFD000"; // Muda para amarelo no hover
      this.style.transform = "scale(1.05)"; // Aumenta levemente
    });
    newsCtaBtn.addEventListener("mouseout", function () {
      this.style.background = "#f24f00"; // Volta à cor original (laranja)
      this.style.transform = "scale(1)"; // Restaura tamanho
    });
  }

  /* ============================================ */
  /* 13. BOTÃO "QUERO ASSINAR AGORA" (GERAL) */
  /* ============================================ */

  const assinarAgoraBtn = document.querySelector(".estante-assinatura-button");
  if (assinarAgoraBtn && !assinarAgoraBtn.hasAttribute("data-event-set")) {
    assinarAgoraBtn.setAttribute("data-event-set", "true"); // Evita dupla configuração
    console.log("Botão de assinatura configurado");
  }

  // Botão de assinatura do JornalZ (se existir)
  const assinarJornalzBtn = document.querySelector(
    '.ecosystem .btn-primary[href*="wa.me"]',
  );
  if (assinarJornalzBtn && !assinarJornalzBtn.hasAttribute("data-event-set")) {
    assinarJornalzBtn.setAttribute("data-event-set", "true");
  }

  /* ============================================ */
  /* 14. LOG DE DESENVOLVIMENTO (AMBIENTE LOCAL) */
  /* ============================================ */

  // Verifica se está em ambiente local (localhost ou 127.0.0.1)
  if (
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
  ) {
    console.log("🚀 Netmax Fibra - Site carregado com sucesso!");
    console.log("📱 Versão otimizada - Desenvolvido para nossos clientes");
    console.log("📰 Página NEWS Periódicos - Conhecimento Ilimitado");
    console.log("📚 Benefício exclusivo incluso no plano!");
  }

  /* ============================================ */
  /* 15. ANIMAÇÃO FIRE PULSE PARA TÍTULOS PROMOCIONAIS */
  /* ============================================ */

  const fireTitles = document.querySelectorAll(
    ".news-hero-title-highlight, .price-fire",
  );
  fireTitles.forEach((title) => {
    // Verifica se a animação já não está aplicada para não duplicar
    if (title.style.animation !== "firePulse 1.2s infinite ease-in-out") {
      title.style.animation = "firePulse 1.2s infinite ease-in-out";
    }
  });

  /* ============================================ */
  /* 16. NETMAX TV - BOTÕES "VER COMO ATIVAR" E LINKS */
  /* ============================================ */

  // Botão "VER COMO ATIVAR" - scroll suave para seção de ativação
  const verComoAtivarBtn = document.querySelector(".tv-world-link");
  if (verComoAtivarBtn) {
    verComoAtivarBtn.addEventListener("click", function (e) {
      e.preventDefault();
      const element = document.getElementById("como-ativar");
      if (element) {
        const offset = 80;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth",
        });
      }
    });
  }

  // Botão "QUERO ASSISTIR NETMAX TV AGORA" (CTA gigante)
  const assistirAgoraBtn = document.querySelector("#como-ativar .btn-primary");
  if (assistirAgoraBtn) {
    assistirAgoraBtn.addEventListener("click", function (e) {
      e.preventDefault();
      window.abrirModal(); // Abre o modal principal da TV
    });
  }

  // Hover effects nos itens de benefício do painel direito da TV
  const tvWorldBenefitItems = document.querySelectorAll(
    ".tv-world-benefit-item",
  );
  tvWorldBenefitItems.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(10px)"; // Move 10px para a direita
      this.style.transition = "transform 0.3s ease";
    });
    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)"; // Volta à posição original
    });
  });

  // Hover effects nos itens de feature do CDNTV
  const tvCdntvFeatures = document.querySelectorAll(".tv-cdntv-feature-item");
  tvCdntvFeatures.forEach((item) => {
    item.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(10px)";
      this.style.background = "rgba(255,208,0,0.2)"; // Fundo amarelo translúcido
    });
    item.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
      this.style.background = "rgba(255,208,0,0.1)"; // Fundo mais suave
    });
  });

  /* ============================================ */
  /* 17. GARANTIA DE FECHAMENTO DE MODAIS COM ESC */
  /* ============================================ */

  // Reforça o fechamento dos modais com tecla ESC (redundante com o anterior, mas garante)
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      const tvModalElement = document.getElementById("tvModal");
      const tvAtivacaoModalElement = document.getElementById("tvAtivacaoModal");
      if (tvModalElement && tvModalElement.style.display === "flex") {
        window.fecharModal();
      }
      if (
        tvAtivacaoModalElement &&
        tvAtivacaoModalElement.style.display === "flex"
      ) {
        window.fecharModalAtivacao();
      }
    }
  });
});
