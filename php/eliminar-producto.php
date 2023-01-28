<?php
require 'conexion.php';
header('Access-Control-Allow-Origin: *');
//

$productoID = $_POST['producto_id'];
//
$q = "UPDATE `productos` SET `producto_estado`='ELIMINADO' WHERE `producto_id`=$productoID;";

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