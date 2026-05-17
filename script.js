const textarea = document.getElementById("texto");
const contador = document.getElementById("contador");
const limiteInput = document.getElementById("limite");
const restantes = document.getElementById("restantes");
const progreso = document.getElementById("progreso");

let alertaMostrada = false;

function actualizarContador() {

    let texto = textarea.value;
    let cantidad = texto.length;
    let limite = parseInt(limiteInput.value);

    contador.textContent = cantidad;

    restantes.textContent = "Restantes: " + (limite - cantidad);

    if (cantidad > limite) {
        textarea.classList.add("excedido");
        textarea.classList.remove("ok");

        if (!alertaMostrada) {
            alert("Superaste el límite!");
            alertaMostrada = true;
        }

    } else {
        textarea.classList.remove("excedido");
        textarea.classList.add("ok");
        alertaMostrada = false;
    }

    if (cantidad > limite) {
        contador.style.color = "red";
    } else if (cantidad > limite - 10) {
        contador.style.color = "orange";
    } else {
        contador.style.color = "green";
    }

    let porcentaje = (cantidad / limite) * 100;
    progreso.style.width = porcentaje + "%";

    if (texto.includes("programa")) {
        document.body.style.backgroundColor = "lightyellow";
    } else {
        document.body.style.backgroundColor = "#f4f4f4";
    }
}

textarea.addEventListener("input", actualizarContador);
limiteInput.addEventListener("input", actualizarContador);