<?php
// Conecta con la base de datos
$conexion = new mysqli("localhost", "root", "", "eventosweb");

// Verifica la conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Consulta para obtener el historial de gastos
$sql = "SELECT Descripcion_S AS descripcion, Cantidad AS cantidad, metodoPago AS metodo FROM presupuesto ORDER BY Fecha DESC";
$resultado = $conexion->query($sql);

$historial = array();

while($fila = $resultado->fetch_assoc()) {
    $historial[] = $fila;
}

// Devuelve el historial en formato JSON
echo json_encode($historial);

// Cierra la conexión
$conexion->close();
?>
