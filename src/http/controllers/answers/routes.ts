import { FastifyInstance } from 'fastify'
import { createAnswerController } from './create.anwser.controller'
import { getChildrenAnswersController } from './get.children.answers.controller'
import { getAllAnswersController } from './get.all.answers.controller'
import { verifyJwt } from '@/http/middlewares/verify.jwt'

export async function answersRoutes(app: FastifyInstance) {
  app.post('/answers', createAnswerController)
  app.get(
    '/answers/:id/children',
    {
      onRequest: [verifyJwt],
    },
    getChildrenAnswersController,
  )
  app.get(
    '/answers',
    {
      onRequest: [verifyJwt],
    },
    getAllAnswersController,
  )
}
