package com.mx.proyecto.helpers;

import com.mx.proyecto.config.Routes;
import org.apache.log4j.Logger;
import org.apache.log4j.PropertyConfigurator;

/**
 *
 * @author dhernandezcru
 */
public class Utilerias {
    
    public static void escribirEnLog(String clase,String tipo,String mensaje, String usuario)
    {
        String log4jConfPath = "";
        mensaje = "USER: " + usuario + " MESSAGE: " + mensaje;
        
        Logger log=null;
        int flag=0;
        if(tipo.equals("ERROR"))
        {
            flag=1;
        }
            
        switch(flag)
        {
            case 0:
                        log4jConfPath = Routes.LOG_INFO_PROPERTIES_PATH;
                        PropertyConfigurator.configure(log4jConfPath);
                        log = Logger.getLogger(clase);
                        log.info(mensaje);
                        break;
            case 1:
                        log4jConfPath = Routes.LOG_ERROR_PROPERTIES_PATH;
                        PropertyConfigurator.configure(log4jConfPath);
                        log = Logger.getLogger(clase);
                        log.error(mensaje);
                        break;
            default:break;
        }
        
    }
    
}