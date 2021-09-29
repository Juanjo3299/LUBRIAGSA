<!DOCTYPE html>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<html>
    <!--Importacion del header-->
    <div id="capa" class=""></div>

        <script>const language = {
            "lengthMenu": "Mostrar _MENU_ registros por página.",
            "zeroRecords": "No se han encontrado registros que coincidan con la busqueda.",
            "info": "Mostrando _PAGE_ de _PAGES_ páginas.",
            "infoEmpty": "No se han encontrado registros que coincidan con la busqueda.",
            "search": "Buscar : ",
            "paginate": {
            "previous": "Anterior",
            "next": "Siguiente"
        }
        };</script>

    <header class="main-header">
        <div class="left--side">
            <a href="#">
                <i class="toggle-btn material-icons md-36 icon"  
                   >menu</i>
            </a>
        </div>
        <!--        <div class="center--side">
                    <h2 style="color: white">GENERAR ORDEN DE COMPRA</h2>
                </div>-->
        <div class="right-side">
            <a href="#">
                <span style="color: white" class="username">Example User</span>
            </a>
            <a href="#">
                <i class="material-icons md-36 icon">account_circle</i>
            </a>
            <a href="#">
                <i class="material-icons md-36 icon">exit_to_app</i>
            </a>
        </div>
    </header>
    <!--    <button 
            class="toggle-btn btn btn-primary mt-5 ms-5" 
            type="button" data-bs-toggle="offcanvas" 
            data-bs-target="#offcanvas" aria-controls="offcanvas">
            Botón de activación
        </button>-->

    <!-- Contenido de off canvas  -->
    <!--        <div class="menu offcanvas offcanvas-start" tabindex="-1" id="offcanvas" aria-labelledby="offcanvasLabel">
                <div class="offcanvas-header">
                    <h5 class="offcanvas-title">Menú</h5>
                    <button type="button" class="btn-close text-reset" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                </div>
                <div class="offcanvas-body">
                    <nav class="sidebar">
                        <ul>
                            <li>
                                <a href="#" class="feat-btn-users">
                                    <i class="material-icons">person</i> CATALOGOS</a>
                                <ul class="feat-show-users">
                                    <li><a href="#">DESCUENTOS</a></li>
                                    <li><a href="#">PROVEEDOR</a></li>
                                    <li><a href="#">PRECIOS DE COMPRA</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" class="feat-btn">
                                    <i class="material-icons">book</i> PROCESOS
                                    <span class="fas fa-caret-down first"></span>
                                </a>
                                <ul class="feat-show">
                                    <li><a href="/crm/giro/index.do">GENERAR</a></li>
                                    <li><a href="/crm/origen/index.do">EDITAR</a></li>
                                    <li><a href="/crm/tipo_evento/index.do">CANCELAR</a></li>
                                </ul>
                            </li>
                            <li>
                                <a href="#" class="serv-btn">
                                    <i class="material-icons">public</i> REPORTES
                                    <span class="fas fa-caret-down second"></span>
                                </a>
                                <ul class="serv-show">
                                    <li><a href="#">REPORTE 1</a></li>
                                    <li><a href="#">REPORTE 2</a></li>
                                    <li><a href="#">REPORTE 3</a></li>
                                </ul> 
                            </li>
                            <li>
                                <a href="#" class="serv-prospectos"> <i class="material-icons">person_add</i> CONFIGURACION
                                </a>
                                <ul class="serv-show-prospectos">
                                    <li><a href="/crm/alta-prospecto/index.do">USUARIOS</a></li>
                                    <li><a href="/crm/plantillas/index.do">PERFILES</a></li>
                                    <li><a href="/crm/alta-prospecto/index.do">PERMISOS</a></li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>-->
    <!-- Page Content  -->

    <div id="sidebar">
        <ul>
            <li>
                <div class="titulos">
                    <a href="#" class="feat-btn-users">CATALOGOS</a>
                </div>
                <ul class="submenus">
                    <li><a href="#">DESCUENTOS</a></li>
                    <li><a href="#">PROVEEDOR</a></li>
                    <li><a href="#">PRECIOS DE COMPRA</a></li>
                </ul>
            </li>
            <li>
                <div class="titulos">
                    <a href="#" class="feat-btn-users">PROCESOS</a>
                </div>
                <ul class="submenus">
                    <li><a href="/lubriagsa/procesos/generar.do">GENERAR</a></li>
                    <li><a href="/crm/origen/index.do">EDITAR</a></li>
                    <li><a href="/crm/tipo_evento/index.do">CANCELAR</a></li>
                </ul>
            </li>
            <li>
                <div class="titulos">
                    <a href="#" class="feat-btn-users">REPORTES</a>
                </div>
                <ul class="submenus">
                    <li><a href="#">REPORTE 1</a></li>
                    <li><a href="#">REPORTE 2</a></li>
                    <li><a href="#">REPORTE 3</a></li>
                </ul> 
            </li>
            <li>
                <div class="titulos">
                    <a href="#" class="feat-btn-users">CONFIGURACION</a>
                </div>
                <ul class="submenus">
                    <li><a href="/crm/alta-prospecto/index.do">USUARIOS</a></li>
                    <li><a href="/crm/plantillas/index.do">PERFILES</a></li>
                    <li><a href="/crm/alta-prospecto/index.do">PERMISOS</a></li>
                </ul>
            </li>
        </ul>
    </div>
    <script>
        const btnToggle = document.querySelector('.toggle-btn');

        btnToggle.addEventListener('click', function () {
            console.log('clik')
            document.getElementById('sidebar').classList.toggle('active');
            document.getElementById('container').classList.toggle('pageContainer');
//            const c = document.getElementById('container')
//            c.classname +=sideHide"
            console.log(document.getElementById('sidebar'))
        });
    </script>
    <script>
        $(".btns").click(function () {
            $(this).toggleClass("click");
            $(".sidebar").toggleClass("show");
            $("#capa").toggleClass("capa");
            if (document.getElementById
                    ("btn").innerText === "menu") {
                $(".btns").text("close");
                $("body").css({
                    overflowY: 'hidden'
                });

            } else {
                $(".btns").text("menu");
                $("body").css({
                    overflowY: 'auto'
                });
            }
        });



        $(".feat-btn").click(function () {
            $(this).toggleClass("section-active")
            $("nav ul .feat-show").toggleClass("show");
        });



        $(".feat-btn-users").click(function () {
            $(this).toggleClass("section-active")
            $("nav ul .feat-show-users").toggleClass("show2");
        });



        $(".serv-prospectos").click(function () {
            $(this).toggleClass("section-active")
            $("nav ul .serv-show-prospectos").toggleClass("show3");
        });

        $(".serv-plantillas").click(function () {
            $(this).toggleClass("section-active")
            $("nav ul .serv-show-plantillas").toggleClass("show4");
        });
    </script>
    <!--Fin de la importacion del header-->
</html>
