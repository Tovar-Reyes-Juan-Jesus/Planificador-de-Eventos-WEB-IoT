<?php
// Incluir la conexión a la base de datos
include "conexion2.php";

// Recibir los datos del formulario
$nombreProveedor = filter_var($_POST['nombreProveedor'], FILTER_SANITIZE_STRING);
$contactoProveedor = filter_var($_POST['contactoProveedor'], FILTER_SANITIZE_STRING);
$correoProveedor = filter_var($_POST['correoProveedor'], FILTER_SANITIZE_EMAIL);

// Procesar la imagen
$imagenProveedor = $_FILES['imagenProveedor']['name'];
$imagenTemporal = $_FILES['imagenProveedor']['tmp_name'];
$ruta = "Proveedores/" . $imagenProveedor;

// Verificar si la carpeta 'Proveedores' existe, si no, crearla
if (!is_dir("Proveedores")) {
    mkdir("Proveedores", 0777, true);
}

// Mover el archivo cargado
if (move_uploaded_file($imagenTemporal, $ruta)) {
    // Consulta SQL para insertar los datos en la base de datos
    $sql = "INSERT INTO proveedor (idProveedor, Nombre, Telefonico, CorreoElectronico, IMG) 
            VALUES (NULL, '$nombreProveedor', '$contactoProveedor', '$correoProveedor', '$ruta')";

    if ($conn->query($sql) === TRUE) {
        // Redirigir a la página principal
        header("Location: SSPEW.html");
        exit();
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
} else {
    echo "Hubo un error al cargar el archivo.";
}

// Cerrar la conexión
$conn->close();
?>

