
<%--
  Created by IntelliJ IDEA.
  User: Juan Mendez
  Date: 22/09/2021
  Time: 03:25 p. m.
  To change this template use File | Settings | File Templates.
--%>
<%@page contentType="text/html" pageEncoding="UTF-8" %>
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
<%@include file="../modals/modalEditarProducto.jsp" %>
<div id="container" class="pageContainer">
    <div class="container mt-3">
        <label class="form-label" for="select-proveedores">Establecer Proveedor
            <select class="form-control" id="select-proveedores">
                <option>Selecciones una opcion</option>
            </select>
        </label>
        <button id="btn-establecer" class="ml-3 button">Establecer</button>
        <br/>
        <div class="mt-2 row form-group">
            <div class="titulos">
                <h3><b>REQUISICIONES DE COMPRA</b></h3>
            </div>
            <div>
                <%--                    <button id="button" class="button">ACCION</button>--%>
                <table id="tabla-requisiciones" style="width: 100%;"
                       class="table display nowrap  table-hover table-bordered table-sm" cellspacing="0"
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
        <table id="tabla-resumen" class="table table-bordered display">
            <thead>
            <h4>PROVEEDORES AGREGADOS</h4>
            <tr>
                <th>CVE PROV</th>
                <th>PROVEEDOR</th>
                <th>CANTIDAD</th>
                <th>IMPORTE</th>
            </tr>
            </thead>
        </table>
    </div>
    <div class="center">
        <button class="button-orange" id="btn-cargar-productos">GUARDAR</button>
    </div>
</div>
<div id="invisible" class="d-none">${folios}</div>

<%@include file="../templates/scriptsImports.jsp" %>
<%--    <script>--%>
<%--        const folios = ${folios};--%>
<%--        console.log(folios)--%>
<%--    </script>--%>
<script src="<c:url value="/resources/js/guardarOrden.js" />"></script>

</html>
