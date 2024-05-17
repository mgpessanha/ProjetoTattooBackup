import { apiKeyR } from '../../config.js';
const apiKey = apiKeyR;

const botaoRequisicao = document.getElementById("removerButton");
const botaoDownload = document.getElementById("downloadButton");
const botaoContinuar = document.getElementById("continuarButton");

let imageURL;

// funçao para habilitar o botao conforme a condiçao dada
document.getElementById('uploadTattoo').addEventListener('change', function() {
    const fileInput = document.getElementById('uploadTattoo');
    const removeBgButton = document.getElementById('removerButton');
    if (fileInput.files.length > 0) {
        removeBgButton.disabled = false; 
    } else {
        removeBgButton.disabled = true;  
    }
});

// funçao que envia a img pra api
botaoRequisicao.onclick = () => {
    const loadingAnimation = document.getElementById('loading-animation');
    loadingAnimation.style.display = 'block';

    // pega a img da galeria
    const fileInput = document.getElementById('uploadTattoo');
    const image = fileInput.files[0];
    
    // envia os dados dessa img
    const formData = new FormData();
    formData.append('image_file', image);
    formData.append('size', 'auto');

    // solicitaçao pra api enviando a img e a chave da api
    fetch('https://api.remove.bg/v1.0/removebg',{
        method:'POST',
        headers: {
            'X-Api-Key': apiKey
        },
        body: formData
    })
    // a funçao blob guarda a resposta da api
    .then(function(response){
        return response.blob()
    })
    .then(function(blob){
        // funçao que simula o carregamento com o loading que dura 3s
        setTimeout(function() {
            const url = URL.createObjectURL(blob);
            // guarda a url da img retornada para utilizar na funçao de download
            imageURL = url;
            const imgResultado = document.getElementById('resultado-tatuagem');
            imgResultado.src = url;
            imgResultado.style.display = 'block';
    
            document.getElementById('botao-baixar').style.display = 'block';
            document.getElementById('titulo-escondido').style.color = '#000000';
            document.getElementById('aviso-download').style.color = '#7d4497';
            document.getElementById('aviso-download').style.textDecoration = 'underline';
            document.getElementById('aviso-continuar').style.color = '#7d4497';
            document.getElementById('aviso-continuar').style.textDecoration = 'underline';
    
            loadingAnimation.style.display = 'none'; 
        }, 3000); 
    })
    .catch(function(error){
        console.error('Erro: ', error);
    
        loadingAnimation.style.display = 'none';
    });

    document.getElementById('titulo-escondido').classList.remove('color-initial');
}

// funçao que faz o download da img retornada
botaoDownload.onclick = () => {
    // cria um link com a url da img
    let anchorElement = document.createElement('a'); 
    anchorElement.href = imageURL;
    anchorElement.download = 'tatuagem-sem-fundo.png';
    document.body.appendChild(anchorElement);

    anchorElement.click();

    document.body.removeChild(anchorElement);

    // exibe o botao continuar
    botaoContinuar.style.display = 'block';
}

// funçao que redireciona pra outra pagina através do click no botao continuar
botaoContinuar.onclick = () => {
    window.location.href = "adicionar-corpo.html";
}