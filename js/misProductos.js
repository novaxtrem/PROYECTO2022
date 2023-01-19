var usuarioConectado = JSON.parse(localStorage.getItem('USUARIO_CONECTADO'));
var listaProductosDelUsuario = [];

$(document).ready(function () {


    cargoArrayProductosPorUsuario();
    dibujoProductosPublicadosPorElUsuario();


    $('.btn-editar-producto').click(function () {

        var productRow = $(this).parent().parent().parent();
        var idProducto = $(productRow).prop('id');


        if ($(this).text() == "editar") {

            $(".titulo").prop("readonly", false);
            $(this).text("cancelar");
            $(productRow).find('.titulo').css({ "border-width": "1px" });
            $(this).css({ "background-color": "rgb(204, 0, 0)" });
        } else {
            $(this).text("editar");
            $(productRow).find('.titulo').css({ "border-width": "0px" });
            $(this).css({ "background-color": "rgb(253,157,13)" });
            $(".titulo").prop("readonly", true);
        }








    });




});


function cargoArrayProductosPorUsuario() {


    return $.ajax({
        url: CONSULTO_PRODUCTOS_PUBLICADOS_POR_USUARIO,
        type: "POST",
        data: { producto_id_vendedor: usuarioConectado.usuario_email },
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var producto = new Producto(data[i].producto_id, data[i].producto_id_vendedor, data[i].producto_nombre, data[i].producto_categoria, data[i].producto_descripcion, data[i].producto_precio, data[i].producto_stock, data[i].producto_locacion_logitud, data[i].producto_locacion_latitud, data[i].producto_locacion_alias, data[i].producto_imagen, data[i].producto_estado);
                listaProductosDelUsuario.push(producto);
            }
        },
        error: function (data) {
            console.log(data);
        },
    });
};



function dibujoProductosPublicadosPorElUsuario() {

    var htmlContentToAppend = "";

    for (var i = 0; i < listaProductosDelUsuario.length; i++) {

        htmlContentToAppend +=
            `<div class="product"  id="` + listaProductosDelUsuario[i].producto_id + `">
                <div class="row justify-content-center align-items-center">
                    <div class="col-md-3">
                        <div class="product-image">
                            <img class="img-fluid d-block mx-auto image" src="`+ listaProductosDelUsuario[i].producto_imagen + `">
                        </div>
                    </div>
                    <div class="col-md-5 product-info">
                        <input class="product-name titulo" type="text" style="color: rgb(253,157,13); border-width:0px; " value="` + listaProductosDelUsuario[i].producto_nombre + `">
                        
                        <button class="btn btn-primary btn-editar-producto"style="background-color: rgb(253,157,13);">editar</button>
                        <button class="btn btn-primary btn-confirmar-edicion"style="background-color: 	rgb(0, 153, 204);">cofirmar</button>
                    </div>
                    <div class="col-6 col-md-2 quantity">
                        <label class="form-label d-none d-md-block" for="quantity">Stock disponible</label>
                        <input type="number" class="form-control quantity-input" value="` + listaProductosDelUsuario[i].producto_stock + `">
                    </div>
                    <div class="col-6 col-md-2 price" >
                       <label class="form-label d-none d-md-block" for="price">Precio unidad</label> <input type="number" id="number" class="form-control quantity-input" value="`+ listaProductosDelUsuario[i].producto_precio + `">
                    </div>

                </div>
            </div>`
        document.getElementById("contenedor-mis-productos").innerHTML = htmlContentToAppend;
    }
}
