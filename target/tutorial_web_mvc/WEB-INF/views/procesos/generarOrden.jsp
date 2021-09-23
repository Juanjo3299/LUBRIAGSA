<%-- 
    Document   : orden_compra
    Created on : 13/09/2021, 07:16:06 PM
    Author     : Juan Mendez
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <%@include file="../templates/stylesImports.jsp" %>
        <link rel="stylesheet" href="<c:url value="/resources/css/generarOrden.css"/>"/>
        <title>Generar Orden</title>
    </head>
    <body>
        <!--importar header y menu-->
        <%@include file="../templates/header.jsp" %>
        <div id="container" class="pageContainer">
            <div class="container">
                <div class="mt-5 row form-group">
                    <label class="col-sm-2"  for="date"><b>FECHA DE ALTA</b></label>
                    <div class="col-sm-2">
                        <div class="input-group date" id="datetimepicker">
                            <input type="date" id="date-fecha-alta"/>
                           
                        </div>
                    </div>
                </div>

                <!--        <label>FECHA DE ENTREGA</label>-->
                <div class="mt-2 row form-group">
                    <label class="col-sm-2"  for="date"><b>FECHA DE ENTREGA</b></label>
                    <div class="col-sm-2">
                        <div class="input-group date" id="datetimepicker">
                            <input type="date" id="date-fecha-entrega"/>
                            
                        </div>
                    </div>
                </div>
                <div class="mt-2 row form-group">
                    <label class="col-sm-2" ><b>SUCURSAL</b></label>
                    <div class="col-sm-2">
                        <select id="select-sucursales" class="form-control">
                            
                        </select>
                    </div>
                    <label class="me-3 col-sm-1" ><b>COMPRADOR</b></label>
                    <div class="col-sm-2">
                        <select class="form-control" id="select-compradores">
                        </select>
                    </div>
                    <label class="col-sm-1" ><b>MONEDA</b></label>
                    <div class="col-sm-1">
                        <select id="tipo-moneda" class="form-select form-select-sm">
                            <option selected value="-1">MXN</option>
                            <option value="1">USD</option>
                        </select>
                    </div>
                    <label class="tc col-sm-1" ><b>TIPO DE CAMBIO</b></label>
                    <div class="col-sm-1">
                        <input id="tipo-cambio" value="1" min="0" disabled type="number" step="0.01" class="form-control"/>
                    </div>
                </div>
                <div class="mt-2 row form-group">
                    <label class="col-sm-2" ><b>OBSERVACIONES</b></label>
                    <div class="col-sm-3">
                        <input type="text" class="form-control"/>
                    </div>
                </div>
            </div>

            <hr class="separador" style="background-color: #FB771A;height:3px;border-width:0px;color:#FB771A">

            <div class="container">
                <div class="titulos">
                    <h4><b>FILTROS</b></h4>
                </div>
                <div class="mt-4 row form-group">
                    <label class="col-sm-1"><b>FECHA DE INICIO</b></label>
                    <div class="col-sm-3">
                        <div class="input-group date" id="datetimepicker">
                            <!--                            <input id="min" name="min" type="text" class="form-control" id="fechaInicio"/>-->
                            <input id="min" name="min" type="text" class="form-control"/>

                            <span class="input-group-text bg-white d-block"><i class="material-icons">calendar_today</i></span>
                        </div>
                    </div>
                    <label class="col-sm-1"><b>FECHA DE FIN</b></label>
                    <div class="col-sm-3">
                        <div class="input-group date" id="datetimepicker">
                            <input id="max" name="max" type="text" class="form-control"/>
                            <!--<input id="max" name="max" type="text" class="form-control" id="fechaFin"/>-->

                            <span class="input-group-text bg-white d-block"><i class="material-icons">calendar_today</i></span>
                        </div>
                    </div>
                </div>
                <br/>
                <div class="mt-2 row form-group">
                    <div class="titulos">
                        <h3><b>REQUISICIONES DE COMPRA</b></h3>
                    </div>
                    <div>
                        <table id="tabla-requisiciones" class="table  table-hover table-bordered table-sm"  cellspacing="0"
                               cellpadding="5">
                            <thead>
                                <tr>
                                    <th>Seleccionar</th>
                                    <th>Folio</th>
                                    <th>Fecha</th>
                                    <th>Comentario</th>
                                </tr>
                            </thead>
                           
                        </table>
                    </div>
                </div>
            </div>
            <div class="center">
                <button class="button-orange" id="btn-cargar-productos">CARGAR PRODUCTOS</button>
            </div>
            <br/>
            <br/>
            <br/>
            <br/>
        </div>
    </body>
    <%@include file="../templates/scriptsImports.jsp" %> 
    <script src="<c:url value="/resources/js/generarOrden.js" />"></script>

</html>
