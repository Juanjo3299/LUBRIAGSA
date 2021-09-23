//constantes
//const {listaPersonas} = ${data};
const tablaPersonaTest = $("#tablaPersonaTest");
const btnNuevaPersona = document.querySelector("#btnNuevaPersona");
const btnCancelarActualizarPersona = document.querySelector("#btnCancelarActualizarPersona");

//constantes toggle crud persona 
const tablePersonaTestContainer = document.querySelector("#tablaPersonaTestContainer");
const formNuevaPersona = $("#formNuevaPersona");
const formActualizarPersona = $("#formActualizarPersona");
const formNuevaPersonaContainer = document.querySelector("#formNuevaPersonaContainer");

const collapseActualizarPersona = document.querySelector("#collapseActualizarPersona");
const collapsePersonaContainer = document.querySelector("#collapsePersonaContainer");

//variables
let tbPersonaTest = null;
//let personaActual = null;

//functions
const toggleCollapseEditar = () => {
    //Abrir o cerrar el apartado de editar
    collapseActualizarPersona.classList.toggle("show");
    collapsePersonaContainer.classList.toggle("show");
    
    //desabilitar boton de nueva persona
    btnNuevaPersona.disabled = !btnNuevaPersona.disabled;

}

const insert = (event) =>{
    event.preventDefault();
    event.stopPropagation();
    //validar
    
    const data = formNuevaPersona.serialize();
    
    $.ajax({
       url: "/tutorial_web_mvc/controllerPersonaTest/insert.do",
       dataType:"json",
       data: data,
       success: (response)=>{
//           console.log(response)
           if(response.done){
               formNuevaPersona.trigger("reset");
               populateTablePersonaTest(response.list);
               btnNuevaPersona.click();
               return successAlert(response.message);
           }
            return errorAlert(response.message);          
       },
       error: ()=>{
           return errorAlert("No se ha podido realizar la acción, contacte con el administrador");      
       }
    });
}
const update = (event) =>{
    event.preventDefault();
    event.stopPropagation();
    //validar
    
    const data = formActualizarPersona.serialize();
    
    $.ajax({
       url: "/tutorial_web_mvc/controllerPersonaTest/update.do",
       dataType:"json",
       data: data,
       success: (response)=>{
//           console.log(response)
           if(response.done){
               formActualizarPersona.trigger("reset");
               populateTablePersonaTest(response.list);
               toggleCollapseEditar()
               return successAlert(response.message);
           }
            return errorAlert(response.message);          
       },
       error: ()=>{
           return errorAlert("No se ha podido realizar la acción, contacte con el administrador");      
       }
    });
}

const prepareUpdate = ({id, nombre, domicilio, edad}) => {

    const fields = document.querySelectorAll(".camposActualizarPersona");
    const data = {
        id,
        nombre, 
        domicilio,
        edad
    };
    
    populateFieldsByClassName(data, fields);
    toggleCollapseEditar();
}
const remove = (idPersona) => {
      $.ajax({
       url: "/tutorial_web_mvc/controllerPersonaTest/delete.do",
       dataType:"json",
       data: {idP: idPersona},
       success: (response)=>{
//           console.log(response)
           if(response.done){
               populateTablePersonaTest(response.list);
               return successAlert(response.message);
           }
            return errorAlert(response.message);          
       },
       error: ()=>{
           return errorAlert("No se ha podido realizar la acción, contacte con el administrador");      
       }
    });
}


//events
//btnCrearPersona.addEventListener('click', insert);
formNuevaPersona.on("submit", insert);
formActualizarPersona.on("submit", update);
btnCancelarActualizarPersona.addEventListener('click', toggleCollapseEditar);



//TABLA PERSONA TEST
const aplicarEventosTablaPersonaTest = () =>{
    let myTable = tablaPersonaTest.DataTable();
    
    myTable.on('click', '.actionEdit', function () {
        let rowData = myTable.row($(this).parents('tr')).data();
//        personaActual = rowData;
        prepareUpdate(rowData);
//        getConfirmation(remove, [rowData.id], "¿Esta seguro de que desea eliminar la persona?");
    });
    myTable.on('click', '.actionDelete', function () {
        let rowData = myTable.row($(this).parents('tr')).data();
//        personaActual = rowData;
        getConfirmation(remove, [rowData.id], "¿Esta seguro de que desea eliminar la persona?");
    });
}

const populateTablePersonaTest = ( data ) =>{
    try{
        data = JSON.parse(data);
    }catch(e){
        
    }
    if (tbPersonaTest != null) {//destruir tabla y eliminar eventos
        tbPersonaTest.destroy();
        tbPersonaTest.off('click'); //ejemplo de quitar evento
    }
    tbPersonaTest = tablaPersonaTest.DataTable({
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
            {data: "id"},
            {data: "nombre"},
            {data: "domicilio"},
            {data: "edad"},
            {data: "fechaAlta"},
            {data: "id", render: (id) => `
                <div class="dropdown actionsTable">
                    <i class="material-icons actionsMenu" type="button" id="menuTablaPersona${id}" data-bs-toggle="dropdown" aria-expanded="false">
                        menu
                    </i>
                    <ul class="dropdown-menu" aria-labelledby="menuTablaPersona${id}">
                        <li class="dropdown-item actionEdit">
                            <i class="material-icons icons">edit</i>
                            <span class="">Editar</span>
                        </li>
                        <li class="dropdown-item actionDelete">
                            <i class="material-icons icons">delete</i>
                            <span class="">Eliminar</span>
                        </li>
                    </ul>
                </div>
            `},
        ]
    });
    aplicarEventosTablaPersonaTest();
}
populateTablePersonaTest(listaPersonas);

