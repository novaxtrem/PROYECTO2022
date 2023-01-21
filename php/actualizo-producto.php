<?php
require 'conexion.php';
header('Access-Control-Allow-Origin: *');
//

$productoID = $_POST['producto_id'];
$productoNombre = $_POST['producto_nombre'];
$prdocutoPrecio = $_POST['producto_precio'];
$productoStock = $_POST['producto_stock'];

//
$q = "UPDATE `productos` SET `producto_nombre`='$productoNombre',`producto_precio`='$prdocutoPrecio',`producto_stock`='$productoStock' WHERE `producto_id`='$productoID';";

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