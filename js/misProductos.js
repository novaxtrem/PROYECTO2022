$(document).ready(function () {

    dibujoCarrito();

    /*
    $('#btn-agregar-carrito').click(function () {
        console.log($('#produto-id').text());
        localStorage.setItem('ID_PRODUCT_AGREGADO_AL_CARRITO', (localStorage.getItem('ID_PRODUCT_AGREGADO_AL_CARRITO') + ";" + $('#produto-id').text()));
    });

*/

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





function dibujoCarrito() {

    for (var i = 0; i < 1; i++) {

        var htmlContentToAppend = "";
        htmlContentToAppend +=
            `<div class="product">
            <div class="row justify-content-center align-items-center">
                <div class="col-md-3">
                    <div class="product-image">
                        <img class="img-fluid d-block mx-auto image" src="assets/img/tech/image2.jpg">
                    </div>
                </div>
                <div class="col-md-5 product-info">
                    <a class="product-name" href="#" style="color: rgb(253,157,13);">Lorem Ipsum dolor</a>
                    <button class="btn btn-primary"style="background-color: rgb(253,157,13);">editar</button>
                </div>
                <div class="col-6 col-md-2 quantity"><label class="form-label d-none d-md-block" for="quantity">Stock disponible</label><input type="number" id="number" class="form-control quantity-input" value="1"></div>
                <div class="col-6 col-md-2 price" >
                   <label class="form-label d-none d-md-block" for="price">Precio unidad</label> <input type="number" id="number" class="form-control quantity-input" value="120">
                </div>
            </div>
        </div>`
        document.getElementById("contenedor-mis-productos").innerHTML = htmlContentToAppend;
    }
}
