function playAudio() {
  const audio = document.getElementById('bg-audio');
  audio.play();
}

function playAudioCidade(cidade) {
  const audios = document.querySelectorAll(".audio");
  audios.forEach(audio => {
    audio.pause();
  });
  const audioCidade = document.getElementById(`bg-audio-${cidade}`);
  audioCidade.play();
}
