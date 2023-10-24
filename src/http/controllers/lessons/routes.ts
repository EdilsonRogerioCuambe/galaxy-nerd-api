import { FastifyInstance } from 'fastify'
import { registerLessonController } from './register.lesson.controller'
import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { verifyUserRole } from '@/http/middlewares/verify.user.role'
import { updateLessonController } from './update.lesson.controller'
import { getAllLessonsController } from './get.all.lessons.controller'
import { getLessonByIdController } from './get.lesson.by.id.controller'
import { getLessonBySlugController } from './get.lesson.by.slug.controller'

export async function lessonsRoutes(app: FastifyInstance) {
  app.post(
    '/lessons',
    {
      onRequest: [verifyJwt, verifyUserRole('INSTRUCTOR')],
    },
    registerLessonController,
  )
  app.put(
    '/lessons/:lessonId',
    {
      onRequest: [verifyJwt, verifyUserRole('INSTRUCTOR')],
    },
    updateLessonController,
  )
  app.get('/lessons', getAllLessonsController)
  app.get('/lessons/:lessonId', getLessonByIdController)
  app.get('/lessons/slug/:slug', getLessonBySlugController)
}
