var usuarioConectado = "";

$(document).ready(function () {
    usuarioConectado = JSON.parse(localStorage.getItem('USUARIO_CONECTADO'));
    //
    cargoNavbar();
    cargoFooter();

    $('#cerrar-sesion').click(function () {
        localStorage.clear();
        window.location.href = 'index.html';
    });

});


function cargoNavbar() {

    var htmlContentToAppend = "";

    if (usuarioConectado == null || usuarioConectado == "") {

        htmlContentToAppend += `
        <nav class="navbar navbar-light navbar-expand-md py-3">
            <div class="container">
                <a href="index.html">
                    <img src="/PROYECTO2022/imagenes/logos-marcas/beerapp-logo-marca.svg" alt="logo beerapp store" style="height: 45px";>
                </a>
                <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-3">
                    <span class="visually-hidden">Toggle navigation</span>
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navcol-3">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item"></li>
                        <li class="nav-item">
                            <a class="nav-link" href="index.html">Tienda</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="eventos.html">Eventos</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">Sobre Nosotros</a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="terminosUso.html">Terminos de uso</a>
                                <a class="dropdown-item" href="faq.html">FAQ</a>
                                <a class="dropdown-item" href="contacto.html">Contacto</a>
                            </div>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="ingreso.html">iniciar sesion</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>`
        document.getElementById("contenedor-navbar").innerHTML = htmlContentToAppend;

    } else {
        //console.log(usuarioConectado.usuario_email);
        htmlContentToAppend += `
        <nav class="navbar navbar-light navbar-expand-md py-3">
            <div class="container">
                <a href="index.html">
                    <img src="/PROYECTO2022/imagenes/logos-marcas/beerapp-logo-marca.svg" alt="logo beerapp store" style="height: 45px";>
                </a>
                <button data-bs-toggle="collapse" class="navbar-toggler" data-bs-target="#navcol-3">
                    <span class="visually-hidden">Toggle navigation</span>
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navcol-3">
                    <ul class="navbar-nav mx-auto">
                        <li class="nav-item"></li>
                        <li class="nav-item">
                            <a class="nav-link" href="index.html">Tienda</a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="eventos.html">Eventos</a>
                        </li>
                        <li class="nav-item dropdown">
                            <a class="dropdown-toggle nav-link" aria-expanded="false" data-bs-toggle="dropdown" href="#">Sobre Nosotros</a>
                            <div class="dropdown-menu">
                                <a class="dropdown-item" href="terminosUso.html">Terminos de uso</a>
                                <a class="dropdown-item" href="faq.html">FAQ</a>
                                <a class="dropdown-item" href="contacto.html">Contacto</a>
                            </div>
                        </li>
                    </ul>
                    <div class="dropdown" style="margin-right: 49px;">
                    <a class="dropdown-toggle" aria-expanded="false" data-bs-toggle="dropdown" href="#" style="color: rgb(33,33,33);"> Mi Taberna</a>
                    <div class="dropdown-menu">
                        <a class="dropdown-item" href="carrito.html">Carrito</a>
                        <a class="dropdown-item" href="editarUsuario.html">Mis datos</a>
                        <a class="dropdown-item" href="misProductos.html">Mis productos</a>
                        <a class="dropdown-item" href="misCompras.html">Compras</a>
                        <a class="dropdown-item" href="misVentas.html">Ventas</a>
                        <a class="dropdown-item" id="cerrar-sesion" href="index.html">Cerrar sesion</a>
                    </div>
                </div>
            </div>
        </nav>`
        document.getElementById("contenedor-navbar").innerHTML = htmlContentToAppend;
    }

}

function cargoFooter() {

    var htmlContentToAppend = "";

    htmlContentToAppend += `
        <footer class="page-footer dark">
            <div class="container">
                <div class="row">
                    <div class="col-sm-3"></div>
                    <div class="col-sm-3">
                        <h5>Sobre Nosotros</h5>
                        <ul>
                            <li>
                                <a href="#">BeerApp</a>
                            </li>
                            <li>
                                <a href="#">Contactanos</a>
                            </li>
                            <li>
                                <a href="#">Instagram</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-sm-3">
                        <h5>Legal</h5>
                        <ul>
                            <li>
                                <a href="#">FAQ</a>
                            </li>
                            <li>
                                <a href="#">Términos de uso</a>
                            </li>
                        </ul>
                    </div>
                    <div class="col-sm-3"></div>
                </div>
            </div>
            <div class="footer-copyright">
                <p>Desarrollado por GESTEMA&nbsp;<span style="font-weight: normal !important; font-style: normal !important;">©2022&nbsp;</span>
                    <br>
                </p>
            </div>
        </footer>`
    document.getElementById("footer-contenedor").innerHTML = htmlContentToAppend;

}