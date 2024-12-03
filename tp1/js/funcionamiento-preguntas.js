let comenzarButton = document.querySelector('#contestarPreguntas'); // Botón para comenzar
let submitPregunta = document.querySelector('#submitPregunta'); // Botón para aceptar selección de pregunta


let preguntasArray=[];
let preguntasMostradas = [];
let preguntasAcertadas = 0;

let resultados=document.querySelector('#resultados');
let mostrarMensaje=document.querySelector('#mostrarMensaje');//Capturo el span para poner el valor de las preguntas acertadas
let formTrivia=document.querySelector('#sectionPreguntas');//Capturo la sección de preguntas para esconderla

// Convertir NodeList a un array común
let guardarEnArray=()=>{
    let nodeList = document.querySelectorAll('fieldset'); // Capturo todos los fieldsets
    for (let i = 0; i < nodeList.length; i++) {
        preguntasArray.push(nodeList[i]); // Convertir NodeList a array
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
        return; // Salir de la función si no quedan preguntas
    }
    // Generar un número aleatorio
    let azar = Math.floor(Math.random() * preguntasArray.length);

    // Ocultar todas las preguntas primero
    for (let i = 0; i < preguntasArray.length; i++) {
        preguntasArray[i].style.display = 'none';
    }

    // Mostrar la pregunta seleccionada aleatoriamente
    preguntasArray[azar].style.display = 'flex';

    // Eliminar la pregunta mostrada del array y almacenarla en preguntasMostradas
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

let ocultarPreguntaActual = () => {
    // Ocultar la última pregunta mostrada
    if (preguntasMostradas.length > 0) {
        let ultimaPregunta = preguntasMostradas[preguntasMostradas.length - 1];
        ultimaPregunta.style.display = 'none';
    }
};

let contabilizarPuntos = () => {
    let preguntaActual = preguntasMostradas[preguntasMostradas.length - 1]; // Última pregunta mostrada
    let inputs = preguntaActual.querySelectorAll('input[type="radio"]'); // Asumiendo que las respuestas son de tipo radio

    // Verificar la respuesta seleccionada
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].checked && inputs[i].value === 'si') {
            preguntasAcertadas++;
        }
    }
};

let mostrarResultados=()=>{
    if (preguntasArray.length === 0) {
        formTrivia.style.display='none';
        resultados.style.display='block'
        mostrarMensaje.innerHTML=`Ha acertado <span>${preguntasAcertadas}/15</span> preguntas`;
        if(preguntasAcertadas<6){
            let comentario=document.querySelector('#comentario');
            comentario.innerHTML='Falta estudio!'+'<img class="comentarioimg" src="./imagenes/trpnest-burla.jpg" alt="Trapnest bulta">'
        } else if(preguntasAcertadas>6&&preguntasAcertadas<14||preguntasAcertadas==14){
            let comentario=document.querySelector('#comentario');
            comentario.innerHTML='Venís muy bien!'+'<img class="comentarioimg" src="./imagenes/shin.jpg" alt="Shin feliz">'
        } else if(preguntasAcertadas===15){
            let comentario=document.querySelector('#comentario');
            comentario.innerHTML='Wow sos expertx!'+'<img class="comentarioimg" src="./imagenes/nanas-felices.jpg" alt="Nanas felices">'
        }
    }
}