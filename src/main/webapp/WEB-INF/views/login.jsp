<%-- 
    Document   : login
    Created on : 13/09/2021, 12:16:55 PM
    Author     : Juan Mendez
--%>

<%@page contentType="text/html" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

        <%@include file="./templates/stylesImports.jsp" %>
        <!-- Bootstrap CSS -->
        <link rel="stylesheet" href="<c:url value="/resources/login/css/bootstrap.min.css"/>"/>
        <link rel="stylesheet" href="<c:url value="/resources/css/login.css"/>"/>
        <title>Login Page</title>
    </head>
    <body>
        <%@include file="./templates/header.jsp" %>
        <div class="contenedor">
            <div class="imagenes">
                <!--<div style="background-image: url('<c:url value="/resources/img/login/images/Facturas_Lubriagsa.jpg"/>');"></div>-->
                <div class="fondo">
                    <img class="img1" src="<c:url value="/resources/img/login/images/Fondo_Lubriagsa.jpeg"/>">
                    <div  class="logo">
                        <img src="<c:url value="/resources/img/login/images/Logotipo_Lubriagsa.jpg"/>">
                    </div>
                </div>

            </div>
            <div class="login">
                <div class="formulario form-block mx-auto border-5">
                    <div class="text-center mb-5">
                        <h3><strong>INICIO DE SESION</strong></h3>
                        <span class="mt-3 material-icons">
                            account_circle
                        </span>
                        <!-- <p class="mb-4">Lorem ipsum dolor sit amet elit. Sapiente sit aut eos consectetur adipisicing.</p> -->
                    </div>
                    <form action="#" method="post">
                        <div class="form-group first">
                            <label for="username"><b>USUARIO</b></label>
                            <input type="text" class="form-control" placeholder="USUARIO" id="username">
                        </div>
                        <div class="form-group last mb-3">
                            <label for="password"><b>CONTRASEÑA</b></label>
                            <input type="password" class="form-control" placeholder="*******" id="password">
                        </div>
                        <!--
                                                                <div class="d-sm-flex mb-5 align-items-center">
                                                                    <label class="control control--checkbox mb-3 mb-sm-0"><span class="caption">Remember me</span>
                                                                        <input type="checkbox" checked="checked"/>
                                                                        <div class="control__indicator"></div>
                                                                    </label>
                                                                    <span class="ml-auto"><a href="#" class="forgot-pass">Forgot Password</a></span> 
                                                                </div>-->

                        <input type="submit" value="ACCEDER" class="btn btn-block btn-primary">

                    </form>
                </div>

            </div>
        </div>
    </body>
</html>
