import { FastifyInstance } from 'fastify'
import { upvoteAnswerController } from './upvote.answer.controller'
import { downvoteAnswerController } from './downvote.answer.controller'

export async function votesRoutes(app: FastifyInstance) {
  app.post('/answers/:id/upvote', upvoteAnswerController)
  app.post('/answers/:id/downvote', downvoteAnswerController)
}
