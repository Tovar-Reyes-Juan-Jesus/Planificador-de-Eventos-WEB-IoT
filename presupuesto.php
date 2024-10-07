<?php
// Verifica si se han enviado datos del formulario
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Conecta con la base de datos
    $conexion = new mysqli("localhost", "root", "", "eventosweb");

    // Verifica la conexión
    if ($conexion->connect_error) {
        die("Error de conexión: " . $conexion->connect_error);
    }

    // Obtiene los datos del formulario
    $cantidad = $_POST["cantidad"];

    // Determina si es un gasto o un retiro
    if (isset($_POST["metodo"])) {
        $metodo = $_POST["metodo"];
        $descripcion = "Gasto";
    } else {
        $metodo = "Retiro";
        $descripcion = "Retiro";
        $cantidad = -$cantidad;  // Registra el retiro como un valor negativo
    }

    // Prepara la consulta SQL para insertar los datos en la tabla presupuesto
    $sql = "INSERT INTO presupuesto (idPresupuesto, idEvento, Cantidad, Descripcion_S, Fecha, metodoPago) VALUES ('','1','$cantidad', '$descripcion', NOW(), '$metodo')";

    // Ejecuta la consulta y verifica si se ha insertado correctamente
    if ($conexion->query($sql) === TRUE) {
        // Obtiene el nuevo total del presupuesto
        $total_sql = "SELECT SUM(Cantidad) AS total FROM presupuesto";
        $resultado = $conexion->query($total_sql);
        $fila = $resultado->fetch_assoc();
        $nuevo_total = $fila["total"];

        // Devuelve el nuevo total del presupuesto
        echo $nuevo_total;
    } else {
        echo "Error al registrar el gasto: " . $conexion->error;
    }

    // Cierra la conexión
    $conexion->close();
}
?>
