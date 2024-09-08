// declaro las variables para indicar el palo y el número
const palos=["oro","copa","basto","espada"]
const numeros=[1,2,3,4,5,6,7,10,11,12];

//Creo el array del mazo y el objeto de la carta, que irá en el array
let mazo=[];
let carta={};
let imgCarta= document.querySelectorAll('.imgCarta');

let caratulaCartasH3=document.querySelector('h3');//Capturo el h3 para esconderlo al empezar
let caratulaCartasImg=document.querySelector('#imgCartas');//Capturo la img de la carátula para esconderla al empezar
let inicio=document.querySelector('.comenzarJuego');//Capturo el botón para habilitar el inicio de juego

//Selección de avatar: variables para la función
let avatarRen=document.querySelector('#avatarRen');
let avatarNana=document.querySelector('#avatarNana');
let nombre;
let divDeJuego=document.querySelector('.divJuegoDeCartas');//Capturo el div para que aparezca el div del juego
let divDeAvatar=document.querySelector('#registrarseCartasAvatar');//Capturo el div para que permita seleccionar avatar
//let divNombreJugador=document.querySelector('');//Capturo el div para que el jugador introduzca su nombre
//Declaro ambos jugadores como arrays para asignarle las cartas
let jugadorUno=[];
let jugadorDos=[];

let mostrarCartasJugadorUno; //Variable para mostrar los valores asignados
let mostrarCartasJugadorDos;

let comenzarPartidaButton=document.querySelector('.botonComenzarPartida'); //Capturo al botón para comenzar la partida y qse repartan las cartas

let apuesta;

inicio.addEventListener('click', function(){
    caratulaCartasH3.style.display = 'none';
    caratulaCartasH3.style.visibility = 'hidden';
    caratulaCartasImg.style.display = 'none';
    caratulaCartasImg.style.visibility = 'hidden';
    divDeAvatar.style.display='block';
    divDeAvatar.style.visibility='visible';
    inicio.style.display='none';
    inicio.style.visibility='hidden';
    
});

//Función para elegir el avatar. generar el hover y el if para la selección
let elegirAvatar=()=>{

}
//Crear mazo uniendo numeros, palos y valores
let crearMazo = () => {
    for (let i = 0; i < palos.length; i++) {
        for (let j = 0; j < numeros.length; j++) {
            let puntos = numeros[j] <= 7 ? numeros[j] : 10;  // Calcular los puntos

            let carta = {  // Crear la carta dentro del bucle
                numero: numeros[j],
                palo: palos[i],
                valor: puntos
            };

            mazo.push(carta);  // Agregar la carta al mazo
        }
    }
}
crearMazo();  // Llamo a la función para crear el mazo
//console.log(mazo);  // Mazo creado. Mostrarlo en la consola para comprobarlo

//Inserto la imagen para cada carta
let insertarCarta = () => {
    for (let i = 0; i < mazo.length; i++) {
        if (imgCarta[i]) { // Asegurarse de que haya una imagen para asignar
            mazo[i].imagen = imgCarta[i].src; // Asignar la fuente de la imagen a la carta
        }
    }
};

insertarCarta();
//console.log(mazo);  // Mostrar en la consola para comprobar la asignación de imagen a la carta

//Esta resolución permite repartir 3 números de este array. Cada vez que presione el botón se reparten los números y se elimina el que haya salido.
//Importante: una vez que los valores hayan sido asignados en su totalidad, comienza a marcar "undefined", ya que no hay más valores disponibles en el array= no hay "más cartas en el mazo".


let comenzarJuego=()=>{
    jugadorUno=[];
    for(let i = 0; i < 3; i++){//reparte las cartas p.j1
        let azar = Math.floor(Math.random() * mazo.length);
        jugadorUno.push(mazo[azar]);
        mazo.splice(azar,1);
    }
    //console.log(jugadorUno) //Cartas repartidas exitosamente. Comprobarlo en la consola
    mostrarCartasJugadorUno=document.querySelector('#ulJugadorUno');
    mostrarCartasJugadorUno.innerHTML = ''; // Limpia la lista antes de agregar las nuevas cartas.

    for (let i = 0; i < jugadorUno.length; i++) { //recorro el nuevp array del jugador para mostrar sus cartas
        let carta = jugadorUno[i];
        mostrarCartasJugadorUno.innerHTML += `<li><img src="${carta.imagen}" alt="${carta.numero} de ${carta.palo}"></li>`;
    }

    //Reparte automáticamente al jugador 2
    jugadorDos=[];
    for(let i = 0; i < 3; i++){//Reparte las cartas p. j2
        let azar = Math.floor(Math.random() * mazo.length);
        jugadorDos.push(mazo[azar]);
        mazo.splice(azar,1);
    }
    //console.log(jugadorDos) //Cartas repartidas exitosamente. Comprobarlo en la consola
    mostrarCartasJugadorDos=document.querySelector('#ulJugadorDos');
    mostrarCartasJugadorDos.innerHTML = ''; // Limpia la lista antes de agregar las nuevas cartas, PERO HAY QUE PONERLO EN OTRO LADO PORQUE MARCA NaN

    for (let i = 0; i < jugadorDos.length; i++) { //recorro el nuevp array del jugador para mostrar sus cartas
        let carta = jugadorDos[i];
        
        mostrarCartasJugadorDos.innerHTML += `<li><img id="carta-0" src="imagenes/carta0.png" alt="Carta al revés"></li>`;
    }
}

//Comienza el juego
comenzarPartidaButton.addEventListener('click', function() {
    setTimeout(comenzarJuego, 500);
    comenzarPartidaButton.style.display='none';
});

//Comienza la apuesta


//Siguientes pasos: 
// A: Hay que hacer un evento con las cartas del jugador 1, que es quien está interactuando. 
//B: Hay que setear un timer para el jugador 2 y que, de manera random, seleccione una carta y la muestre
//Funcionamiento de la ronda

//Apuestas--> ventana que surge con tres opciones para que el usuario marque cuánto apostar

//Registrar puntos y verificar ganador

//Lógica del juego
