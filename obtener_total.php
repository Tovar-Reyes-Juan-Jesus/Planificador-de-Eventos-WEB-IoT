<?php
// Conecta con la base de datos
$conexion = new mysqli("localhost", "root", "", "eventosweb");

// Verifica la conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Prepara la consulta SQL para obtener el total del presupuesto
$total_sql = "SELECT SUM(Cantidad) AS total FROM presupuesto";

// Ejecuta la consulta y verifica si se ha obtenido correctamente
$resultado = $conexion->query($total_sql);
if ($resultado->num_rows > 0) {
    $fila = $resultado->fetch_assoc();
    echo $fila["total"];
} else {
    echo "0";
}

// Cierra la conexión
$conexion->close();
?>
