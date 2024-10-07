<?php
// Verifica si se enviaron datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Conexión a la base de datos
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "eventosweb";

    // Obtén los datos del formulario
    $nombreEvento = $_POST['nombreEvento'];
    $fechaEvento = $_POST['fechaEvento'];
    $horaInicio = $_POST['horaInicio'];
    $horaFin = $_POST['horaFin'];
    $ubicacionEvento = $_POST['ubicacionEvento'];
    $tipoEvento = $_POST['tipoEvento'];

    // Crea una conexión
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Verifica la conexión
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    // Prepara la consulta SQL para insertar el evento en la tabla 'evento'
    $sql = "INSERT INTO evento (idEvento ,Nombre, Fecha, HoraInicial, HoraFinal, Ubicacion, TipoEvento, Colortexto, Colorfondo, idUsuario) 
            VALUES ('','$nombreEvento', '$fechaEvento', '$horaInicio', '$horaFin', '$ubicacionEvento', '$tipoEvento', '#000000', '#4BD31B', 2)";

    // Ejecuta la consulta
    if ($conn->query($sql) === TRUE) {
        echo "Evento registrado exitosamente";
    } else {
        echo "Error al registrar el evento: " . $conn->error;
    }

    // Cierra la conexión
    $conn->close();
}
?>
