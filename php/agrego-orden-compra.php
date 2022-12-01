<?php
require 'conexion.php';
header('Access-Control-Allow-Origin: *');
//
$orden_compra_id = $_POST['orden_compra_id'];
$orden_compra_vendedor_id = $_POST['orden_compra_vendedor_id'];
$orden_compra_comprador_id = $_POST['orden_compra_comprador_id'];
$orden_compra_numero_operacion_mercado_pago = $_POST['orden_compra_numero_operacion_mercado_pago'];
$orden_compra_direccion_envio = $_POST['orden_compra_direccion_envio'];
$orden_compra_costo_envio = $_POST['orden_compra_costo_envio'];
$orden_compra_total = $_POST['orden_compra_total'];
$orden_compra_estado = $_POST['orden_compra_estado'];
$productos_comprados = json_decode($_POST['productos_comprados'], true);
//
$q = "INSERT INTO `ordenes_de_compras`(`orden_compra_id`, `orden_compra_vendedor_id`, `orden_compra_comprador_id`, `orden_compra_numero_operacion_mercado_pago`, `orden_compra_direccion_envio`,    `orden_compra_costo_envio`, `orden_compra_total`, `orden_compra_estado`) VALUES (DEFAULT,'nova77v@gmail.com','yhara@yahoo.com',120430,'aca cerca',200,4900,'NUEVA')";
$query = mysqli_query($conn, $q);
//
if ($query) {
    $last_id = $conn->insert_id;
    //
    foreach ($productos_comprados as $producto) {
        //
        $id_producto = (int) $producto['detalle_orden_producto_id'];
        $costo_unitario_producto = (float) $producto['detalle_orden_compra_costo_unitario_producto'];
        $cantidad_producto_comprado = (int) $producto['detalle_orden_compra_cantidad_productos_comprados'];
        //echo json_encode($cantidad_producto_comprado);
        $q = "INSERT INTO `detalle_orden_compra`(`id`, `orden_compra_id`, `detalle_orden_producto_id`, `detalle_orden_compra_cantidad_productos_comprados`, `detalle_orden_compra_costo_unitario_producto`)     VALUES (DEFAULT, $last_id, $id_producto,$cantidad_producto_comprado, $costo_unitario_producto);";
        $query = mysqli_query($conn, $q);
        //

        $query = "SELECT `producto_stock` FROM `productos` WHERE `producto_id`= $id_producto;";
        $result = mysqli_query($conn, $query);
        $stockActual = mysqli_fetch_assoc($result);
        //
        $stock = 0;
        $stock = (int) $stockActual['producto_stock'];
        $nuevoStock = $stock - (int) $cantidad_producto_comprado;
        //
        $query = "UPDATE `productos` SET `producto_stock`= $nuevoStock WHERE `producto_id`=$id_producto;";
        $resultado = mysqli_query($conn, $query);
    }
    echo json_encode("Successfully");
} else {
    var_dump(mysqli_error($conn));
    echo $query;
}
$conn->close();
//