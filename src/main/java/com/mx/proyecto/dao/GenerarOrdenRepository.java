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

    public List<Map<String, Object>> findDetRequisiciones(String folio) {
        String query = "execute dbo.findDetRequisiciones '"+folio+"'";
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
