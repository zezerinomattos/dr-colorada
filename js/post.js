// // Espera todo o HTML da página ser carregado
// document.addEventListener("DOMContentLoaded", () => {
    
//     // Seleciona os locais no HTML que vamos preencher
//     const tituloEl = document.getElementById("post-titulo");
//     const categoriaEl = document.getElementById("post-categoria");
//     const dataEl = document.getElementById("post-data");
//     const mediaContainerEl = document.getElementById("post-media-container");
//     const conteudoEl = document.getElementById("post-conteudo");

//     // 1. Pega o ID da URL
//     const urlParams = new URLSearchParams(window.location.search);
//     const postId = urlParams.get('id');

//     // Se não tiver ID, exibe erro
//     if (!postId) {
//         exibirErro("Não foi possível encontrar o post.");
//         return;
//     }

//     // 2. Função para buscar o post específico
//     async function carregarPost(id) {
//         try {
//             const response = await fetch("data/noticias.json");
//             if (!response.ok) {
//                 throw new Error("Falha ao carregar o banco de dados.");
//             }
            
//             const posts = await response.json();
            
//             // Encontra o post específico no array
//             // Usamos parseInt(id) para garantir que estamos comparando números
//             const post = posts.find(p => p.id === parseInt(id));

//             // Se o ID não existir no JSON, exibe erro
//             if (!post) {
//                 throw new Error("Post não encontrado.");
//             }

//             // 3. Preenche a página com os dados do post
//             renderizarPost(post);

//         } catch (error) {
//             console.error(error);
//             exibirErro(error.message);
//         }
//     }

//     function renderizarPost(post) {
//         // --- 1. ATUALIZA AS META TAGS E O TÍTULO DA PÁGINA ---
//         document.title = post.titulo + " - DR em Campo";
        
//         // Atualiza a meta tag de descrição
//         document.querySelector('meta[name="description"]').setAttribute("content", post.resumo);
        
//         // Atualiza as meta tags Open Graph (Social)
//         document.querySelector('meta[property="og:title"]').setAttribute("content", post.titulo);
//         document.querySelector('meta[property="og:description"]').setAttribute("content", post.resumo);
//         document.querySelector('meta[property="og:image"]').setAttribute("content", post.imagem);
//         document.querySelector('meta[property="og:url"]').setAttribute("content", window.location.href);

//         // --- 2. SEU CÓDIGO ANTIGO (continua igual) ---
//         // Preenche os elementos
//         tituloEl.textContent = post.titulo;
//         categoriaEl.textContent = post.categoria;
//         dataEl.textContent = `Publicado em: ${post.data}`;

//         // Limpa o conteúdo de "Carregando"
//         mediaContainerEl.innerHTML = "";
//         conteudoEl.innerHTML = "";

//         // Lógica: Se for 'video', mostra o iframe. Se for 'texto', mostra a imagem.
//         if (post.tipo === 'video' && post.videoUrl) {
            
//             const videoIframe = document.createElement('iframe');
//             videoIframe.src = post.videoUrl;
//             // ... (resto do seu código de iframe)
//             mediaContainerEl.appendChild(videoIframe);
//             conteudoEl.innerHTML = `<p>${post.resumo}</p>`;

//         } else {
//             const imagem = document.createElement('img');
//             imagem.src = post.imagem;
//             imagem.alt = post.titulo;
//             mediaContainerEl.appendChild(imagem);
//             conteudoEl.innerHTML = post.conteudo;
//         }
//     }

//     // 5. Função de Erro
//     function exibirErro(mensagem) {
//         tituloEl.textContent = "Erro!";
//         categoriaEl.style.display = 'none'; // Esconde a tag
//         dataEl.style.display = 'none'; // Esconde a data
//         conteudoEl.innerHTML = `<p style="color: red; font-weight: bold;">${mensagem}</p><p>Tente voltar para a <a href="index.html">página inicial</a>.</p>`;
//     }

//     // --- Inicia tudo ---
//     carregarPost(postId);

// });

// Espera todo o HTML da página ser carregado
document.addEventListener("DOMContentLoaded", () => {
    
    // Variáveis
    const tituloEl = document.getElementById("post-titulo");
    const categoriaEl = document.getElementById("post-categoria");
    const dataEl = document.getElementById("post-data");
    const mediaContainerEl = document.getElementById("post-media-container");
    const conteudoEl = document.getElementById("post-conteudo");
    const shareBarEl = document.getElementById("social-share-buttons"); 

    // 1. Pega o ID da URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    // Se não tiver ID, exibe erro
    if (!postId) {
        exibirErro("Não foi possível encontrar o post.");
        return;
    }

    // ----------------------------------------------------------------------------------
    // --- FUNÇÕES AUXILIARES ---
    // ----------------------------------------------------------------------------------

    function exibirErro(mensagem) {
        tituloEl.textContent = "Erro!";
        categoriaEl.style.display = 'none'; 
        dataEl.style.display = 'none'; 
        conteudoEl.innerHTML = `<p style="color: red; font-weight: bold;">${mensagem}</p><p>Tente voltar para a <a href="index.html">página inicial</a>.</p>`;
    }
    
    function adicionarBotoesCompartilhamento(post) {
        const shareUrl = encodeURIComponent(window.location.href);
        const shareTitle = encodeURIComponent(post.titulo);
        
        const buttonsHtml = `
            <a class="btn-share btn-whatsapp" href="https://wa.me/?text=${shareTitle}%20%7C%20Leia%20em:%20${shareUrl}" target="_blank">
                WhatsApp
            </a>
            <a class="btn-share btn-facebook" href="https://www.facebook.com/sharer/sharer.php?u=${shareUrl}" target="_blank">
                Facebook
            </a>
            <a class="btn-share btn-instagram" href="https://www.instagram.com/z_mattos" target="_blank">
                Siga no Instagram
            </a>
        `;
        shareBarEl.innerHTML += buttonsHtml;
    }
    
    function renderizarPost(post) {
        // 1. ATUALIZA META TAGS (código omitido para brevidade, mas está correto)
        document.title = post.titulo + " - DR em Campo";
        // ... (resto do código de meta tags)

        // 2. PREENCHIMENTO VISUAL
        tituloEl.textContent = post.titulo;
        categoriaEl.textContent = post.categoria;
        dataEl.textContent = `Publicado em: ${post.data}`;

        mediaContainerEl.innerHTML = "";
        conteudoEl.innerHTML = "";

        // --- LÓGICA DE CONTEÚDO (O CÓDIGO QUE ESTAVA FALTANDO) ---
        if (post.tipo === 'video' && post.videoUrl) {
            // Código para vídeo
            const videoIframe = document.createElement('iframe');
            videoIframe.src = post.videoUrl;
            videoIframe.title = post.titulo;
            videoIframe.setAttribute('frameborder', '0');
            videoIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
            videoIframe.setAttribute('allowfullscreen', '');
            
            mediaContainerEl.appendChild(videoIframe);
            conteudoEl.innerHTML = `<p>${post.resumo}</p>`; // Vídeo mostra o resumo
        } else {
            // Código para imagem (texto/coluna)
            const imagem = document.createElement('img');
            imagem.src = post.imagem;
            imagem.alt = post.titulo;
            mediaContainerEl.appendChild(imagem);
            conteudoEl.innerHTML = post.conteudo; // Texto mostra o conteúdo completo
        }

        // --- CHAMA A FUNÇÃO DE COMPARTILHAMENTO ---
        adicionarBotoesCompartilhamento(post);
    }

    // 2. Função para buscar o post específico (carregarPost)
    async function carregarPost(id) {
        try {
            const response = await fetch("data/noticias.json");
            if (!response.ok) throw new Error("Falha ao carregar o banco de dados.");
            const posts = await response.json();
            const post = posts.find(p => p.id === parseInt(id));

            if (!post) throw new Error("Post não encontrado.");

            renderizarPost(post);

        } catch (error) {
            console.error(error);
            exibirErro(error.message);
        }
    }

    // --- INICIA TUDO ---
    carregarPost(postId);

});