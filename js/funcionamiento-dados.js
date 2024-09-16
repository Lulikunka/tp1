let caras = document.querySelectorAll('.imgDados');
let tirarDadosButton = document.querySelector('#tirarDadosButton');
let contabilizarCaras = [];
let contador = [
    { veces: 0 }, // Cara 1
    { veces: 0 }, // Cara 2
    { veces: 0 }, // Cara 3
    { veces: 0 }, // Cara 4
    { veces: 0 }, // Cara 5
    { veces: 0 }  // Cara 6
];
let jugador = [];
let mostrarDados = document.querySelector('#mostrarDados');

tirarDadosButton.addEventListener('click', e => {
    e.preventDefault();
    
    tirarDados();
    contabilizarPuntos();
});

let tirarDados = () => {
    mostrarDados.innerHTML = ''; // Limpiar los dados mostrados
    contabilizarCaras = []; // Vaciar el array de caras antes de tirar nuevamente

    for (let i = 0; i < 5; i++) {
        // Elegir una cara aleatoria entre 0 y 5
        let azar = Math.floor(Math.random() * 6);

        // Selecciona la imagen de la cara correspondiente
        let caraSeleccionada = caras[azar];

        // Muestra la cara seleccionada
        mostrarDados.innerHTML += `<img class="imgDados" src="${caraSeleccionada.src}" alt="Cara del dado">`;

        // Guarda el número de la cara seleccionada
        contabilizarCaras.push(azar);
    }
};

let contabilizarPuntos = () => {
    // Reiniciar los contadores
    for (let i = 0; i < contador.length; i++) {
        contador[i].veces = 0; // Reinicia el conteo de cada cara
    }

    // Contar cuántas veces aparece cada cara
    for (let i = 0; i < contabilizarCaras.length; i++) {
        let cara = contabilizarCaras[i]; 
        contador[cara].veces++; // Aumento el contador de la cara correspondiente
    }

    // Calcular puntos
    for (let i = 0; i < contador.length; i++) {
        if (contador[i].veces === 3) {
            jugador.push(3); // Añadir 3 puntos si una cara se repite 3 veces
        } else if (contador[i].veces === 4) {
            jugador.push(4); // Añadir 4 puntos si una cara se repite 4 veces
        } else if (contador[i].veces === 5) {
            jugador.push(5); // Añadir 5 puntos si una cara se repite 5 veces
        }
    }

    console.log('Puntos del jugador:', jugador);
};