listaProductosCarrito = [];

$(document).ready(function () {

    //  cargoProducto();
    dibujoCarrito();

    $('#btn-pagar').click(function () {
        pagoProductos();
    });

    /*
    $('#btn-agregar-carrito').click(function () {
        console.log($('#produto-id').text());
        localStorage.setItem('ID_PRODUCT_AGREGADO_AL_CARRITO', (localStorage.getItem('ID_PRODUCT_AGREGADO_AL_CARRITO') + ";" + $('#produto-id').text()));
    });

*/

});

/*
function cargoProducto() {

    return $.ajax({
        url: CONSULTO_PRODUCTO,
        type: "POST",
        data: { producto_id: localStorage.getItem('ID_PRODUCT_SELECCIONADO') },
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                producto = new Producto(data[i].producto_id, data[i].producto_nombre, data[i].producto_categoria, data[i].producto_descripcion, data[i].producto_precio, data[i].producto_stock, data[i].producto_locacion_logitud, data[i].producto_locacion_latitud, data[i].producto_locacion_alias, data[i].producto_imagen);
                
                console.log(producto);
            }
        }
    });
};
*/

function pagoProductos() {


}

$ ( '.producto' ) . each ( function ( )  {  //POR CADA UNA DE LAS "FILAS" (ELEMENTOS PRODUCTOS) QUE ENCUENTRO DENTRO DEL HTML
    subtotal  +=  parseFloat ( $ ( this ) . children ( '.product-line-price' ) . text ( ) ) ;  //ACCEDO AL IMPORTE Y LE HAGO UN PARSE PARA TRABAJAR MATEMATICAMENTE
    //
    nombreArticulo  =  $ ( este ) . children ( '.product-name-and-unit-cost' ) . niños ( ".product-name" ) . texto ( ) ;
    costoUnitario  =  $ ( esto ) . children ( '.product-name-and-unit-cost' ) . children ( ".product-unit-cost" ) . texto ( ) ;
    cantidadComprados  =  $ ( esto ) . children ( '.pass-quantity' ) . niños ( ".itemsComprados" ) . valor ( ) ;
    productosCompradosSender  +=  nombreArticulo  +  " "  +  costoUnitario  +  " unidades compradas: "  +  cantidadComprados  +  " " ;
    //
    existenElementos  =  true ;  // SI CAPTURO ALGUN ELEMENTO DE LA CALSE "ITEM", ES PORQUE EXISTEN ARTÍCULOS (EVIDENTEMENTE) ENTONCES "EXISTEN ELEMENTOS" = TRUE
} ) ;








function dibujoCarrito() {


    listaProductosCarrito = JSON.parse(localStorage.getItem('CARRITO'));
    var htmlContentToAppend = "";

    for (var i = 0; i < listaProductosCarrito.length; i++) {
        console.log(listaProductosCarrito[i]);

        htmlContentToAppend +=
            `<div class="producto">
                <div class="row justify-content-center align-items-center">
                    <div class="col-md-3">
                        <div class="product-image">
                            <img class="img-fluid d-block mx-auto image imagen-producto" src="/PROYECTO2022/imagenes/productos/sin-imagen.png">
                        </div>
                    </div>
                    <div class="col-md-5 product-info">
                        <a class="nombre-producto" href="#" style="color: rgb(253,157,13);">`+ listaProductosCarrito[i].producto_nombre + `</a>
                        <button class="btn btn-primary"style="background-color: rgb(253,157,13);">eliminar</button>
                    </div>
                    <div class="col-6 col-md-2 quantity">
                        <label class="form-label d-none d-md-block" for="quantity">Cantidad</label>
                        <input type="number" class="form-control quantity-input catidad-productos-comprados" value="`+ listaProductosCarrito[i].producto_catidad_agregados_compra + `">
                    </div>
                    <div class="col-6 col-md-2 price">
                        <label class="form-label d-none d-md-block" for="precio-unitario">precio</label>
                        <span class="precio-unitario">$`+ listaProductosCarrito[i].producto_precio + `</span>
                    </div>
                </div>
            </div>`
        document.getElementById("contenedor-productos-en-el-carrito").innerHTML = htmlContentToAppend;
    }
}



