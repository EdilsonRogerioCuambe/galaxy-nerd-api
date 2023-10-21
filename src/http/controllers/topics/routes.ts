import { FastifyInstance } from 'fastify'
import { registerTopicController } from './register.topic.controller'
import { updateTopicController } from './update.topic.controller'
import { getTopicController } from './get.topic.controller'
import { getAllTopicsController } from './get.all.topics.controller'
import { deleteTopicController } from './delete.topic.controller'
import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { verifyUserRole } from '@/http/middlewares/verify.user.role'

export async function topicsRoutes(app: FastifyInstance) {
  app.post(
    '/topics',
    {
      onRequest: [verifyJwt, verifyUserRole('INSTRUCTOR')],
    },
    registerTopicController,
  )
  app.get('/topics/:id', { onRequest: [verifyJwt] }, getTopicController)
  app.get('/topics', { onRequest: [verifyJwt] }, getAllTopicsController)
  app.put(
    '/topics/:id',
    {
      onRequest: [verifyJwt, verifyUserRole('INSTRUCTOR')],
    },
    updateTopicController,
  )
  app.delete(
    '/topics/:id',
    { onRequest: [verifyJwt, verifyUserRole('INSTRUCTOR')] },
    deleteTopicController,
  )
}
