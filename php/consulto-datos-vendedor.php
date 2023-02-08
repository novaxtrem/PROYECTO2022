<?php
require 'conexion.php';
header('Access-Control-Allow-Origin: *');
//
$usuario_email = $_POST['usuario_email'];
//
$query = "SELECT `usuario_nombre`,`usuario_telefono`,`usuario_cuenta_bancaria`,`usuario_QR_mercado_libre`,`usuario_email` FROM `usuarios` WHERE `usuario_email`='$usuario_email';";
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