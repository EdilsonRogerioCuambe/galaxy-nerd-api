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
import { getCourseBySlugController } from './get.course.by.slug.controller'

const upload = multer({
  storage: createCloudinaryStorage(),
})

export async function coursesRoutes(app: FastifyInstance) {
  app.post(
    '/courses',
    {
      preHandler: upload.fields([
        { name: 'image', maxCount: 1 },
        { name: 'thumbnail', maxCount: 1 },
      ]),
      onRequest: [verifyJwt, verifyUserRole('INSTRUCTOR')],
    },
    registerCourseController,
  )
  app.get('/courses', getAllCoursesController)
  app.get('/courses/:courseId', getCourseController)
  app.get('/courses/slug/:slug', getCourseBySlugController)
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
