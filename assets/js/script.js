
// Obtener los elementos del HTML
const formulario = document.getElementById("formulario");
const campoValor = document.getElementById("valor");
const unidadOrigen = document.getElementById("origen");
const unidadDestino = document.getElementById("destino");
const botonConvertir = document.getElementById("convertir");
const resultado = document.getElementById("resultado");

// Revisar que los tres campos estén completos
function revisarCampos() {
    const valorCompleto = campoValor.value.trim() !== "";
    const origenCompleto = unidadOrigen.value !== "";
    const destinoCompleto = unidadDestino.value !== "";

    botonConvertir.disabled = !(valorCompleto && origenCompleto && destinoCompleto);

    resultado.style.display = "none";
    resultado.classList.remove("error");
}

// Convertir cualquier temperatura a Celsius
function convertirACelsius(valor, unidad) {
    if (unidad === "C") {
        return valor;
    } else if (unidad === "F") {
        return (valor - 32) * 5 / 9;
    } else {
        return valor - 273.15;
    }
}

// Convertir Celsius a la unidad seleccionada
function convertirDesdeCelsius(valor, unidad) {
    if (unidad === "C") {
        return valor;
    } else if (unidad === "F") {
        return (valor * 9 / 5) + 32;
    } else {
        return valor + 273.15;
    }
}

// Revisar los campos cuando el usuario escribe o selecciona
campoValor.addEventListener("input", revisarCampos);
unidadOrigen.addEventListener("change", revisarCampos);
unidadDestino.addEventListener("change", revisarCampos);

// Realizar la conversión
formulario.addEventListener("submit", function (evento) {
    evento.preventDefault();

    const valorIngresado = Number(campoValor.value);

    resultado.style.display = "block";

    // Comprobar que la temperatura sea válida
    if (campoValor.value.trim() === "" || !Number.isFinite(valorIngresado)) {
        resultado.textContent = "Por favor, escribe una temperatura válida.";
        resultado.classList.add("error");
        return;
    }

    // Convertir primero a Celsius
    const valorCelsius = convertirACelsius(valorIngresado, unidadOrigen.value);

    // Comprobar el límite mínimo de temperatura
    if (valorCelsius < -273.15) {
        resultado.textContent = "La temperatura no puede ser menor al cero absoluto.";
        resultado.classList.add("error");
        return;
    }

    // Obtener la temperatura convertida
    const valorConvertido = convertirDesdeCelsius(valorCelsius, unidadDestino.value);

    // Seleccionar el símbolo de la unidad
    let simbolo = "°C";

    if (unidadDestino.value === "F") {
        simbolo = "°F";
    } else if (unidadDestino.value === "K") {
        simbolo = "K";
    }

    // Mostrar el resultado
    resultado.classList.remove("error");
    resultado.textContent = valorIngresado + " " + unidadOrigen.value +
        " = " + valorConvertido.toFixed(2) + " " + simbolo;
});

// Revisar el botón al iniciar la página
revisarCampos();
