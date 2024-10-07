<?php

function regresarConexion(){
    $servername = "localhost"; // servidor MySQL
    $username = "root"; // usuario de MySQL
    $password = ""; // contraseña de MySQL
    $dbname = "eventosweb"; // nombre de tu base de datos

    // Utiliza la variable $dbname en lugar de $base
    $conexion = mysqli_connect($servername, $username, $password, $dbname) or die("problemas con la conexion");
    mysqli_set_charset($conexion, 'utf8');
    return $conexion;
}

?>
