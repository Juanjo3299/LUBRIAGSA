/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mx.proyecto.entities;

import java.io.Serializable;
import java.util.Date;
import lombok.Data;

/**
 *
 *
 */
@Data
public class PersonaTest implements Serializable {
    private static final long serialVersionUID = 1L;
    private Integer idP;
    private String nombre;
    private String domicilio;
    private int edad;
    private String operAlta;
    private String fechaAlta;
    private String operUltModif;
    private String fechaUltModif;
    private String operBaja;
    private String fechaBaja;
    private String esCveEstado;
}
