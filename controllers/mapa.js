import { variaveisGlobais, ui } from "./objetos.js";

export function carregarMapa() {

    const map = L.map('map', {
        zoomControl: false,
        attributionControl: false,
        dragging: true,
        scrollWheelZoom: true
    }).setView([-8.41, -37.95], 7);

    const estiloPadrao = {
        fillColor: "#ffffff6b",
        weight: 1.5,
        opacity: 1,
        color: "#5a3600ff",
        fillOpacity: 0.8
    };

    const estiloHover = {
        fillColor: "#d39b1769",
        fillOpacity: 1,
        weight: 3.5
    };

    fetch('https://raw.githubusercontent.com/tbrugz/geodata-br/master/geojson/geojs-26-mun.json')
        .then(response => response.json())
        .then(data => {
            L.geoJSON(data, {
                style: estiloPadrao,
                onEachFeature: function (feature, layer) {
                    // Se a cidade não estiver disponível, deixa ela cinza e não interativa
                    if (!variaveisGlobais.cidadesDisponiveis.includes(feature.properties.name)) {
                        layer.setStyle({
                            fillColor: "#999999",
                            fillOpacity: 0.3,
                            color: "#4e0000ff",
                            weight: 1
                        });
                    } else {
                        // Eventos de cada cidade disponível
                        layer.on({
                            mouseover: (e) => {
                                // Só fica verde no hover SE não for a cidade clicada
                                if (e.target !== variaveisGlobais.layerSelecionada) {
                                    e.target.setStyle(estiloHover);
                                }
                            },
                            mouseout: (e) => {
                                // Só volta ao normal SE não for a cidade clicada
                                if (e.target !== variaveisGlobais.layerSelecionada) {
                                    e.target.setStyle(estiloPadrao);
                                }
                            },
                            click: (e) => {
                                // Se já tinha alguma cidade selecionada, voltamos a cor dela pro inicial
                                if (variaveisGlobais.layerSelecionada) {
                                    variaveisGlobais.layerSelecionada.setStyle(estiloPadrao);
                                }

                                variaveisGlobais.cidadeSelecionada = feature.properties.name;
                                variaveisGlobais.layerSelecionada = e.target;

                                variaveisGlobais.layerSelecionada.setStyle({
                                    fillColor: "#e28e43",
                                    fillOpacity: 1,
                                    weight: 3.5
                                });

                                ui.btnIniciarMissao.innerText = "Iniciar missão " + variaveisGlobais.cidadeSelecionada;
                                ui.btnIniciarMissao.classList.remove("d-none");
                            }
                        });
                    }
                    // Mostrar nome ao passar o mouse
                    layer.bindTooltip(feature.properties.name, { sticky: true });
                }
            }).addTo(map);
        });
}
