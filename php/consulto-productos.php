<?php
require 'coneccion.php';
header('Access-Control-Allow-Origin: *');
//
$rows = array();

//$username = $_GET['username'];
//$password = $_GET['password'];

$query = "SELECT * FROM productos";



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