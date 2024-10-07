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

    // Verifica si se ha enviado el formulario
    if ($_SERVER["REQUEST_METHOD"] == "POST") {
        // Recibe los datos del formulario
        $listadeseo = $_POST['listadeseo'];

        // Consulta SQL para insertar los datos en la base de datos
        $sql = "INSERT INTO lista_deseos (idListadeDeseos , Elemento_deseado) VALUES ('' , '$listadeseo')";

        if ($conn->query($sql) === TRUE) {
            echo "Lista subida exitosamente";
        } else {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

    // Cierra la conexión
    $conn->close();
    ?>