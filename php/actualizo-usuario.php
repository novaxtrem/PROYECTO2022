<?php
require 'conexion.php';
header('Access-Control-Allow-Origin: *');
//


$usuario_contrasenia = $_POST['usuario_contrasenia'];
$usuario_nombre = $_POST['usuario_nombre'];
$usuario_direccion = $_POST['usuario_direccion'];
$usuario_telefono = $_POST['usuario_telefono'];
$usuario_QR_mercado_libre = $_POST['usuario_QR_mercado_libre'];
$usuario_email = $_POST['usuario_email'];
//
$query = "UPDATE `usuarios` SET `usuario_contrasenia`= md5('$usuario_contrasenia'), `usuario_nombre`='$usuario_nombre', `usuario_direccion`='$usuario_direccion',`usuario_telefono`='$usuario_telefono',`usuario_QR_mercado_libre`='$usuario_QR_mercado_libre' WHERE `usuario_email`='$usuario_email';";
//
$resultado = mysqli_query($conn, $query);
//
//
$query = "SELECT * FROM `usuarios` WHERE `usuario_email`='$usuario_email';";
$resultado = mysqli_query($conn, $query);
//
$usuario = "";

if (!$resultado) {
    var_dump(mysqli_error($conn));
    exit;
}
while ($row = mysqli_fetch_assoc($resultado)) {
    $usuario = $row;
}
echo json_encode($usuario);
$conn->close();
//
?>