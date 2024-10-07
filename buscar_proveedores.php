<?php
// Conectar a la base de datos
$conexion = new mysqli("localhost", "root", "", "eventosweb");

// Verificar la conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Obtener los parámetros de búsqueda
$servicio = isset($_GET['servicio']) ? $_GET['servicio'] : '';
$ubicacion = isset($_GET['ubicacion']) ? $_GET['ubicacion'] : '';

// Preparar la consulta SQL
$sql = "SELECT * FROM proveedor WHERE servicio LIKE ? AND ubicacion LIKE ?";
$stmt = $conexion->prepare($sql);
$servicio = "%$servicio%";
$ubicacion = "%$ubicacion%";
$stmt->bind_param('ss', $servicio, $ubicacion);

// Ejecutar la consulta
$stmt->execute();
$resultado = $stmt->get_result();

$proveedores = array();
while($fila = $resultado->fetch_assoc()) {
    $proveedores[] = $fila;
}

// Devolver los resultados en formato JSON
echo json_encode($proveedores);

// Cerrar la conexión
$stmt->close();
$conexion->close();
?>
