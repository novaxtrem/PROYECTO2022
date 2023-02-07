<?php
require 'conexion.php';
header('Access-Control-Allow-Origin: *');
//
$orden_compra_vendedor_id = $_POST['orden_compra_vendedor_id'];
$orden_compra_comprador_id = $_POST['orden_compra_comprador_id'];
$orden_compra_numero_operacion = $_POST['orden_compra_numero_operacion'];
$orden_compra_direccion_envio = $_POST['orden_compra_direccion_envio'];
$orden_compra_total = $_POST['orden_compra_total'];
$productos_comprados = json_decode($_POST['productos_comprados'], true);
//
$q = "INSERT INTO `ordenes_de_compras`(`orden_compra_id`, `orden_compra_vendedor_id`, `orden_compra_comprador_id`, `orden_compra_numero_operacion`, `orden_compra_direccion_envio`, `orden_compra_total`, `orden_compra_estado`) VALUES (DEFAULT,'$orden_compra_vendedor_id','$orden_compra_comprador_id',120430,'$orden_compra_direccion_envio',$orden_compra_total,'NUEVA')";
$query = mysqli_query($conn, $q);
//
if ($query) {
    $last_id = $conn->insert_id;
    // CONSIGO EL ULTIMO ID INSERTADO
    foreach ($productos_comprados as $producto) {
        // POR CADA PRODUCTO DENTRO DEL ARRAY "PRODUCTO COMPRADO" CREO UN OBJETO PARA ITERAR
        $id_producto = (int) $producto['producto_id'];
        $costo_unitario_producto = (float) $producto['producto_precio'];
        $cantidad_producto_comprado = (int) $producto['producto_catidad_agregados_compra'];
        // CONSIGO LA INFO QUE ME INTERESA DE CADA PRODUCTO INDIVIDUALIZADO
        $q = "INSERT INTO `detalle_orden_compra`(`id`, `orden_compra_id`, `detalle_orden_producto_id`, `detalle_orden_compra_cantidad_productos_comprados`, `detalle_orden_compra_costo_unitario_producto`)     VALUES (DEFAULT, $last_id, $id_producto,$cantidad_producto_comprado, $costo_unitario_producto);";
        $query = mysqli_query($conn, $q);
        // INSERTO CADA UNO DE LOS PRODUCTOS EN EL DETALLE DE LA ORDEN DE COMPRA
        $query = "SELECT `producto_stock` FROM `productos` WHERE `producto_id`= $id_producto;";
        $result = mysqli_query($conn, $query);
        $stockActual = mysqli_fetch_assoc($result);
        //CONSULTO EL STOCK ACTUAL DEL PRODUCTO Y LE RESTO LA CANTIDAD COMPRADA
        $stock = 0;
        $stock = (int) $stockActual['producto_stock'];
        $nuevoStock = $stock - (int) $cantidad_producto_comprado;
        //COSOPUM MAGICO MATEMATICO
        $query = "UPDATE `productos` SET `producto_stock`= $nuevoStock WHERE `producto_id`=$id_producto;";
        $resultado = mysqli_query($conn, $query);
        //ACTUALIZO EL STOCK
    }
    echo json_encode("ok");
} else {
    var_dump(mysqli_error($conn));
    echo $query;
}
$conn->close();
//
