import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import { createCloudinaryStorage } from '@/utils/storage'
import { registerCourseController } from './register.course.controller'

const upload = multer({
  storage: createCloudinaryStorage(),
})

export async function coursesRoutes(app: FastifyInstance) {
  app.post(
    '/courses',
    { preHandler: upload.single('thumbnail') },
    registerCourseController,
  )
}
