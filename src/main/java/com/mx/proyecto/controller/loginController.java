/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mx.proyecto.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

/**
 *
 * @author Juan Mendez
 */
@Controller
@RequestMapping("loginController")
public class loginController {
    
    
    @RequestMapping(value = "login.do")
    public ModelAndView login(){
        ModelAndView mv = new ModelAndView();
        
        mv.setViewName("login");
        
        return mv;
    }
}
