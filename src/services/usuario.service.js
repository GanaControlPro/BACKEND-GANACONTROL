const { Usuario, Rol, Finca } = require('../models');
const bcrypt = require('bcryptjs');

class UsuarioService {
  async crear(data) {
    const existeRol = await Rol.findByPk(data.rol_id);
    if (!existeRol) {
      throw new Error('El rol no existe');
    }

    const existeFinca = await Finca.findByPk(data.finca_id);
    if (!existeFinca) {
      throw new Error('La finca no existe');
    }

    const existeCorreo = await Usuario.findOne({
      where: { correo: data.correo }
    });

    if (existeCorreo) {
      throw new Error('El correo ya está registrado');
    }

    const hash = await bcrypt.hash(data.contrasena, 10);

    const usuario = await Usuario.create({
      ...data,
      contrasena: hash
    });

    return await Usuario.findByPk(usuario.id, {
      attributes: { exclude: ['contrasena'] },
      include: [
        { model: Rol, as: 'rol' },
        { model: Finca, as: 'finca' }
      ]
    });
  }

  async listar() {
    return await Usuario.findAll({
      attributes: { exclude: ['contrasena'] },
      include: [
        { model: Rol, as: 'rol' },
        { model: Finca, as: 'finca' }
      ]
    });
  }

  async obtenerPorId(id) {
    return await Usuario.findByPk(id, {
      attributes: { exclude: ['contrasena'] },
      include: [
        { model: Rol, as: 'rol' },
        { model: Finca, as: 'finca' }
      ]
    });
  }

  async actualizar(id, data) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;

    if (data.rol_id) {
      const existeRol = await Rol.findByPk(data.rol_id);
      if (!existeRol) {
        throw new Error('El rol no existe');
      }
    }

    if (data.finca_id) {
      const existeFinca = await Finca.findByPk(data.finca_id);
      if (!existeFinca) {
        throw new Error('La finca no existe');
      }
    }

    if (data.correo && data.correo !== usuario.correo) {
      const existeCorreo = await Usuario.findOne({
        where: { correo: data.correo }
      });
      if (existeCorreo) {
        throw new Error('El correo ya está registrado');
      }
    }

    if (data.contrasena) {
      data.contrasena = await bcrypt.hash(data.contrasena, 10);
    }

    await usuario.update(data);

    return await Usuario.findByPk(id, {
      attributes: { exclude: ['contrasena'] },
      include: [
        { model: Rol, as: 'rol' },
        { model: Finca, as: 'finca' }
      ]
    });
  }

  async eliminar(id) {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) return null;

    await usuario.destroy();
    return true;
  }
}

module.exports = new UsuarioService();