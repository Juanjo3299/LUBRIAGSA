//constantes
const btnAbrirModalEjemplo = document.getElementById("btnAbrirModalEjemplo");
const btnLlenarTabla = document.getElementById("btnLlenarTabla");
const btnAbrirLoader = document.getElementById("btnAbrirLoader");
const btnLlenarTablaError = document.getElementById("btnLlenarTablaError");
const modalEjemplo = new bootstrap.Modal(document.getElementById("modalEjemplo"), {});
const tablaEjemplo = $("#tablaEjemplo");


//variables
let tbEjemplo = null;//variable que sirve para llenar la tabla


//funciones
const llenarTablaEjemplo = (data) => {
    try{
        data = JSON.parse(data);
    }catch(e){
        
    }
    if (tbEjemplo != null) {//destruir tabla y eliminar eventos
        tbEjemplo.destroy();
//        tbEjemplo.off('click'); //ejemplo de quitar evento
    }
    tbEjemplo = tablaEjemplo.DataTable({
        ordering: false,
        searching: true,
        autoWidth: false,
        scrollX: false,
        "responsive": true,
        data: data,
        preDrawCallback: (settings) => {
        },
        initComplete: (data) => {
        },
        columns: [
            {render: () => `<input type="radio" name = "radioEjemplo"/>`},
            {data: "nombre"},
            {data: "domicilio"},
            {data: "edad"},
        ]
    });
}


btnAbrirModalEjemplo.addEventListener('click', () => {//abrir modal
    modalEjemplo.show();
});
btnAbrirLoader.addEventListener('click', () => {//abrir loader
    openLoader();
    setTimeout(()=>{
        closeLoader(); 
    }, 3000);
});

btnLlenarTabla.addEventListener('click', () => {
    $.ajax({
        url: "/tutorial_web_mvc/controllerEjemplo/buscarInfoTablaEjemplo.do",
        dataType: "json",
        data: {},
        success: (response) => {
            if (response.done) {
                let data = response.list;
                console.log(data);
                llenarTablaEjemplo(data);
                return successAlert(response.message);
            }
            return errorAlert(response.message);
        },
        error: () => {
            return errorAlert("No se ha podido realizar la acción, contacte con el administrador");
        }
    });
});

btnLlenarTablaError.addEventListener('click', () => {
    $.ajax({
        url: "/tutorial_web_mvc/controllerEjemplo/buscarInfoTablaEjemploError.do",
        dataType: "json",
        data: {},
        success: (response) => {
            if (response.done) {
                let data = response.list;
                console.log(data);
                llenarTablaEjemplo(data);
                return successAlert(response.message);
            }
            return errorAlert(response.message);
        },
        error: () => {
            return errorAlert("No se ha podido realizar la acción, contacte con el administrador");
        }
    });
});