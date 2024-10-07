<?php
// Datos de conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "eventosweb";

// Crear conexión
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar la conexión
if ($conn->connect_error) {
  die("Conexión fallida: " . $conn->connect_error);
}

// Obtener los valores del formulario de registro

$nombre = $_POST['nombre'];
$apellidoPaterno = $_POST['apellido-paterno'];
$apellidoMaterno = $_POST['apellido-materno'];
$correoElectronico = $_POST['correo'];
$telefono = $_POST['telefono'];
$contraseña = $_POST['password'];

// Consulta SQL para insertar un nuevo usuario
$sql = "INSERT INTO usuario ( idUsuario , Nombre, ApellidoPaterno, ApellidoMaterno, CorreoElec, Telefono, Contraseña) 
VALUES ('', '$nombre', '$apellidoPaterno', '$apellidoMaterno', '$correoElectronico', '$telefono', '$contraseña')";

if ($conn->query($sql) === TRUE) {
  echo "Nuevo usuario registrado correctamente";
} else {
  echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cerrar conexión
$conn->close();
?>
