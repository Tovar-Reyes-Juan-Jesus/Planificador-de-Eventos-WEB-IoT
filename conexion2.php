<?php
$servername = "localhost"; // Cambia esto si tu servidor es diferente
$username = "root"; // Tu usuario de la base de datos
$password = ""; // Tu contraseña de la base de datos
$dbname = "eventosweb"; // Nombre de tu base de datos

// Crear la conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
?>
