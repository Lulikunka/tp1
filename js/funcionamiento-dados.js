let caras = document.querySelectorAll('.imgDados'); // Capturo las imágenes de las caras para mostrarlas
let habilitarSectionPuntos=document.querySelector('#mostrarPuntosDados'); //Capturo el section para mostrar los puntos
let mostrarPuntaje=document.querySelector('#puntosJugador'); //Capturo el div para mostrar el contador de puntos
let tirarDadosButton = document.querySelector('#tirarDadosButton');//Capturo el bot{on para tirar los dados}

let contabilizarCaras = []; // Armo el array para contar cuántas veces salió X cara
let contador = [ //Armo el array con el valor de las caras y cuántas veces salió cada una. Valor inicial de 0
    { valor: 1, veces: 0 }, // Cara 1
    { valor: 2, veces: 0 }, // Cara 2
    { valor: 3, veces: 0 }, // Cara 3
    { valor: 4, veces: 0 }, // Cara 4
    { valor: 5, veces: 0 }, // Cara 5
    { valor: 6, veces: 0 }  // Cara 6
];

let jugador = 0; // Declaro el puntaje del jugador
let tiradas = 0; // Contador de tiradas
let maxTiradas = 10; // Número máximo de tiradas
let mostrarDados = document.querySelector('#mostrarDados'); // Capturo el contenedor para mostrar los dados

jugadoresTotales=[];


let nombreJugador; // Variable para almacenar el nombre del jugador

// Preguntar el nombre del jugador al inicio de la partida
let solicitarNombreJugador = () => {
    do {
        nombreJugador = prompt('¿Cómo es su nombre?');
        if (nombreJugador === '' || nombreJugador === null) {
            alert('El nombre no puede estar vacío. Por favor, ingrese un nombre válido.');
        }
    } while (nombreJugador === '' || nombreJugador === null); // Continúa pidiendo hasta que el nombre sea válido

};

// Llamo a la función del nombre al principio para que lo pregunte sólo una vez al abrir la página
solicitarNombreJugador();

tirarDadosButton.addEventListener('click', e => {
    e.preventDefault();

    if (tiradas < maxTiradas && jugador < 20) { //Establezco el momento que se debe terminar la partida: meximo de rondas o puntaje alcanzados
        tirarDados(); // Llamo a tirarDados
        contabilizarPuntos(); // Cuenta los puntos
        encontrarCaraMasRepetida(); // Encuentra la cara más repetida
        tiradas++; // Incrementa el contador de tiradas

        // Deshabilita el botón si se alcanzan las tiradas o los puntos
        if (tiradas >= maxTiradas || jugador >= 20) {
            tirarDadosButton.disabled = true; // Deshabilita el botón
            if (jugador < 20) {
                alert('¡Qué mala suerte! No ha alcanzado los suficientes puntos.'); //Si no se llega a los 20 puntos, muestra un mensaje de pésame
            } else {
                alert(`¡Vaya qué suertudo! Ha alcanzado sus 20 puntos en ${tiradas} tiradas.`);//Si se llega a los 20 puntos, muestra un mensaje de felicitación
            }
            reiniciarJuego();
        }
    }
});


let tirarDados = () => {
    mostrarDados.innerHTML = ''; // Limpio los dados mostrados
    contabilizarCaras = []; // Vacío el array de caras antes de tirar nuevamente

    for (let i = 0; i < 5; i++) {
        // Elege una cara aleatoria entre 0 y 5
        let azar = Math.floor(Math.random() * 6);

        // Selecciona la imagen de la cara correspondiente
        let caraSeleccionada = caras[azar];

        // Muestra la cara seleccionada
        mostrarDados.innerHTML += `<img class="imgDados" src="${caraSeleccionada.src}" alt="Cara del dado">`;
        //Muestra el Section de puntaje
        habilitarSectionPuntos.style.display='flex';
        habilitarSectionPuntos.style.flexDirectio='row';

        // Guarda el número de la cara seleccionada
        contabilizarCaras.push(azar); 
    }
};

let contabilizarPuntos = () => {
    // Reinicia las veces de cada contador a 0 antes de contar de nuevo
    for (let i = 0; i < contador.length; i++) {
        contador[i].veces = 0;
    }

    // Contabiliza cuántas veces sale cada cara
    for (let i = 0; i < contabilizarCaras.length; i++) {
        let cara = contabilizarCaras[i]; 
        contador[cara].veces += 1; // Aumenta el contador de la cara seleccionada
    }
};

let encontrarCaraMasRepetida = () => { //Hago la función para que contabilice los puntos de la cara que se repitió más veces
    let maxVeces = 0; // Declaro una variable para almacenar la cantidad máxima de repeticiones
    let caraMasRepetida = null; // Inicializo con null para luego almacenar la cara que más veces se repite

    // Recorro el contador y busco la cara con más repeticiones
    for (let i = 0; i < contador.length; i++) {
        if (contador[i].veces > maxVeces) {
            maxVeces = contador[i].veces; // Actualiza el valor máximo
            caraMasRepetida = contador[i].valor; // Guarda la cara más repetida
        }
    }

    if (caraMasRepetida !== null) {
        if (maxVeces === 3) {
            jugador += 3; // Suma 3 puntos si la cara se repite 3 veces
        } else if (maxVeces === 4) {
            jugador += 6; // Suma 6 puntos si la cara se repite 4 veces
        } else if (maxVeces === 5) {
            jugador += 12; // Suma 12 puntos si la cara se repite 5 veces
        }
    }

    mostrarPuntaje.innerHTML= jugador; // Mostrar los puntos en el casillero de puntos
};

let reiniciarJuego = () => { //Función que, al terminar, decide elegir si recargar la página para volver a jugar o redirige a la tabla de posiciones
    confirm("¿Desea reiniciar el juego?");
    if(confirm()===true){
        location.href='./dados.html';
    } else{
        location.href='./posiciones.html';
    }
    
};


let perfilJugadorDados={ //Armo el perfil del jugador para guardarlo en el localStorage
    nombre: nombreJugador,
    puntos: jugador,
    tirada: tiradas
}

let jugadorPuntosDadosString=JSON.stringify(perfilJugadorDados);
localStorage.setItem('jugadoresStorage',jugadorPuntosDadosString);