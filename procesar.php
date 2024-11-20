<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nombre = htmlspecialchars($_POST['nombre']);
    $apellido = htmlspecialchars($_POST['apellido']);
    $email = htmlspecialchars($_POST['email']);
    $cuenta = htmlspecialchars($_POST['cuenta']);

    echo "<h2>Datos recibidos</h2>";
    echo "<p><strong>Nombre:</strong> $nombre</p>";
    echo "<p><strong>apellido:</strong> $apellido</p>";
    echo "<p><strong>Email:</strong> $email</p>";
    echo "<p><strong>tipo de cuenta:</strong> $cuenta</p>";
} else {
    echo "<p>No se recibieron datos.</p>";
}


/*$servername = "localhost";
$username = "root";
$password = "";
$database = "banco_macro";

$conn = new mysqli($servername, $username, $password, $database);

if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$cliente_id = $_POST['cliente'];
$cuenta_id = $_POST['cuenta'];

$sql = "INSERT INTO cuentas (cliente_id, cuenta_id) VALUES ('$cliente_id', '$cuenta_id')";

if ($conn->query($sql) === TRUE) {
    echo "datos aceptados.";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

$conn->close();
?>
*/
