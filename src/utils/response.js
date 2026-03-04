function ok(res, { mensaje = 'OK', data = null, code = 200 } = {}) {
  return res.status(code).json({ ok: true, mensaje, data, errores: null });
}

function fail(res, { mensaje = 'Error', errores = null, code = 400 } = {}) {
  return res.status(code).json({ ok: false, mensaje, data: null, errores });
}

module.exports = { ok, fail };