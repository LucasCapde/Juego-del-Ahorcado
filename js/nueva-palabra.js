var botonGuardar = document.querySelector("#btn-guardar");
var prohibidos = new RegExp('[0-9a-zñáéíóúÁÉÍÓÚ~&@#%!¡¿?,._-})]');
//AGREGAR PALABRAS AL ALMACENAMIENTO LOCAL
let nuevasPalabras = JSON.parse (localStorage.getItem('palabras'));

botonGuardar.addEventListener("click", function(){
    let nuevaPalabra = campoPalabra.value;

    if(nuevaPalabra.match (prohibidos)){
        alert ("La palabra debe estar en MAYÚSCULAS.");
        campoPalabra.value = "";

    }else if (nuevaPalabra.length <= 4){
        alert ("La palabra debe tener más de CINCO letras.");
        campoPalabra.value = "";
    }
    else if (palabras.includes(nuevaPalabra)){
        alert ('Advertencia ! La palabra ' + nuevaPalabra + ' ya existe.')
    }
    else{
        palabras.push(nuevaPalabra);
        localStorage.setItem('palabras', JSON.stringify(palabras));
        alert (nuevaPalabra + " guardada exitosamente !");

        seccionNuevaPalabra.style.display = "none";
        botonesInicio.style.display = "none";
        seccionJuego.style.display = "inherit";
        iniciarJuego();
    }
});