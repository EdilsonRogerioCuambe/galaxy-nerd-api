import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import { authenticateInstructorController } from './authenticate.controller'
import { createCloudinaryStorage } from '@/utils/storage'
import { register } from './register.controller'

const upload = multer({
  storage: createCloudinaryStorage(),
})

export async function instructorsRoutes(app: FastifyInstance) {
  app.post('/instructors/sessions', authenticateInstructorController)
  app.post('/instructors', { preHandler: upload.single('avatar') }, register)
}
