import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import { register } from './register.controller'
import { createCloudinaryStorage } from '@/utils/storage'
import { authenticateAdminController } from './authenticate.controller'
import { getAdminProfile } from './get.admin.profile.controller'
import { getAllAdmins } from './get.all.admins.controller'
import { deleteAdminController } from './delete.admin.controller'
import { update } from './update.admin.controller'
import { profileAdminController } from './profile.controller'
import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { verifyUserRole } from '@/http/middlewares/verify.user.role'

const upload = multer({
  storage: createCloudinaryStorage(),
})

export async function adminsRoutes(app: FastifyInstance) {
  const registerSchema = {
    schema: {
      tags: ['Admins'],
      description: 'Register a new admin',
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Admin name' },
          email: {
            type: 'string',
            format: 'email',
            description: 'Admin email',
          },
          password: { type: 'string', description: 'Admin password' },
          role: {
            type: 'string',
            enum: ['ADMIN', 'INSTRUCTOR', 'STUDENT'],
            description: 'Role of the user',
          },
          biography: {
            type: 'string',
            description: 'Biography of the user',
          },
          location: {
            type: 'string',
            description: 'Location of the user',
          },
          socialLinks: {
            type: 'array',
            items: { type: 'string' },
            description: 'Social links of the user',
          },
        },
        required: ['name', 'email', 'password'],
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Admin ID' },
            name: { type: 'string', description: 'Admin name' },
            email: {
              type: 'string',
              format: 'email',
              description: 'Admin email',
            },
            role: {
              type: 'string',
              enum: ['ADMIN', 'INSTRUCTOR', 'STUDENT'],
              description: 'Role of the user',
            },
            biography: {
              type: 'string',
              description: 'Biography of the user',
            },
            location: {
              type: 'string',
              description: 'Location of the user',
            },
            socialLinks: {
              type: 'array',
              items: { type: 'string' },
              description: 'Social links of the user',
            },
            avatar: {
              type: 'string',
              description: 'Avatar of the user',
            },
          },
        },
      },
    },
  }

  const authenticateSchema = {
    schema: {
      tags: ['Admins'],
      description: 'Authenticate an admin',
      body: {
        type: 'object',
        properties: {
          email: {
            type: 'string',
            format: 'email',
            description: 'Admin email',
          },
          password: { type: 'string', description: 'Admin password' },
        },
        required: ['email', 'password'],
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            admin: {
              type: 'object',
              properties: {
                id: { type: 'string', description: 'Admin ID' },
                name: { type: 'string', description: 'Admin name' },
                email: {
                  type: 'string',
                  format: 'email',
                  description: 'Admin email',
                },
                role: {
                  type: 'string',
                  enum: ['ADMIN', 'INSTRUCTOR', 'STUDENT'],
                  description: 'Role of the user',
                },
                biography: {
                  type: 'string',
                  description: 'Biography of the user',
                },
                location: {
                  type: 'string',
                  description: 'Location of the user',
                },
                socialLinks: {
                  type: 'array',
                  items: { type: 'string' },
                  description: 'Social links of the user',
                },
                avatar: {
                  type: 'string',
                  description: 'Avatar of the user',
                },
              },
            },
          },
        },
      },
    },
  }

  const updateSchema = {
    schema: {
      tags: ['Admins'],
      description: 'Update an admin',
      body: {
        type: 'object',
        properties: {
          name: { type: 'string', description: 'Admin name' },
          email: {
            type: 'string',
            format: 'email',
            description: 'Admin email',
          },
          password: { type: 'string', description: 'Admin password' },
          role: {
            type: 'string',
            enum: ['ADMIN', 'INSTRUCTOR', 'STUDENT'],
            description: 'Role of the user',
          },
          biography: {
            type: 'string',
            description: 'Biography of the user',
          },
          location: {
            type: 'string',
            description: 'Location of the user',
          },
          socialLinks: {
            type: 'array',
            items: { type: 'string' },
            description: 'Social links of the user',
          },
        },
      },
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Admin ID' },
            name: { type: 'string', description: 'Admin name' },
            email: {
              type: 'string',
              format: 'email',
              description: 'Admin email',
            },
            role: {
              type: 'string',
              enum: ['ADMIN', 'INSTRUCTOR', 'STUDENT'],
              description: 'Role of the user',
            },
            biography: {
              type: 'string',
              description: 'Biography of the user',
            },
            location: {
              type: 'string',
              description: 'Location of the user',
            },
            socialLinks: {
              type: 'array',
              items: { type: 'string' },
              description: 'Social links of the user',
            },
            avatar: {
              type: 'string',
              description: 'Avatar of the user',
            },
          },
        },
      },
    },
  }

  const deleteSchema = {
    schema: {
      tags: ['Admins'],
      description: 'Delete an admin',
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Admin ID' },
            name: { type: 'string', description: 'Admin name' },
            email: {
              type: 'string',
              format: 'email',
              description: 'Admin email',
            },
            role: {
              type: 'string',
              enum: ['ADMIN', 'INSTRUCTOR', 'STUDENT'],
              description: 'Role of the user',
            },
            biography: {
              type: 'string',
              description: 'Biography of the user',
            },
            location: {
              type: 'string',
              description: 'Location of the user',
            },
            socialLinks: {
              type: 'array',
              items: { type: 'string' },
              description: 'Social links of the user',
            },
            avatar: {
              type: 'string',
              description: 'Avatar of the user',
            },
          },
        },
      },
    },
  }

  const getAdminProfileSchema = {
    schema: {
      tags: ['Admins'],
      description: 'Get admin profile',
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            id: { type: 'string', description: 'Admin ID' },
            name: { type: 'string', description: 'Admin name' },
            email: {
              type: 'string',
              format: 'email',
              description: 'Admin email',
            },
            role: {
              type: 'string',
              enum: ['ADMIN', 'INSTRUCTOR', 'STUDENT'],
              description: 'Role of the user',
            },
            biography: {
              type: 'string',
              description: 'Biography of the user',
            },
            location: {
              type: 'string',
              description: 'Location of the user',
            },
            socialLinks: {
              type: 'array',
              items: { type: 'string' },
              description: 'Social links of the user',
            },
            avatar: {
              type: 'string',
              description: 'Avatar of the user',
            },
          },
        },
      },
    },
  }

  const getAllAdminsSchema = {
    schema: {
      tags: ['Admins'],
      description: 'Get all admins',
      response: {
        200: {
          description: 'Successful response',
          type: 'object',
          properties: {
            admins: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: { type: 'string', description: 'Admin ID' },
                  name: { type: 'string', description: 'Admin name' },
                  email: {
                    type: 'string',
                    format: 'email',
                    description: 'Admin email',
                  },
                  role: {
                    type: 'string',
                    enum: ['ADMIN', 'INSTRUCTOR', 'STUDENT'],
                    description: 'Role of the user',
                  },
                  biography: {
                    type: 'string',
                    description: 'Biography of the user',
                  },
                  location: {
                    type: 'string',
                    description: 'Location of the user',
                  },
                  socialLinks: {
                    type: 'array',
                    items: { type: 'string' },
                    description: 'Social links of the user',
                  },
                  avatar: {
                    type: 'string',
                    description: 'Avatar of the user',
                  },
                },
              },
            },
          },
        },
      },
    },
  }

  app.post('/admins', { preHandler: upload.single('avatar') }, register)
  app.post('/admins/sessions', authenticateAdminController)
  app.get(
    '/admins/:adminId',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    getAdminProfile,
  )
  app.put(
    '/admins/:adminId',
    {
      preHandler: upload.single('avatar'),
      onRequest: [verifyJwt, verifyUserRole('ADMIN')],
    },
    update,
  )
  app.get(
    '/admins/me',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    profileAdminController,
  )
  app.get(
    '/admins/adminId',
    {
      onRequest: [verifyJwt, verifyUserRole('ADMIN')],
    },
    getAdminProfile,
  )
  app.get(
    '/admins',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    getAllAdmins,
  )
  app.delete(
    '/admins/:adminId',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    deleteAdminController,
  )
}
