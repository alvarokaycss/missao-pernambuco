function criarParticula() {
  const el = document.createElement('div');
  el.textContent = '🌙';
  el.style.position = 'fixed';
  el.style.top = '-20px';
  el.style.left = Math.random() * window.innerWidth + 'px';
  el.style.fontSize = '20px';
  document.body.appendChild(el);

  anime({
    targets: el,
    translateY: window.innerHeight + 50,
    duration: 1500,
    easing: 'linear',
    complete: () => el.remove()
  });
}

export function chuvaErro(quantidade = 20) {
  for (let i = 0; i < quantidade; i++) {
    setTimeout(criarParticula, i * 50);
  }
}