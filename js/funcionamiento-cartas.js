//Creo las variables para indicar el palo y el número
const palos=["oro","copa","basto","espada"]
const numeros=[1,2,3,4,5,6,7,10,11,12];

//Creo el array del mazo y el objeto de la carta, que irá en el array
let mazo=[];
let carta={};

//Declaro ambos jugadores como arrays para asignarle las cartas
let jugadorUno=[];
let jugadorDos=[];

let mostrarCartasJugadorUno; //Variable para mostrar los valores asignados
let mostrarCartasJugadorDos;

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

//Esta resolución permite repartir 3 números de este array. Cada vez que presione el botón se reparten los números y se elimina el que haya salido.
//Importante: una vez que los valores hayan sido asignados en su totalidad, comienza a marcar "undefined", ya que no hay más valores disponibles en el array= no hay "más cartas en el mazo".

let cartasjugadorUnoButton=document.querySelector('.cartasjugadorUnoButton'); //Capturo al botón para que reparta
let cartasJugadorDosButton=document.querySelector('.cartasJugadorDosButton'); //Capturo al botón para que reparta

cartasjugadorUnoButton.addEventListener('click', function() {
    jugadorUno=[];
    for(let i = 0; i < 3; i++){
        let azar = Math.floor(Math.random() * mazo.length);
        jugadorUno.push(mazo[azar]);
        mazo.splice(azar,1);
    }
    //console.log(jugadorUno) //Cartas repartidas exitosamente. Comprobarlo en la consola
    mostrarCartasJugadorUno=document.querySelector('#ulJugadorUno');
    mostrarCartasJugadorUno.innerHTML = ''; // Limpia la lista antes de agregar las nuevas cartas. PERO HAY QUE PONERLO EN OTRO LADO PORQUE MARCA NaN
    mostrarCartasJugadorUno.innerHTML=+`<li>${jugadorUno.numero} de ${jugadorUno.palo}</li>`

    for (let i = 0; i < jugadorUno.length; i++) {
        let carta = jugadorUno[i];
        mostrarCartasJugadorUno.innerHTML += `<li>${carta.numero} de ${carta.palo}</li>`;
    }

});


cartasJugadorDosButton.addEventListener('click', function() {
    jugadorDos=[];
    for(let i = 0; i < 3; i++){
        let azar = Math.floor(Math.random() * mazo.length);
        jugadorDos.push(mazo[azar]);
        mazo.splice(azar,1);
    }
    console.log(jugadorDos) //Cartas repartidas exitosamente. Comprobarlo en la consola
    mostrarCartasJugadorDos=document.querySelector('#ulJugadorDos');
    mostrarCartasJugadorDos.innerHTML = ''; // Limpia la lista antes de agregar las nuevas cartas, PERO HAY QUE PONERLO EN OTRO LADO PORQUE MARCA NaN
    mostrarCartasJugadorDos.innerHTML=+`<li>${jugadorUno.numero} de ${jugadorUno.palo}</li>`

    for (let i = 0; i < jugadorDos.length; i++) {
        let carta = jugadorDos[i];
        mostrarCartasJugadorDos.innerHTML += `<li>${carta.numero} de ${carta.palo}</li>`;
    }
});

//Funcionamiento de la ronda

//Apuestas--> ventana que surge con tres opciones para que el usuario marque cuánto apostar

//Registrar puntos y verificar ganador

//Lógica del juego
