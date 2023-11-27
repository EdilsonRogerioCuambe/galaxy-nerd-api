import { FastifyInstance } from 'fastify'
import { compilerController } from './compiler'

export async function compilerRoutes(app: FastifyInstance) {
  app.post('/compile', compilerController)
}
