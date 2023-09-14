import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import { createCloudinaryStorage } from '@/utils/storage'
import { registerCourseController } from './register.course.controller'
import { updateCourseController } from './update.course.controller'
import { deleteCourseController } from './delete.course.controller'
import { getAllCoursesController } from './get.all.courses.controller'
import { getCourseController } from './get.course.controller'
import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { verifyUserRole } from '@/http/middlewares/verify.user.role'

const upload = multer({
  storage: createCloudinaryStorage(),
})

export async function coursesRoutes(app: FastifyInstance) {
  app.post(
    '/courses',
    {
      preHandler: upload.single('thumbnail'),
      onRequest: [verifyJwt, verifyUserRole('INSTRUCTOR')],
    },
    registerCourseController,
  )
  app.get('/courses', { onRequest: [verifyJwt] }, getAllCoursesController)
  app.get('/courses/:courseId', { onRequest: [verifyJwt] }, getCourseController)
  app.put(
    '/courses/:courseId',
    {
      onRequest: [verifyJwt, verifyUserRole('INSTRUCTOR')],
      preHandler: upload.single('thumbnail'),
    },
    updateCourseController,
  )
  app.delete(
    '/courses/:courseId',
    { onRequest: [verifyJwt, verifyUserRole('INSTRUCTOR')] },
    deleteCourseController,
  )
}
