<?php
require 'conexion.php';
header('Access-Control-Allow-Origin: *');
//
$rows = array();



$query = "SELECT * FROM productos WHERE `producto_estado`='ACTIVO';";



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