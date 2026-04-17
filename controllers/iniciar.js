import { perguntas } from "./perguntas.js";
import { carregarMapa } from "./mapa.js";
import { ui, variaveisGlobais, quiz, imagens } from "./objetos.js";
import { playAudio, playAudioCidade, mostrarTela, playAudioFeedback, playAudioFim } from "./utils.js";
import { jogarConfettiInfinito, pararConfettiInfinito } from "./confetes.js";
import { chuvaErro } from "./chuva.js";

function iniciarEventos() {
    ui.btnIniciar.addEventListener("click", () => {
        playAudio();
        iniciarJogoSelecao();
    });

    ui.btnIniciarMissao.addEventListener("click", () => {
        iniciarFaseCidade();
    });

    ui.btnTentarNovamente.addEventListener("click", () => {
        playAudio();
        tentarNovamente();
    });

    ui.btnJogarNovamente.addEventListener("click", () => {
        playAudio();
        jogarNovamente();
    });
}


// Tela de Derrota
function tentarNovamente() {
    ui.filtroNoite.style.backgroundColor = "rgba(0,0,0,0)";
    mostrarTela("card-selecao");
    ui.btnTentarNovamente.classList.add("d-none")
}
// ************************************************************

// Tela de Vitória
function jogarNovamente() {
    ui.filtroNoite.style.backgroundColor = "rgba(0,0,0,0)";
    pararConfettiInfinito(quiz.intervaloConfetti);
    mostrarTela("card-selecao");
    ui.btnJogarNovamente.classList.add("d-none")
}
// ************************************************************

// Funções de verificação (Legibilidade)
function acabouAsVidas() {
    return quiz.vidas <= 0;
}


function acabouTempo() {
    return quiz.tempo <= 0 && quiz.vidas > 0;
}


function ultimaPergunta(){
    return quiz.perguntaAtual === perguntas[variaveisGlobais.cidadeSelecionada].length - 1;
}


function respostaCorreta(resposta){
    return resposta === perguntas[variaveisGlobais.cidadeSelecionada][quiz.perguntaAtual].correta;
}
// ************************************************************

// Funções de lógica (Repetição)
function avancarProximaPergunta() {
        quiz.perguntaAtual++;
        quiz.tempo = perguntas[variaveisGlobais.cidadeSelecionada][quiz.perguntaAtual].tempo;
        ui.perguntaFeedback.innerText = `Perguntas: ${quiz.perguntaAtual + 1}/${perguntas[variaveisGlobais.cidadeSelecionada].length}`;
        ui.barraTempo.style.width = (quiz.tempo / quiz.tempoMaximo) * 100 + "%";
        ui.barraTempo.innerText = quiz.tempo + "s";
        ui.pergunta.innerText = perguntas[variaveisGlobais.cidadeSelecionada][quiz.perguntaAtual].pergunta;

        ui.botoesOpcao.forEach((botao, index) => {
            botao.innerText = perguntas[variaveisGlobais.cidadeSelecionada][quiz.perguntaAtual].opcoes[index];
            botao.onclick = () => {
                mostrarAlternativa(verificarResposta(index));
            };
        });
}


function diminuirVidaInterface() {

    const imagemVida = document.getElementById("vida-" + quiz.vidas);
    const gifAtualizado = imagens.perdeuVidaGif + "?t=" + new Date().getTime();
    imagemVida.src = gifAtualizado;

    quiz.vidas--;

    if (quiz.vidas === 4) ui.filtroNoite.style.backgroundColor = "rgba(18, 10, 63, 0.2)";
    if (quiz.vidas === 3) ui.filtroNoite.style.backgroundColor = "rgba(18, 10, 63, 0.4)";
    if (quiz.vidas === 2) ui.filtroNoite.style.backgroundColor = "rgba(18, 10, 63, 0.6)";
    if (quiz.vidas === 1) ui.filtroNoite.style.backgroundColor = "rgba(18, 10, 63, 0.75)";
    if (quiz.vidas === 0) ui.filtroNoite.style.backgroundColor = "rgba(18, 10, 63, 0.85)";

    const timer = setTimeout(() => {
        imagemVida.src = imagens.lua;
    }, 3900);

    variaveisGlobais.timeoutLuas.push(timer);
}


function resetarJogo(){
    // Reseta o jogo
    clearInterval(quiz.temporizador);
    quiz.perguntaAtual = 0;
    quiz.vidas = 5;

    // Reseta timeouts da lua
    variaveisGlobais.timeoutLuas.forEach(clearTimeout);
    variaveisGlobais.timeoutLuas = [];

    // Reseta as vidas na interface
    for (let i = 1; i <= 5; i++) {
        const imagemVida = document.getElementById("vida-" + i);
        imagemVida.src = imagens.solGif;
    }
}


// Feedback para o usuário das alternativas visual e sonoro
function mostrarAlternativa(acertou) {

    if (acertou === null) return;

    const img = acertou ? imagens.acertouGif : imagens.errouGif;
    ui.feedbackQuiz.src = img;
    ui.feedbackQuiz.classList.remove("d-none");
    playAudioFeedback(acertou);
    setTimeout(() => {
        ui.feedbackQuiz.classList.add("d-none");
    }, 800);
}
// ************************************************************

// Lógica de verificação de resposta com condições de vitória/derrota
function verificarResposta(resposta) {
    if (respostaCorreta(resposta)) {
        if (ultimaPergunta()) {
            resetarJogo();
            quiz.intervaloConfetti = jogarConfettiInfinito();
            mostrarTela("card-vitoria");
            playAudioFim(1);
            setTimeout(() => {
                ui.btnJogarNovamente.classList.remove("d-none");
            }, 3000);
            return 1;
        } else {
            avancarProximaPergunta();
            return 1;
        }
    } else {
        diminuirVidaInterface();

        if (acabouAsVidas()) {
            resetarJogo();
            mostrarTela("card-perdeu");
            playAudioFim(0);
            ui.imgTelaPerdeu.src = imagens.missaoFalhouGif + "?t=" + new Date().getTime();
            chuvaErro(40);
            setTimeout(() => {
                ui.imgTelaPerdeu.src = imagens.missaoFalhouImg;
                ui.btnTentarNovamente.classList.remove("d-none");
            }, 6000);
            return 0;
        } else if (ultimaPergunta()) {
            resetarJogo();
            quiz.intervaloConfetti = jogarConfettiInfinito();
            playAudioFim(1);
            mostrarTela("card-vitoria");
            setTimeout(() => {
                ui.btnJogarNovamente.classList.remove("d-none");
            }, 3000);
            return 0;
        } else {
            avancarProximaPergunta();
            return 0;
        }
    }
}
// ************************************************************

// Lógica do Temporizador com condições de vitória/derrota
function temporizador() {
        quiz.temporizador = setInterval(() => {
        quiz.tempo--;
        ui.barraTempo.style.width = (quiz.tempo / quiz.tempoMaximo) * 100 + "%";
        ui.barraTempo.innerText = quiz.tempo + "s";

        if (acabouTempo()) {
            mostrarAlternativa(0);
            diminuirVidaInterface();

            if (acabouAsVidas()) {
                resetarJogo();
                playAudioFim(0);
                mostrarTela("card-perdeu");
                ui.imgTelaPerdeu.src = imagens.missaoFalhouGif + "?t=" + new Date().getTime();
                chuvaErro(40);
                setTimeout(() => {
                    ui.imgTelaPerdeu.src = imagens.missaoFalhouImg;
                    ui.btnTentarNovamente.classList.remove("d-none");
                }, 6000);
            } else if (ultimaPergunta()) {
                resetarJogo();
                quiz.intervaloConfetti = jogarConfettiInfinito();
                playAudioFim(1);
                mostrarTela("card-vitoria");
                setTimeout(() => {
                    ui.btnJogarNovamente.classList.remove("d-none");
                }, 3000);
            } else {
                avancarProximaPergunta();
            }
        }
    }, 1000);
}
// ************************************************************

// Inicia a Fase de Seleção de Missão e Carrega o Mapa
function iniciarJogoSelecao() {

    ui.btnIniciar.classList.add("d-none");
    ui.barraProgresso.classList.remove("d-none");

    let porcentagem = 0;

    const temporizador = setInterval(() => {
        porcentagem += 10;

        ui.barraFill.style.width = porcentagem + "%";
        ui.barraFill.innerText = porcentagem + "%";

        if (porcentagem >= 100) {
            clearInterval(temporizador);

            setTimeout(() => {
                mostrarTela("card-selecao");
                if (!variaveisGlobais.mapaCarregado) {
                    carregarMapa();
                    variaveisGlobais.mapaCarregado = true;
                }
            }, 500);
        }
    }, 300);
}
// ************************************************************

// Inicia a Fase Selecionada
function iniciarFaseCidade() {
    if (!variaveisGlobais.cidadeSelecionada) return;

    // Nunca executará por que modifiquei no mapa.js pra deixar clicável apenas as cidades disponíveis
    if (!variaveisGlobais.cidadesDisponiveis.includes(variaveisGlobais.cidadeSelecionada)) {
        alert("Cidade ainda não disponível");
        return;
    }

    mostrarTela("card-quiz");
    iniciarQuiz();
}
// ************************************************************

// Função principal que de fato inicia o Jogo 
function iniciarQuiz() {

    quiz.perguntaAtual = 0;
    quiz.vidas = 5;
    quiz.tempo = perguntas[variaveisGlobais.cidadeSelecionada][0].tempo;
    quiz.tempoMaximo = perguntas[variaveisGlobais.cidadeSelecionada][0].tempo;

    if (variaveisGlobais.cidadesPersonalizadas.includes(variaveisGlobais.cidadeSelecionada)) {
        playAudioCidade(variaveisGlobais.cidadeSelecionada);
    }

    ui.perguntaFeedback.innerText = `Pergunta: ${quiz.perguntaAtual + 1}/${perguntas[variaveisGlobais.cidadeSelecionada].length}`;
    ui.barraTempo.style.width = (quiz.tempo / quiz.tempoMaximo) * 100 + "%";
    ui.barraTempo.innerText = quiz.tempo + "s";
    ui.pergunta.innerText = perguntas[variaveisGlobais.cidadeSelecionada][quiz.perguntaAtual].pergunta;

    ui.botoesOpcao.forEach((botao, index) => {
        botao.innerText = perguntas[variaveisGlobais.cidadeSelecionada][quiz.perguntaAtual].opcoes[index];
        botao.onclick = () => {
            mostrarAlternativa(verificarResposta(index));
        };
    });

    // Starta o temporizador do QUIZ
    temporizador();
}
// ************************************************************

// ===========================
// Inicia os eventos do QUIZ
// ===========================

iniciarEventos();
