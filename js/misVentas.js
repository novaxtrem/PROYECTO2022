var usuarioConectado = JSON.parse(localStorage.getItem('USUARIO_CONECTADO'));
var listaVentasDelUsuario = [];
var productRow;

$(document).ready(function () {

    cargoArrayVentas();
    dibujoVentasDelUsuario();

 
    $(".compra-estado").prop("readonly", true);
    $(".btn-confirmar-edicion").attr("disabled", true);
    $('.selector').prop('disabled', true);
    //
    $('.btn-confirmar-edicion').click(function () {
        actualizoVenta();
        location.reload();
    });
    //

    $('.btn-editar-producto').click(function () {

        productRow = $(this).parent().parent().parent();
        if ($(this).text() == "editar") {
            $(this).text("cancelar");
            $(productRow).find('.compra-estado').css({ "border-width": "1px" });
            $(this).css({ "background-color": "rgb(204, 0, 0)" });
            $(productRow).find('.btn-confirmar-edicion').css({ "display": "unset" });
            $(".btn-editar-producto").attr("disabled", true);
            $(this).attr("disabled", false);
            $(productRow).find($(".compra-estado")).prop("readonly", false);
            $(productRow).find($(".btn-confirmar-edicion")).attr("disabled", false);
            $(productRow).find($(".selector")).prop('disabled', false);
        } else {
            location.reload();
        }
    });
});



function cargoArrayVentas() {

    return $.ajax({
        url: CONSULTO_MIS_VENTAS,
        type: "POST",
        data: {orden_compra_vendedor_id: usuarioConectado.usuario_email },
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                var compra = new OrdenDeCompra(data[i].orden_compra_id, data[i].orden_compra_vendedor_id, data[i].orden_compra_comprador_id, data[i].orden_compra_numero_operacion_mercado_pago, data[i].orden_compra_direccion_envio, data[i].orden_compra_costo_envio,   data[i].orden_compra_total, data[i].orden_compra_estado, data[i].producto_imagen, data[i].producto_nombre, data[i].detalle_orden_compra_cantidad_productos_comprados  );
                listaVentasDelUsuario.push(compra);
            }
        },
        error: function (data) {
            console.log(data);
        },
    });
};

function dibujoVentasDelUsuario() {

    var htmlContentToAppend = "";

    for (var i = 0; i < listaVentasDelUsuario.length; i++) {

        htmlContentToAppend +=
           `<div class="compra product" id="` + listaVentasDelUsuario[i].orden_compra_id + `">
                <div class="row justify-content-center align-items-center">
                       
                       <div class="col-md-3">
                        <div class="product-image">
                            <img style="max-width: 30%;" class="img-fluid d-block mx-auto image" src="`+ listaVentasDelUsuario[i].producto_imagen + `">
                        </div></div>

                    <div class="col-md-2 compra-producto product-info">
                    <p class="compra-nombre product-name titulo" style="color: rgb(253,157,13);"> ` + listaVentasDelUsuario[i].producto_nombre + `</p>
                    <p class="compra-cantidad" style="color: rgb(253,157,13);">Cantidad: ` + listaVentasDelUsuario[i].detalle_orden_compra_cantidad_productos_comprados + `</p>

                    </div>


                    <div class="col-md-2 compra-operacion text-center" >
                        <p class="compra-operacion"> ` + listaVentasDelUsuario[i].orden_compra_numero_operacion_mercado_pago + ` </p>
                    </div>

                    <div class="col-md-2 compra-envio text-center" >
                       <p class="compra-envio"> `+ listaVentasDelUsuario[i].orden_compra_direccion_envio + `</p>
                    </div>

                    <div class="col-md-1 compra-total text-center" >
                       <p class="compra-total">$`+ listaVentasDelUsuario[i].orden_compra_total + `</p>
                    </div>

                     <div class="col-md-2 text-center" >
                     <input class="compra-estado text-center" type="text" " value="`+ listaVentasDelUsuario[i].orden_compra_estado + `">
                       <button class="btn btn-primary btn-editar-producto" style="background-color: rgb(253,157,13);">editar</button>
                        <button class="btn btn-primary btn-confirmar-edicion" style="background-color: rgb(0, 153, 204);display: none;">confirmar</button>
                  

                      
                    </div>

                </div>
            </div>`
        document.getElementById("contenedor-mis-ventas").innerHTML = htmlContentToAppend;
    }
}


function actualizoVenta() {

    var compraID = $(productRow).prop('id');
    var compraEstado = $(productRow).find('.compra-estado').val();

    
    //
    return $.ajax({
        url: ACTUALIZO_VENTA,
        type: "POST",
        data: {orden_compra_id: compraID, orden_compra_estado: compraEstado},
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
