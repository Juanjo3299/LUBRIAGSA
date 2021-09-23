/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mx.proyecto.controller;

import com.mx.proyecto.dao.Objeto_test;
import com.mx.proyecto.dao.PersonaTestRepository;
import com.mx.proyecto.helpers.Utilerias;
import org.json.JSONObject;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;


/**
 *
 * @author erick
 */
@Controller
@RequestMapping("controllerEjemplo")
public class EjemploController {
    @Autowired
    private Objeto_test objetoTest;
    @Autowired
    private PersonaTestRepository personaTestRepository;
    
    @RequestMapping(value = "index.do")
    public ModelAndView index() {
        ModelAndView mv = new ModelAndView();
//        prueba("test");
        JSONObject json = new JSONObject();
        json.put("listaPersonas", personaTestRepository.findAll());
        
        mv.addObject("data", json);
        mv.setViewName("index");
        
        return mv;
    }
    
    
    @RequestMapping(value = "buscarInfoTablaEjemplo.do")
    @ResponseBody
    public String buscarInfoTablaEjemplo(){
        String user = "DESARROLLO";
        JSONObject jsonObject = new JSONObject();
        
        Utilerias.escribirEnLog("EjemploController.java", "INFO", "Se realizo la busqueda de tabla ejemplo", user);
        
        jsonObject.put("done", true);
        jsonObject.put("message", "Info obtenida con exito");
        jsonObject.put("list", objetoTest.obtenerInfoTablaEjemplo());
        
         return jsonObject.toString();
    }
    
    @RequestMapping(value = "buscarInfoTablaEjemploError.do")
    @ResponseBody
    public String buscarInfoTablaEjemploError(){
        String user = "DESARROLLO";
        JSONObject jsonObject = new JSONObject();
        
        Utilerias.escribirEnLog("EjemploController.java", "ERROR", "No se pudo realizar la busqueda de tabla ejemplo", user);
        
        jsonObject.put("done", false);
        jsonObject.put("message", "Ocurrio un error al obtener la info");
//        jsonObject.put("list", objetoTest.obtenerInfoTablaEjemplo());
        
         return jsonObject.toString();
    }
    
}
