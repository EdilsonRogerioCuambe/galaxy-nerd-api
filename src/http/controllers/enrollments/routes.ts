import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { verifyUserRole } from '@/http/middlewares/verify.user.role'
import { FastifyInstance } from 'fastify'

import { createEnrollmentController } from './create.enrollment.controller'

export function enrollmentsRoutes(app: FastifyInstance) {
  app.post(
    '/enrollments',
    {
      preHandler: [verifyJwt, verifyUserRole('STUDENT')],
    },
    createEnrollmentController,
  )
}
