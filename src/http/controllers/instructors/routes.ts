import { FastifyInstance } from 'fastify'

import { authenticateInstructorController } from './authenticate.controller'
import { register } from './register.instructor.controller'
import { deleteInstructorController } from './delete.instructor.controller'
import { getInstructorProfile } from './get.instructor.profile.controller'
import { getAllInstructors } from './get.all.instructors.controller'
import { update } from './update.instructor.controller'
import { refresh } from './refresh'
import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { verifyUserRole } from '@/http/middlewares/verify.user.role'

export async function instructorsRoutes(app: FastifyInstance) {
  app.post('/instructors/sessions', authenticateInstructorController)
  app.post('/instructors', register)
  app.get('/instructors/:instructorId', getInstructorProfile)
  app.put(
    '/instructors/:instructorId',
    {
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
  app.put('/instructor/token/refresh', refresh)
}
