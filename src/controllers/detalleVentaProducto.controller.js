const service = require('../services/detalleVentaProducto.service');

class DetalleVentaProductoController {

  async getAll(req, res, next) {
    try {
      const data = await service.getAll();
      return res.status(200).json({
        ok: true,
        mensaje: 'Listado de detalle venta producto',
        data
      });
    } catch (error) {
      return next(error);
    }
  }

  async getById(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (!id) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Validación fallida',
          data: null,
          errores: [{ campo: 'id', mensaje: 'id inválido' }]
        });
      }

      const data = await service.getById(id);

      if (!data) {
        return res.status(404).json({
          ok: false,
          mensaje: 'Registro no encontrado',
          data: null,
          errores: [{ mensaje: 'No existe detalle con ese id' }]
        });
      }

      return res.status(200).json({
        ok: true,
        mensaje: 'Detalle encontrado',
        data
      });
    } catch (error) {
      return next(error);
    }
  }

  async create(req, res, next) {
    try {
      const data = await service.create(req.body);

      return res.status(201).json({
        ok: true,
        mensaje: 'Producto agregado a la venta',
        data
      });
    } catch (error) {
      const status = error.status || 500;

      if (status !== 500) {
        return res.status(status).json({
          ok: false,
          mensaje: 'Validación fallida',
          data: null,
          errores: [{ mensaje: error.message }]
        });
      }

      return next(error);
    }
  }

  async update(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (!id) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Validación fallida',
          data: null,
          errores: [{ campo: 'id', mensaje: 'id inválido' }]
        });
      }

      const data = await service.update(id, req.body);

      if (!data) {
        return res.status(404).json({
          ok: false,
         mensaje: 'Registro no encontrado',
          data: null,
          errores: [{ mensaje: 'No existe detalle con ese id' }]
        });
      }

      return res.status(200).json({
        ok: true,
        mensaje: 'Detalle actualizado',
        data
      });

    } catch (error) {
      const status = error.status || 500;

      if (status !== 500) {
        return res.status(status).json({
          ok: false,
          mensaje: 'Validación fallida',
          data: null,
          errores: [{ mensaje: error.message }]
        });
      }

      return next(error);
    }
  }

  async remove(req, res, next) {
    try {
      const id = Number(req.params.id);
      if (!id) {
        return res.status(400).json({
          ok: false,
          mensaje: 'Validación fallida',
          data: null,
          errores: [{ campo: 'id', mensaje: 'id inválido' }]
        });
      }

      const deleted = await service.remove(id);

      if (!deleted) {
        return res.status(404).json({
          ok: false,
          mensaje: 'Registro no encontrado',
          data: null,
          errores: [{ mensaje: 'No existe detalle con ese id' }]
        });
      }

      return res.status(200).json({
        ok: true,
        mensaje: 'Producto eliminado de la venta',
        data: true
      });

    } catch (error) {
      const status = error.status || 500;

      if (status !== 500) {
        return res.status(status).json({
          ok: false,
          mensaje: 'Validación fallida',
          data: null,
          errores: [{ mensaje: error.message }]
        });
      }

      return next(error);
    }
  }

}

module.exports = new DetalleVentaProductoController();