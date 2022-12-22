<?php include ("conexion.php");
header('Access-Control-Allow-Origin: *');

$buscar = $_POST['buscar'];
if ($buscar) {
  $qr = "SELECT * FROM productos WHERE producto_nombre LIKE '%$buscar%'";
}
else {
  $qr = "SELECT * FROM productos WHERE 1=1";
}

if (isset($_POST['filtros']) )
{
  $filtros = $_POST['filtros'];
  if (isset($qr) )
    $qr .= " AND producto_categoria in ($filtros)";
  else
    $qr = "SELECT * FROM productos WHERE producto_categoria in ($filtros)";
}



$buscador=mysqli_query($conn,$qr); 
 while($resultado = mysqli_fetch_assoc($buscador)){ 
?>


<div class="col-12 col-md-6 col-lg-4 producto-item">
                <div class="clean-product-item" id="<?php echo $resultado["producto_id"]; ?>" name="<?php echo $resultado["producto_categoria"]; ?>">
                    <div class="image">
                        <a href="paginaProducto.html?producto_id=<?php echo $resultado["producto_id"]; ?>">
                            <img class="img-fluid d-block mx-auto" src="<?php echo $resultado["producto_imagen"]; ?>">
                        </a>
                    </div>
                    <div class="product-name" name="<?php echo $resultado["producto_nombre"]; ?>">
                        <a href="paginaProducto.html?producto_id=<?php echo $resultado["producto_id"]; ?>"><?php echo $resultado["producto_nombre"]; ?></a>
                    </div>
                    <div class="about">
                        <h3 name="producto-precio">$<?php echo $resultado["producto_precio"]; ?></h3>
                        <button type="button" class="btn btn-warning btn-detalle" > <a href="paginaProducto.html?producto_id=<?php echo $resultado["producto_id"]; ?>" style="color: white"> detalle</a></button>
                    </div>
                </div>
            </div>


<?php } ?>
