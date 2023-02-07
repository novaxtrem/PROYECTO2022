<?php
require 'conexion.php';
header('Access-Control-Allow-Origin: *');
//

$email = $_POST['usuario_email'];
//
$q = "UPDATE `usuarios` SET `usuario_estado`='ELIMINADO' WHERE `usuario_email`='$email';";

$query = mysqli_query($conn, $q);
//

if ($query) {
    echo json_encode("ok");
} else {
    var_dump(mysqli_error($conn));
    echo $query;
}
$conn->close();
//