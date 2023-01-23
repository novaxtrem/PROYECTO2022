var usuarioConectado = JSON.parse(localStorage.getItem('USUARIO_CONECTADO'));
var listaProductosDelUsuario = [];
var productRow;

$(document).ready(function () {


    cargoArrayProductosPorUsuario();
    dibujoProductosPublicadosPorElUsuario();

    $(".titulo").prop("readonly", true);
    $(".stock").prop("readonly", true);
    $(".precio-unitario").prop("readonly", true);
    $(".btn-confirmar-edicion").attr("disabled", true);
    //

    $('.btn-confirmar-edicion').click(function () {

        actualizoProducto();
        location.reload();
    });



    $('.btn-editar-producto').click(function () {

        productRow = $(this).parent().parent().parent();


        if ($(this).text() == "editar") {

            $(".titulo").prop("readonly", false);
            $(".stock").prop("readonly", false);
            $(".precio-unitario").prop("readonly", false);
            $(".btn-confirmar-edicion").attr("disabled", false);


            //
            $(this).text("cancelar");
            $(productRow).find('.titulo').css({ "border-width": "1px" });
            $(this).css({ "background-color": "rgb(204, 0, 0)" });
        } else {
            $(this).text("editar");
            $(productRow).find('.titulo').css({ "border-width": "0px" });
            $(this).css({ "background-color": "rgb(253,157,13)" });
            //
            $(".titulo").prop("readonly", true);
            $(".stock").prop("readonly", true);
            $(".precio-unitario").prop("readonly", true);
            $(".btn-confirmar-edicion").attr("disabled", true);

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
                        <select name="selector-disponibilidad">
                            <option value="activo">disponible</option>
                            <option value="inactivo">no disponible</option>
                        </select>
                    </div>
                  
                     
                 
                    <div class="col-6 col-md-2 quantity">
                        <label class="form-label d-none d-md-block" for="quantity">Stock disponible</label>
                        <input type="number" class="form-control quantity-input stock" value="` + listaProductosDelUsuario[i].producto_stock + `">
                    </div>

                    <div class="col-6 col-md-2 price" >
                       <label class="form-label d-none d-md-block" for="price">Precio unidad</label>
                       <input type="number" class="form-control quantity-input precio-unitario" value="`+ listaProductosDelUsuario[i].producto_precio + `">
                    </div>

                    
                    
                </div>
            </div>`
        document.getElementById("contenedor-mis-productos").innerHTML = htmlContentToAppend;
    }
}



function actualizoProducto() {

    var idProducto = $(productRow).prop('id');
    var nombreProducto = $(productRow).find('.titulo').val();
    var precioProducto = $(productRow).find('.precio-unitario').val();
    var stockProducto = $(productRow).find('.stock').val();
    var disponibilidad = $(productRow).find('.selector-disponibilidad').filter(":selected").val();
    alert(disponibilidad);
    //
    return $.ajax({
        url: ACTUALIZO_PRODUCTO,
        type: "POST",
        data: { producto_id: idProducto, producto_nombre: nombreProducto, producto_precio: precioProducto, producto_stock: stockProducto },
        dataType: 'json',
        async: false,
        success: function (data) {

            console.log(data);
        },
        error: function (data) {
            console.log(data);
        },

    });


};

