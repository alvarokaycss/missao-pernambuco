
function mostrarTela(id) {
    document.querySelectorAll(".tela").forEach(tela => {
        tela.classList.remove("ativa");
    });

    document.getElementById(id).classList.add("ativa");
}

let mapaCarregado = false;
let cidadeSelecionada = null;
let layerSelecionada = null;
let timeoutLuas = []; // Array para guardar os fantasmas

function iniciarJogo() {

    const btn = document.getElementById("btn-iniciar");
    const barraContainer = document.getElementById("barra-progresso");
    const barraFill = document.getElementById("progresso-fill");


    btn.classList.add("d-none");
    barraContainer.classList.remove("d-none");


    let porcentagem = 0;

    // temporizador executando a função a cada 300ms
    const temporizador = setInterval(() => {
        porcentagem += 10;

        // Atualiza HTML
        barraFill.style.width = porcentagem + "%";
        barraFill.innerText = porcentagem + "%";

        // Verifica se carregou completamente
        if (porcentagem >= 100) {
            clearInterval(temporizador); // Para o nosso temporizador

            // Troca de tela após um micro intervalinho (500ms) para ficar suave
            setTimeout(() => {
                mostrarTela("card-selecao");
                if (!mapaCarregado) {
                    carregarMapa();
                    mapaCarregado = true;
                }
            }, 500);
        }
    }, 300);
}

// FUNÇÃO PRONTA DO MAPA
function carregarMapa() {
    // 1. Inicializa o mapa centralizado em Pernambuco
    const map = L.map('map', {
        zoomControl: false,
        attributionControl: false, // Remove os créditos para ficar mais limpo
        dragging: true,
        scrollWheelZoom: true // Evita zoom acidental ao rolar a página
    }).setView([-8.41, -37.95], 7);

    // 2. Estilos do Mapa
    const estiloPadrao = {
        fillColor: "#ffffff6b", // Cidades Brancas
        weight: 1.2,            // Espessura da borda
        opacity: 1,
        color: "#000000",     // Cor da borda (Preto para destacar o branco)
        fillOpacity: 0.8      // Opacidade da cor de preenchimento

    };

    const estiloHover = {
        fillColor: "#1dc44743", // Cor ao passar o mouse (ex: Verde Limão)
        fillOpacity: 1,
        weight: 3.5
    };

    // Carregar os dados geográficos (GeoJSON)
    fetch('https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-26-mun.json')
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: estiloPadrao,
                onEachFeature: function (feature, layer) {
                    // Eventos de cada cidade
                    layer.on({
                        mouseover: (e) => {
                            // Só fica verde no hover SE não for a cidade clicada
                            if (e.target !== layerSelecionada) {
                                e.target.setStyle(estiloHover);
                            }
                        },
                        mouseout: (e) => {
                            // Só volta ao normal SE não for a cidade clicada
                            if (e.target !== layerSelecionada) {
                                e.target.setStyle(estiloPadrao);
                            }
                        },
                        click: (e) => {
                            // Se já tinha alguma cidade selecionada, voltamos a cor dela pro inicial
                            if (layerSelecionada) {
                                layerSelecionada.setStyle(estiloPadrao);
                            }

                            // O nosso alvo atual vira o novo selecionado
                            cidadeSelecionada = feature.properties.name;
                            layerSelecionada = e.target;

                            // Deixamos a cidade clicada amarela/destacada
                            layerSelecionada.setStyle({
                                fillColor: "#1dc447", // Amarelo
                                fillOpacity: 1,
                                weight: 3.5
                            });

                            // Mostramos o botão na tela
                            const btnMissao = document.getElementById("btn-iniciar-missao");
                            btnMissao.innerText = "Iniciar Missão: " + cidadeSelecionada;
                            btnMissao.classList.remove("d-none");
                        }
                    });

                    // Mostrar nome ao passar o mouse
                    layer.bindTooltip(feature.properties.name, { sticky: true });
                }
            }).addTo(map);
        });
}

function iniciarFaseCidade() {
    if (!cidadeSelecionada) return;

    const cidadesDisponiveis = ["Recife", "Olinda", "Caruaru", "Garanhuns", "Petrolina"]

    if (!cidadesDisponiveis.includes(cidadeSelecionada)) {
        alert("Cidade ainda não disponível");
        return;
    }

    mostrarTela("card-quiz");
    iniciarQuiz(cidadeSelecionada);
}

function iniciarQuiz(cidade) {
    const cidadesPersonalizadas = ["Recife", "Olinda", "Caruaru"]

    if (cidadesPersonalizadas.includes(cidade)) {
        playAudioCidade(cidade);
    }

    let perguntaAtual = 0;
    let vidas = 5;
    let tempo = perguntas[cidade][perguntaAtual].tempo;
    let tempoMaximo = tempo;

    const barraTempo = document.getElementById("barra-tempo-fill");
    barraTempo.style.width = (tempo / tempoMaximo) * 100 + "%";
    barraTempo.innerText = tempo + "s";

    const pergunta = document.getElementById("pergunta");
    pergunta.innerText = perguntas[cidade][perguntaAtual].pergunta;

    const botoesOpcao = document.querySelectorAll(".opcao");

    function verificarResposta(resposta) {
        if (resposta === perguntas[cidade][perguntaAtual].correta) {

            // Condição de vitória
            if (perguntaAtual === perguntas[cidade].length - 1) {
                // EXPURGANDO OS TIMEOUTS NA VITÓRIA
                timeoutLuas.forEach(clearTimeout);
                timeoutLuas = [];

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

            perguntaAtual++;
            tempo = perguntas[cidade][perguntaAtual].tempo;
            barraTempo.style.width = (tempo / tempoMaximo) * 100 + "%";
            barraTempo.innerText = tempo + "s";
            pergunta.innerText = perguntas[cidade][perguntaAtual].pergunta;

            botoesOpcao.forEach((botao, index) => {
                botao.innerText = perguntas[cidade][perguntaAtual].opcoes[index];
                botao.onclick = () => {
                    verificarResposta(index);
                };
            });
        } else {
            diminuirVidaInterface(vidas);
            vidas--;
            perguntaAtual++;
            tempo = perguntas[cidade][perguntaAtual].tempo;
            barraTempo.style.width = (tempo / tempoMaximo) * 100 + "%";
            barraTempo.innerText = tempo + "s";
            pergunta.innerText = perguntas[cidade][perguntaAtual].pergunta;

            botoesOpcao.forEach((botao, index) => {
                botao.innerText = perguntas[cidade][perguntaAtual].opcoes[index];
                botao.onclick = () => {
                    verificarResposta(index);
                };
            });
        }
    }

    botoesOpcao.forEach((botao, index) => {
        botao.innerText = perguntas[cidade][perguntaAtual].opcoes[index];
        botao.onclick = () => {
            verificarResposta(index, botoesOpcao);
        };
    });

    // temporizador de tempo e vida
    const temporizador = setInterval(() => {
        tempo--;
        barraTempo.style.width = (tempo / tempoMaximo) * 100 + "%";
        barraTempo.innerText = tempo + "s";

        if (tempo <= 0) {
            diminuirVidaInterface(vidas);
            vidas--;
            perguntaAtual++;
            tempo = perguntas[cidade][perguntaAtual].tempo;
            barraTempo.style.width = (tempo / tempoMaximo) * 100 + "%";
            barraTempo.innerText = tempo + "s";
            pergunta.innerText = perguntas[cidade][perguntaAtual].pergunta;

            botoesOpcao.forEach((botao, index) => {
                botao.innerText = perguntas[cidade][perguntaAtual].opcoes[index];
                botao.onclick = () => {
                    verificarResposta(index, botoesOpcao);
                };
            });
        }

        // Condição de DERROTA
        if (vidas <= 0) {
            clearInterval(temporizador);
            perguntaAtual = 0;
            vidas = 5;

            // EXPURGANDO OS TIMEOUTS NO GAME OVER
            timeoutLuas.forEach(clearTimeout);
            timeoutLuas = [];

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

function tentarNovamente() {
    document.getElementById("noite").style.backgroundColor = "rgba(0,0,0,0)";
    mostrarTela("card-selecao");
    document.getElementById("btn-tentar-novamente").classList.add("d-none")
}

function diminuirVidaInterface(vidas) {

    const imagemVida = document.getElementById("vida-" + vidas);
    const modoNoite = document.getElementById("noite");

    const gifAtualizado = "../assets/img/perdeu-vida.gif?t=" + new Date().getTime();
    imagemVida.src = gifAtualizado;

    if (vidas === 4) {
        // Muda para um vermelho transparente fraquinho
        modoNoite.style.backgroundColor = "rgba(18, 10, 63, 0.2)";
    } else if (vidas === 3) {
        // Mais escuro
        modoNoite.style.backgroundColor = "rgba(18, 10, 63, 0.4)";
    } else if (vidas === 2) {
        modoNoite.style.backgroundColor = "rgba(18, 10, 63, 0.6)";
    } else if (vidas === 1) {
        modoNoite.style.backgroundColor = "rgba(18, 10, 63, 0.85)";
    }

    // Salvamos esse temporizador para podermos matá-lo se o jogo acabar antes dos 3.9s
    const timer = setTimeout(() => {
        imagemVida.src = "../assets/img/lua.png";
    }, 3900);

    timeoutLuas.push(timer);
}