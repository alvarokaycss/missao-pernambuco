export function playAudio() {
  const audiosCidades = document.querySelectorAll(".audio");
  audiosCidades.forEach(audio => {
    audio.pause();
  });
  const audio = document.getElementById('bg-audio');
  audio.play();
}


export function playAudioCidade(cidade) {
  const audios = document.querySelectorAll(".audio");
  audios.forEach(audio => {
    audio.pause();
  });
  const audioCidade = document.getElementById(`bg-audio-${cidade}`);
  audioCidade.volume = 0.2;
  audioCidade.play();
}


export function mostrarTela(id) {
    document.querySelectorAll(".tela").forEach(tela => {
        tela.classList.remove("ativa");
    });

    document.getElementById(id).classList.add("ativa");
}


export function playAudioFeedback(acertou) {
  const tipo = acertou ? "acerto" : "erro";
  const audio = document.getElementById(`som-${tipo}`);

  if (!audio) return;

  audio.volume = 0.3;
  audio.pause();
  audio.currentTime = 0;
  audio.play().catch(() => {});
}

export function playAudioFim(acertou) {
  const audiosCidades = document.querySelectorAll(".audio");
  audiosCidades.forEach(audio => {
    audio.pause();
  });

  const tipo = acertou ? "vitoria" : "derrota";
  const audio = document.getElementById(`som-${tipo}`);

  if (!audio) return;

  audio.volume = 0.3;
  audio.pause();
  audio.currentTime = 0;
  audio.play().catch(() => {});
}
