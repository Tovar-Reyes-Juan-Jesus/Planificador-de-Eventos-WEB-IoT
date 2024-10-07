<?php

header('Content-Type: application/json');

require("conexion.php"); // Archivo de conexión a la base de datos

$conexion = regresarConexion();

// Verifica si la acción está definida
if(isset($_GET['accion'])) {
    $accion = $_GET['accion'];
    
    switch ($accion){
        case 'listar':
            // Consulta para obtener todos los eventos
            $query = "SELECT id, 
            titulo as title, 
            descripcion, 
            inicio as start, 
            fin as end, 
            colortexto as textColor, 
            colorfondo as backgroundColor,
            idUsuario 
            FROM eventoform";
            
            // Ejecuta la consulta
            $result = mysqli_query($conexion, $query);
            
            if($result) {
                // Convierte el resultado en un array asociativo
                $resultado = mysqli_fetch_all($result, MYSQLI_ASSOC);
                echo json_encode($resultado);
            } else {
                // Manejo de errores
                echo json_encode(array('error' => 'Error al listar los eventos.'));
            }
            break;

        case 'agregar':
            // Aquí debes recibir los datos del nuevo evento y realizar la inserción en la base de datos
            // Utiliza consultas preparadas para evitar inyecciones SQL
            $respuesta = mysqli_query($conexion,"insert into eventoform (id, titulo, descripcion, inicio, fin, colorfondo, colortexto, idUsuario) values
            ('','$_POST[titulo]','$_POST[descripcion]','$_POST[inicio]','$_POST[fin]','$_POST[colorfondo]','$_POST[colortexto]','1')");
            
            echo json_encode($respuesta);
                /*
                */ 


            break;

        case 'borrar':
            
            $respuesta = mysqli_query($conexion, "delete from eventoform where id = $_POST[id]");
            echo json_encode($respuesta);
            


            break;

        case 'modificar':

            $respuesta =mysqli_query($conexion,"update eventoform set titulo = '$_POST[titulo]',
            descripcion = '$_POST[descripcion]',
            inicio = '$_POST[inicio]',
            fin = '$_POST[fin]',
            colortexto = '$_POST[colortexto]',
            colorfondo = '$_POST[colorfondo]'
            where id = $_POST[id]" );

            echo json_encode($respuesta);

            /* 
            */ 

            break;

        default:
            echo json_encode(array('error' => 'Acción no válida.'));
            break;

            
    }
} else {
    echo json_encode(array('error' => 'No se proporcionó ninguna acción.'));
}
?>
