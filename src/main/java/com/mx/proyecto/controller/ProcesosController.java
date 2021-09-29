/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mx.proyecto.controller;

import com.mx.proyecto.dao.GenerarOrdenRepository;

import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
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

    @RequestMapping(value = "guardarOrden.do", method = RequestMethod.GET)
    @ResponseBody
    public ModelAndView guardarOrden(
            @RequestParam("folios") String folios
    ) {
        ModelAndView mv = new ModelAndView();
        JSONObject response = new JSONObject();
//        this.folios =folios;
        System.out.println(folios);
        mv.setViewName("./procesos/guardarOrden");
        mv.addObject("folios", folios);
        response.put("ruta", "/lubriagsa/procesos/guardarOrden.do");
        response.put("folios", folios);
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

    @RequestMapping(value = "findAllProveedoresByProducto.do", method = RequestMethod.GET)
    @ResponseBody
    public String findAllProveedoresByProducto(@RequestParam("idProducto")String idProducto) {
        JSONObject response = new JSONObject();
        System.out.println(idProducto);
        return response.put("data", generarOrdenRepository.findAllProveedoresByProducto(idProducto)).toString();
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
            @RequestParam("folios") String folios
    ) {
        JSONObject response = new JSONObject();
        boolean done = false;
        List<Map<String, Object>> datos = null;
        System.out.println(folios);
        try {
            datos = generarOrdenRepository.findDetRequisiciones(folios);
            System.out.println(datos);
            done = true;
        } catch (Exception e) {
            e.printStackTrace();
        }
        response.put("done", done);
        response.put("data", datos);
        return response.toString();
    }

    @RequestMapping(value = "insert.do", method = RequestMethod.GET)
    @ResponseBody
    public String insertDo(){
        JSONObject response = new JSONObject();
        return response.toString();
    }

}
