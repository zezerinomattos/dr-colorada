// Espera todo o HTML da página ser carregado
document.addEventListener("DOMContentLoaded", () => {
    
    // Seleciona os locais no HTML que vamos preencher
    const tituloEl = document.getElementById("post-titulo");
    const categoriaEl = document.getElementById("post-categoria");
    const dataEl = document.getElementById("post-data");
    const mediaContainerEl = document.getElementById("post-media-container");
    const conteudoEl = document.getElementById("post-conteudo");

    // 1. Pega o ID da URL
    const urlParams = new URLSearchParams(window.location.search);
    const postId = urlParams.get('id');

    // Se não tiver ID, exibe erro
    if (!postId) {
        exibirErro("Não foi possível encontrar o post.");
        return;
    }

    // 2. Função para buscar o post específico
    async function carregarPost(id) {
        try {
            const response = await fetch("data/noticias.json");
            if (!response.ok) {
                throw new Error("Falha ao carregar o banco de dados.");
            }
            
            const posts = await response.json();
            
            // Encontra o post específico no array
            // Usamos parseInt(id) para garantir que estamos comparando números
            const post = posts.find(p => p.id === parseInt(id));

            // Se o ID não existir no JSON, exibe erro
            if (!post) {
                throw new Error("Post não encontrado.");
            }

            // 3. Preenche a página com os dados do post
            renderizarPost(post);

        } catch (error) {
            console.error(error);
            exibirErro(error.message);
        }
    }

    // 4. Função que desenha o post na tela
    function renderizarPost(post) {
        // Atualiza o Título da Aba do Navegador
        document.title = post.titulo + " - DR Colorada";

        // Preenche os elementos
        tituloEl.textContent = post.titulo;
        categoriaEl.textContent = post.categoria;
        dataEl.textContent = `Publicado em: ${post.data}`;

        // Limpa o conteúdo de "Carregando"
        mediaContainerEl.innerHTML = "";
        conteudoEl.innerHTML = "";

        // Lógica: Se for 'video', mostra o iframe. Se for 'texto', mostra a imagem.
        if (post.tipo === 'video' && post.videoUrl) {
            
            // Cria um Iframe para o vídeo
            const videoIframe = document.createElement('iframe');
            videoIframe.src = post.videoUrl;
            videoIframe.title = post.titulo;
            videoIframe.setAttribute('frameborder', '0');
            videoIframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
            videoIframe.setAttribute('allowfullscreen', '');
            
            mediaContainerEl.appendChild(videoIframe);
            
            // No caso do vídeo (charge), o "conteúdo" será o resumo
            conteudoEl.innerHTML = `<p>${post.resumo}</p>`;

        } else {
            // Cria a imagem de destaque
            const imagem = document.createElement('img');
            imagem.src = post.imagem;
            imagem.alt = post.titulo;
            
            mediaContainerEl.appendChild(imagem);
            
            // No caso de texto (notícia/coluna), injeta o HTML do conteúdo
            conteudoEl.innerHTML = post.conteudo;
        }
    }

    // 5. Função de Erro
    function exibirErro(mensagem) {
        tituloEl.textContent = "Erro!";
        categoriaEl.style.display = 'none'; // Esconde a tag
        dataEl.style.display = 'none'; // Esconde a data
        conteudoEl.innerHTML = `<p style="color: red; font-weight: bold;">${mensagem}</p><p>Tente voltar para a <a href="index.html">página inicial</a>.</p>`;
    }

    // --- Inicia tudo ---
    carregarPost(postId);

});