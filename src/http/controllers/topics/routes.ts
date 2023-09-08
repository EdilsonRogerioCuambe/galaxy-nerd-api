import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import { createCloudinaryStorage } from '@/utils/storage'
import { registerTopicController } from './register.topic.controller'

const upload = multer({
  storage: createCloudinaryStorage(),
})

export async function topicsRoutes(app: FastifyInstance) {
  app.post(
    '/topics',
    { preHandler: upload.single('icon') },
    registerTopicController,
  )
}
