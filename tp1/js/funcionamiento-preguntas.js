let comenzarButton = document.querySelector('#contestarPreguntas'); // Botón para comenzar
let submitPregunta = document.querySelector('#submitPregunta'); // Botón para aceptar selección de pregunta


let preguntasArray=[]; //Array para almacenar las preguntas y luego aplicarles un random
let preguntasMostradas = []; //Array para almacenar las preguntas mostradas luego de que se eliminen del de preguntas
let preguntasAcertadas = 0; //Variable contadora de preguntas acertadas

let resultados=document.querySelector('#resultados'); //Capturo la sección para mostrarla
let mostrarMensaje=document.querySelector('#mostrarMensaje');//Capturo el span para poner el valor de las preguntas acertadas
let formTrivia=document.querySelector('#sectionPreguntas');//Capturo la sección de preguntas para esconderla

// Convierto NodeList a un array común
let guardarEnArray=()=>{
    let nodeList = document.querySelectorAll('fieldset'); // Capturo todos los fieldsets
    for (let i = 0; i < nodeList.length; i++) {
        preguntasArray.push(nodeList[i]); // Convierto NodeList a array
    }
}


comenzarButton.addEventListener('click', e => {
    comenzarButton.style.display = 'none';
    e.preventDefault();
    guardarEnArray();
    mostrarPregunta();
});

let mostrarPregunta = () => {
    if (preguntasArray.length === 0) {
        mostrarResultados();
        return; // Sale de la función si no quedan preguntas
    }
    // Genera un número aleatorio para luego indicarle al array de preguntas
    let azar = Math.floor(Math.random() * preguntasArray.length);

    // Oculta todas las preguntas primero
    for (let i = 0; i < preguntasArray.length; i++) {
        preguntasArray[i].style.display = 'none';
    }

    // Muestra la pregunta seleccionada aleatoriamente con el número calculado antes
    preguntasArray[azar].style.display = 'flex';

    // Elimina la pregunta mostrada del array y almacenarla en preguntasMostradas
    preguntasMostradas.push(preguntasArray[azar]);
    preguntasArray.splice(azar, 1);
    submitPregunta.style.display='block'
};

submitPregunta.addEventListener('click', e => {
    e.preventDefault();
    contabilizarPuntos();
    ocultarPreguntaActual();
    mostrarPregunta();
    
    
});

let ocultarPreguntaActual = () => {//Función para que, una vez que la pregunta haya sido respondida, se deje de mostrar y se pase a la siguiente
    // Ocultar la última pregunta mostrada
    if (preguntasMostradas.length > 0) {
        let ultimaPregunta = preguntasMostradas[preguntasMostradas.length - 1];
        ultimaPregunta.style.display = 'none';
    }
};

let contabilizarPuntos = () => { //Función para contabilizar los puntos de la pregunta ya respondida
    let preguntaActual = preguntasMostradas[preguntasMostradas.length - 1]; // Última pregunta mostrada
    let inputs = preguntaActual.querySelectorAll('input[type="radio"]'); 

    // Verifica la respuesta seleccionada
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked && inputs[i].value === 'si') {
            preguntasAcertadas++; //Aumenta el contador si la respuesta elegida es la de valor "si"
        }
    }
};

let mostrarResultados=()=>{ //Función para mostrar los resultados de la Trivia
    if (preguntasArray.length === 0) {
        formTrivia.style.display='none';
        resultados.style.display='block'
        mostrarMensaje.innerHTML=`Ha acertado <span>${preguntasAcertadas}/15</span> preguntas`;
        if(preguntasAcertadas<6){//Si se aciertan menos de 6, muestra una imagen burlona y un mensaje de pésame
            let comentario=document.querySelector('#comentario');
            comentario.innerHTML='Falta estudio!'+'<img class="comentarioimg" src="./imagenes/trpnest-burla.jpg" alt="Trapnest bulta">'
        } else if(preguntasAcertadas>6&&preguntasAcertadas<14||preguntasAcertadas==14){ //Si se aciertan más de 6, pero menos de 14 muestra una imágen alegre y un mensaje positivo
            let comentario=document.querySelector('#comentario');
            comentario.innerHTML='Venís muy bien!'+'<img class="comentarioimg" src="./imagenes/shin.jpg" alt="Shin feliz">'
        } else if(preguntasAcertadas===15){ //Si se aciertan las 15 muestra una imágen de asombro y un mensaje de felicitaciones
            let comentario=document.querySelector('#comentario');
            comentario.innerHTML='Wow sos expertx!'+'<img class="comentarioimg" src="./imagenes/nanas-felices.jpg" alt="Nanas felices">'
        }
    }
}