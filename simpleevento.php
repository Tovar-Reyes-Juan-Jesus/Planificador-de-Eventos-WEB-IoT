<?php
// Conexión a la base de datos (reemplaza los valores con los de tu propia configuración)
$servername = "localhost";
$username = "root";
$password = "";
$database = "eventosweb";

// Crea la conexión
$conn = new mysqli($servername, $username, $password, $database);

// Verifica la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Recibe los datos del formulario
$tipoEvento = $_POST['tipoEvento'];
$fechaEvento = $_POST['fechaEvento'];
$ubicacion = $_POST['ubicacion'];
$tipoComida = $_POST['tipoComida'];
$platosPrincipales = $_POST['platosPrincipales'];
$aperitivos = $_POST['aperitivos'];
$postres = $_POST['postres'];
$cantidadAdultos = $_POST['cantidadAdultos'];
$cantidadNinos = $_POST['cantidadNinos'];
$cantidadInfantes = $_POST['cantidadInfantes'];
$presupuestoTotal = $_POST['presupuestoTotal'];
$presupuestoComida = $_POST['presupuestoComida'];
$presupuestoDecoracion = $_POST['presupuestoDecoracion'];
$resumenEvento = $_POST['resumenEvento'];
$formaPago = $_POST['formaPago'];

// Consulta SQL para insertar los datos en la base de datos
$sql = "INSERT INTO eventosimple (idEventoSimple , TipoEve, Fecha, Ubicacion, TipoComi, PlatosPrinc, Aperitivos, Postres, CantAdult, CantNiño, CantInfante, PresuTotal, PresuComida, PresuDeco, ResumEve, FormaPago)
VALUES ('' ,'$tipoEvento', '$fechaEvento', '$ubicacion', '$tipoComida', '$platosPrincipales', '$aperitivos', '$postres', '$cantidadAdultos', '$cantidadNinos', '$cantidadInfantes', '$presupuestoTotal', '$presupuestoComida', '$presupuestoDecoracion', '$resumenEvento', '$formaPago')";

if ($conn->query($sql) === TRUE) {
    echo "Evento registrado exitosamente";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Cierra la conexión
$conn->close();
?>
