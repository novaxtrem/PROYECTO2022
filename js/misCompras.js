var usuarioConectado = JSON.parse(localStorage.getItem('USUARIO_CONECTADO'));
var listaComprasDelUsuario = [];

$(document).ready(function () {

    cargoArrayCompras();
    dibujoComprasDelUsuario();

});


function cargoArrayCompras() {

    return $.ajax({
        url: CONSULTO_COMPRAS_REALIZADAS,
        type: "POST",
        data: { orden_compra_comprador_id: usuarioConectado.usuario_email },
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
               
                /*
                var compra = new Compra(data[i].orden_compra_id, data[i].orden_compra_numero_operacion_mercado_pago, data[i].orden_compra_costo_envio, data[i].orden_compra_total, data[i].orden_compra_estado);
                listaComprasDelUsuario.push(compra);
                */
            }
        },
        error: function (data) {
            console.log(data);
        },
    });
};

function dibujoComprasDelUsuario() {

    var htmlContentToAppend = "";

    for (var i = 0; i < listaComprasDelUsuario.length; i++) {

        htmlContentToAppend +=
            `<div class="product"  id="` + listaComprasDelUsuario[i].orden_compra_id + `">
                <div class="row justify-content-center align-items-center">
                    <div class="col-md-3">
                      Test
                    </div>
                    <div class="col-md-5 product-info">
                    <p>` + listaComprasDelUsuario[i].orden_compra_id + `</p>
                        <input class="product-name titulo" type="text" style="color: rgb(253,157,13); border-width:0px; " value="` + listaComprasDelUsuario[i].orden_compra_id + `">
                        
                      
                    </div>
                    <div class="col-6 col-md-2 quantity">
                        <label class="form-label d-none d-md-block" for="quantity">Stock disponible</label>
                        <input type="number" class="form-control quantity-input stock" value="` + listaComprasDelUsuario[i].orden_compra_numero_operacion_mercado_pago + `">
                    </div>
                    <div class="col-6 col-md-2 price" >
                       <label class="form-label d-none d-md-block" for="price">Precio unidad</label>
                       <input type="number" class="form-control quantity-input precio-unitario" value="`+ listaComprasDelUsuario[i].orden_compra_total + `">
                    </div>

                </div>
            </div>`
        document.getElementById("contenedor-mis-compras").innerHTML = htmlContentToAppend;
    }
}