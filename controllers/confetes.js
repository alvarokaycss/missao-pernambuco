const jsConfetti = new JSConfetti();

export function tomaConfetti() {
    jsConfetti.addConfetti({
        emojis: ['🎉', '✨', '🎊', '🎈', '🏆', '🥇', '👏'],
        confettiNumber: 100
    });
}

export function jogarConfettiInfinito() {
    tomaConfetti();
    setTimeout(() => {
        tomaConfetti();
    }, 1200);
    return setInterval(() => {
        setTimeout(() => {
            tomaConfetti();
        }, 1000);
        setTimeout(() => {
            tomaConfetti();
        }, 1400);
    }, 3500);
}

export function pararConfettiInfinito(intervalo) {
    clearInterval(intervalo);
}
