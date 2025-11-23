document.addEventListener("DOMContentLoaded", () => {
    // --- VARIÁVEIS GLOBAIS DE CONTROLE ---
    
    let postsData = []; // Armazena todos os posts não-destaque
    let postIndex = 0;  // O índice do próximo post a ser carregado
    const pageSize = 5; // Quantos posts carregar por vez após a carga inicial

    // Elementos do DOM (Verificação)
    const manchetePrincipalEl = document.getElementById("manchete-principal");
    const listaNoticiasEl_P1 = document.getElementById("lista-noticias-p1");
    const listaNoticiasEl_P2 = document.getElementById("lista-noticias-p2");
    const listaColunasEl = document.getElementById("lista-colunas");
    const listaChargesEl = document.getElementById("lista-charges");
    const sentinel = document.getElementById("load-more-sentinel"); // O gatilho de rolagem

    // --------------------------------------------------------------------------------------
    // --- FUNÇÕES DE CARGA E OBSERVER ---
    // --------------------------------------------------------------------------------------

    // 1. Função que carrega o próximo lote de posts
    function loadNextPosts() {
        const remainingPosts = postsData.length - postIndex;
        if (remainingPosts <= 0) {
            // Se não houver mais posts
            sentinel.textContent = "Fim das notícias.";
            observer.unobserve(sentinel); // Desliga o observador
            return;
        }

        const batchSize = Math.min(pageSize, remainingPosts);
        const newPosts = postsData.slice(postIndex, postIndex + batchSize);
        postIndex += batchSize;

        // Renderiza os novos posts no container P2 (que é o que tem o scroll)
        // Usamos o insertAdjacentHTML para ADICIONAR, e não substituir o conteúdo
        newPosts.forEach(post => {
            listaNoticiasEl_P2.insertAdjacentHTML('beforeend', criarCardFeed(post));
        });
    }

    // 2. Inicializa a Intersection Observer API
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Se o sentinel (gatilho) estiver visível, carrega mais posts
                loadNextPosts();
            }
        });
    }, { threshold: 0.1 }); // Dispara quando 10% do elemento está visível


    // 3. Função principal que busca e distribui o conteúdo
    async function carregarPosts() {
        try {
            const response = await fetch("data/noticias.json");
            if (!response.ok) throw new Error(`Erro ao carregar: ${response.statusText}`);
            const posts = await response.json();

            // --- DISTRIBUIÇÃO E SEPARAÇÃO ---
            const manchete = posts.find(post => post.destaque === true);
            const rawNoticias = posts.filter(post => post.categoria === "Notícia" && post.destaque !== true);
            
            // Armazena todas as notícias para o scroll
            postsData = rawNoticias; 

            // Colunas e Charges (Não mudam)
            const colunas = posts.filter(post => post.categoria === "Coluna");
            const charges = posts.filter(post => post.categoria === "Charge");

            // --- RENDERIZAÇÃO INICIAL (O SEU CHUNK FIXO) ---

            // Manchete
            manchetePrincipalEl.innerHTML = manchete ? criarCardManchete(manchete) : "<p>Nenhuma manchete principal definida.</p>";
            
            // Zera os containers
            listaNoticiasEl_P1.innerHTML = "";
            listaNoticiasEl_P2.innerHTML = "";
            sentinel.textContent = "Carregando...";

            // 1. Lote Inicial P1 (4 posts)
            const noticiasParte1 = rawNoticias.slice(postIndex, postIndex + 4);
            postIndex += 4;
            renderizarLista(noticiasParte1, listaNoticiasEl_P1, criarCardFeed, "Nenhuma notícia.");

            // 2. Lote Inicial P2 (Próximos 6 posts)
            const noticiasParte2 = rawNoticias.slice(postIndex, postIndex + 6);
            postIndex += 6;
            renderizarLista(noticiasParte2, listaNoticiasEl_P2, criarCardFeed, "Nenhuma notícia.");

            // Colunas e Charges (Sidebar)
            renderizarLista(colunas, listaColunasEl, criarCardSidebar, "Nenhuma coluna.");
            renderizarLista(charges, listaChargesEl, criarCardSidebar, "Nenhuma charge.");

            // INICIA O OBSERVADOR no gatilho
            observer.observe(sentinel);
            sentinel.textContent = "Role a página para carregar mais...";


        } catch (error) {
            console.error("Falha fatal ao carregar posts:", error);
            sentinel.textContent = "Erro ao carregar o feed.";
        }
    }
    
    // --------------------------------------------------------------------------------------
    // --- FÁBRICAS DE CARDS E FUNÇÕES DE RENDERIZAÇÃO (RESTAURADAS) ---
    // --------------------------------------------------------------------------------------

    // Renderiza uma lista de posts (função auxiliar genérica)
    function renderizarLista(listaDePosts, elementoHTML, funcaoCriarCard, mensagemVazio) {
        if (listaDePosts.length === 0) {
            elementoHTML.innerHTML = `<p>${mensagemVazio}</p>`;
            return;
        }

        let htmlAcumulado = "";
        listaDePosts.forEach(post => {
            htmlAcumulado += funcaoCriarCard(post);
        });

        elementoHTML.innerHTML = htmlAcumulado;
    }

    // Card 1: Manchete principal
    function criarCardManchete(post) {
        const link = `noticia.html?id=${post.id}`;
        return `
            <article class="main-headline">
                <a href="${link}">
                    <img src="${post.imagem}" alt="${post.titulo}">
                </a>
                <div class="news-content">
                    <span class="news-tag">${post.categoria}</span>
                    <a href="${link}" class="card-link-wrapper">
                        <h2 class="news-title">${post.titulo}</h2>
                    </a>
                    <p class="news-excerpt">${post.resumo}</p>
                    <a href="${link}" class="read-more">Leia a Matéria Completa &rarr;</a>
                </div>
            </article>
        `;
    }

    // Card 2: Feed (horizontal)
    function criarCardFeed(post) {
        const link = `noticia.html?id=${post.id}`;
        return `
            <article class="news-card">
                <a href="${link}">
                    <img src="${post.imagem}" alt="${post.titulo}">
                </a>
                <div class="news-content">
                    <span class="news-tag">${post.categoria}</span>
                    <a href="${link}" class="card-link-wrapper">
                        <h3 class="news-title">${post.titulo}</h3>
                    </a>
                    <a href="${link}" class="read-more" onclick="gtag('event', 'cta_click', { 'cta_type': 'Ver Mais', 'post_title': '${post.titulo}' });">Ver Mais &rarr;</a>
                </div>
            </article>
        `;
    }

    // Card 3: Sidebar (vertical)
    function criarCardSidebar(post) {
        const link = `noticia.html?id=${post.id}`;
        return `
            <article class="news-card">
                <a href="${link}">
                    <img src="${post.imagem}" alt="${post.titulo}">
                </a>
                <div class="news-content">
                    <span class="news-tag">${post.categoria}</span>
                    <a href="${link}" class="card-link-wrapper">
                        <h3 class="news-title">${post.titulo}</h3>
                    </a>
                    <p class="news-excerpt">${post.resumo}</p>
                    <a href="${link}" class="read-more" onclick="gtag('event', 'cta_click', { 'cta_type': 'Ver Mais', 'post_title': '${post.titulo}' });">Ver Mais &rarr;</a>
                </div>
            </article>
        `;
    }

    // CSS dinâmico (hover no título)
    const style = document.createElement("style");
    style.innerHTML = `
        .card-link-wrapper {
            text-decoration: none;
            color: inherit;
        }
        .card-link-wrapper:hover .news-title {
            color: var(--vermelho-principal);
        }
    `;
    document.head.appendChild(style);

    // Inicia o processo
    carregarPosts();

});