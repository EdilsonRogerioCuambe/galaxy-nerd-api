import { FastifyInstance } from 'fastify'
import { createProblemController } from './create.problem.controller'
import { getProblemByLessonIdController } from './get.problem.by.lesson.id.controller'

export async function problemsRoutes(app: FastifyInstance) {
  app.post('/problems', createProblemController)
  app.get('/problems/:lessonId', getProblemByLessonIdController)
}
