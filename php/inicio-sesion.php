<?php
require 'conexion.php';
header('Access-Control-Allow-Origin: *');
//
$usuario_email = $_POST['usuario_email'];
$usuario_contrasenia = $_POST['usuario_pass'];
//
$query = "SELECT * FROM `usuarios` WHERE `usuario_email`= '$usuario_email' AND `usuario_contrasenia`= '$usuario_contrasenia';";
//
$resultado = mysqli_query($conn, $query);
//

if (!$resultado) {
    var_dump(mysqli_error($conn));
    exit;
} else {
    $row = mysqli_fetch_assoc($resultado);

}
echo json_encode($row);
$conn->close();
//
?>