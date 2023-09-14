import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import { authenticateInstructorController } from './authenticate.controller'
import { createCloudinaryStorage } from '@/utils/storage'
import { register } from './register.controller'
import { deleteInstructorController } from './delete.instructor.controller'
import { getInstructorProfile } from './get.instructor.profile.controller'
import { getAllInstructors } from './get.all.instructors.controller'
import { update } from './update.instructor.controller'
import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { verifyUserRole } from '@/http/middlewares/verify.user.role'

const upload = multer({
  storage: createCloudinaryStorage(),
})

export async function instructorsRoutes(app: FastifyInstance) {
  app.post('/instructors/sessions', authenticateInstructorController)
  app.post('/instructors', { preHandler: upload.single('avatar') }, register)
  app.get(
    '/instructors/:instructorId',
    { onRequest: [verifyJwt] },
    getInstructorProfile,
  )
  app.put(
    '/instructors/:instructorId',
    {
      preHandler: upload.single('avatar'),
      onRequest: [verifyJwt, verifyUserRole('INSTRUCTOR')],
    },
    update,
  )
  app.get('/instructors', { onRequest: [verifyJwt] }, getAllInstructors)
  app.delete(
    '/instructors/:instructorId',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    deleteInstructorController,
  )
}
