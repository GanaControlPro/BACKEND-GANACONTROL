'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('finca', [{
      id: 1,
      nombre: 'La Ceiva',
      municipio: 'Pandi',
      departamento: 'Cundinamarca',
      propietario: 'Propietario Principal',
      prefijo_factura: 'FV',
      consecutivo_factura: 1
    }]);

    await queryInterface.bulkInsert('rol', [
      { id: 1, nombre: 'Administrador', descripcion: 'Acceso total' },
      { id: 2, nombre: 'Veterinario', descripcion: 'Eventos sanitarios y reproducción' },
      { id: 3, nombre: 'Operario', descripcion: 'Operación diaria' },
      { id: 4, nombre: 'Contador', descripcion: 'Ventas y reportes' }
    ]);

    const hash = await bcrypt.hash('Admin123*', 10);

    await queryInterface.bulkInsert('usuario', [{
      finca_id: 1,
      rol_id: 1,
      nombres: 'Admin',
      apellidos: 'GanaControl',
      correo: 'admin@ganacontrol.com',
      contrasena: hash,
      activo: true
    }]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('usuario', { correo: 'admin@ganacontrol.com' });
    await queryInterface.bulkDelete('rol', null, {});
    await queryInterface.bulkDelete('finca', { id: 1 });
  }
};