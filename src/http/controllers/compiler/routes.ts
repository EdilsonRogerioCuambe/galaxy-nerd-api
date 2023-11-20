import { FastifyInstance } from 'fastify'
import { compileFileController } from './compile.file.controller'
import { compileFileControllerPost } from './post.code.to.compile'

export async function compilerRoutes(app: FastifyInstance) {
  app.get('/compile', compileFileController)
  app.post('/compile/run', compileFileControllerPost)
}
