document.getElementById("myForm").addEventListener("submit", function (event) {
    let valid = true;
    const apellido = document.getElementById("apellido").value;
    const nombre = document.getElementById("nombre").value;
    const email = document.getElementById("email").value;
    const cuenta = document.getElementById("cuenta").value;

    if (!nombre) {
    alert("El campo 'Nombre' no puede estar vacío.");
    valid = false;
    document.getElementById("nombre").style.borderColor = "red";
    }
    if (!apellido) {
    alert("El campo 'Apellido' no puede estar vacío.");
    valid = false;
    document.getElementById("apellido").style.borderColor = "red";
    }
    if (!validateEmail(email)) {
    alert("Por favor, ingrese un email válido.");
    valid = false;
    document.getElementById("email").style.borderColor = "red";
    }
    if (cuenta === "") {
    alert("Seleccione el tipo de cuenta.");
    valid = false;
    document.getElementById("cuenta").style.borderColor = "red";
    }

    if (!valid) {
    event.preventDefault();
    }
});

function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
}