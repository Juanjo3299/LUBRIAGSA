<%--
  Created by IntelliJ IDEA.
  User: Juan Mendez
  Date: 22/09/2021
  Time: 03:25 p. m.
  To change this template use File | Settings | File Templates.
--%>
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <%@include file="../templates/stylesImports.jsp" %>
    <link rel="stylesheet" href="<c:url value="/resources/css/guardarOrden.css"/>"/>
    <title>Guardar Orden</title>
</head>
<body>
    <%@include file="../templates/header.jsp" %>
    <div id="container" class="pageContainer">
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
                    <table id="tabla-requisiciones" class="table display nowrap  table-hover table-bordered table-sm"  cellspacing="0"
                           cellpadding="5">
                        <thead>
                        <tr>
                            <th>Seleccionar</th>
                            <th>Folio Req</th>
                            <th>CVE PRODUCTO</th>
                            <th>DESCRIPCION</th>
                            <th>CANTIDAD</th>
                            <th>CVE PROV</th>
                            <th>PROVEEDOR</th>
                            <th>ULTIMO COSTO</th>
                            <th>DESCUENTO</th>
                            <th>PRECIO FINAL</th>
                            <th>IMPORTE</th>
                            <th>ACCION</th>
                        </tr>
                        </thead>

                    </table>
                </div>
            </div>
        </div>
        <div class="container">
            <table id="tabla-resumen" class="table table-bordered">
                <thead>
                <tr>
                    <th>CVE PROV</th>
                    <th>PROVEEDOR</th>
                    <th>CANTIDAD</th>
                    <th>IMPORTE</th>
                </tr>
                </thead>
                <tbody>

                </tbody>
                <tfoot>
                <tr>
                    <td>TOTAL</td>
                    <td>0.00</td>
                    <td>0.00</td>
                </tr>
                </tfoot>
            </table>
        </div>
        <div class="center">
            <button class="button-orange" id="btn-cargar-productos">GUARDAR</button>
        </div>
    </div>
</body>
<%@include file="../templates/scriptsImports.jsp" %>
<script src="<c:url value="/resources/js/guardarOrden.js" />"></script>
</html>
