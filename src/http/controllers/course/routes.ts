import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import { createCloudinaryStorage } from '@/utils/storage'
import { registerCourseController } from './register.course.controller'
import { updateCourseController } from './update.course.controller'
import { deleteCourseController } from './delete.course.controller'
import { getAllCoursesController } from './get.all.courses.controller'

const upload = multer({
  storage: createCloudinaryStorage(),
})

export async function coursesRoutes(app: FastifyInstance) {
  app.post(
    '/courses',
    { preHandler: upload.single('thumbnail') },
    registerCourseController,
  )
  app.get('/courses', getAllCoursesController)
  app.put(
    '/courses/:courseId',
    { preHandler: upload.single('thumbnail') },
    updateCourseController,
  )
  app.delete('/courses/:courseId', deleteCourseController)
}
