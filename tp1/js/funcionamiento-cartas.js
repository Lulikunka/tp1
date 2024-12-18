//Declaro el array de jugadores el objeto para cada jugador, para guardar luego su perfil en el Local Storage.
let jugadores=[];
let perfilJugador={};

// Declaro las variables para indicar el palo y el número
const palos=["oro","copa","basto","espada"]
const numeros=[1,2,3,4,5,6,7,10,11,12];

//Creo el array del mazo y el objeto de la carta, que irá en el array
let mazo=[];
let carta={};
let imgCarta= document.querySelectorAll('.imgCarta');//capturo las imágenes de las cartas

let caratulaCartasH3=document.querySelector('h3');//Capturo el h3 para esconderlo al empezar
let caratulaCartasImg=document.querySelector('#imgCaratulaCartas');//Capturo la img de la carátula para esconderla al empezar
let inicio=document.querySelector('.comenzarJuego');//Capturo el botón para habilitar el inicio de juego

//Selección de avatar: variables para la función
let avatarRen=document.querySelector('#avatarRen');//Para aplicar interactividad en imagem
let avatarRenSeleccion=document.querySelector('#ren');//Operar con label avatar
let avatarNana=document.querySelector('#avatarNana');//Para aplicar interactividad en imagem
let avatarNanaSeleccion=document.querySelector('#nana');//perar con label avatar
let botonAvatar=document.querySelector('#submitAvatar');//Para aceptar el avatar y nombre

//Inicio perfil de jugador. Capturo las imágenes para mostrar una y esconder la otra, dependiendo del avatar seleccionado.
let perfilRen=document.querySelector('#perfilRen');
let perfilNana=document.querySelector('#perfilNana');

let divDeJuego=document.querySelector('.divJuegoDeCartas');//Capturo el div para que aparezca el div del juego
let divDeAvatar=document.querySelector('#registrarseCartasAvatar');//Capturo el div para que permita seleccionar avatar
let divCartasNombre=document.querySelector('#registrarseCartasNombre');//Capturo el div para ingresar el nombre
let nombreJugador=document.querySelector('#nombreJugadorUno');//Capturo el parrafo para que aparezca el nombre del j1

//Declaro ambos jugadores como arrays para asignarle las cartas
let jugadorUno=[];
let jugadorDos=[];

let mostrarCartasJugadorUno; //Variable para mostrar los valores asignados del j1
let mostrarCartasJugadorDos; //Variable para mostrar los valores asignados del j2

//Variables de la apuesta
let sectionApuesta=document.querySelector('#sectionApuesta'); //Capturo la sección para habilitarla y deshabilitarla
let botonApuesta=document.querySelector('#submitApuesta'); //Capturo el botón para elegir apuesta
let puntosCinco=document.querySelector('#apuesta1');  //Capturo los valores del radio
let puntosDiez=document.querySelector('#apuesta2');//Capturo los valores del radio
let puntosQuince=document.querySelector('#apuesta3');//Capturo los valores del radio
let radioCompleto=document.getElementsByName('apuesta');//Capturo todos los valores del radio para limpiarlos

//Variables para los valores de cartas
let valorDeCartaSeleccionadaJugadorUno=[];
//let valorDeCartaSeleccionadaJugadorDos=[];

//Variables para contabilización de puntos
let valoresDeApuestaJugadorUno=[];
//let valoresDeApuestaJugadorDos=[];

let comenzarPartidaButton=document.querySelector('.botonComenzarPartida'); //Capturo al botón para comenzar la partida y qse repartan las cartas

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
    ingrasarNombre();
    elegirAvatar();  // Llamo a la función elegirAvatar aquí
});

// Función para elegir el avatar, generar el hover y el if para la selección
let ingrasarNombre=()=>{
    let nombrePersona = document.querySelector('#nombre').value;
    
    perfilJugador.nombre=nombrePersona;
    nombreJugador.innerHTML=nombrePersona

    // Valido que el nombre no esté vacío
    if (nombrePersona == ''|| nombrePersona === null) {
        alert('El nombre no puede estar vacío');
        return false;
    } 
}
let elegirAvatar = () => {
    if(avatarRenSeleccion.checked == true){
        divDeAvatar.style.display='none';
        divDeAvatar.style.visibility='hidden';
        perfilNana.style.display='none';
        divCartasNombre.style.display='none';
        divDeJuego.style.display='block';
        divDeJuego.style.visibility='visible';
        perfilJugador.avatar= avatarRen;//agrego la imagen al objeto del PERFIL DEL JUGADOR para mostrarloluego en la tabla
    } else if(avatarNanaSeleccion.checked == true){
        divDeAvatar.style.display='none';
        divDeAvatar.style.visibility='hidden';
        perfilRen.style.display='none';
        divCartasNombre.style.display='none';
        divDeJuego.style.display='block';
        divDeJuego.style.visibility='visible';
        perfilJugador.avatar= avatarNana;//agrego la imagen al objeto del PERFIL DEL JUGADOR para mostrarloluego en la tabla
    } else{
        alert('Tiene que elegir un avatar');
        return;
    }
    
}

let crearMazo = () => {//Función para crear mazo uniendo numeros, palos y valores
    for (let i = 0; i < palos.length; i++) {
        for (let j = 0; j < numeros.length; j++) {
            let puntos = numeros[j] <= 7 ? numeros[j] : 10;  // Calculo los puntos

                carta = {  // Creo la carta dentro del bucle
                numero: numeros[j],
                palo: palos[i],
                valor: puntos
            };

            mazo.push(carta);  // Agrego la carta al mazo
        }
    }
}

let insertarCarta = () => {//Función para insertar la imagen para cada carta
    for (let i = 0; i < mazo.length; i++) {
        if (imgCarta[i]) { 
            mazo[i].imagen = imgCarta[i].src; // Asigno la fuente de la imagen a la carta
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
    mostrarCartasJugadorDos=document.querySelector('#ulJugadorDos');
    mostrarCartasJugadorDos.innerHTML = ''; // Limpia la lista antes de agregar las nuevas cartas, PERO HAY QUE PONERLO EN OTRO LADO PORQUE MARCA NaN

    for (let i = 0; i < jugadorDos.length; i++) { //recorro el nuevo array del jugador para mostrar sus cartas
        let carta = jugadorDos[i];
        
        mostrarCartasJugadorDos.innerHTML += `<li><img id="carta-0" src="imagenes/carta0.png" alt="Carta al revés"></li>`;
    }
    capturarCartas()//Capturo las cartas para poder manejar la elección del usuario
    interactividadCartas()
    
}

let capturarCartas=()=>{//Capturo los elementos para poder crear la interactividad de las cartas
    let capturarCartasJugadorUno=document.querySelectorAll('#ulJugadorUno li');
    let capturarCartasJugadorDos=document.querySelectorAll('#ulJugadorDos li');
        for(let i=0; i<jugadorUno.length; i++){
            jugadorUno[i].posicion=capturarCartasJugadorUno[i];//Guardo en cada objeto del array la posición
        }
        for(let i=0; i<jugadorDos.length; i++){
            jugadorDos[i].posicion=capturarCartasJugadorDos[i];//Guardo en cada objeto del array la posición
        }
    
    //Acá debería poder capturar las cartas del jugador 2
   //     for(let i=0; i<jugadorDos.length; i++){
   //         jugadorUno[i].posicion=capturarCartasJugadorDos[i];//Guardo en cada objeto del array la posición
   //     }
   //     for(let i=0; i<jugadorDos.length; i++){
   //         jugadorDos[i].posicion=capturarCartasJugadorDos[i];//Guardo en cada objeto del array la posición
   //     }
}


let interactividadCartas = () => {
    for (let i = 0; i < jugadorUno.length; i++) {
        jugadorUno[i].posicion.addEventListener('click', () => {
            
            jugadorUno[i].posicion.style.border = '.2em solid rgb(221, 202, 33)';
            jugadorUno[i].posicion.classList.add('cartaElegida1');
    
            // Habilito la sección de apuestas.
            habilitarApuesta();
    
            // Guardar la carta elegida.
            let cartaElegida = jugadorUno[i].posicion;
    
                // Listener de apuestas.
            botonApuesta.addEventListener('click', e => {
                e.preventDefault(); // Evita que la página se recargue.
    
                // Guardo los valores de la apuesta en el array para controlar luego los calculos.
                //Prevengo que no se seleccione nada
                if(puntosCinco.checked==true){
                   valoresDeApuestaJugadorUno.push(puntosCinco.value);
                } else if(puntosDiez.checked==true){
                    valoresDeApuestaJugadorUno.push(puntosDiez.value);
                } else if(puntosQuince.checked==true){
                    valoresDeApuestaJugadorUno.push(puntosQuince.value);
                }else{
                    alert('Tiene que elegir los puntos a apostar');
                    return; // Si no eligió puntos, no se hace nada más.
                }
    
                // Si se seleccionan los puntos, oculto la carta.
                cartaElegida.style.display = 'none';

                valorDeCartaSeleccionadaJugadorUno.push(jugadorUno[i].valor);
                // Remuevo la carta del array de jugadorUno.
                jugadorUno.splice(i, 1);
                vaciarRadio();
            });
        });
    }
}
    
// Función para mostrar la sección de apuesta.
let habilitarApuesta = () => {
    sectionApuesta.style.display = 'block';
    sectionApuesta.style.visibility = 'visible';
}
    
    //función apuesta.
let apuesta = () => {
    if (!puntosCinco.checked && !puntosDiez.checked && !puntosQuince.checked) {
        alert('Tiene que elegir los puntos a apostar');
        return false;
    } else {
        // Lógica para manejar los puntos apostados.
        let puntos = puntosCinco.checked ? 5 : puntosDiez.checked ? 10 : 15;
        console.log(`Se apostaron ${puntos} puntos`);
        return true;
    }
}

let vaciarRadio=()=>{
    for(let i=0; i<radioCompleto.length;i++){
        radioCompleto[i].checked=false
    }
}

//Operaciones del localStorage
jugadores.push(perfilJugador);

let jugadoresString=JSON.stringify(jugadores);
localStorage.setItem('jugadoresStorage',jugadoresString);