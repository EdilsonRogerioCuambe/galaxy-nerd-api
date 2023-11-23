import { FastifyInstance } from 'fastify'
import { compilerController } from './compiler'
import { compileTestsController } from './compile.tests.controller'

export async function compilerRoutes(app: FastifyInstance) {
  app.post('/compile', compilerController)
  app.post('/compile-tests', compileTestsController)
}
