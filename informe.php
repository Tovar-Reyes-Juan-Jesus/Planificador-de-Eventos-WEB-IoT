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

// Consulta SQL para obtener los datos de la base de datos
$sql = "SELECT * FROM horarioeve";
$resultado = $conn->query($sql);

// Generar el contenido del informe en HTML
$html = '<h1>Informe</h1>';
$html .= '<table>';
$html .= '<tr><th>ID</th><th>Nombre</th><th>Descripción</th></tr>';

if ($resultado->num_rows > 0) {
    while($fila = $resultado->fetch_assoc()) {
        $html .= '<tr>';
        $html .= '<td>' . $fila['id'] . '</td>';
        $html .= '<td>' . $fila['nombre'] . '</td>';
        $html .= '<td>' . $fila['descripcion'] . '</td>';
        $html .= '</tr>';
    }
} else {
    $html .= '<tr><td colspan="3">No hay datos disponibles</td></tr>';
}

$html .= '</table>';

// Cerrar la conexión a la base de datos
$conn->close();

// Convertir el HTML a PDF
require_once 'dompdf/autoload.inc.php'; // Ruta de la biblioteca Dompdf
use Dompdf\Dompdf;

$dompdf = new Dompdf();
$dompdf->loadHtml($html);
$dompdf->setPaper('A4', 'portrait'); // Tamaño y orientación del papel
$dompdf->render();

// Enviar el PDF al navegador
$dompdf->stream("informe.pdf");
?>
