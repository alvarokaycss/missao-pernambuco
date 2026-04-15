import { perguntas } from "./perguntas.js";
import { carregarMapa } from "./mapa.js";
import { ui, variaveisGlobais, quiz } from "./objetos.js";
import { playAudio, playAudioCidade, mostrarTela } from "./utils.js";

function iniciarEventos() {
    ui.btnIniciar.addEventListener("click", () => {
        playAudio();
        iniciarJogo();
    });

    ui.btnIniciarMissao.addEventListener("click", () => {
        iniciarFaseCidade();
    });

    ui.btnTentarNovamente.addEventListener("click", () => {
        tentarNovamente();
    });
}

// Funções do jogo
function tentarNovamente() {
    ui.filtroNoite.style.backgroundColor = "rgba(0,0,0,0)";
    mostrarTela("card-selecao");
    ui.btnTentarNovamente.classList.add("d-none")
}

// Funções do Quiz
function avancarProximaPergunta() {
        quiz.perguntaAtual++;
        quiz.tempo = perguntas[variaveisGlobais.cidadeSelecionada][quiz.perguntaAtual].tempo;
        ui.barraTempo.style.width = (quiz.tempo / quiz.tempoMaximo) * 100 + "%";
        ui.barraTempo.innerText = quiz.tempo + "s";
        ui.pergunta.innerText = perguntas[variaveisGlobais.cidadeSelecionada][quiz.perguntaAtual].pergunta;

        ui.botoesOpcao.forEach((botao, index) => {
            botao.innerText = perguntas[variaveisGlobais.cidadeSelecionada][quiz.perguntaAtual].opcoes[index];
            botao.onclick = () => {
                verificarResposta(index);
            };
        });
}

function diminuirVidaInterface() {

    const imagemVida = document.getElementById("vida-" + quiz.vidas);
    const gifAtualizado = "../assets/img/perdeu-vida.gif?t=" + new Date().getTime();
    imagemVida.src = gifAtualizado;

    if (quiz.vidas === 4) {
        // Muda para um vermelho transparente fraquinho
        ui.filtroNoite.style.backgroundColor = "rgba(18, 10, 63, 0.2)";
    } else if (quiz.vidas === 3) {
        // Mais escuro
        ui.filtroNoite.style.backgroundColor = "rgba(18, 10, 63, 0.4)";
    } else if (quiz.vidas === 2) {
        ui.filtroNoite.style.backgroundColor = "rgba(18, 10, 63, 0.6)";
    } else if (quiz.vidas === 1) {
        ui.filtroNoite.style.backgroundColor = "rgba(18, 10, 63, 0.85)";
    }

    // Salvamos esse temporizador para podermos matá-lo se o jogo acabar antes dos 3.9s
    const timer = setTimeout(() => {
        imagemVida.src = "../assets/img/lua.png";
    }, 3900);

    variaveisGlobais.timeoutLuas.push(timer);
    quiz.vidas--;
}

// Função Principal do Jogo
function iniciarJogo() {

    ui.btnIniciar.classList.add("d-none");
    ui.barraProgresso.classList.remove("d-none");

    let porcentagem = 0;

    // Executa a função a cada 300ms para simular o carregamento
    const temporizador = setInterval(() => {
        porcentagem += 10;

        // Atualiza HTML
        ui.barraFill.style.width = porcentagem + "%";
        ui.barraFill.innerText = porcentagem + "%";

        // Verifica se carregou completamente
        if (porcentagem >= 100) {
            clearInterval(temporizador);

            // Troca de tela após intervalo de 500ms
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

function iniciarFaseCidade() {
    if (!variaveisGlobais.cidadeSelecionada) return;

    if (!variaveisGlobais.cidadesDisponiveis.includes(variaveisGlobais.cidadeSelecionada)) {
        alert("Cidade ainda não disponível");
        return;
    }

    mostrarTela("card-quiz");
    iniciarQuiz();
}

function iniciarQuiz() {

    quiz.perguntaAtual = 0;
    quiz.vidas = 5;
    quiz.tempo = perguntas[variaveisGlobais.cidadeSelecionada][0].tempo;
    quiz.tempoMaximo = perguntas[variaveisGlobais.cidadeSelecionada][0].tempo;

    if (variaveisGlobais.cidadesPersonalizadas.includes(variaveisGlobais.cidadeSelecionada)) {
        playAudioCidade(variaveisGlobais.cidadeSelecionada);
    }

    ui.barraTempo.style.width = (quiz.tempo / quiz.tempoMaximo) * 100 + "%";
    ui.barraTempo.innerText = quiz.tempo + "s";
    ui.pergunta.innerText = perguntas[variaveisGlobais.cidadeSelecionada][quiz.perguntaAtual].pergunta;

    ui.botoesOpcao.forEach((botao, index) => {
        botao.innerText = perguntas[variaveisGlobais.cidadeSelecionada][quiz.perguntaAtual].opcoes[index];
        botao.onclick = () => {
            verificarResposta(index);
        };
    });

    // temporizador de tempo e vida
    const temporizador = setInterval(() => {
        quiz.tempo--;
        ui.barraTempo.style.width = (quiz.tempo / quiz.tempoMaximo) * 100 + "%";
        ui.barraTempo.innerText = quiz.tempo + "s";

        if (quiz.tempo <= 0) {
            diminuirVidaInterface();
            avancarProximaPergunta();
        }

        // Condição de DERROTA
        if (acabouOjogo()) {
            clearInterval(temporizador);
            quiz.perguntaAtual = 0;
            quiz.vidas = 5;

            // EXPURGANDO OS TIMEOUTS NO GAME OVER
            variaveisGlobais.timeoutLuas.forEach(clearTimeout);
            variaveisGlobais.timeoutLuas = [];

            mostrarTela("card-perdeu");

            document.getElementById("img-perdeu").src = "../assets/img/missão-falhou.gif?t=" + new Date().getTime();
            setTimeout(() => {
                document.getElementById("img-perdeu").src = "../assets/img/missão-falhou-img.png"
                document.getElementById("btn-tentar-novamente").classList.remove("d-none");
            }, 6000);

            for (let i = 1; i <= 5; i++) {
                const imagemVida = document.getElementById("vida-" + i);
                imagemVida.src = "../assets/img/sol.png";
            }

        }


    }, 1000);
}

function acabouOjogo() {
    return quiz.vidas <= 0;
}

function verificarResposta(resposta) {
    if (resposta === perguntas[variaveisGlobais.cidadeSelecionada][quiz.perguntaAtual].correta) {

        // Condição de vitória
        if (quiz.perguntaAtual === perguntas[variaveisGlobais.cidadeSelecionada].length - 1) {
            // EXPURGANDO OS TIMEOUTS NA VITÓRIA
            variaveisGlobais.timeoutLuas.forEach(clearTimeout);
            variaveisGlobais.timeoutLuas = [];

            alert("Parabéns! Você completou a missão!");

            // Reinicia para a próxima vez que for jogar
            mostrarTela("card-selecao");
            document.getElementById("body").className = "bg-pe";
            for (let i = 1; i <= 5; i++) {
                const imagemVida = document.getElementById("vida-" + i);
                imagemVida.src = "../assets/img/sol.png";
            }

            return;
        }
        avancarProximaPergunta();

    } else {
        diminuirVidaInterface();
        avancarProximaPergunta();
    }
}

// INICIA OS EVENTOS DO QUIZ
iniciarEventos();
