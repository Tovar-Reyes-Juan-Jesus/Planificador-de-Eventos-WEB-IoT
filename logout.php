<?php
// Inicia la sesión si no está iniciada
session_start();

// Verifica si el usuario está autenticado antes de cerrar sesión
if (isset($_SESSION['username'])) {
    // Elimina todas las variables de sesión
    $_SESSION = array();

    // Invalida la cookie de sesión si está presente
    if (isset($_COOKIE[session_name()])) {
        setcookie(session_name(), '', time()-42000, '/');
    }

    // Finalmente, destruye la sesión
    session_destroy();

    // Redirige al usuario a la página de inicio (puedes cambiar la ruta según sea necesario)
    header("Location: PEW.html");
    exit;
} else {
    // Si el usuario no está autenticado, redirige a la página de inicio de todas formas
    header("Location: SSPEW.html");
    exit;
}
?>
