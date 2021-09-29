// Constantes de elementos HTML
// Selects
const selectSucursal = document.getElementById('select-sucursales');
const selectCompradores = document.getElementById('select-compradores');
const selectTipoMoneda = document.getElementById('tipo-moneda');

// Inputs
const tipoDeCambio = document.getElementById('tipo-cambio');
const observaciones = document.getElementById('observaciones');

// Fechas
const fechaAlta = document.getElementById('date-fecha-alta');
const fechaBaja = document.getElementById('date-fecha-entrega');

// Botones
const btnCargarProductos = document.getElementById('btn-cargar-productos');

btnCargarProductos.addEventListener('click', () => {


    const dataTableRows = tablaRequisiciones.rows({selected: true}).data().toArray();
    const arrTableSelectedRowsRendered = [];

    const rows = $(tablaRequisiciones.$('input[type="checkbox"]:checked').map(function () {
        return $(this).closest('tr');
    }));
    console.log(rows)
    let folios = [];
    rows.each((i, item) => {
        console.log(item)
        folios.push(item[0].innerText.substr(1, 10))
        //console.log(item[1].innerText.substr(1, 10));
    })
    console.log(folios);

   let foliosCadena = '';
    folios.map((element, i) => {
        console.log(i)
        console.log(folios.length)
        if (i+1 === folios.length)
            foliosCadena += `'${element}'`;
        else
            foliosCadena += `'${element}',`;
   });

    const a = document.createElement('a');
    a.href = '/lubriagsa/procesos/guardarOrden.do?folios=' + encodeURI(foliosCadena);
    console.log('/lubriagsa/procesos/guardarOrden.do?folios=' + encodeURI(foliosCadena));
    a.click();

    // $.ajax('/lubriagsa/procesos/guardarOrden.do', {
    //     method: 'GET',
    //     dataType: 'json',
    //     timeout: 0,
    //      data: {folios: foliosCadena},
    //     success: function(response) {
    //         console.log(response)
    //     }
    // }).done((response) => {
    //     console.log("esta entrando")
    //     console.log(response)
    //     window.location.replace(response);
    // }).fail((error) => {
    //     console.log(error)
    //     console.log("fallla :(")
    // });


})

// Constantes
let maximunDate = new Date();
maximunDate = maximunDate.toLocaleDateString().split('/').reverse().map((value) => {
    console.log(value)
    if (value.length === 1) {
        return '0' + value
    } else {
        return value
    }

});
maximunDate = maximunDate.join('-');

fechaBaja.min = maximunDate;
fechaAlta.max = maximunDate;

// Funcion para rellenar la table
let tablaRequisiciones = null;
let minDate, maxDate;
function llenarTablaRequisiciones(data) {
    
    if (tablaRequisiciones != null)
        tablaRequisiciones.destroy();

    tablaRequisiciones = $("#tabla-requisiciones").DataTable({
        ordering: false,
        searching: true,
        "language": language,
        // scrollX: true,
        data: data,
        columns: [
            {render: () => `<input type="checkbox" name="requisiciones"/>`},
            {data: "FOLIO"},
            {data: "FECHA"},
            {data: "COMENTARIO"},
        ],
    })
    
}

selectTipoMoneda.addEventListener('change', () => {
    if (selectTipoMoneda.value !== "-1") {
        tipoDeCambio.removeAttribute('disabled');
    } else {
        tipoDeCambio.disabled = 'disabled';
        tipoDeCambio.value = 1;
    }
} )


$.ajax('/lubriagsa/procesos/findAllRequisiciones.do', {
    method: 'GET',
    dataType: 'json',
    timeout: 0,
}).done((response) => {
    llenarTablaRequisiciones(response.data)
})

// Cuando la pagina termina de cargar
document.addEventListener('DOMContentLoaded', () => {
    
    // Rllenamos los combos al cargar la pagina
    fillComboWithObjectByUrl(selectSucursal, '/lubriagsa/procesos/findAllSucursales.do');
    fillComboWithObjectByUrlInverted(selectCompradores, '/lubriagsa/procesos/findAllCompradores.do');
})

 function fillComboWithObjectByUrl(combo, url) {

    // Validacion en caso de que el elemento no sea un select
    if (combo.tagName !== 'SELECT') {
        return console.error("[ FUNCION fillComboWithObject ] El elemento que se ha pasado por parametro NO es un SELECT");
    }

    // Comenzamos por vaciar el contenido actual
    combo.innerHTML = '';
    // Ontenemos los datos correspondientes de la URL
    fetch(url)
        .then(response => response.json())
        .then(json => json)
        .then(elementos => {
            console.log(elementos);
            // Se agrega la opcion por defaul con valor -1
            const default_option = 'Seleccione una opción';
            let option = document.createElement('option');
            option.innerText = default_option;
            option.value = -1;
            combo.add(option)
            elementos.data.forEach(elemento => {
                // Se rellena el objeto con los valores obtenidos
                let option = document.createElement('option');
                option.innerText = Object.values(elemento)[1].toString();
                option.value = Object.values(elemento)[1].toString();
                option.id = Object.values(elemento)[0].toString();
                combo.add(option)
            });
        });
}
 function fillComboWithObjectByUrlInverted(combo, url) {

    // Validacion en caso de que el elemento no sea un select
    if (combo.tagName !== 'SELECT') {
        return console.error("[ FUNCION fillComboWithObject ] El elemento que se ha pasado por parametro NO es un SELECT");
    }

    // Comenzamos por vaciar el contenido actual
    combo.innerHTML = '';
    // Ontenemos los datos correspondientes de la URL
    fetch(url)
        .then(response => response.json())
        .then(json => json)
        .then(elementos => {
            console.log(elementos);
            // Se agrega la opcion por defaul con valor -1
            const default_option = 'Seleccione una opción';
            let option = document.createElement('option');
            option.innerText = default_option;
            option.value = -1;
            combo.add(option)
            elementos.data.forEach(elemento => {
                // Se rellena el objeto con los valores obtenidos
                let option = document.createElement('option');
                option.innerText = Object.values(elemento)[0].toString();
                option.value = Object.values(elemento)[0].toString();
                option.id = Object.values(elemento)[1].toString();
                combo.add(option)
            });
        });
}





$.fn.dataTable.ext.search.push(
    function( settings, data, dataIndex ) {
        const min = minDate.val();
        const max = maxDate.val();
        const date = new Date(data[2]);

        return (min === null && max === null) ||
            (min === null && date <= max) ||
            (min <= date && max === null) ||
            (min <= date && date <= max);

    }
);

$(document).ready(function() {
    // Create date inputs
    minDate = new DateTime($('#min'), {
        format: 'YYYY-MM-YY'
    });
    maxDate = new DateTime($('#max'), {
        format: 'YYYY-MM-YY'
    });

    // if(tablaRequisiciones != null)
    //     tablaRequisiciones.destroy();

    // DataTables initialisation
    // var table = $('#tabla-requisiciones').DataTable();
    // console.log(minDate, maxDate)

    // Refilter the table
    $('#min, #max').on('change', function () {
        tablaRequisiciones.draw();
    });
});
