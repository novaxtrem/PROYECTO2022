<?php
require 'conexion.php';
header('Access-Control-Allow-Origin: *');
//
$rows = array();
//
$idVendedor = $_POST['producto_id_vendedor'];
//
$query = "SELECT * FROM `productos` WHERE `producto_id_vendedor`='$idVendedor' AND `producto_estado`!='ELIMINADO';";

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