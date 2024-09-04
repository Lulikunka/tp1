//Acá van las imágenes de los dados para c/cara de los dados
//También van las imágenes al final para mostrar si el jugador 1 ha ganado o perdido
//Para mostrar las imágenes puedo usar una función, porque tambíen la utilizo en los otros programas

const numeros=[1,2,3,4,5,6,7,10,11,12];
let jugadorUno=[];
let jugadorDos=[];

//Preguntar nombre del jugador

//Crear mazo uniendo numeros, palos y valores

//Esta resolución permite repartir 3 números de este array. Cada vez que toque se reparten los números y se elimina el que haya salido.
//IMPORTANTE: UNA VEZ QUE LOS NÚMEROS HAYAN SALIDO TODOS, EMPIEZA A INDICAR "UNDEFINED"
//ES DECIR, QUE FUNCIONA COMO UN MAZO DE CARTAS DE UNA PARTIDA. Ningún número se va a repetir.

let dadosButton=document.querySelector('.dadosButton'); //Capturo al botón para que reparta

dadosButton.addEventListener('click', function() {
    jugadorUno=[];
    for(let i = 0; i < 3; i++){
        let azar = Math.floor(Math.random() * numeros.length);
        jugadorUno.push(numeros[azar]);
        numeros.splice(azar,1);
    }
    console.log(jugadorUno)
});