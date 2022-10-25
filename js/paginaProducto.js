var producto = new Producto;



$(document).ready(function () {

    cargoProducto();

    dibujoInformacionProducto();

    $('#btn-agregar-carrito').click(function () {
        alert("hola");
    });


});

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
            }
        }
    });
};






function dibujoInformacionProducto() {
    var htmlContentToAppend = "";


    htmlContentToAppend +=
        `<div class="row">
            <div class="col-md-6">
                <div style="margin: 53px;">
                    <img src="`+ producto.producto_imagen + `" style="width: 300px;">
                </div>
            </div>
            <div class="col-md-6">
                <div class="info">
                    <h3>`+ producto.producto_nombre + `</h3>
                    <div class="summary">
                        <p>`+ producto.producto_descripcion + `</p>
                    </div>
                    <div class="price">
                        <h3>`+ producto.producto_precio + ` $U</h3>
                    </div>
                    <button class="btn btn-primary" id="btn-agregar-carrito" type="button" style="background: rgb(253,157,13);">
                        <i class="icon-basket"></i>Agregar al carrito
                    </button>
                </div>
                <p>
                    <a class="btn-primary" data-bs-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample" style="text-decoration: none;"> tambien disponible en: ver lugares
                </a>
                </p>
                <div class="collapse" id="collapseExample">
                    <div class="card card-body"> Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                </div>
              </div>
            </div>
        </div>`
    document.getElementById("contenedor-informacion-producto").innerHTML = htmlContentToAppend;

}
