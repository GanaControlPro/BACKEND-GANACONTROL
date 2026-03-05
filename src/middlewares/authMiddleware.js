const mod = require('./authJwt');
module.exports = typeof mod === 'function' ? mod : mod.authJwt;