import { FastifyInstance } from 'fastify'
import { createForumController } from './create.forum.controller'
import { verifyJwt } from '@/http/middlewares/verify.jwt'

export async function forumsRoutes(app: FastifyInstance) {
  app.post(
    '/forums/:lessonId/:studentId',
    {
      onRequest: [verifyJwt],
    },
    createForumController,
  )
}
