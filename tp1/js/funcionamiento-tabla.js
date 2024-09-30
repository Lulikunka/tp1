// Recuperar datos de localStorage
let recuperarDatos = localStorage.getItem('jugadoresStorage');


// Verifica si hay datos guardados en el localStorage
if (recuperarDatos) {
    // Parsear los datos solo si existen
    let jugadoresRecuperados = JSON.parse(recuperarDatos);

    // Accede a los elementos HTML donde mostrar los datos
    let mostrarNombre = document.querySelector('#nombrePosicionesCartas');
    let mostrarAvatar = document.querySelector('#avatarPosicionesCartas');
    
    // Función para mostrar los resultados
    let mostrarResultados = () => {
        for (let i = 0; i < jugadoresRecuperados.length; i++) {
            mostrarNombre.innerHTML += `<p> ${jugadoresRecuperados[i].nombre} </p>`;
            mostrarAvatar.innerHTML += `<p> ${jugadoresRecuperados[i].avatar} </p>`;
        }
    };

    // Llama a la función para mostrar los resultados
    mostrarResultados();

} else {
    console.log("No hay datos en localStorage.");
}
