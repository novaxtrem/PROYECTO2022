

var listaProductos = [];
//
$(document).ready(function () {
    cargoArrayProductos();
    dibujoTablaProductos();

    /*
    $('.btn-comprar').click(function () {
        comprarProducto(this);
    });
    */

    $('.producto-item').click(function () {
        localStorage.setItem('ID_PRODUCT_SELECCIONADO', $(this).find('.clean-product-item').attr('id'));

    });


    $('.btn-detalle').click(function () {
        window.location = PAGINA_PRODUCTO;
        //console.log($(this).parent().parent().attr('id'));
    });

});

function cargoArrayProductos() {
    return $.ajax({
        url: CONSULTO_PRODUCTOS,
        type: "GET",
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var producto = new Producto(data[i].producto_id, data[i].producto_id_vendedor, data[i].producto_nombre, data[i].producto_categoria, data[i].producto_descripcion, data[i].producto_precio, data[i].producto_stock, data[i].producto_locacion_logitud, data[i].producto_locacion_latitud, data[i].producto_locacion_alias, data[i].producto_imagen, data[i].producto_estado);
                listaProductos.push(producto);
            }
        },
        error: function (data) {
            console.log(data);
        },
    });
};

function dibujoTablaProductos() {

    var htmlContentToAppend = "";

    for (var i = 0; i < listaProductos.length; i++) {

        if (listaProductos[i].producto_imagen == "0") {
            listaProductos[i].producto_imagen = SIN_IMAGEN;
        }

        htmlContentToAppend += `
            <div class="col-12 col-md-6 col-lg-4 producto-item">
                <div class="clean-product-item" id="` + listaProductos[i].producto_id + `" name="` + listaProductos[i].producto_categoria + `">
                    <div class="image">
                        <a href="`+ PAGINA_PRODUCTO + `">
                            <img class="img-fluid d-block mx-auto" src="`+ listaProductos[i].producto_imagen + `">
                        </a>
                    </div>
                    <div class="product-name" name="` + listaProductos[i].producto_nombre + `">
                        <a href="`+ PAGINA_PRODUCTO + `">` + listaProductos[i].producto_nombre + `</a>
                    </div>
                    <div class="about">
                        <h3 name="producto-precio">`+ "$" + listaProductos[i].producto_precio + `</h3>
                        <button type="button" class="btn btn-warning btn-detalle" > <a href="`+ PAGINA_PRODUCTO + `" style="color: white"> detalle</a></button>
                    </div>
                </div>
            </div>`
        document.getElementById("contenedor-productos-listado").innerHTML = htmlContentToAppend;
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