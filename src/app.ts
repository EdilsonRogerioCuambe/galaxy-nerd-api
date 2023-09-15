import fastify from 'fastify'
import fastifyMultipart from '@fastify/multipart'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import fastifyCookie from '@fastify/cookie'

import { adminsRoutes } from './http/controllers/admins/routes'
import { env } from './env'
import { instructorsRoutes } from './http/controllers/instructors/routes'
import { studentsRoutes } from './http/controllers/students/routes'
import { coursesRoutes } from './http/controllers/course/routes'
import { categoriesRoutes } from './http/controllers/categories/routes'
import { topicsRoutes } from './http/controllers/topics/routes'
import { enrollmentsRoutes } from './http/controllers/enrollments/routes'

export const app = fastify()

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '10m',
  },
  cookie: {
    cookieName: 'refreshToken',
    signed: false,
  },
})

app.register(fastifyCookie)

app.register(fastifyMultipart, {
  limits: {
    fileSize: 1024 * 1024 * 1024, // 1 GB
  },
})

const swaggerOptions = {
  swagger: {
    info: {
      title: 'GALAXY NERD API',
      description: 'API do projeto Galaxy Nerd',
      version: '1.0.0',
    },
    host: 'localhost',
    schemes: ['http', 'https'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
      { name: 'Admins', description: 'Admins related end-points' },
      { name: 'Instructors', description: 'Instructors related end-points' },
      { name: 'Students', description: 'Students related end-points' },
      { name: 'Courses', description: 'Courses related end-points' },
      { name: 'Categories', description: 'Categories related end-points' },
      { name: 'Topics', description: 'Topics related end-points' },
    ],
  },
}

app.register(fastifySwagger, swaggerOptions)
app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'full',
    deepLinking: false,
  },
})

app.register(adminsRoutes)
app.register(instructorsRoutes)
app.register(studentsRoutes)
app.register(coursesRoutes)
app.register(categoriesRoutes)
app.register(topicsRoutes)
app.register(enrollmentsRoutes)

app.setErrorHandler((error, _request, reply) => {
  if (error instanceof ZodError) {
    reply.status(400).send({
      message: 'Validation error',
      issues: error.format(),
    })
  }

  if (env.NODE_ENV === 'production') {
    console.error(error)
  } else {
    // TODO: Log error
  }

  reply.status(500).send({
    message: 'Internal server error',
  })
})
