//Declaro el array de jugadores el objeto para cada jugador, para guardar luego su perfil en el Local Storage.
let jugadores=[];
let perfilJugador={};

// declaro las variables para indicar el palo y el número
const palos=["oro","copa","basto","espada"]
const numeros=[1,2,3,4,5,6,7,10,11,12];

//Creo el array del mazo y el objeto de la carta, que irá en el array
let mazo=[];
let carta={};
let imgCarta= document.querySelectorAll('.imgCarta');

let caratulaCartasH3=document.querySelector('h3');//Capturo el h3 para esconderlo al empezar
let caratulaCartasImg=document.querySelector('#imgCaratulaCartas');//Capturo la img de la carátula para esconderla al empezar
let inicio=document.querySelector('.comenzarJuego');//Capturo el botón para habilitar el inicio de juego

//Selección de avatar: variables para la función
let avatarRen=document.querySelector('#avatarRen');//Para aplicar interactividad
let avatarRenSeleccion=document.querySelector('#ren');//Operar con avatar
let avatarNana=document.querySelector('#avatarNana');//Para aplicar interactividad
let avatarNanaSeleccion=document.querySelector('#nana');//Operar con avatar
let botonAvatar=document.querySelector('#submitAvatar');//Para aceptar el avatar

//Inicio perfil de jugador. Capturo las imágenes para mostrar una y esconder la otra, dependiendo del avatar seleccionado.
let nombre;
let perfilRen=document.querySelector('#perfilRen');
let perfilNana=document.querySelector('#perfilNana');

let divDeJuego=document.querySelector('.divJuegoDeCartas');//Capturo el div para que aparezca el div del juego
let divDeAvatar=document.querySelector('#registrarseCartasAvatar');//Capturo el div para que permita seleccionar avatar
let divCartasNombre=document.querySelector('#registrarseCartasNombre');//Capturo el div para ingresar el nombre
//let divNombreJugador=document.querySelector('');//Capturo el div para que el jugador introduzca su nombre
//Declaro ambos jugadores como arrays para asignarle las cartas
let jugadorUno=[];
let jugadorDos=[];

let mostrarCartasJugadorUno; //Variable para mostrar los valores asignados
let mostrarCartasJugadorDos;

let comenzarPartidaButton=document.querySelector('.botonComenzarPartida'); //Capturo al botón para comenzar la partida y qse repartan las cartas

let apuesta;

inicio.addEventListener('click', ()=>{
    caratulaCartasH3.style.display = 'none';
    caratulaCartasH3.style.visibility = 'hidden';
    caratulaCartasImg.style.display = 'none';
    caratulaCartasImg.style.visibility = 'hidden';
    divDeAvatar.style.display='block';
    divDeAvatar.style.visibility='visible';
    divCartasNombre.style.display='block';
    divCartasNombre.style.visibility='visible';
    inicio.style.display='none';
    inicio.style.visibility='hidden';
    
});

//Le aplico los eventos para las fotos de los personajes
let interactividadAvatar = () => {
    // Detectar cuando se hace click en los avatares
    avatarRen.addEventListener('click', () => {
        avatarRenSeleccion.checked = true; // Marco el radio button correspondiente
        avatarRen.style.border = '.3em solid rgb(221, 202, 33)';
        avatarNana.style.border = '0'; // Quito el borde del otro avatar
    });
    avatarNana.addEventListener('click', () => {
        avatarNanaSeleccion.checked = true; // Marco el radio button correspondiente
        avatarNana.style.border = '.3em solid rgb(221, 202, 33)';
        avatarRen.style.border = '0'; // Quito el borde del otro avatar
    });

    // Eventos de hover para los avatares que no están seleccionados
    avatarRen.addEventListener('mouseover', () => {
        if (!avatarRenSeleccion.checked) {
            avatarRen.style.border = '.2em solid rgb(221, 202, 33)';
        }
    });
    avatarRen.addEventListener('mouseout', () => {
        if (!avatarRenSeleccion.checked) {
            avatarRen.style.border = '0';
        }
    });
    avatarNana.addEventListener('mouseover', () => {
        if (!avatarNanaSeleccion.checked) {
            avatarNana.style.border = '.2em solid rgb(221, 202, 33)';
        }
    });
    avatarNana.addEventListener('mouseout', () => {
        if (!avatarNanaSeleccion.checked) {
            avatarNana.style.border = '0';
        }
    });
};

interactividadAvatar();

botonAvatar.addEventListener('click', e=> {//Creo el evento para el botón de selección
    // Uso preventDefault para que no se recargue la página
    e.preventDefault();
    elegirAvatar();  // Llamo a la función elegirAvatar aquí
});

// Función para elegir el avatar, generar el hover y el if para la selección
let elegirAvatar = () => {
    if(avatarRenSeleccion.checked == true){
        divDeAvatar.style.display='none';
        divDeAvatar.style.visibility='hidden';
        perfilNana.style.display='none';
        divDeJuego.style.display='block';
        divDeJuego.style.visibility='visible';
        perfilJugador.avatar= avatarRen;
    } else if(avatarNanaSeleccion.checked == true){
        divDeAvatar.style.display='none';
        divDeAvatar.style.visibility='hidden';
        perfilRen.style.display='none';
        divDeJuego.style.display='block';
        divDeJuego.style.visibility='visible';
        perfilJugador.avatar= avatarNana;
    }
}

elegirAvatar();


let crearMazo = () => {//Función para crear mazo uniendo numeros, palos y valores
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

let insertarCarta = () => {//Función para insertar la imagen para cada carta
    for (let i = 0; i < mazo.length; i++) {
        if (imgCarta[i]) { // Asegurarse de que haya una imagen para asignar
            mazo[i].imagen = imgCarta[i].src; // Asignar la fuente de la imagen a la carta
        }
    }
};

comenzarPartidaButton.addEventListener('click', ()=> {
    crearMazo();  // Llamo a la función para crear el mazo
    insertarCarta();
    setTimeout(comenzarJuego, 500);
    comenzarPartidaButton.style.display='none';
});
let comenzarJuego=()=>{
    jugadorUno=[];
    for(let i = 0; i < 3; i++){//reparte las cartas p.j1
        let azar = Math.floor(Math.random() * mazo.length);
        jugadorUno.push(mazo[azar]);
        mazo.splice(azar,1);
    }
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
    return(jugadorUno);
}

console.log(jugadorUno)
//Comienza el juego:: función de interactividad con las cartas

let interactividadCartas = () => {//Quería utilizar el mismo método que en los avatar. Pero sospecho que, como no se muestra nada en el array, no los puedo capturar
    let cartasJugadorUno = document.querySelectorAll('#ulJugadorUno li img');
    
    for (let i = 0; i < cartasJugadorUno.length; i++) {
        let carta = cartasJugadorUno[i];
        
        carta.addEventListener('click', () => {
            // Remuevo el borde de todas las cartas primero
            for (let j = 0; j < cartasJugadorUno.length; j++) {
                cartasJugadorUno[j].style.border = '0';
            }
            // Luego, añado el borde solo a la carta seleccionada
            carta.style.border = '.3em solid rgb(221, 202, 33)';
        });
    }
    
}

// Llamar a la función para habilitar la interactividadinteractividadCartas();
//Siguientes pasos: 
// A: Hay que hacer un evento con las cartas del jugador 1, que es quien está interactuando. 
//B: Hay que setear un timer para el jugador 2 y que, de manera random, seleccione una carta y la muestre
//Funcionamiento de la ronda

//Apuestas--> ventana que surge con tres opciones para que el usuario marque cuánto apostar

//Registrar puntos y verificar ganador

//Lógica del juego
