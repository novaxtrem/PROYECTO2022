<?php
require 'conexion.php';
header('Access-Control-Allow-Origin: *');
//
$rows = array();
//
$idComprador = $_POST['orden_compra_comprador_id'];
//
$query = "SELECT oc.*, dc.detalle_orden_compra_cantidad_productos_comprados, dc.detalle_orden_producto_id, dc.orden_compra_id , p.producto_imagen,  p.producto_nombre, p.producto_id  FROM `ordenes_de_compras` oc JOIN `productos` p JOIN `detalle_orden_compra` dc ON p.producto_id= dc.detalle_orden_producto_id AND oc.orden_compra_id = dc.orden_compra_id WHERE `orden_compra_comprador_id`='$idComprador';";




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