const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API GanaControl',
      version: '1.0.0',
      description: 'Documentación de la API backend de GanaControl'
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor local'
      }
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT'
        }
      },
      schemas: {
        LoginRequest: {
          type: 'object',
          required: ['correo', 'contrasena'],
          properties: {
            correo: {
              type: 'string',
              example: 'jair.qek@gmail.com'
            },
            contrasena: {
              type: 'string',
              example: '123456789'
            }
          }
        },
        RefreshRequest: {
          type: 'object',
          required: ['refreshToken'],
          properties: {
            refreshToken: {
              type: 'string',
              example: 'eyJhbGciOiJIUzI1NiIs...'
            }
          }
        },
        ForgotPasswordRequest: {
          type: 'object',
          required: ['correo'],
          properties: {
            correo: {
              type: 'string',
              example: 'jair.qek@gmail.com'
            }
          }
        },
        ResetPasswordRequest: {
          type: 'object',
          required: ['token', 'nuevaContrasena'],
          properties: {
            token: {
              type: 'string',
              example: 'abc123token'
            },
            nuevaContrasena: {
              type: 'string',
              example: '123456789'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            ok: { type: 'boolean', example: false },
            mensaje: { type: 'string', example: 'Error en el servidor' },
            data: { nullable: true, example: null },
            errores: { nullable: true, example: null }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec };