<?php
require 'conexion.php';
header('Access-Control-Allow-Origin: *');
//

$compraID = $_POST['orden_compra_id'];
$estadoCompra  = $_POST['orden_compra_estado'];

//
$q = "UPDATE `ordenes_de_compras` SET `orden_compra_estado`='$estadoCompra' ' WHERE `orden_compra_id`='$compraID';";

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