import { FastifyInstance } from 'fastify'
import { createQuizController } from './create.quiz.controller'
import { getQuizzesByLessonIdController } from './get.quizzes.by.lesson.is.use.case'

export default async function quizzesRoutes(fastify: FastifyInstance) {
  fastify.post('/quizzes', createQuizController)
  fastify.get('/quizzes/:lessonId', getQuizzesByLessonIdController)
}
