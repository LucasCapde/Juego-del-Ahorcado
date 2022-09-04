var botonesInicio = document.querySelector(".botones-inicio");
var botonIniciar = document.querySelector("#btn-iniciar");
var botonNuevaPalabra = document.querySelector("#btn-nueva-palabra");
var botonCancelar = document.querySelector("#btn-cancelar");
var seccionNuevaPalabra = document.querySelector(".nueva-palabra");
var campoPalabra = document.querySelector("#campo-palabra");
var seccionJuego = document.querySelector("#juego");
var botonReiniciar = document.querySelector("#btn-reiniciar");
var botonSalir = document.querySelector("#btn-salir");

seccionNuevaPalabra.style.display = "none";
seccionJuego.style.display = "none";

botonIniciar.addEventListener("click", function(){
    botonesInicio.style.display = "none";
    seccionJuego.style.display = "inherit";
    iniciarJuego();
});

botonNuevaPalabra.addEventListener("click", function(){
    botonesInicio.style.display = "none";
    seccionNuevaPalabra.style.display = "inherit";
    campoPalabra.focus();
});

botonReiniciar.addEventListener("click", () => {
    posicionLetraIncorrecta = 0;
    contadorLetrasCorrectas = 0;
    ganador = false;
    vidas = 7;
    letrasSecretas = [];
    moveTo = 20;
    lineTo = 20;
    pincel.clearRect (0, 0, 300, 300);
    pincel.beginPath();
    iniciarJuego();
});

botonSalir.addEventListener("click", function(){
    location.reload();
});

botonCancelar.addEventListener("click", function(){
    seccionNuevaPalabra.style.display = "none";
    seccionJuego.style.display = "none";
    botonesInicio.style.display = "inherit";
});

