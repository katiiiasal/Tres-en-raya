let turno = 0;
const tablero = Array(9).fill(null); 
let jugador1 = '';
let jugador2 = '';

const btnPulsado = (e, pos) => {
    if (!jugador1 || !jugador2) {
        alert("Por favor, ingresa los nombres de los jugadores.");
        return;
    }

    const btn = e.target;
    if (btn.textContent === '') {
        turno++;
        const symbol = turno % 2 === 1 ? 'X' : 'O';
        const color = turno % 2 === 1 ? 'salmon' : 'paleGreen';
        btn.textContent = symbol; 
        btn.style.backgroundColor = color;
        tablero[pos] = symbol;

        if (haGanado()) {
            const ganador = symbol === 'X' ? jugador1 : jugador2;
            setTimeout(() => {
                alert(`Felicidades ${ganador}, ¡has ganado!`); 
            }, 15);
        }
    }
};

const haGanado = () => {
    const combinacionesGanadoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontales
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Verticales
        [0, 4, 8], [2, 4, 6]             // Diagonales
    ];

    return combinacionesGanadoras.some(combinacion => {
        const [a, b, c] = combinacion;
        return tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c];
    });
};

const reiniciarJuego = () => {
    turno = 0;
    tablero.fill(null);
    document.querySelectorAll('.containerr button').forEach(btn => {
        btn.textContent = '';
        btn.style.backgroundColor = '';
    });
};

const cambiarFondo = () => {
    const colores = ['#f7d8ba', '#f0c1a1', '#e9b28e', '#e3a179', '#d69982'];
    const colorAleatorio = colores[Math.floor(Math.random() * colores.length)];
    document.body.style.backgroundColor = colorAleatorio;
};

document.getElementById('player1').addEventListener('input', (e) => {
    jugador1 = e.target.value;
});
document.getElementById('player2').addEventListener('input', (e) => {
    jugador2 = e.target.value;
});

document.querySelectorAll('.containerr button').forEach((btn, i) => {
    btn.addEventListener('click', (e) => btnPulsado(e, i));
});

document.getElementById('restart').addEventListener('click', reiniciarJuego);
document.getElementById('changeBackground').addEventListener('click', cambiarFondo);
