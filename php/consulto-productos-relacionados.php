<?php
require 'conexion.php';
header('Access-Control-Allow-Origin: *');
//
$rows = array();


$idProducto = $_POST['producto_id'];
//
$query = "SELECT `producto_id_vendedor` FROM `productos` WHERE `producto_id`=$idProducto;";
$resultado = mysqli_query($conn, $query);
$idVendedor = $resultado->fetch_array()[0] ?? '';
//
$query = "SELECT * FROM `productos` WHERE `producto_id_vendedor`='$idVendedor' AND `producto_estado`='ACTIVO' AND `producto_id`!=$idProducto;";
$resultado = mysqli_query($conn, $query);
//

if (!$resultado) {
    var_dump(mysqli_error($conn));
    exit;
}
while ($row = mysqli_fetch_assoc($resultado)) {
    $rows[] = $row;
}
echo json_encode($rows);
$conn->close();
//
?>