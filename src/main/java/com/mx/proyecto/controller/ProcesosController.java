/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mx.proyecto.controller;

import com.mx.proyecto.dao.GenerarOrdenRepository;
import java.util.List;
import java.util.Map;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author Juan Mendez
 */
@Controller
@RequestMapping("procesos")
public class ProcesosController {

    @Autowired
    private GenerarOrdenRepository generarOrdenRepository;
    

    @RequestMapping(value = "generar.do")
    public ModelAndView generarOrden() {
        ModelAndView mv = new ModelAndView();

        mv.setViewName("./procesos/generarOrden");

        return mv;
    }

    @RequestMapping(value = "guardarOrden.do")
    public ModelAndView guardarOrden() {
        ModelAndView mv = new ModelAndView();

        mv.setViewName("./procesos/guardarOrden");

        return mv;
    }

    @RequestMapping(value = "findAllCompradores.do", method = RequestMethod.GET)
    @ResponseBody
    public String findAllCompradores() {
        JSONObject response = new JSONObject();
        boolean done = false;
//        List<Map<String, Object>> datos = null;
//        try {
//            datos = generarOrdenRepository.findAllCompradores();
//            done = true;
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        response.put("done", done);
//        response.put("data", datos);
//        return response.toString();
        return response.put("data", generarOrdenRepository.findAllCompradores()).toString();
    }
    
    @RequestMapping(value = "findAllSucursales.do", method = RequestMethod.GET)
    @ResponseBody
    public String findAllSucursales() {
        JSONObject response = new JSONObject();
        return response.put("data", generarOrdenRepository.findAllSucursales()).toString();
    }
    
    @RequestMapping(value = "findAllRequisiciones.do", method = RequestMethod.GET)
    @ResponseBody
    public String findAllRequisiciones() {
        JSONObject response = new JSONObject();
        boolean done = false;
        List<Map<String, Object>> datos = null;
        try {
            datos = generarOrdenRepository.findAllRequisiciones();
            done = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        response.put("done", done);
        response.put("data", datos);
        return response.toString();
    }

    @RequestMapping(value = "findDetRequisiciones.do", method = RequestMethod.GET)
    @ResponseBody
    public String findDetRequisiciones(
            @RequestParam("folio") String folio
    ) {
        JSONObject response = new JSONObject();
        boolean done = false;
        List<Map<String, Object>> datos = null;
        try {
            System.out.println(folio);
            datos = generarOrdenRepository.findDetRequisiciones(folio);
            System.out.println( datos );
            done = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        response.put("done", done);
        response.put("data", datos);
        return response.toString();
    }

}
