<?php
require 'conexion.php';
header('Access-Control-Allow-Origin: *');
//
$usuario_email = $_POST['usuario_email'];
$usuario_contrasenia = $_POST['usuario_contrasenia'];
$usuario_nombre = $_POST['usuario_nombre'];
$usuario_direccion = $_POST['usuario_direccion'];
$usuario_telefono = $_POST['usuario_telefono'];
$usuario_QR_mercado_libre = $_POST['usuario_QR_mercado_libre'];
//
$q = "INSERT INTO `usuarios`(`usuario_email`, `usuario_contrasenia`, `usuario_nombre`, `usuario_direccion`, `usuario_telefono`, `usuario_QR_mercado_libre`, `usuario_estado`) 
VALUES ('$usuario_email',md5('$usuario_contrasenia'),'$usuario_nombre','$usuario_direccion','$usuario_telefono','$usuario_QR_mercado_libre',DEFAULT);";
$query = mysqli_query($conn, $q);
//

if ($query) {
    echo json_encode("ok");
    //echo json_encode("Data Inserted Successfully");
} else {
    var_dump(mysqli_error($conn));
    echo $query;
}
$conn->close();
//
?>