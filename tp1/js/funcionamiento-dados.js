let caras = document.querySelectorAll('.imgDados'); // Capturo las imágenes de las caras para mostrarlas
let habilitarSectionPuntos=document.querySelector('#mostrarPuntosDados'); //Capturo el section para mostrar los puntos
let mostrarPuntaje=document.querySelector('#puntosJugador'); //Capturo el div para mostrar el contador de puntos

let tirarDadosButton = document.querySelector('#tirarDadosButton');
let contabilizarCaras = []; // Armo el array para contar cuántas veces salió X cara
let contador = [
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


let nombreJugador = ''; // Variable global para almacenar el nombre del jugador

// Preguntar el nombre del jugador al inicio de la partida
let solicitarNombreJugador = () => {
    do {
        nombreJugador = prompt('¿Cómo es su nombre?');
        if (nombreJugador === '' || nombreJugador === null) {
            alert('El nombre no puede estar vacío. Por favor, ingrese un nombre válido.');
        }
    } while (nombreJugador === '' || nombreJugador === null); // Continúa pidiendo hasta que el nombre sea válido

};

// Llamar a la función para preguntar el nombre solo una vez al inicio
solicitarNombreJugador();

tirarDadosButton.addEventListener('click', e => {
    e.preventDefault();

    if (tiradas < maxTiradas && jugador < 20) { 
        tirarDados(); // Llamar a tirarDados
        contabilizarPuntos(); // Contar los puntos
        encontrarCaraMasRepetida(); // Encontrar la cara más repetida
        tiradas++; // Incrementar el contador de tiradas

        // Deshabilitar el botón si se alcanzan las tiradas o los puntos
        if (tiradas >= maxTiradas || jugador >= 20) {
            tirarDadosButton.disabled = true; // Deshabilitar el botón
            if (jugador < 20) {
                alert('¡Qué mala suerte! No ha alcanzado los suficientes puntos.');
            } else {
                alert(`¡Vaya qué suertudo! Ha alcanzado sus 20 puntos en ${tiradas} tiradas.`);
            }
            reiniciarJuego();
        }
    }
});


let tirarDados = () => {
    mostrarDados.innerHTML = ''; // Limpiar los dados mostrados
    contabilizarCaras = []; // Vaciar el array de caras antes de tirar nuevamente

    for (let i = 0; i < 5; i++) {
        // Elegir una cara aleatoria entre 0 y 5
        let azar = Math.floor(Math.random() * 6);

        // Seleccionar la imagen de la cara correspondiente
        let caraSeleccionada = caras[azar];

        // Mostrar la cara seleccionada
        mostrarDados.innerHTML += `<img class="imgDados" src="${caraSeleccionada.src}" alt="Cara del dado">`;
        //Mostrar el Section de puntaje
        habilitarSectionPuntos.style.display='flex';
        habilitarSectionPuntos.style.flexDirectio='row';

        // Guardar el número de la cara seleccionada
        contabilizarCaras.push(azar); // Recordar que azar va de 0 a 5
    }
};

let contabilizarPuntos = () => {
    // Reiniciar las veces de cada contador a 0 antes de contar de nuevo
    for (let i = 0; i < contador.length; i++) {
        contador[i].veces = 0;
    }

    // Contabilizar cuántas veces sale cada cara
    for (let i = 0; i < contabilizarCaras.length; i++) {
        let cara = contabilizarCaras[i]; // Cara va de 0 a 5
        contador[cara].veces += 1; // Aumenta el contador de la cara seleccionada
    }
};

let encontrarCaraMasRepetida = () => { //Hago la función para que contabilice los puntos de la cara que se repitió más veces
    let maxVeces = 0; // Declaro una variable para almacenar la cantidad máxima de repeticiones
    let caraMasRepetida = null; // Inicializo con null para luego almacenar la cara que más veces se repite

    // Recorro el contador y busco la cara con más repeticiones
    for (let i = 0; i < contador.length; i++) {
        if (contador[i].veces > maxVeces) {
            maxVeces = contador[i].veces; // Actualizar el valor máximo
            caraMasRepetida = contador[i].valor; // Guardar la cara más repetida
        }
    }

    if (caraMasRepetida !== null) {
        if (maxVeces === 3) {
            jugador += 3; // Sumar 3 puntos si la cara se repite 3 veces
        } else if (maxVeces === 4) {
            jugador += 6; // Sumar 6 puntos si la cara se repite 4 veces
        } else if (maxVeces === 5) {
            jugador += 12; // Sumar 12 puntos si la cara se repite 5 veces
        }
    }

    mostrarPuntaje.innerHTML= jugador; // Mostrar los puntos en la consola
};

let reiniciarJuego = () => {
    confirm("¿Desea reiniciar el juego?");
    if(confirm()===true){
        location.href='./dados.html';
    } else{
        location.href='./posiciones.html';
    }
    
};


let perfilJugadorDados={
    nombre: nombreJugador,
    puntos: jugador,
    tirada: tiradas
}

let jugadorPuntosDadosString=JSON.stringify(perfilJugadorDados);
localStorage.setItem('jugadoresStorage',jugadorPuntosDadosString);