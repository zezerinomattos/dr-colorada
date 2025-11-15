// // Espera todo o HTML da página ser carregado
// document.addEventListener("DOMContentLoaded", () => {

//     // 1. Seleciona os NOVOS locais no HTML
//     const manchetePrincipalEl = document.getElementById("manchete-principal");
//     // --- MUDANÇA AQUI: Seleciona as duas novas divs do feed ---
//     const listaNoticiasEl_P1 = document.getElementById("lista-noticias-p1");
//     const listaNoticiasEl_P2 = document.getElementById("lista-noticias-p2");
//     // --- FIM DA MUDANÇA ---
//     const listaColunasEl = document.getElementById("lista-colunas");
//     const listaChargesEl = document.getElementById("lista-charges");

//     // 2. Função principal que busca os dados
//     async function carregarPosts() {
//         try {
//             const response = await fetch("data/noticias.json");

//             if (!response.ok) {
//                 throw new Error(`Erro ao carregar: ${response.statusText}`);
//             }

//             const posts = await response.json();

//             // 3. LÓGICA DE SEPARAÇÃO (A MÁGICA ACONTECE AQUI)

//             // A. Encontra a manchete principal (o post com "destaque: true")
//             const manchete = posts.find(post => post.destaque === true);

//             // B. Filtra as notícias comuns (categoria "Notícia" SEM "destaque: true")
//             const noticias = posts.filter(post => 
//                 post.categoria === "Notícia" && post.destaque !== true
//             );

//             // --- MUDANÇA AQUI: "Fatia" a lista de notícias ---
//             // E. Divide a lista de notícias
//             const noticiasParte1 = noticias.slice(0, 4); // Pega os 4 primeiros
//             const noticiasParte2 = noticias.slice(4);    // Pega o restante (do 5º em diante)
//             // --- FIM DA MUDANÇA ---

//             // C. Filtra as colunas
//             const colunas = posts.filter(post => post.categoria === "Coluna");

//             // D. Filtra as charges
//             const charges = posts.filter(post => post.categoria === "Charge");

//             // 4. Limpa as mensagens de "Carregando..."
//             manchetePrincipalEl.innerHTML = "";
//             // --- MUDANÇA AQUI: Limpa os novos elementos ---
//             listaNoticiasEl_P1.innerHTML = "";
//             listaNoticiasEl_P2.innerHTML = "";
//             // --- FIM DA MUDANÇA ---
//             listaColunasEl.innerHTML = "";
//             listaChargesEl.innerHTML = "";

//             // 5. RENDERIZA CADA SEÇÃO

//             // Renderiza a Manchete
//             if (manchete) {
//                 manchetePrincipalEl.innerHTML = criarCardManchete(manchete);
//             } else {
//                 manchetePrincipalEl.innerHTML = "<p>Nenhuma manchete principal definida.</p>";
//             }

//             // --- MUDANÇA AQUI: Renderiza o feed em duas partes ---
//             // Renderiza o Feed de Notícias (Parte 1)
//             renderizarLista(noticiasParte1, listaNoticiasEl_P1, criarCardFeed, "Nenhuma outra notícia encontrada.");
            
//             // Só renderiza a Parte 2 se houver posts para ela
//             if (noticiasParte2.length > 0) {
//                 renderizarLista(noticiasParte2, listaNoticiasEl_P2, criarCardFeed, "");
//             }
//             // --- FIM DA MUDANÇA ---
            
//             // Renderiza a Sidebar de Colunas (usa o card vertical)
//             renderizarLista(colunas, listaColunasEl, criarCardSidebar, "Nenhuma coluna encontrada.");

//             // Renderiza a Sidebar de Charges (usa o card vertical)
//             renderizarLista(charges, listaChargesEl, criarCardSidebar, "Nenhuma charge encontrada.");

//         } catch (error) {
//             console.error("Falha ao buscar ou processar os posts:", error);
//             // Avisa o usuário na tela em todos os locais
//             manchetePrincipalEl.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
//             // --- MUDANÇA AQUI: Erro no novo elemento ---
//             listaNoticiasEl_P1.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
//             // --- FIM DA MUDANÇA ---
//             listaColunasEl.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
//             listaChargesEl.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
//         }
//     }

//     // Função genérica para renderizar uma lista de posts
//     // Ela recebe a lista, o local (elemento) e a FUNÇÃO que cria o card
//     function renderizarLista(listaDePosts, elementoHTML, funcaoCriarCard, mensagemVazio) {
//         if (listaDePosts.length === 0) {
//             elementoHTML.innerHTML = `<p>${mensagemVazio}</p>`;
//             return;
//         }

//         let htmlAcumulado = "";
//         listaDePosts.forEach(post => {
//             htmlAcumulado += funcaoCriarCard(post);
//         });

//         elementoHTML.innerHTML = htmlAcumulado;
//     }

//     // --- NOSSAS 3 FÁBRICAS DE CARDS ---

//     // Card 1: MANCHETE (Layout grande, para #manchete-principal)
//     function criarCardManchete(post) {
//         const link = `noticia.html?id=${post.id}`;
//         return `
//             <article class="main-headline">
//                 <a href="${link}">
//                     <img src="${post.imagem}" alt="${post.titulo}">
//                 </a>
//                 <div class="news-content">
//                     <span class="news-tag">${post.categoria}</span>
//                     <a href="${link}" class="card-link-wrapper">
//                         <h2 class="news-title">${post.titulo}</h2>
//                     </a>
//                     <p class="news-excerpt">${post.resumo}</p>
//                     <a href="${link}" class="read-more">Leia a Matéria Completa &rarr;</a>
//                 </div>
//             </article>
//         `;
//     }

//     // Card 2: FEED (Layout horizontal, para #lista-noticias-p1 e p2)
//     function criarCardFeed(post) {
//         const link = `noticia.html?id=${post.id}`;
//         return `
//             <article class="news-card">
//                 <a href="${link}">
//                     <img src="${post.imagem}" alt="${post.titulo}">
//                 </a>
//                 <div class="news-content">
//                     <span class="news-tag">${post.categoria}</span>
//                     <a href="${link}" class="card-link-wrapper">
//                          <h3 class="news-title">${post.titulo}</h3>
//                     </a>
//                     <a href="${link}" class="read-more">Ver Mais &rarr;</a>
//                 </div>
//             </article>
//         `;
//     }

//     // Card 3: SIDEBAR (Layout vertical, para #lista-colunas e #lista-charges)
//     function criarCardSidebar(post) {
//         const link = `noticia.html?id=${post.id}`;
//         return `
//             <article class="news-card">
//                 <a href="${link}">
//                     <img src="${post.imagem}" alt="${post.titulo}">
//                 </a>
//                 <div class="news-content">
//                     <span class="news-tag">${post.categoria}</span>
//                     <a href="${link}" class="card-link-wrapper">
//                         <h3 class="news-title">${post.titulo}</h3>
//                     </a>
//                     <p class="news-excerpt">${post.resumo}</p>
//                     <a href="${link}" class="read-more">Ver Mais &rarr;</a>
//                 </div>
//             </article>
//         `;
//     }
    
//     // --- Bônus: Adiciona um CSS para os links dos títulos ---
//     // Isso é para o <a> que envolve o título (boa prática de UX)
//     const style = document.createElement('style');
//     style.innerHTML = `
//         .card-link-wrapper {
//             text-decoration: none;
//             color: inherit;
//         }
//         .card-link-wrapper:hover .news-title {
//             color: var(--vermelho-principal);
//         }
//     `;
//     document.head.appendChild(style);


//     // --- Inicia tudo ---
//     carregarPosts();

// });

// // Espera todo o HTML da página ser carregado
// document.addEventListener("DOMContentLoaded", () => {

//     // 1. Seleciona os NOVOS locais no HTML
//     const manchetePrincipalEl = document.getElementById("manchete-principal");
//     const listaNoticiasEl = document.getElementById("lista-noticias");
//     const listaColunasEl = document.getElementById("lista-colunas");
//     const listaChargesEl = document.getElementById("lista-charges");

//     // 2. Função principal que busca os dados
//     async function carregarPosts() {
//         try {
//             const response = await fetch("data/noticias.json");

//             if (!response.ok) {
//                 throw new Error(`Erro ao carregar: ${response.statusText}`);
//             }

//             const posts = await response.json();

//             // 3. LÓGICA DE SEPARAÇÃO (A MÁGICA ACONTECE AQUI)

//             // A. Encontra a manchete principal (o post com "destaque: true")
//             const manchete = posts.find(post => post.destaque === true);

//             // B. Filtra as notícias comuns (categoria "Notícia" SEM "destaque: true")
//             const noticias = posts.filter(post => 
//                 post.categoria === "Notícia" && post.destaque !== true
//             );

//             // C. Filtra as colunas
//             const colunas = posts.filter(post => post.categoria === "Coluna");

//             // D. Filtra as charges
//             const charges = posts.filter(post => post.categoria === "Charge");

//             // 4. Limpa as mensagens de "Carregando..."
//             manchetePrincipalEl.innerHTML = "";
//             listaNoticiasEl.innerHTML = "";
//             listaColunasEl.innerHTML = "";
//             listaChargesEl.innerHTML = "";

//             // 5. RENDERIZA CADA SEÇÃO

//             // Renderiza a Manchete
//             if (manchete) {
//                 manchetePrincipalEl.innerHTML = criarCardManchete(manchete);
//             } else {
//                 manchetePrincipalEl.innerHTML = "<p>Nenhuma manchete principal definida.</p>";
//             }

//             // Renderiza o Feed de Notícias (usa o card horizontal)
//             renderizarLista(noticias, listaNoticiasEl, criarCardFeed, "Nenhuma outra notícia encontrada.");
            
//             // Renderiza a Sidebar de Colunas (usa o card vertical)
//             renderizarLista(colunas, listaColunasEl, criarCardSidebar, "Nenhuma coluna encontrada.");

//             // Renderiza a Sidebar de Charges (usa o card vertical)
//             renderizarLista(charges, listaChargesEl, criarCardSidebar, "Nenhuma charge encontrada.");

//         } catch (error) {
//             console.error("Falha ao buscar ou processar os posts:", error);
//             // Avisa o usuário na tela em todos os locais
//             manchetePrincipalEl.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
//             listaNoticiasEl.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
//             listaColunasEl.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
//             listaChargesEl.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
//         }
//     }

//     // Função genérica para renderizar uma lista de posts
//     // Ela recebe a lista, o local (elemento) e a FUNÇÃO que cria o card
//     function renderizarLista(listaDePosts, elementoHTML, funcaoCriarCard, mensagemVazio) {
//         if (listaDePosts.length === 0) {
//             elementoHTML.innerHTML = `<p>${mensagemVazio}</p>`;
//             return;
//         }

//         let htmlAcumulado = "";
//         listaDePosts.forEach(post => {
//             htmlAcumulado += funcaoCriarCard(post);
//         });

//         elementoHTML.innerHTML = htmlAcumulado;
//     }

//     // --- NOSSAS 3 FÁBRICAS DE CARDS ---

//     // Card 1: MANCHETE (Layout grande, para #manchete-principal)
//     function criarCardManchete(post) {
//         const link = `noticia.html?id=${post.id}`;
//         return `
//             <article class="main-headline">
//                 <a href="${link}">
//                     <img src="${post.imagem}" alt="${post.titulo}">
//                 </a>
//                 <div class="news-content">
//                     <span class="news-tag">${post.categoria}</span>
//                     <a href="${link}" class="card-link-wrapper">
//                         <h2 class="news-title">${post.titulo}</h2>
//                     </a>
//                     <p class="news-excerpt">${post.resumo}</p>
//                     <a href="${link}" class="read-more">Leia a Matéria Completa &rarr;</a>
//                 </div>
//             </article>
//         `;
//     }

//     // Card 2: FEED (Layout horizontal, para #lista-noticias)
//     function criarCardFeed(post) {
//         const link = `noticia.html?id=${post.id}`;
//         return `
//             <article class="news-card">
//                 <a href="${link}">
//                     <img src="${post.imagem}" alt="${post.titulo}">
//                 </a>
//                 <div class="news-content">
//                     <span class="news-tag">${post.categoria}</span>
//                     <a href="${link}" class="card-link-wrapper">
//                          <h3 class="news-title">${post.titulo}</h3>
//                     </a>
//                     <a href="${link}" class="read-more">Ver Mais &rarr;</a>
//                 </div>
//             </article>
//         `;
//     }

//     // Card 3: SIDEBAR (Layout vertical, para #lista-colunas e #lista-charges)
//     function criarCardSidebar(post) {
//         const link = `noticia.html?id=${post.id}`;
//         return `
//             <article class="news-card">
//                 <a href="${link}">
//                     <img src="${post.imagem}" alt="${post.titulo}">
//                 </a>
//                 <div class="news-content">
//                     <span class="news-tag">${post.categoria}</span>
//                     <a href="${link}" class="card-link-wrapper">
//                         <h3 class="news-title">${post.titulo}</h3>
//                     </a>
//                     <p class="news-excerpt">${post.resumo}</p>
//                     <a href="${link}" class="read-more">Ver Mais &rarr;</a>
//                 </div>
//             </article>
//         `;
//     }
    
//     // --- Bônus: Adiciona um CSS para os links dos títulos ---
//     // Isso é para o <a> que envolve o título (boa prática de UX)
//     const style = document.createElement('style');
//     style.innerHTML = `
//         .card-link-wrapper {
//             text-decoration: none;
//             color: inherit;
//         }
//         .card-link-wrapper:hover .news-title {
//             color: var(--vermelho-principal);
//         }
//     `;
//     document.head.appendChild(style);


//     // --- Inicia tudo ---
//     carregarPosts();

// });


// Espera todo o HTML da página ser carregado
document.addEventListener("DOMContentLoaded", () => {

    // 1. Seleciona os NOVOS locais no HTML
    const manchetePrincipalEl = document.getElementById("manchete-principal");

    // Divisão do feed (Parte 1 e Parte 2)
    const listaNoticiasEl_P1 = document.getElementById("lista-noticias-p1");
    const listaNoticiasEl_P2 = document.getElementById("lista-noticias-p2");

    const listaColunasEl = document.getElementById("lista-colunas");
    const listaChargesEl = document.getElementById("lista-charges");

    // 2. Função principal que busca os dados
    async function carregarPosts() {
        try {
            const response = await fetch("data/noticias.json");

            if (!response.ok) {
                throw new Error(`Erro ao carregar: ${response.statusText}`);
            }

            const posts = await response.json();

            // --- LÓGICA DE SEPARAÇÃO ---

            // A. Manchete principal
            const manchete = posts.find(post => post.destaque === true);

            // B. Notícias comuns
            const noticias = posts.filter(post =>
                post.categoria === "Notícia" && post.destaque !== true
            );

            // C. Divisão em duas partes
            const noticiasParte1 = noticias.slice(0, 4);
            const noticiasParte2 = noticias.slice(4);

            // D. Colunas e Charges
            const colunas = posts.filter(post => post.categoria === "Coluna");
            const charges = posts.filter(post => post.categoria === "Charge");

            // Limpa mensagens de carregamento
            manchetePrincipalEl.innerHTML = "";
            listaNoticiasEl_P1.innerHTML = "";
            listaNoticiasEl_P2.innerHTML = "";
            listaColunasEl.innerHTML = "";
            listaChargesEl.innerHTML = "";

            // --- RENDERIZAÇÃO ---

            // Manchete principal
            if (manchete) {
                manchetePrincipalEl.innerHTML = criarCardManchete(manchete);
            } else {
                manchetePrincipalEl.innerHTML = "<p>Nenhuma manchete principal definida.</p>";
            }

            // Parte 1 do feed
            renderizarLista(
                noticiasParte1,
                listaNoticiasEl_P1,
                criarCardFeed,
                "Nenhuma outra notícia encontrada."
            );

            // Parte 2 do feed
            if (noticiasParte2.length > 0) {
                renderizarLista(
                    noticiasParte2,
                    listaNoticiasEl_P2,
                    criarCardFeed,
                    "Nenhuma notícia adicional."
                );
            } else {
                listaNoticiasEl_P2.innerHTML = "<p>Nenhuma notícia adicional.</p>";
            }

            // Colunas
            renderizarLista(
                colunas,
                listaColunasEl,
                criarCardSidebar,
                "Nenhuma coluna encontrada."
            );

            // Charges
            renderizarLista(
                charges,
                listaChargesEl,
                criarCardSidebar,
                "Nenhuma charge encontrada."
            );

        } catch (error) {
            console.error("Falha ao buscar ou processar os posts:", error);

            manchetePrincipalEl.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
            listaNoticiasEl_P1.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
            listaNoticiasEl_P2.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
            listaColunasEl.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
            listaChargesEl.innerHTML = "<p>Erro ao carregar conteúdo.</p>";
        }
    }

    // Renderiza uma lista de posts
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

    // --- FÁBRICAS DE CARDS ---

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
                    <a href="${link}" class="read-more">Ver Mais &rarr;</a>
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
                    <a href="${link}" class="read-more">Ver Mais &rarr;</a>
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

    // Inicia tudo
    carregarPosts();

});
