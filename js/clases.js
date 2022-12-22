
class Producto {
    constructor(producto_id, producto_id_vendedor, producto_nombre, producto_categoria, producto_descripcion, producto_precio, producto_stock, producto_locacion_logitud, producto_locacion_latitud, producto_locacion_alias, producto_imagen, producto_estado) {
        this.producto_id = producto_id;
        this.producto_id_vendedor = producto_id_vendedor;
        this.producto_nombre = producto_nombre;
        this.producto_categoria = producto_categoria;
        this.producto_descripcion = producto_descripcion;
        this.producto_precio = producto_precio;
        this.producto_stock = producto_stock;
        this.producto_locacion_logitud = producto_locacion_logitud;
        this.producto_locacion_latitud = producto_locacion_latitud;
        this.producto_locacion_alias = producto_locacion_alias;
        this.producto_imagen = producto_imagen;
        this.producto_estado = producto_estado;
    }
}
//////////////////////////////
class Usuario {
    constructor(usuario_email, usuario_contrasenia, usuario_nombre, usuario_direccion, usuario_telefono, usuario_QR_mercado_libre, usuario_estado) {
        this.usuario_email = usuario_email;
        this.usuario_contrasenia = usuario_contrasenia;
        this.usuario_nombre = usuario_nombre;
        this.usuario_direccion = usuario_direccion;
        this.usuario_telefono = usuario_telefono;
        this.usuario_QR_mercado_libre = usuario_QR_mercado_libre;
        this.usuario_estado = usuario_estado;
    }
}
//////////////////////////////

class OrdenDeCompra {

    constructor(orden_compra_id, orden_compra_vendedor_id, orden_compra_comprador_id, orden_compra_numero_operacion_mercado_pago, orden_compra_direccion_envio, orden_compra_costo_envio, orden_compra_total, orden_compra_estado) {
        this.orden_compra_id = orden_compra_id;
        this.orden_compra_vendedor_id = orden_compra_vendedor_id;
        this.orden_compra_comprador_id = orden_compra_comprador_id;
        this.orden_compra_numero_operacion_mercado_pago = orden_compra_numero_operacion_mercado_pago;
        this.orden_compra_direccion_envio = orden_compra_direccion_envio;
        this.orden_compra_costo_envio = orden_compra_costo_envio;
        this.orden_compra_total = orden_compra_total;
        this.orden_compra_estado = orden_compra_estado;
    }


}