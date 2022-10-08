<?php
require 'coneccion.php';
header('Access-Control-Allow-Origin: *');
//

$id = $_POST['producto_id'];
$nombre = $_POST['producto_nombre'];
$descripcion = $_POST['producto_descripcion'];
$stock = $_POST['producto_stock'];
$precio = $_POST['producto_precio'];
$categoria_id = $_POST['producto_categoria_id'];
//
$q = "INSERT INTO `productos`(`producto_id`, `producto_nombre`, `producto_descripcion`, `producto_stock`, `producto_precio`, `producto_categoria_id`) VALUES ('$id','$nombre','$descripcion','$stock','$precio','$categoria_id');";
$query = mysqli_query($conn, $q);
//
if ($query) {
    echo json_encode("ok");
//echo json_encode("Data Inserted Successfully");
}
else {
    var_dump(mysqli_error($conn));
    echo $query;
}
$conn->close();
//