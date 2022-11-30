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
$productos_comprados = $_POST['productos_comprados'];
//
$decoded = json_decode($productos_comprados, true);

//
$q = "INSERT INTO `ordenes_de_compras`(`orden_compra_id`, `orden_compra_vendedor_id`, `orden_compra_comprador_id`, `orden_compra_numero_operacion_mercado_pago`, `orden_compra_direccion_envio`, `orden_compra_costo_envio`, `orden_compra_total`, `orden_compra_estado`) VALUES (DEFAULT,'nova77v@gmail.com','yhara@yahoo.com',120430,'aca cerca',200,4900,'NUEVA')";

$query = mysqli_query($conn, $q);
//




if ($query) {
    //echo json_encode("ok");
    $last_id = $conn->insert_id;

   
    foreach ($decoded as $value) {
        echo $value, "\n";
    }

    /*

    foreach ($productos_comprados as $purchased) {

        $q = "INSERT INTO `detalle_orden_compra`(`id`, `orden_compra_id`, `detalle_orden_producto_id`, `detalle_orden_compra_cantidad_productos_comprados`, `detalle_orden_compra_costo_unitario_producto`) VALUES (DEFAULT, $last_id, $purchased[0],$purchased[1],$purchased[2])";
        echo json_encode("Data Inserted Successfully" . " ID: " . $last_id . " " . var_dump($decoded));
    }
*/


} else {
    var_dump(mysqli_error($conn));
    echo $query;
}
$conn->close();
//