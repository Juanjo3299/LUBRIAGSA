const modalEditarProducto = new bootstrap.Modal(document.getElementById('modalEditarProductos'), {});
const selectProveedor = document.getElementById('select-proveedor');
const selectProveedores = document.getElementById('select-proveedores');
const selectCheckbox = document.getElementById('select-checkbox');
const btnEstablecer = document.getElementById('btn-establecer');

const varFolio = document.getElementById('invisible');
// Inputs
const precioProducto = document.getElementById('input-nuevo-costo');
const porcentajeDescuento = document.getElementById('input-descuento');
localStorage.clear();
const proveedores = [];
let datosProductos = [];
const proveedoresByProducto = []
let globalTotales = []
console.log(varFolio.innerText);
let orden = null;

// Funcion para rellenar la table
let tablaRequisiciones = null;
let tablaResumen = null;
let pvActual = {
    DESCUENTO: 0,
    PRODUCTO: "",
    PROVEEDOR_DESCRIPCION: "",
    clave_interna: "",
    codigo_lubri: "",
    idTemporal: "",
};
let rowDataTable;

let idTemp = 0;
let minDate, maxDate;
let idTempoActual = null;
let idProductosCadena = '';


function llenarTablaRequisiciones(data) {

    if (tablaRequisiciones != null)
        tablaRequisiciones.destroy();

    tablaRequisiciones = $("#tabla-requisiciones").DataTable({
        ordering: false,
        searching: true,
        scrollX: true,
        "language": language,
        data: data,
        columns: [
            {
                data: "idTemporal",
                render: (data) => `<input disabled="disabled" type="checkbox" id="select-checkbox-${data}" name="requisiciones"/>`
            },
            {data: "FOLIO"},
            {data: "PRODUCTO"},
            {data: "Pr_Descripcion"},
            {data: "CANTIDAD"},
            {data: "PROVEEDOR"},
            {data: "PROVEEDOR_DESCRIPCION"},
            {data: "ULTIMO_PRECIO", className: 'editable'},
            {data: "%DESCUENTO"},
            {data: "precio_final", render: (data) => `<div style="width: 100px">${data}</div>`},
            {data: "importe", render: (data) => `<div style="width: 100px">${data}</div>`},
            // {render: () => `<input type="text" style="width: 100px;" value="0" name="precio_final"/>`},
            // {render: () => `<input type="text" style="width: 100px" id="importe" value="0"  name="importe" />`},
            {
                data: "idTemporal",
                render: (data) => `<input id="${data}" class="table-button" type="button" name="accion" value="ACCION"/>`
            }
        ],
    })

    addEventsToButtons();


}

function llenarTablaResumen(folios) {
    if (tablaResumen != null)
        tablaResumen.destroy();

    let acumuladorImporte = 0, acumuladorCantidad = 0;
    first = false;
    let proveedores = getProveedores(folios)
    proveedores.map((p) => {
        acumuladorImporte = 0;
        acumuladorCantidad = 0;
        folios.map(row => {
            if (p.PROVEEDOR === row.PROVEEDOR) {
                acumuladorImporte += parseFloat(row.importe);
                acumuladorCantidad += parseFloat(row.CANTIDAD)
            }
        })
        globalTotales.push({
            CVE_PROVEEDOR: p.PROVEEDOR_DESCRIPCION,
            PROVEEDOR: p.PROVEEDOR,
            CANTIDAD: acumuladorCantidad, //TODO: sumas las piezas
            IMPORTE: acumuladorImporte.toFixed(2)
        })
    })

    tablaResumen = $("#tabla-resumen").DataTable({
        ordering: false,
        searching: false,
        paginate: false,
        // scrollX: true,
        "language": language,
        data: globalTotales,
        columns: [
            {data: "CVE_PROVEEDOR"},
            {data: "PROVEEDOR"},
            {data: "CANTIDAD"},
            {data: "IMPORTE"},
        ],
    })

}

selectProveedor.addEventListener('change', () => {
    // if (selectProveedor.value !== '-1') {
    console.log(proveedores)
    let pvActualTemp = proveedores.find(item => item.PROVEEDOR_DESCRIPCION === selectProveedor.value)
    porcentajeDescuento.value = pvActualTemp.DESCUENTO;
    console.log(pvActualTemp)
    console.log('cambio algo')
    // }

})

selectProveedores.addEventListener('change', () => {
    let pvActualTemp = selectProveedores.value;
    let datosTabla = JSON.parse(localStorage.getItem('table'));
    const tableData = $('#tabla-requisiciones').DataTable().rows().data().toArray();
    tableData.forEach(d => {
        document.querySelector('#select-checkbox-' + d.idTemporal).disabled = 'disabled';
    })
    if (pvActualTemp !== 'Seleccione una opción') {
        //console.log(proveedoresByProducto)
        datosTabla.forEach(r => {
            if (r.PROVEEDOR_DESCRIPCION === pvActualTemp) {
                document.querySelector('#select-checkbox-' + r.idTemporal).removeAttribute('disabled');
            } else {
                proveedoresByProducto.forEach(element => {
                    if (element.PROVEEDOR_DESCRIPCION === pvActualTemp && r.PRODUCTO === element.clave_interna) {
                        document.querySelector('#select-checkbox-' + r.idTemporal).removeAttribute('disabled');
                    }
                })
            }
        })

        // proveedoresByProducto.forEach(element => {
        //     let pTemp = tableData.find(e => e.PRODUCTO === element.clave_interna)
        //     let i = 0;
        //     if (element.PROVEEDOR_DESCRIPCION === pvActualTemp) {
        //         tableData.forEach(d => {
        //             if (d.PROVEEDOR_DESCRIPCION === element.PROVEEDOR_DESCRIPCION) {
        //                 document.querySelector('#select-checkbox-' + d.idTemporal).removeAttribute('disabled');
        //                 // document.querySelector('#select-checkbox-' + d.idTemporal).disabled = 'disabled';
        //             }else{
        //                 datosProductos.forEach(dp => {
        //                     if (dp.PROVEEDOR_DESCRIPCION === pvActualTemp) {
        //                         document.querySelector('#select-checkbox-' + d.idTemporal).removeAttribute('disabled');
        //                     }
        //                 })
        //                 if (element.idTemporal === 'null' && d.PRODUCTO === element.clave_interna)
        //                     document.querySelector('#select-checkbox-' + d.idTemporal).removeAttribute('disabled');
        //             }
        //         })
        //     }
        // })
    }
})

function addEventsToButtons() {
    $('.table-button').click(function (e) {
        idTemp = this.id;
        // console.log(this.id)
        let tableData = $("#tabla-requisiciones").DataTable();
        let data = tableData.row($($(this).parents('tr'))).data();
        localStorage.setItem('row', JSON.stringify(data))
        precioProducto.value = data.ULTIMO_PRECIO;
        porcentajeDescuento.value = data["%DESCUENTO"];
        const idProducto = data.PRODUCTO;
        idTempoActual = data.idTemporal;
        console.log(idProducto)
        fillComboWithObjectByUrlInverted(selectProveedor, '/lubriagsa/procesos/findAllProveedoresByProducto.do', idProducto);
        modalEditarProducto.show();
    });
    // $('#select-checkbox').click(function (e) {
    //     const rows = $(tablaRequisiciones.$('input[type="checkbox"]:checked').map(function () {
    //         return $(this).closest('tr');
    //     }));
    //     let cveProductos = [];
    //     rows.each((i, item) => {
    //         console.log(item[0].innerText.substr(12, 10))
    //         cveProductos.push(item[0].innerText.substr(12, 10))
    //     })
    // })
}

$('#btn-establecer').click(function () {
    globalTotales = []
    const rows = $(tablaRequisiciones.$('input[type="checkbox"]:checked').map(function () {
        return $(this).closest('tr');
    }));
    let idTemps;
    const tableData = $('#tabla-requisiciones').DataTable().rows().data().toArray();
    pvActual = proveedoresByProducto.find(e => e.PROVEEDOR_DESCRIPCION === selectProveedores.value)
    console.log(proveedoresByProducto)
    console.log(proveedores)
    rows.each((i, item) => {
        //console.log(item[0].innerText)
        idTemps = item[0].innerHTML.substring(47, 48);
        console.log(item[0].innerHTML.substring(47, 48))
        tableData.map((element) => {
            if (element.idTemporal === parseInt(idTemps)) {
                let precioFinal = element.ULTIMO_PRECIO;
                if (pvActual.DESCUENTO > 0) {
                    precioFinal = parseFloat(element.ULTIMO_PRECIO) - (parseFloat(element.ULTIMO_PRECIO) * parseFloat(element.DESCUENTO) / 100);
                }
                element.PROVEEDOR_DESCRIPCION = selectProveedores.value;
                element.PROVEEDOR = pvActual.CVE_PROVEEDOR
                element['%DESCUENTO'] = pvActual.DESCUENTO
                element.precio_final = precioFinal
                element.importe = getImporte(element.CANTIDAD, element.ULTIMO_PRECIO, pvActual.DESCUENTO);
                console.log('entra')
                /*                element.ULTIMO_PRECIO = ULTIMO_PRECIO.value;
                                element["%DESCUENTO"] = descuento.value;
                                element.precio_final = precioFinal;
                                element.importe = getImporte(element.CANTIDAD, ULTIMO_PRECIO.value, descuento.value)
                                console.log(getImporte(element.CANTIDAD, ULTIMO_PRECIO.value, descuento.value))*/
            }
        })
        document.querySelector('#' + item[0].innerHTML.substring(31, 48)).removeAttribute('disabled');
    })
    llenarTablaRequisiciones(tableData);
    llenarTablaResumen(tableData);
})

$('#btnGuardarProducto').click(function () {
    globalTotales = []
    let data = JSON.parse(localStorage.getItem('row'));
    console.log(data)
    const ULTIMO_PRECIO = document.getElementById('input-nuevo-costo');
    const descuento = document.getElementById('input-descuento');
    const tableData = $('#tabla-requisiciones').DataTable().rows().data().toArray();
    const precioFinal = parseFloat(ULTIMO_PRECIO.value) - (parseFloat(ULTIMO_PRECIO.value) * parseFloat(descuento.value) / 100);
    let pvActualTemp = proveedoresByProducto.find(d => d.PROVEEDOR_DESCRIPCION === selectProveedor.value && d.clave_interna === data.PRODUCTO)

    tableData.map((element) => {
        if (element.idTemporal === idTempoActual) {
            element.PROVEEDOR = pvActualTemp.CVE_PROVEEDOR
            element.PROVEEDOR_DESCRIPCION = pvActualTemp.PROVEEDOR_DESCRIPCION
            element.ULTIMO_PRECIO = ULTIMO_PRECIO.value;
            element["%DESCUENTO"] = descuento.value;
            element.precio_final = precioFinal;
            element.importe = getImporte(element.CANTIDAD, ULTIMO_PRECIO.value, descuento.value)
            console.log(getImporte(element.CANTIDAD, ULTIMO_PRECIO.value, descuento.value))
        }
    })
    llenarTablaResumen(tableData)
    llenarTablaRequisiciones(tableData)
    modalEditarProducto.hide();
    console.log('Entro al guardar')
})

// Metodos ajax
$.ajax('/lubriagsa/procesos/findDetRequisiciones.do', {
    method: 'GET',
    dataType: 'json',
    timeout: 0,
    data: {
        folios: varFolio.innerText
    }

}).done((response) => {
    let folios = getDatosTablaResumen(response.data);
    datosProductos = response.data;
    localStorage.setItem('table', JSON.stringify(folios));
    localStorage.setItem('folios', JSON.stringify(folios));
    //console.log(idProductos)
    getProveedoresByProducto(idProductosCadena, selectProveedores)
    llenarTablaResumen(folios);
    llenarTablaRequisiciones(getDatosTablaResumen(response.data));
})

function getProveedoresByProducto(idProductos, combo) {
    $.ajax('/lubriagsa/procesos/findAllProveedoresByProducto.do', {
        method: 'GET',
        dataType: 'json',
        timeout: 0,
        data: {
            idProducto: idProductos
        },
        success: (response) => {
            const tableData = $('#tabla-requisiciones').DataTable().rows().data().toArray();
            getProveedores(tableData).forEach(e => {
                proveedoresByProducto.push({
                        DESCUENTO: e['%DESCUENTO'],
                        CVE_PROVEEDOR: e.PROVEEDOR,
                        PRODUCTO: e.Pr_Descripcion,
                        PROVEEDOR_DESCRIPCION: e.PROVEEDOR_DESCRIPCION,
                        clave_interna: e.PRODUCTO,
                        codigo_lubri: "null",
                        idTemporal: e.idTemporal
                    }
                )
            })
            response.data.forEach(d => {
                proveedoresByProducto.push({
                    DESCUENTO: d['DESCUENTO'],
                    CVE_PROVEEDOR: d.CVE_PROVEEDOR,
                    PRODUCTO: d.PRODUCTO,
                    PROVEEDOR_DESCRIPCION: d.PROVEEDOR_DESCRIPCION,
                    clave_interna: d.clave_interna,
                    codigo_lubri: d.codigo_lubri,
                    idTemporal: 'null'
                })
            })
            // Comenzamos por vaciar el contenido actual
            combo.innerHTML = '';
            const default_option = 'Seleccione una opción';
            let option = document.createElement('option');
            option.innerText = default_option;
            option.value = -1;
            combo.add(option)
            getProveedores(proveedoresByProducto).forEach(elemento => {
                // Se rellena el objeto con los valores obtenidos
                let option = document.createElement('option');
                option.innerText = Object.values(elemento)[3].toString();
                option.value = Object.values(elemento)[3].toString();
                option.id = Object.values(elemento)[1].toString();
                combo.add(option)
            });
        }
    })
}

function getProveedores(proveedores) {
    let proveedoresTemp = []
    proveedores.map(p => {
        if (!proveedoresTemp.find(e => {
            return e.PROVEEDOR_DESCRIPCION === p.PROVEEDOR_DESCRIPCION;
        })) {
            proveedoresTemp.push(p)
        }
    })
    return proveedoresTemp;
}

function getImporte(cantidad, precio, descuento) {
    let importe = 0;
    if ((parseFloat(descuento)) > 0) {
        importe = (parseFloat(precio) - (parseFloat(precio) * (parseFloat(descuento))) / 100) * parseFloat(cantidad);
        return importe.toFixed(2);
    } else if (cantidad === 1) {
        importe = precio;
        return importe.toFixed(2)
    }
    importe = precio * cantidad;
    return importe.toFixed(2)
}

function getDatosTablaResumen(folios) {
    let precioFinal;
    idProductosCadena = '';
    folios.map((element, i) => {
        if (element['%DESCUENTO'] > 0) {
            precioFinal = element.ULTIMO_PRECIO - (element.ULTIMO_PRECIO * element['%DESCUENTO'] / 100)
        } else {
            precioFinal = element.ULTIMO_PRECIO
        }
        element["precio_final"] = precioFinal;
        element["importe"] = getImporte(element.CANTIDAD, precioFinal, element.DESCUENTO);
        element["idTemporal"] = i + 1;
        if (i + 1 === folios.length)
            idProductosCadena += `'${element.PRODUCTO}'`;
        else
            idProductosCadena += `'${element.PRODUCTO}',`;
    });
    return folios;
}

function fillComboWithObjectByUrlInverted(combo, url, idProducto) {
    $.ajax(url, {
        method: 'GET',
        dataType: 'json',
        timeout: 0,
        data: {
            idProducto: "'" + idProducto + "'"
        }

    }).done((response) => {
        console.log(response.data)
        response.data.map(d => {
            proveedores.push(d)
        })
        console.log(proveedores)
        if (combo.tagName !== 'SELECT') {
            return console.error("[ FUNCION fillComboWithObject ] El elemento que se ha pasado por parametro NO es un SELECT");
        }

        // Comenzamos por vaciar el contenido actual
        combo.innerHTML = '';
        const default_option = 'Seleccione una opción';
        let option = document.createElement('option');
        let data = JSON.parse(localStorage.getItem('row'))
        option.innerText = data.PROVEEDOR_DESCRIPCION;
        option.value = data.PROVEEDOR_DESCRIPCION;
        combo.add(option)
        response.data.forEach(elemento => {
            if (elemento.PROVEEDOR_DESCRIPCION !== data.PROVEEDOR_DESCRIPCION){
                // Se rellena el objeto con los valores obtenidos
                console.log(elemento)
                let option = document.createElement('option');
                option.innerText = Object.values(elemento)[4].toString();
                option.value = Object.values(elemento)[4].toString();
                option.id = Object.values(elemento)[2].toString();
                combo.add(option)
            }
        });
    })

    // Validacion en caso de que el elemento no sea un select
    // if (combo.tagName !== 'SELECT') {
    //     return console.error("[ FUNCION fillComboWithObject ] El elemento que se ha pasado por parametro NO es un SELECT");
    // }
    //
    // // Comenzamos por vaciar el contenido actual
    // combo.innerHTML = '';
    // Ontenemos los datos correspondientes de la URL
    // fetch(url)
    //     .then(response => response.json())
    //     .then(json => json)
    //     .then(elementos => {
    //         console.log(elementos);
    //         // Se agrega la opcion por defaul con valor -1
    //         const default_option = 'Seleccione una opción';
    //         let option = document.createElement('option');
    //         option.innerText = default_option;
    //         option.value = -1;
    //         combo.add(option)
    //         elementos.data.forEach(elemento => {
    //             // Se rellena el objeto con los valores obtenidos
    //             let option = document.createElement('option');
    //             option.innerText = Object.values(elemento)[0].toString();
    //             option.value = Object.values(elemento)[0].toString();
    //             option.id = Object.values(elemento)[1].toString();
    //             combo.add(option)
    //         });
    //     });
}

$.fn.dataTable.ext.search.push(
    function (settings, data, dataIndex) {
        const min = minDate.val();
        const max = maxDate.val();
        const date = new Date(data[2]);

        return (min === null && max === null) ||
            (min === null && date <= max) ||
            (min <= date && max === null) ||
            (min <= date && date <= max);

    }
);
$(document).ready(function () {

    $('#tabla-requisiciones').on('click', 'tbody td.editable', function (e) {
        editor.inline(this);
    });
    $('#tabla-requisiciones tbody').on('click', 'tr', function () {
        console.log('hola')
        $(this).toggleClass('selected');
        //document.getElementById("select-checkbox").checked = true;
    });
    $('#button').click(function () {
        alert(tablaRequisiciones.rows('.selected').data().length + ' row(s) selected');
        console.log(tablaRequisiciones.rows('.selected').data())
    });
    // Create date inputs
    minDate = new DateTime($('#min'), {
        format: 'YYYY-MM-YY'
    });
    maxDate = new DateTime($('#max'), {
        format: 'YYYY-MM-YY'
    });

    // Refilter the table
    $('#min, #max').on('change', function () {
        tablaRequisiciones.draw();
    });
});


