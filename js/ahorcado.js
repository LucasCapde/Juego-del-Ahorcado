const contenedor = document.getElementById("contenedor-palabra");
const botonIniciarJuego = document.getElementById("btn-iniciar");
const elementoLetrasUsadas = document.getElementById("letras-usadas");

let canvas = document.getElementById('canvas');
let pincel = canvas.getContext('2d');
pincel.canvas.width  = 0;
pincel.canvas.height = 0;

let palabra;
let palabraElegida;
let letrasUsadas;
let errores;
let aciertos;

const agregarLetra = letter => {
    const elementoLetra = document.createElement('span');
    elementoLetra.innerHTML = letter;
    elementoLetrasUsadas.appendChild(elementoLetra);
}

const dibujarHorca = () => {
    pincel.canvas.width  = 1200;
    pincel.canvas.height = 800;
    pincel.scale(5, 5);
    pincel.clearRect(0, 0, canvas.width, canvas.height);
    pincel.fillStyle = '#d95d39';
    pincel.fillRect(70, 120, 20, 8);
    pincel.fillRect(76, 30, 8, 90);
    pincel.fillRect(80, 30, 40, 8);
    pincel.fillRect(120, 30, 2, 20);
}

const dibujarAhorcado = () => {
    pincel.strokeStyle = "#0a3871";
    pincel.lineWidth = 1;
    pincel.beginPath();

    //CABEZA
    if (errores === 0) {
        pincel.arc(121, 58, 8, 0, Math.PI * 2);
        pincel.moveTo (117, 54);
        pincel.lineTo (119, 57);
        pincel.moveTo (119, 54);
        pincel.lineTo (117, 57);
        pincel.moveTo (122, 54);
        pincel.lineTo (124, 57);
        pincel.moveTo (122, 57);
        pincel.lineTo (124, 54);
    }
    //TORSO
    else if (errores === 1){
        pincel.moveTo(121, 66);
        pincel.lineTo(121, 108);
    }
    //PIERNA IZQUIERDA
    else if (errores === 2){
        pincel.moveTo(121, 108);
        pincel.lineTo(110, 125);
    }
    //PIERNA DERECHA
    else if (errores === 3){
        pincel.moveTo(121, 108);
        pincel.lineTo(132, 125);
    }
    //BRAZO IZQUIERDO
    else if (errores === 4){
        pincel.moveTo(121, 80);
        pincel.lineTo(110, 100);
    }
    //BRAZO DERECHO
    else if (errores === 5){
        pincel.moveTo(121, 80);
        pincel.lineTo(132, 100);
    }
    pincel.stroke();
}

const terminarJuego = () => {
    document.removeEventListener('keydown', eventoLetra);
}

const letraEquivocada = () => {
    dibujarAhorcado();
    errores++;
    if(errores === 6){
        alert ("Perdiste ! La palabra era " + palabra);
        terminarJuego();
    }
}

const letraCorrecta = letter => {
    const { children } =  contenedor;
    for(let i = 0; i < children.length; i++) {
        if(children[i].innerHTML === letter) {
            children[i].classList.toggle('hidden');
            aciertos++;
        }
    }
    if(aciertos === palabraElegida.length) {
        alert ("Felicidades, ganaste !!");
        terminarJuego();
    }
}

const letraIngresada = letter => {
    if(palabraElegida.includes(letter)) {
        letraCorrecta(letter);
    } else {
        letraEquivocada();
    }
    agregarLetra(letter);
    letrasUsadas.push(letter);
};

const eventoLetra = evento => {
    let nuevaLetra = evento.key;
    if(!nuevaLetra.match(/^[A-ZÑ]$/)) {
        alert ("Solo se pueden ingresar letras mayúsculas.");
    } else if(letrasUsadas.includes(nuevaLetra)) {
        alert ("La letra " + nuevaLetra + " ya fue ingresada.");
    } else
        letraIngresada(nuevaLetra);
}

const dibujarPalabra = () => {
    palabraElegida.forEach(letter => {
        const elementoLetra = document.createElement('span');
        elementoLetra.innerHTML = letter;
        elementoLetra.classList.add('letter');
        elementoLetra.classList.add('hidden');
        contenedor.appendChild(elementoLetra);
    });
};

const elegirPalabraAleatoria = () => {
    palabra = palabras[Math.floor((Math.random() * palabras.length))];
    palabraElegida = palabra.split('');
};

const iniciarJuego = () => {
    letrasUsadas = [];
    errores = 0;
    aciertos = 0;
    contenedor.innerHTML = '';
    elementoLetrasUsadas.innerHTML = '';
    dibujarHorca();
    elegirPalabraAleatoria();
    dibujarPalabra();
    document.addEventListener('keydown', eventoLetra)
}