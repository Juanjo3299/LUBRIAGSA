package com.mx.proyecto.dao;

import java.sql.SQLException;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ImportResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.logging.Logger;

import javax.sql.DataSource;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import javax.annotation.PostConstruct;

@Repository
@Data
@ImportResource({"classpath*:spring.xml"})
public class GenerarOrdenRepository {

    @Autowired
    private DataSource dataSource;
    private JdbcTemplate jdbcTemplate;


    @PostConstruct
    public void init() {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }

    public List<Map<String, Object>> findAllSucursales() {
        boolean done = true;
        List<Map<String, Object>> datos = null;
        try {
            String query = "execute dbo.findAllSucursales";
            JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
            if (jdbcTemplate.queryForList(query) != null) {
                datos = jdbcTemplate.queryForList(query);
                done = false;
            }
            close();
            System.out.println("iMPRIMIEDNDO DATOS >>>>>>>>>>>>>>>>>>" + datos.toString());
        } catch (Exception e) {
            System.out.println("ERROR>>>>>>>>>>>>>>>>>>>>>>" + e.getMessage());
        }

        return datos;
    }
    
    public List<Map<String, Object>> findAllCompradores() {
        String query = "execute dbo.findAllCompradores";
        List<Map<String, Object>> todos = jdbcTemplate.queryForList(query);
        return todos;
    }
    
    public List<Map<String, Object>> findAllRequisiciones() {
        String query = "execute dbo.findAllRequisiciones";
        return jdbcTemplate.queryForList(query);
    }

    public List<Map<String, Object>> findDetRequisiciones(String folios) {
        String query = "SELECT  \n" +
                "RC_FOLIO AS FOLIO,\n" +
                "Producto.Pr_Cve_Producto AS PRODUCTO,\n" +
                "Producto.Pr_Descripcion,\n" +
                "Requisicion_Compra.Rc_Cantidad_1 AS CANTIDAD,\n" +
                "Producto.Pv_Cve_Proveedor AS PROVEEDOR,\n" +
                "Proveedor.Pv_Descripcion AS PROVEEDOR_DESCRIPCION,\n" +
                "Producto.Pr_Ultimo_Precio_Compra AS ULTIMO_PRECIO,\n" +
                "Producto_Codigo_Proveedor.Pcp_Descuento AS [%DESCUENTO]\n" +
                "FROM  Requisicion_Compra\n" +
                "INNER JOIN Producto ON Requisicion_Compra.Pr_Cve_Producto=Producto.Pr_Cve_Producto\n" +
                "INNER JOIN Proveedor ON Producto.Pv_Cve_Proveedor=Proveedor.Pv_Cve_Proveedor\n" +
                "INNER JOIN Producto_Codigo_Proveedor ON Requisicion_Compra.Pr_Cve_Producto=Producto_Codigo_Proveedor.Pr_Cve_Producto\n" +
                "WHERE Requisicion_Compra.Rc_Folio in ("+folios+")";
        return jdbcTemplate.queryForList(query);
    }

    public List<Map<String, Object>> findAllProveedoresByProducto(String idProducto) {
        String query = "SELECT \n" +
                "proveedor.Pv_Cve_Proveedor as CVE_PROVEEDOR,\n" +
                "proveedor.pv_descripcion as PROVEEDOR_DESCRIPCION,\n" +
                "producto.Pr_Descripcion_Corta as codigo_lubri,\n" +
                "producto.pr_descripcion as PRODUCTO,\n" +
                "producto.pr_cve_producto as clave_interna,\n" +
                "pcp.Pcp_Descuento as DESCUENTO\n" +
                "FROM Producto_Codigo_Proveedor pcp\n" +
                "\n" +
                "INNER JOIN producto on pcp.pr_cve_producto = producto.Pr_Cve_Producto\n" +
                "INNER JOIN proveedor on pcp.pv_cve_proveedor= proveedor.pv_Cve_proveedor\n" +
                "WHERE producto.Pr_Cve_Producto in ("+idProducto+")";
        System.out.println(query);
        return jdbcTemplate.queryForList(query);
    }

    public void close() {
        try {
            dataSource.getConnection().close();
        } catch (SQLException ex) {
            Logger.getLogger(Objeto_test.class.getName()).log(Level.SEVERE, null, ex);
        }
    }


}
