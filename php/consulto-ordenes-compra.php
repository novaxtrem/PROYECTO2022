<?php
require 'conexion.php';
header('Access-Control-Allow-Origin: *');
//
$rows = array();

$comprador_email = $_POST['comprador_email'];
 
<<<<<<< Updated upstream
$query = "SELECT * FROM `ordenes_de_compras` INNER JOIN usuarios ON ordenes_de_compras.orden_compra_comprador_id = usuarios.usuario_email WHERE usuarios.usuario_email='$comprador_email' AND ordenes_de_compras.orden_compra_estado='NUEVO';";
=======
$query = "SELECT * FROM `ordenes_de_compras` INNER JOIN usuarios ON ordenes_de_compras.orden_compra_comprador_id = usuarios.usuario_email WHERE usuarios.usuario_email='$comprador_email';";
>>>>>>> Stashed changes



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

