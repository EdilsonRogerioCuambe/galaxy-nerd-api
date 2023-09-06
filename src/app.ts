import fastify from 'fastify'
import fastifyMultipart from '@fastify/multipart'

import { adminsRoutes } from './http/controllers/admins/routes'
import { ZodError } from 'zod'
import { env } from './env'

export const app = fastify()

app.register(fastifyMultipart, {
  limits: {
    fileSize: 1024 * 1024 * 1024, // 1 GB
  },
})

app.register(adminsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV === 'prod') {
    console.error(error)
  } else {
    // TODO: Log error
  }

  reply.status(500).send({
    message: 'Internal server error',
  })
})