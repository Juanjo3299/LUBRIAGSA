package com.mx.proyecto.controller;
import com.mx.proyecto.dao.PersonaTestRepository;
import com.mx.proyecto.entities.PersonaTest;
import com.mx.proyecto.helpers.Utilerias;
import java.math.BigDecimal;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

/**
 *
 * @author erick
 */
@Controller
@RequestMapping("controllerPersonaTest")
public class PersonaTestController {
    @Autowired
    PersonaTestRepository personaTestRepository;
    
    @RequestMapping(value = "findAll.do")
    @ResponseBody
    public String buscarInfoTablaEjemplo(){
        return "";
    }
    
    @RequestMapping("insert.do")
    @ResponseBody
    public String insert(String nombre, String domicilio, String edad){
        String user = "DESARROLLO";
        
        JSONObject json = new JSONObject();
        boolean done = false;
        String message = "No se ha podido completar el registro, contacte con el administrador";
        
        //build object
        PersonaTest personaTest = new PersonaTest();
        personaTest.setNombre(nombre);
        personaTest.setDomicilio(domicilio);
        personaTest.setEdad(Integer.parseInt(edad));
        personaTest.setOperAlta(user);
        personaTest.setOperUltModif(user);
        
        
        if(personaTestRepository.create(personaTest)){
            Utilerias.escribirEnLog("PersonaTestController.java", "INFO", "Se insertó persona '"+personaTest.getNombre()+"'", user);
            message = "El registro ha sido éxitoso";
            done = true;
        }
        else{
            Utilerias.escribirEnLog("PersonaTestController.java", "ERROR", "Falló el insert de persona '"+personaTest.getNombre()+"'", user);
            
        }
        
        json.put("done", done);
        json.put("message", message);
        json.put("list", personaTestRepository.findAll());
        return json.toString();        
    }
    @RequestMapping("update.do")
    @ResponseBody
    public String update(String idP, String nombre, String domicilio, String edad){
        String user = "DESARROLLO";
        
        JSONObject json = new JSONObject();
        boolean done = false;
        String message = "No se ha podido realizar la actualización, contacte con el administrador";
        
        //build object
        PersonaTest personaTest = new PersonaTest();
        personaTest.setIdP(Integer.parseInt(idP));
        personaTest.setNombre(nombre);
        personaTest.setDomicilio(domicilio);
        personaTest.setEdad(Integer.parseInt(edad));
        personaTest.setOperUltModif(user);
        
        if(personaTestRepository.update(personaTest)){
            Utilerias.escribirEnLog("PersonaTestController.java", "INFO", "Se actualizó persona con id '"+personaTest.getIdP()+"'", user);
            message = "La actualización fue completada con éxito";
            done = true;
        }
        else{
            Utilerias.escribirEnLog("PersonaTestController.java", "ERROR", "Falló la actualización de persona con id '"+personaTest.getIdP()+"'", user);
        }
        
        json.put("done", done);
        json.put("message", message);
        json.put("list", personaTestRepository.findAll());
        return json.toString();        
    }
    
    @RequestMapping("delete.do")
    @ResponseBody
    public String delete(String idP){
        String user = "DESARROLLO";
        
        JSONObject json = new JSONObject();
        boolean done = false;
        String message = "No se ha podido realizar la baja, contacte con el administrador";
        
        //build object
        PersonaTest personaTest = new PersonaTest();
        personaTest.setIdP(Integer.parseInt(idP));
        personaTest.setOperUltModif(user);
        personaTest.setOperBaja(user);
        personaTest.setEsCveEstado("BA");
        
        if(personaTestRepository.delete(personaTest)){
            Utilerias.escribirEnLog("PersonaTestController.java", "INFO", "Se dio de baja persona con id '"+personaTest.getIdP()+"'", user);
            message = "La baja fue completada con éxito";
            done = true;
        }
        else{
            Utilerias.escribirEnLog("PersonaTestController.java", "ERROR", "Falló la baja  de persona con id '"+personaTest.getIdP()+"'", user);
        }
           
        json.put("done", done);            
        json.put("message", message);
        json.put("list", personaTestRepository.findAll());
        return json.toString();        
    }
    
}
