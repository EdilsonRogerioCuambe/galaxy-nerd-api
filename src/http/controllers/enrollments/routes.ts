import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { verifyUserRole } from '@/http/middlewares/verify.user.role'
import { FastifyInstance } from 'fastify'

import { createEnrollmentController } from './create.enrollment.controller'

export async function enrollmentsRoutes(app: FastifyInstance) {
  app.post(
    '/enrollments',
    {
      onRequest: [verifyJwt, verifyUserRole('STUDENT')],
    },
    createEnrollmentController,
  )
}
