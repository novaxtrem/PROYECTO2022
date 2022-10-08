var listaProductos = [];
//
$(document).ready(function () {
    $("#btn-agregar-producto").click(function () {
        producto_id = $("#id-producto").val();
        producto_nombre = $("#nombre-producto").val();
        producto_descripcion = $("#descripcion-producto").val();
        producto_stock = $("#stock-producto").val();
        producto_precio = $("#precio-producto").val();
        producto_categoria_id = 1;//$("#fname").val();
        //
        agregoProductos(producto_id, producto_nombre, producto_descripcion, producto_stock, producto_precio, producto_categoria_id);
    });

});

function agregoProductos(producto_id, producto_nombre, producto_descripcion, producto_stock, producto_precio, producto_categoria_id) {
    $.ajax({
        url: AGREGO_PRODUCTOS,
        type: "post",
        data: { producto_id: producto_id, producto_nombre: producto_nombre, producto_descripcion: producto_descripcion, producto_stock: producto_stock, producto_precio: producto_precio, producto_categoria_id: producto_categoria_id },
        success: function (data) {
            console.log(data);
        }
    });
};
