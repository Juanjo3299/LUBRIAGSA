/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mx.proyecto.dao;

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
public class Objeto_test {
    
    @Autowired
    private DataSource dataSource;
    private JdbcTemplate jdbcTemplate;

    @PostConstruct
    public void init() {
        jdbcTemplate = new JdbcTemplate(dataSource);
    }
    
    public String prueba(){
        return  "Hola";
    }

    
  
    
    public void close(){        
        try {
            dataSource.getConnection().close();
        } catch (SQLException ex) {
            Logger.getLogger(Objeto_test.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    public String obtenerInfoTablaEjemplo() {
        /*
        Esto es un ejemplo, aca tengo un json preparado, pero realmente deberia de hacerse la consulta a la bd
        */
        return "[{\n" +
        "		\"nombre\": \"Erick\",\n" +
        "		\"domicilio\": \"Tapachula\",\n" +
        "		\"edad\": \"20\"\n" +
        "	},\n" +
        "	{\n" +
        "		\"nombre\": \"Carlos\",\n" +
        "		\"domicilio\": \"Tapachula\",\n" +
        "		\"edad\": \"21\"\n" +
        "	},\n" +
        "	{\n" +
        "		\"nombre\": \"Juan\",\n" +
        "		\"domicilio\": \"Tapachula\",\n" +
        "		\"edad\": \"22\"\n" +
        "	},\n" +
        "	{\n" +
        "		\"nombre\": \"Marcos\",\n" +
        "		\"domicilio\": \"Huixtla\",\n" +
        "		\"edad\": \"17\"\n" +
        "	},\n" +
        "	{\n" +
        "		\"nombre\": \"Andrea\",\n" +
        "		\"domicilio\": \"CDMX\",\n" +
        "		\"edad\": \"25\"\n" +
        "	},\n" +
        "	{\n" +
        "		\"nombre\": \"Lupita\",\n" +
        "		\"domicilio\": \"Los mochis\",\n" +
        "		\"edad\": \"21\"\n" +
        "	},\n" +
        "	{\n" +
        "		\"nombre\": \"Jorge\",\n" +
        "		\"domicilio\": \"Estado de mexico\",\n" +
        "		\"edad\": \"30\"\n" +
        "	}\n" +
        "]";
    }
    
   
}
