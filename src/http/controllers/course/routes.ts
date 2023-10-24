import { FastifyInstance } from 'fastify'
import { registerCourseController } from './register.course.controller'
import { updateCourseController } from './update.course.controller'
import { deleteCourseController } from './delete.course.controller'
import { getAllCoursesController } from './get.all.courses.controller'
import { getCourseController } from './get.course.controller'
import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { verifyUserRole } from '@/http/middlewares/verify.user.role'
import { getCourseBySlugController } from './get.course.by.slug.controller'

export async function coursesRoutes(app: FastifyInstance) {
  app.post('/courses', registerCourseController)
  app.get('/courses', getAllCoursesController)
  app.get('/courses/:courseId', getCourseController)
  app.get('/courses/slug/:slug', getCourseBySlugController)
  app.put(
    '/courses/:courseId',
    {
      onRequest: [verifyJwt, verifyUserRole('INSTRUCTOR')],
    },
    updateCourseController,
  )
  app.delete(
    '/courses/:courseId',
    { onRequest: [verifyJwt, verifyUserRole('INSTRUCTOR')] },
    deleteCourseController,
  )
}
