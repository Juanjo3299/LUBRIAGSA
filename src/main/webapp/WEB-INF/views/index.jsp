<%@page contentType="text/html" pageEncoding="UTF-8" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <title>Index</title>
    <!--importar estilos-->
    <%@include file="./templates/stylesImports.jsp" %>
    <!--importar estilos unicos de la pagina EJEMPLO-->
    <link rel="stylesheet" href="<c:url value="/resources/css/index.css"/>"/>
</head>
<body>
<%@include file="templates/header.jsp" %>
<div class="pageContainer">
    <h1>Bienvenido @USER</h1>
    <div class="logo">
        <img src="<c:url value="/resources/img/login/images/Logotipo_Lubriagsa.jpg"/>">
    </div>
</div>
</body>
<!--incluir scripts de todas las paginas-->
<%@include file="./templates/scriptsImports.jsp" %>

<!--incluir scripts unicos de la pagina, ejemplo-->
<!--    <script src="<c:url value="/resources/js/index.js" />"></script>
    <script src="<c:url value="/resources/js/CrudPersonaTest.js" />"></script>-->
</html>
