import { FastifyInstance } from 'fastify'
import { createAnswerController } from './create.anwser.controller'
import { getChildrenAnswersController } from './get.children.answers.controller'
import { getAllAnswersController } from './get.all.answers.controller'
import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { updateAnswerController } from './update.anwer.controller'
import { getAnswersByForumIdController } from './get.answers.by.forum.is.controller'

export async function answersRoutes(app: FastifyInstance) {
  app.post('/answers', createAnswerController)
  app.get(
    '/answers/:id/children/:forumId',
    {
      onRequest: [verifyJwt],
    },
    getChildrenAnswersController,
  )
  app.get('/answers/:forumId', getAnswersByForumIdController)
  app.get(
    '/answers',
    {
      onRequest: [verifyJwt],
    },
    getAllAnswersController,
  )
  app.put('/answers/:id', updateAnswerController)
}
