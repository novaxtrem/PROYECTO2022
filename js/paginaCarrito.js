listaProductosCarrito = [];
//

usuarioConectado = JSON.parse(localStorage.getItem('USUARIO_CONECTADO'));
listaProductosCarrito = JSON.parse(localStorage.getItem('CARRITO'));

$(document).ready(function () {

    dibujoCarrito();


    $('.boton-eliminar').click(function () {
        eliminarProductoCarrito(this);
    });


});






function dibujoCarrito() {


    var htmlContentToAppend = "";



    if (listaProductosCarrito == null || listaProductosCarrito <= 0) {
        htmlContentToAppend =
            `<div>
                <h1 style="color:#f29c40;text-align:center;padding-top:15px">no hay productos en el carrito</h1>
            </div>`
        document.getElementById("contenedor-principal").innerHTML = htmlContentToAppend;

    } else {

        for (var i = 0; i < listaProductosCarrito.length; i++) {
            htmlContentToAppend +=
                `<div class="producto">
                    <div class="row justify-content-center align-items-center">
                        <div class="col-md-3">
                            <div class="product-image">
                                <img class="img-fluid d-block mx-auto image imagen-producto" src="`+ listaProductosCarrito[i].producto_imagen + `">
                            </div>
                        </div>
                        <div class="col-md-5 product-info">
                            <a class="nombre-producto" style="color: rgb(253,157,13);">` + listaProductosCarrito[i].producto_nombre + `</a>
                            <p class="id-producto" style="display:none">`+ listaProductosCarrito[i].producto_id + `</p>
                            <button class="btn btn-primary boton-eliminar"style="background-color: rgb(253,157,13);">eliminar</button>
                        </div>
                        <div class="col-6 col-md-2 cantidad-productos">
                            <label class="form-label d-none d-md-block" for="quantity">Cantidad</label>
                            <input type="number" class="form-control quantity-input catidad-productos-agregados" value="`+ listaProductosCarrito[i].producto_catidad_agregados_compra + `">
                        </div>
                        <div class="col-6 col-md-2 contenedor-precio-producto">
                            <label class="form-label d-none d-md-block" for="precio-unitario">precio</label>
                            <span class="precio-unitario">$ `+ listaProductosCarrito[i].producto_precio + `</span>
                        </div>
                    </div>
                </div>`
            document.getElementById("contenedor-productos-en-el-carrito").innerHTML = htmlContentToAppend;
        }
    }



}


function eliminarProductoCarrito(e) {

    var productRow = $(e).parent().parent().parent();
    productRow.remove();
    //
    idProducto = $(productRow).children().children('.product-info').children('.id-producto').text();

    alert(idProducto);

    for (var i = 0; i < listaProductosCarrito.length; i++) {
        if (listaProductosCarrito[i].producto_id == idProducto) {
            listaProductosCarrito.splice(i, 12);
            localStorage.setItem('CARRITO', "[" + JSON.stringify(listaProductosCarrito) + "]");
            location.reload();
        }
    }





}