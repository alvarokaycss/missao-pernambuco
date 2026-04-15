export function playAudio() {
  const audio = document.getElementById('bg-audio');
  audio.play();
}


export function playAudioCidade(cidade) {
  const audios = document.querySelectorAll(".audio");
  audios.forEach(audio => {
    audio.pause();
  });
  const audioCidade = document.getElementById(`bg-audio-${cidade}`);
  audioCidade.play();
}


export function mostrarTela(id) {
    document.querySelectorAll(".tela").forEach(tela => {
        tela.classList.remove("ativa");
    });

    document.getElementById(id).classList.add("ativa");
}
