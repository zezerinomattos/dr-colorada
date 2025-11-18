document.addEventListener("DOMContentLoaded", () => {
    
    // --- LÓGICA DO BOTÃO "VOLTAR AO TOPO" ---

    // 1. Criar o botão
    const scrollTopButton = document.createElement("button");
    scrollTopButton.innerHTML = "&uarr;"; // Seta para cima
    scrollTopButton.id = "scrollTopBtn";
    document.body.appendChild(scrollTopButton);

    // 2. Estilizar o botão (via JS para não poluir o CSS)
    const style = document.createElement('style');
    style.innerHTML = `
        #scrollTopBtn {
            display: none; /* Começa escondido */
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            background-color: var(--vermelho-principal);
            color: white;
            border: none;
            border-radius: 50%;
            width: 50px;
            height: 50px;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 4px 10px rgba(0,0,0,0.3);
            opacity: 0.8;
            transition: opacity 0.3s;
        }
        #scrollTopBtn:hover {
            opacity: 1;
        }
    `;
    document.head.appendChild(style);

    // 3. Mostrar/Esconder baseado no scroll
    window.onscroll = () => {
        if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
            scrollTopButton.style.display = "block";
        } else {
            scrollTopButton.style.display = "none";
        }
    };

    // 4. Ação de clicar
    scrollTopButton.addEventListener("click", () => {
        document.body.scrollTop = 0; // Para Safari
        document.documentElement.scrollTop = 0; // Para Chrome, Firefox, etc.
    });

});
