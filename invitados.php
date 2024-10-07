<?php
// Verifica si se enviaron datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Conexión a la base de datos
    $servername = "localhost"; // servidor MySQL
    $username = "root"; // usuario de MySQL
    $password = ""; // contraseña de MySQL
    $dbname = "eventosweb"; // nombre de tu base de datos

    // Crea una conexión
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verifica la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // Obtiene el ID del evento insertado anteriormente
    $lastInsertedId = $_POST['lastInsertedId'];

    // Insertar invitados
    for ($i = 1; $i <= 2; $i++) { // Cambia este valor a la cantidad de invitados que desees agregar
        $nombreInvitado = $conn->real_escape_string($_POST['nombreInvitado' . $i]);
        $telefonoInvitado = $conn->real_escape_string($_POST['telefonoInvitado' . $i]);
        $correoInvitado = $conn->real_escape_string($_POST['correoInvitado' . $i]);

        $sqlInvitado = "INSERT INTO invitados (idInvitados ,idEvento, Nombre, Telefono, Correo) 
                        VALUES ('', 3, '$nombreInvitado', '$telefonoInvitado', '$correoInvitado')";
        $conn->query($sqlInvitado);
    }

    echo "Invitados registrados exitosamente.";

    // Cierra la conexión
    $conn->close();
}
?>
