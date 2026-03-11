function validate(schema) {
  return async (req, res, next) => {
    try {
      const data = await schema.validateAsync(req.body, {
        abortEarly: false,
        stripUnknown: true
      });

      req.body = data;
      next();

    } catch (err) {

      if (err.isJoi) {
        return res.status(400).json({
          ok: false,
          mensaje: "Validación fallida",
          data: null,
          errores: err.details.map(d => ({
            campo: d.path.join('.'),
            mensaje: d.message
          }))
        });
      }

      next(err);
    }
  };
}

module.exports = { validate };