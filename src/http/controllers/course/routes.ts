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
  app.addHook('onRequest', verifyJwt)

  app.post(
    '/courses',
    {
      preHandler: upload.single('thumbnail'),
      onRequest: [verifyUserRole('INSTRUCTOR')],
    },
    registerCourseController,
  )
  app.get('/courses', getAllCoursesController)
  app.get('/courses/:courseId', getCourseController)
  app.put(
    '/courses/:courseId',
    {
      preHandler: upload.single('thumbnail'),
      onRequest: [verifyUserRole('INSTRUCTOR')],
    },
    updateCourseController,
  )
  app.delete(
    '/courses/:courseId',
    { onRequest: [verifyUserRole('INSTRUCTOR')] },
    deleteCourseController,
  )
}
