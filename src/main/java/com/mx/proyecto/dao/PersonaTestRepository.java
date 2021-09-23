/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mx.proyecto.dao;

import com.mx.proyecto.entities.PersonaTest;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import javax.annotation.PostConstruct;
import javax.sql.DataSource;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.ImportResource;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

/**
 *
 * @author danie
 */
@Repository
@Data
@ImportResource({"classpath*:spring.xml"})
public class PersonaTestRepository {

    @Autowired
    private DataSource dataSource;
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void init() {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }
    public boolean create(PersonaTest persona){
        boolean done = true;
        try{
            String query = "insert into PersonaTest"
            + "(\n" +
            "nombre,\n" +
            "domicilio,\n" +
            "edad,\n" +
            "Oper_Alta,\n" +
            "Oper_Ult_Modif\n" +
            ")\n" +
            "values("
            + "'"  + persona.getNombre()+ "',"
            + "'"  + persona.getDomicilio()+ "',"
            + ""  + persona.getEdad()+ ","
            + "'"  + persona.getOperAlta()+ "',"
            + "'"  + persona.getOperUltModif()+ "'"
            + ");";
            
            JdbcTemplate jdbcTemplate = new JdbcTemplate (dataSource);
            if(jdbcTemplate.update(query) == -1)
                done = false;
            close();
        }
        catch(Exception e){
            System.out.println("entro al catch de insert PersonaTest");
            System.out.println(e);
            done = false;
        }
        return done;        
    }
    public boolean update(PersonaTest persona){
        boolean done = true;
        try{
            String query = "update PersonaTest"
                    + " set nombre = '"+persona.getNombre()+"',"
                    + "domicilio = '"+persona.getDomicilio()+"',"
                    + "edad= "+persona.getEdad()+","
                    + "Oper_Ult_Modif= '"+persona.getOperUltModif()+"',"
                    + "Fecha_Ult_Modif= getDate()"
                    + " where id_p = " + persona.getIdP();                    
            
            JdbcTemplate jdbcTemplate = new JdbcTemplate (dataSource);
            if(jdbcTemplate.update(query) == -1)
                done = false;
            close();
        }
        catch(Exception e){
            System.out.println("entro al catch de update PersonaTest");
            System.out.println(e);
            done = false;
        }
        return done;        
    }
    public boolean delete(PersonaTest persona){
        boolean done = true;
        try{
            String query = "update PersonaTest"
                    + " set "
                    + "Oper_Ult_Modif= '"+persona.getOperUltModif()+"',"
                    + "Fecha_Ult_Modif= getDate(),"
                    + "Oper_Baja= '"+persona.getOperBaja()+"',"
                    + "Fecha_Baja= getDate(),"
                    + "Es_Cve_Estado= '"+persona.getEsCveEstado() + "'"
                    + " where id_p = " + persona.getIdP();                    
            
            JdbcTemplate jdbcTemplate = new JdbcTemplate (dataSource);
            if(jdbcTemplate.update(query) == -1)
                done = false;
            close();
        }
        catch(Exception e){
            System.out.println("entro al catch de delete PersonaTest");
            System.out.println(e);
            done = false;
        }
        return done;        
    }

    public List<Map<String, Object>> findAll() {
        String query = "execute dbo.findAllPersonaTest";
        JdbcTemplate jdbcTemplate = new JdbcTemplate(dataSource);
        List<Map<String, Object>> info = jdbcTemplate.queryForList(query);
        close();
        return info;
    }

    public void close() {
        try {
            dataSource.getConnection().close();
        } catch (SQLException ex) {
            Logger.getLogger(Objeto_test.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

}
