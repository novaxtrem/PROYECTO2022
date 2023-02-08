var producto = new Producto;
var productoRelacionado = new Producto;
var listaProductosCarrito;
var listaProductosRelacionados = [];
//
var usuarioConectado = JSON.parse(localStorage.getItem('USUARIO_CONECTADO'));
listaProductosCarrito = JSON.parse(localStorage.getItem('CARRITO'));



$(document).ready(function () {

    cargoProducto();
    //
    if (producto.producto_id == null || producto.producto_id == undefined) {
        window.location.href = PAGINA_404;
    } else {

        if (listaProductosCarrito == null || listaProductosCarrito == 0) {
            listaProductosCarrito = [];
        }
        dibujoProducto();
        cargoYDibujoInformacionGeografica();
        consultoProductosRelacionados();
        dibujoProductosRelacionados();
        //
        $('.relacionado').click(function () {
            localStorage.setItem('ID_PRODUCT_SELECCIONADO', $(this).attr('id'));
        });
        //
        if (JSON.parse(localStorage.getItem('USUARIO_CONECTADO')) == null) {
            rutninaUsuarioNoLogiado();
        } else if ((localStorage.getItem('USUARIO_CONECTADO')) != null) {
            rutninaUsuarioLogiado();
        } else {
            window.location.href = PAGINA_404;
        }
    }
})


function cargoProducto() {
    return $.ajax({
        url: CONSULTO_PRODUCTO,
        type: "POST",
        data: { producto_id: localStorage.getItem('ID_PRODUCT_SELECCIONADO') },
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                producto = new Producto(data[i].producto_id, data[i].producto_id_vendedor, data[i].producto_nombre, data[i].producto_categoria, data[i].producto_descripcion, data[i].producto_precio, data[i].producto_stock, data[i].producto_locacion_logitud, data[i].producto_locacion_latitud, data[i].producto_locacion_alias, data[i].producto_imagen, data[i].producto_estado);
            }
        }
    });
}
//
function dibujoProducto() {

    if (producto.producto_imagen == "0") {
        producto.producto_imagen = SIN_IMAGEN;
    }

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
                        <div class="col-6 col-md-2 quantity" style="margin-bottom: 10px;">
                            <label class="form-label d-none d-md-block" for="quantity">Cantidad</label>
                            <input type="number" id="cantidad-unidades" class="form-control quantity-input" value="1">
                        </div>
                        <button class="btn btn-primary" id="btn-agregar-carrito" type="button" style="background: rgb(253,157,13);">
                            <i class="icon-basket"></i>Agregar al carrito
                        </button>
                        <!--/////////////////////////////////////////-->
                        <div class="alert alert-success alert-dismissable" style="width: 150px;">
                        <!--<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>-->
                            producto agregado
                        </div>
                        <!--/////////////////////////////////////////-->
                         <div class="locacion">
                            <p>Tienda: `+ producto.producto_locacion_alias + `</p>
                        </div>
                        <div id="map" style="height:400px;"></div>
                        <div id="locacion-alias-container"></div>
                    </div>
                </div>
            </div>
            <p id="produto-id" style="display:none">`+ producto.producto_id + `</p>
            <p id="vendedor-id" style="display:none">`+ producto.producto_id_vendedor + `</p>
            <p id="produto-precio" style="display:none">`+ producto.producto_precio + `</p>
            <p id="produto-categoria" style="display:none">`+ producto.producto_categoria + `</p>  
        `
    document.getElementById("contenedor-informacion-producto").innerHTML = htmlContentToAppend;

}
//
function rutninaUsuarioNoLogiado() {

    $('#btn-agregar-carrito').click(function () {
        alert("debe iniciar sesion");
        window.location.href = PAGINA_INGRESO;
    });
}
//
function rutninaUsuarioLogiado() {
    if (usuarioConectado.usuario_email == producto.producto_id_vendedor) {
        $('#btn-agregar-carrito').prop('disabled', true);
        $('#btn-agregar-carrito').text("autocompra no disponible");
    } else {
        $('#btn-agregar-carrito').click(function () {

            if ((localStorage.getItem('CARRITO') == null) || (listaProductosCarrito.length <= 0)) {
                //
                producto.producto_catidad_agregados_compra = $("#cantidad-unidades").val();
                listaProductosCarrito.push(producto);
                localStorage.setItem('CARRITO', JSON.stringify(listaProductosCarrito));
                //
                mostarAlerta();
            } else {
                if (listaProductosCarrito[0].producto_id_vendedor == producto.producto_id_vendedor) {
                    //
                    producto.producto_catidad_agregados_compra = $("#cantidad-unidades").val();
                    listaProductosCarrito.push(producto);
                    localStorage.setItem('CARRITO', JSON.stringify(listaProductosCarrito));
                    //
                    mostarAlerta();
                } else {
                    if (confirm("esta agregando un producto de otro vendedor, se descartará el carrito")) {
                        localStorage.removeItem('CARRITO');
                        //
                        producto.producto_catidad_agregados_compra = $("#cantidad-unidades").val();
                        listaProductosCarrito.push(producto);
                        localStorage.setItem('CARRITO', JSON.stringify(listaProductosCarrito));
                        //
                        mostarAlerta();
                    }
                }
            }
        })
    }
};
//
function mostarAlerta() {
    $('.alert').show();

    setTimeout(function () {
        $('.alert').fadeOut('slow');
    }, 1300
    );
}
//
function consultoProductosRelacionados() {
    return $.ajax({
        url: CONSULTO_PRODUCTOS_RELACIONADOS,
        type: "POST",
        data: { producto_id: producto.producto_id },
        dataType: 'json',
        async: false,
        success: function (data) {
            for (var i = 0; i < data.length; i++) {
                productoRelacionado = new Producto(data[i].producto_id, data[i].producto_id_vendedor, data[i].producto_nombre, data[i].producto_categoria, data[i].producto_descripcion, data[i].producto_precio, data[i].producto_stock, data[i].producto_locacion_logitud, data[i].producto_locacion_latitud, data[i].producto_locacion_alias, data[i].producto_imagen, data[i].producto_estado);
                listaProductosRelacionados.push(productoRelacionado);

            }
        }
    });
};
//
function dibujoProductosRelacionados() {
    var htmlContentToAppend = "";
    console.log(listaProductosRelacionados);
    var maximo = listaProductosRelacionados.length;

    if (maximo >= 3) {
        maximo = 3;
    } else {
        maximo = listaProductosRelacionados.length;
    }

    if (listaProductosRelacionados.length > 0) {
        for (var i = 0; i < maximo; i++) {

            if (listaProductosRelacionados[i].producto_imagen == "") {
                listaProductosRelacionados[i].producto_imagen = SIN_IMAGEN;
            }


            htmlContentToAppend += `
                <div class="col-sm-6 col-lg-4 relacionado" id="`+ listaProductosRelacionados[i].producto_id + `">
                    <div class="clean-related-item">
                        <a href="`+ PAGINA_PRODUCTO + `">
                            <div class="image center">
                                <img class="img-fluid  img-responsive center-block" src="`+ listaProductosRelacionados[i].producto_imagen + `" style="width: 150px; margin-left: 25%">
                            </div>
                            <div class="related-name" >
                                <h5>`+ listaProductosRelacionados[i].producto_nombre + `</h5>
                                <h6>$300</h6>
                            </div>
                        </a>
                    </div>
                </div>
            `
            document.getElementById("contenedor-productos-relacionados").innerHTML = htmlContentToAppend;
        }
    }
}
//
function cargoYDibujoInformacionGeografica() {
    if (producto.producto_locacion_alias !== "sin nombre") {
        var marker = L.marker();
        var map = L.map('map').setView([producto.producto_locacion_latitud, producto.producto_locacion_logitud], 9);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
        }).addTo(map);
        marker = L.marker([producto.producto_locacion_latitud, producto.producto_locacion_logitud]).addTo(map);
        ////
        var htmlContentToAppend = "";
        htmlContentToAppend += `<p>` + producto.producto_locacion_alias + `</p>`;
        document.getElementById("locacion-alias-container").innerHTML = htmlContentToAppend;
    }

}