# 🌎 Missão Pernambuco

<p align="center">
  <img src="assets/img/missao_pernambuco.gif" alt="Missão Pernambuco" width="500">
</p>

<p align="center">
  <strong>Um jogo educativo interativo de quiz sobre as cidades de Pernambuco</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5">
  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3">
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black" alt="JavaScript">
  <img src="https://img.shields.io/badge/Bootstrap-563D7C?style=for-the-badge&logo=bootstrap&logoColor=white" alt="Bootstrap">
  <img src="https://img.shields.io/badge/Leaflet-199900?style=for-the-badge&logo=leaflet&logoColor=white" alt="Leaflet">
</p>

---

## 📖 Sobre o Projeto

**Missão Pernambuco** é um jogo educativo em formato de quiz que testa os conhecimentos do jogador sobre as cidades, a cultura, a história e a geografia do estado de Pernambuco. O jogador seleciona uma cidade no mapa interativo e responde a 10 perguntas temáticas, com temporizador e sistema de vidas.

## 🎮 Como Jogar

1. **Tela Inicial** — Clique em **"Iniciar"** para começar a aventura.
2. **Seleção de Cidade** — Um mapa interativo de Pernambuco é exibido. Selecione uma das cidades disponíveis clicando nela.
3. **Quiz** — Responda 10 perguntas de múltipla escolha sobre a cidade selecionada. Cada pergunta tem um tempo limite.
4. **Vidas** — Você possui 5 vidas (representadas por sóis ☀️). A cada erro ou tempo esgotado, uma vida é perdida e o cenário escurece gradualmente (efeito dia → noite 🌙).
5. **Vitória** — Responda todas as perguntas sem perder todas as vidas para completar a missão! 🎉
6. **Derrota** — Perdeu todas as vidas? Tente novamente!

## 🗺️ Cidades Disponíveis

| Cidade | Tema Principal |
|---|---|
| **Recife** | Rios, pontes, Carnaval, Frevo e Marco Zero |
| **Olinda** | Patrimônio Histórico, Bonecos Gigantes e Maracatu |
| **Caruaru** | Capital do Forró, Mestre Vitalino e São João |
| **Garanhuns** | Festival de Inverno, clima serrano e Suíça Pernambucana |
| **Petrolina** | Rio São Francisco, vinhos e fruticultura irrigada |
| **Ipojuca** | Porto de Galinhas, praias e Porto de Suape |
| **Serra Talhada** | Lampião, Xaxado e cangaço |
| **Gravatá** | Alpes Pernambucanos, morangos e fondue |

## ✨ Funcionalidades

- 🗺️ **Mapa interativo** com GeoJSON dos municípios de Pernambuco (Leaflet.js)
- ⏱️ **Temporizador** individual por pergunta
- ❤️ **Sistema de vidas** com feedback visual (sol → lua + escurecimento gradual)
- 🎵 **Trilhas sonoras** personalizadas por cidade (Recife, Olinda, Caruaru)
- 🔊 **Efeitos sonoros** para acerto, erro, vitória e derrota
- 🎊 **Confetes animados** na tela de vitória
- 🌙 **Chuva de luas** na tela de derrota
- 📱 **Layout responsivo** com Bootstrap 5

## 🛠️ Tecnologias Utilizadas

- **HTML5** — Estrutura semântica da aplicação
- **CSS3** — Estilização personalizada com variáveis CSS
- **JavaScript (ES Modules)** — Lógica do jogo modularizada
- **Bootstrap 5** — Layout responsivo e componentes de UI
- **Leaflet.js** — Mapa interativo com GeoJSON
- **Anime.js** — Animações (chuva de luas na derrota)
- **JS-Confetti** — Efeito de confetes na vitória
- **Google Fonts (Mansalva)** — Tipografia temática

## 📁 Estrutura do Projeto

```
missao-pernambuco/
├── views/
│   └── missao.html          # Página principal do jogo
├── controllers/
│   ├── iniciar.js            # Lógica principal, fluxo de telas e quiz
│   ├── perguntas.js          # Banco de perguntas por cidade
│   ├── mapa.js               # Carregamento e interação do mapa Leaflet
│   ├── objetos.js            # Elementos de UI, imagens e estado global
│   ├── utils.js              # Funções utilitárias (áudio, navegação)
│   ├── confetes.js           # Efeito de confetes na vitória
│   └── chuva.js              # Efeito de chuva de luas na derrota
├── assets/
│   ├── css/
│   │   └── styles.css        # Estilos personalizados
│   ├── img/                  # Imagens, GIFs e ícones
│   └── audio/                # Músicas e efeitos sonoros
└── README.md
```

## 🚀 Como Executar

1. Clone o repositório:
   ```bash
   git clone https://github.com/alvarokaycss/missao-pernambuco.git
   ```

2. Abra o arquivo `views/missao.html` em um servidor local.

   > ⚠️ **Importante:** O projeto utiliza **ES Modules** (`import`/`export`), portanto é necessário rodar em um servidor HTTP. Abrir diretamente o arquivo no navegador causará erro de CORS.

   Você pode usar qualquer uma dessas opções:

   - **VS Code** com a extensão [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
   - **Python:**
     ```bash
     cd missao-pernambuco
     python -m http.server 8080
     ```
     Acesse: `http://localhost:8080/views/missao.html`

3. Divirta-se aprendendo sobre Pernambuco! 🎉

## 📸 Screenshots

### Tela Inicial
O jogador é recebido com uma animação temática e o botão "Iniciar".

### Seleção de Cidade
Um mapa interativo de Pernambuco permite selecionar a cidade para a missão.

### Quiz
Perguntas de múltipla escolha com temporizador, vidas e feedback visual/sonoro.
