import fastify from 'fastify'
import fastifyMultipart from '@fastify/multipart'

import { adminsRoutes } from './http/controllers/admins/routes'
import { ZodError } from 'zod'
import { env } from './env'
import { instructorsRoutes } from './http/controllers/instructors/routes'
import { studentsRoutes } from './http/controllers/students/routes'
import { coursesRoutes } from './http/controllers/course/routes'
import { categoriesRoutes } from './http/controllers/categories/routes'
import { topicsRoutes } from './http/controllers/topics/routes'

export const app = fastify()

app.register(fastifyMultipart, {
  limits: {
    fileSize: 1024 * 1024 * 1024, // 1 GB
  },
})

app.register(adminsRoutes)
app.register(instructorsRoutes)
app.register(studentsRoutes)
app.register(coursesRoutes)
app.register(categoriesRoutes)
app.register(topicsRoutes)

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
