<?php
// Incluir la conexión a la base de datos
include "conexion2.php";

// Consulta SQL para obtener los proveedores
$sql = "SELECT * FROM proveedor";
$result = $conn->query($sql);

$proveedores = [];

if ($result->num_rows > 0) {
    // Output data of each row
    while($row = $result->fetch_assoc()) {
        $proveedores[] = $row;
    }
}

$conn->close();

// Devolver los proveedores en formato JSON
echo json_encode($proveedores);
?>
