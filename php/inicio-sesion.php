<?php
require 'conexion.php';
header('Access-Control-Allow-Origin: *');
//
$usuario_email = $_POST['usuario_email'];
$usuario_contrasenia = $_POST['usuario_pass'];
//
$query = "SELECT * FROM `usuarios` WHERE `usuario_email`= '$usuario_email' AND `usuario_contrasenia`= md5('$usuario_contrasenia') AND `usuario_estado`!='ELIMINADO';";
//
$resultado = mysqli_query($conn, $query);
//

if ($resultado) {
    $row = mysqli_fetch_assoc($resultado);
    echo json_encode($row);

} else {
    if (empty($resultado)) {
        echo json_encode("error de usuario, contraseña o su usuario ha sido eliminado");
    }
    exit;
}

$conn->close();
//
?>