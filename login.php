<?php
// Verifica si se enviaron datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Conexión a la base de datos
    $servername = "localhost"; //  servidor MySQL
    $username = "root"; //  nombre de usuario de MySQL
    $password = ""; //  contraseña de MySQL
    $dbname = "eventosweb"; //  base de datos

    // Crea una conexión
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verifica la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // Escapa los datos del formulario para evitar inyecciones de SQL
    $username = $conn->real_escape_string($_POST['username']);
    $password = $conn->real_escape_string($_POST['password']);

    // Consulta para verificar el usuario y la contraseña
    $sql = "SELECT * FROM usuario WHERE Nombre='$username' AND Contraseña='$password'";
    $result = $conn->query($sql);

    if ($result->num_rows == 1) {
        // Inicio de sesión exitoso
        session_start();
        $_SESSION['username'] = $username;
        header("Location: SSPEW.html"); // Redirige al usuario a la página principal
        echo "Bienvenido: " .$username;
    } else {
        // Nombre de usuario o contraseña incorrectos
        echo "Nombre de usuario o contraseña incorrectos.";
    }

    // Cierra la conexión
    $conn->close();
}
?>

