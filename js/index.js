$(document).ready(function () {

    $('.producto-item').click(function () {
        localStorage.setItem('ID_PRODUCT_SELECCIONADO', $(this).find('.clean-product-item').attr('id'));

    });
});
