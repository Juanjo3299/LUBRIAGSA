<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>

<div class="modal fade" id="modalEditarProductos" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg modal-dialog-centered">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel" style="font-weight: bold">Editar Producto</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">

        <div class="modal-container">
          <div class="container-fluid">
            <div class="row">
              <label class="form-label" for="select-proveedor">Proveedor
                  <select class="form-control" id="select-proveedor">
                    <option>Selecciones una opcion</option>
                  </select>
              </label>
            </div>
            <div class="row">
              <label class="form-label" for="input-nuevo-costo">Actualizar Costo
                <input class="form-control" id="input-nuevo-costo" type="number" min="0" step="0.01" />
              </label>
            </div>
          </div>
          <div class="container-fluid">
            <div class="row">
              <label class="form-label" for="input-descuento">Descuento (%)
                <input class="form-control" id="input-descuento" type="number" step="0.01" value="0" min="0" max="100"/>
              </label>
            </div>
          </div>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" id="btnCloseModal" class="button button-rounded button-red" data-bs-dismiss="modal">Cancelar</button>
        <button type="button" id="btnGuardarProducto" class="button button-rounded button-green">Guardar</button>
      </div>
    </div>
  </div>
</div>
</html>
