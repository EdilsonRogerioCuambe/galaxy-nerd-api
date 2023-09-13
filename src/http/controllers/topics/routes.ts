import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import { createCloudinaryStorage } from '@/utils/storage'
import { registerTopicController } from './register.topic.controller'
import { updateTopicController } from './update.topic.controller'
import { getTopicController } from './get.topic.controller'
import { getAllTopicsController } from './get.all.topics.controller'

const upload = multer({
  storage: createCloudinaryStorage(),
})

export async function topicsRoutes(app: FastifyInstance) {
  app.post(
    '/topics',
    { preHandler: upload.single('icon') },
    registerTopicController,
  )
  app.get('/topics/:id', getTopicController)
  app.get('/topics', getAllTopicsController)
  app.put(
    '/topics/:id',
    { preHandler: upload.single('icon') },
    updateTopicController,
  )
}
