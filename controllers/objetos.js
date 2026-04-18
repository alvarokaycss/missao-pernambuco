// Elementos da Interface
export const ui = {
    botoesOpcao: document.querySelectorAll(".opcao"),
    barraTempo: document.getElementById("barra-tempo-fill"),
    pergunta: document.getElementById("pergunta"),
    filtroNoite: document.getElementById("noite"),
    cardSelecao: document.getElementById("card-selecao"),
    cardQuiz: document.getElementById("card-quiz"),
    btnIniciar: document.getElementById("btn-iniciar"),
    btnIniciarMissao: document.getElementById("btn-iniciar-missao"),
    btnTentarNovamente: document.getElementById("btn-tentar-novamente"),
    barraProgresso: document.getElementById("barra-progresso"),
    barraFill: document.getElementById("progresso-fill"),
    feedbackQuiz: document.getElementById("feedback"),
    perguntaFeedback: document.getElementById("pergunta-feedback"),
    imgTelaPerdeu: document.getElementById("img-tela-perdeu"),
    btnJogarNovamente: document.getElementById("btn-jogar-novamente")
}


// Caminhos das imagens
export const imagens = {
    acertouGif: "../assets/img/correto.gif",
    errouGif: "../assets/img/errado.gif",
    solGif: "../assets/img/sol.gif",
    lua: "../assets/img/lua.png",
    perdeuVidaGif: "../assets/img/perdeu-vida.gif",
    missaoFalhouGif: "../assets/img/missão-falhou.gif",
    missaoFalhouImg: "../assets/img/missão-falhou-img.png"
}


// Estados utilizados globalmente
export const variaveisGlobais = {
    mapaCarregado: false,
    cidadeSelecionada: null,
    layerSelecionada: null,
    timeoutLuas: [],
    cidadesPersonalizadas: ["Recife", "Olinda", "Caruaru"],
    cidadesDisponiveis: ["Recife", "Olinda", "Caruaru", "Garanhuns", "Petrolina", "Ipojuca", "Serra Talhada", "Gravatá"],
}


// Estados do Quiz
export const quiz = {
    perguntaAtual: 0,
    vidas: 5,
    tempo: 0,
    tempoMaximo: 0,
    temporizador: null,
    intervaloConfetti: null
}
