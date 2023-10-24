import { FastifyInstance } from 'fastify'
import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { verifyUserRole } from '@/http/middlewares/verify.user.role'

import { createCheckoutSessionController } from './create.checkout.session.controller'

export async function stripeSessionsRoutes(app: FastifyInstance) {
  app.post(
    '/stripe-sessions',
    { onRequest: [verifyJwt, verifyUserRole('STUDENT')] },
    createCheckoutSessionController,
  )
}
