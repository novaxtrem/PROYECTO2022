var listaProductos = [];
//
$(document).ready(function () {
    cargoArrayProductos();
    dibujoTablaProductos();
    //////////////////////////////

    /*
    $('.btn-comprar').click(function () {
        comprarProducto(this);
    });
    */
});

function cargoArrayProductos() {
    return $.ajax({
        url: CONSULTO_PRODUCTOS,
        type: "GET",
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var producto = new Producto(data[i].producto_id, data[i].producto_nombre, data[i].producto_categoria, data[i].producto_descripcion, data[i].producto_precio, data[i].producto_stock, data[i].producto_locacion_logitud, data[i].producto_locacion_latitud, data[i].producto_locacion_alias, data[i].producto_imagen);
                listaProductos.push(producto);
            }
        }
    });
};

function dibujoTablaProductos() {
    var htmlContentToAppend = "";
    for (var i = 0; i < listaProductos.length; i++) {

        htmlContentToAppend += `
            <div class="col-12 col-md-6 col-lg-4 producto-item">
                <div class="clean-product-item" id="` + listaProductos[i].producto_id + `" name="` + listaProductos[i].producto_categoria + `">
                    <div class="image">
                        <a href="paginaProducto.html">
                            <img class="img-fluid d-block mx-auto" src="`+ listaProductos[i].producto_imagen + `">
                        </a>
                    </div>
                    <div class="product-name" name="` + listaProductos[i].producto_nombre + `">
                        <a href="paginaProducto.html">` + listaProductos[i].producto_nombre + `</a>
                    </div>
                    <div class="about">
                        <div class="price">
                            <h3 name="producto-precio">`+ "$" + listaProductos[i].producto_precio + `</h3>
                        </div>
                        <div class="input-group spinner">
                            <input type="text" class="form-control" value="1">
                            <div class="input-group-btn-vertical">
                                <button class="btn btn-default subir-cantidad" type="button">
                                    <i class="fa fa-caret-up"></i>
                                </button>
                                <button class="btn btn-default bajar-cantidad" type="button">
                                    <i class="fa fa-caret-down"></i>
                                </button>
                            </div>
                        </div>
                        <button type="button" class="btn btn-warning btn-comprar">comprar</button>
                    </div>
                </div>
            </div>`
        document.getElementById("contenedor-productos").innerHTML = htmlContentToAppend;
    }
}


/*
function comprarProducto(btnComprar) {
    var productoRow = $(btnComprar).parent().parent();
    var id_producto = parseInt(productoRow.children('td[name="id-producto"]').text());
    var nombreProducto = productoRow.children('td[name="nombre-producto"]').text();
    //////////////////////////////
    alert("nombre del producto " + nombreProducto + " id del producto " + id_producto);

}
*/