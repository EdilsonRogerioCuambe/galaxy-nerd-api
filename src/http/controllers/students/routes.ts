import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import { createCloudinaryStorage } from '@/utils/storage'
import { register } from './register.student.controller'

const upload = multer({
  storage: createCloudinaryStorage(),
})

export async function studentsRoutes(app: FastifyInstance) {
  app.post('/students', { preHandler: upload.single('avatar') }, register)
}
