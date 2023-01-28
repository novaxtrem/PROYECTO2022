<?php
require 'conexion.php';
header('Access-Control-Allow-Origin: *');
//
$rows = array();


$comprador_email= $_POST['orden_compra_vendedor_id'];
//


$query = "SELECT * FROM `ordenes_de_compras` WHERE `orden_compra_vendedor_id`='$comprador_email';";



$resultado = mysqli_query($conn, $query);

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

