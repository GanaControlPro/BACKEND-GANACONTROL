function validate(schema) {
  return async (req, res, next) => {
    try {
      const data = await schema.validateAsync(req.body, {
        abortEarly: false,
        stripUnknown: true
      });
      req.body = data;
      next();
    } catch (e) {
      next(e);
    }
  };
}

module.exports = { validate };