import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import { register } from './register.controller'
import { createCloudinaryStorage } from '@/utils/storage'
import { authenticateAdminController } from './authenticate.controller'
import { getAdminProfile } from './get.admin.profile.controller'
import { getAllAdmins } from './get.all.admins.controller'
import { deleteAdminController } from './delete.admin.controller'
import { update } from './update.admin.controller'

const upload = multer({
  storage: createCloudinaryStorage(),
})

export async function adminsRoutes(app: FastifyInstance) {
  app.post('/admins', { preHandler: upload.single('avatar') }, register)
  app.post('/admins/sessions', authenticateAdminController)
  app.get('/admins/:adminId', getAdminProfile)
  app.put('/admins/:adminId', { preHandler: upload.single('avatar') }, update)
  app.get('/admins', getAllAdmins)
  app.delete('/admins/:adminId', deleteAdminController)
}
