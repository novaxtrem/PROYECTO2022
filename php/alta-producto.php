<?php
require 'conexion.php';
header('Access-Control-Allow-Origin: *');
//

$vendedor = $_POST['producto_id_vendedor'];
$nombre = $_POST['producto_nombre'];
$categoria = $_POST['producto_categoria'];
$descripcion = $_POST['producto_descripcion'];
$precio = $_POST['producto_precio'];
$stock = $_POST['producto_stock'];
$locacion_logitud = $_POST['producto_locacion_logitud'];
$locacion_latitud = $_POST['producto_locacion_latitud'];
$locacion_alias = $_POST['producto_locacion_alias'];
$producto_imagen = $_POST['producto_imagen'];
//
$q = "INSERT INTO `productos`(`producto_id`, `producto_id_vendedor`, `producto_nombre`, `producto_categoria`, `producto_descripcion`, `producto_precio`, `producto_stock`, `producto_locacion_logitud`, `producto_locacion_latitud`, `producto_locacion_alias`, `producto_imagen`, `producto_estado`) VALUES (DEFAULT,'$vendedor','$nombre','$categoria','$descripcion','$precio','$stock','$locacion_logitud','$locacion_latitud','$locacion_alias','$producto_imagen', DEFAULT);";

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