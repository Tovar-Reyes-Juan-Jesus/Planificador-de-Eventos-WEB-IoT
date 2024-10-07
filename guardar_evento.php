<?php
// Conexión a la base de datos
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "eventosweb";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica la conexión
if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtiene los datos del POST
$evento_10am_11am = $_POST['evento_10am_11am'];
$evento_11am_12pm = $_POST['evento_11am_12pm'];
$evento_12pm_1pm = $_POST['evento_12pm_1pm'];
$evento_1pm_2pm = $_POST['evento_1pm_2pm'];
$evento_2pm_3pm = $_POST['evento_2pm_3pm'];
$evento_3pm_4pm = $_POST['evento_3pm_4pm'];
$evento_4pm_5pm = $_POST['evento_4pm_5pm'];
$evento_5pm_6pm = $_POST['evento_5pm_6pm'];
$evento_6pm_7pm = $_POST['evento_6pm_7pm'];
$evento_7pm_8pm = $_POST['evento_7pm_8pm'];
$evento_8pm_9pm = $_POST['evento_8pm_9pm'];
$idevento = $_POST['1'];

// Prepara y ejecuta la consulta SQL
$sql = "INSERT INTO horarioeve (idHorario, `10am-11am`, `11am-12pm`, `12pm-1pm`, `1pm-2pm`, `2pm-3pm`, `3pm-4pm`, `4pm-5pm`, `5pm-6pm`, `6pm-7pm`, `7pm-8pm`, `8pm-9pm`, idEvento) 
        VALUES ('', '$evento_10am_11am', '$evento_11am_12pm', '$evento_12pm_1pm', '$evento_1pm_2pm', '$evento_2pm_3pm', '$evento_3pm_4pm', 
        '$evento_4pm_5pm', '$evento_5pm_6pm', '$evento_6pm_7pm', '$evento_7pm_8pm', '$evento_8pm_9pm', '1')";

if ($conn->query($sql) === TRUE) {
    echo "Horario guardado exitosamente";
} else {
    echo "Error al guardar el horario: " . $conn->error;
}

$conn->close();
?>
