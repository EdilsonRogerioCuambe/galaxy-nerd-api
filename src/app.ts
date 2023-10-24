import fastify from 'fastify'
import fastifyMultipart from '@fastify/multipart'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import fastifyJwt from '@fastify/jwt'
import { ZodError } from 'zod'
import fastifyCookie from '@fastify/cookie'
import fastifyCors from '@fastify/cors'

import { adminsRoutes } from './http/controllers/admins/routes'
import { env } from './env'
import { instructorsRoutes } from './http/controllers/instructors/routes'
import { studentsRoutes } from './http/controllers/students/routes'
import { coursesRoutes } from './http/controllers/course/routes'
import { categoriesRoutes } from './http/controllers/categories/routes'
import { topicsRoutes } from './http/controllers/topics/routes'
import { enrollmentsRoutes } from './http/controllers/enrollments/routes'
import { imagesRoutes } from './http/controllers/images/routes'
import { stripeSessionsRoutes } from './http/controllers/stripe-sessions/routes'
import { lessonsRoutes } from './http/controllers/lessons/routes'
import { forumsRoutes } from './http/controllers/foruns/routes'

export const app = fastify({
  bodyLimit: 1024 * 1024 * 1024, // 1GB
})

app.addHook('onRequest', (request, reply, done) => {
  if (request.headers['content-length']) {
    const contentLength = Number(request.headers['content-length'])
    if (contentLength > 1024 * 1024 * 1024) {
      reply.code(413).send({
        message: 'File too large',
      })
    }
  }
  done()
})

app.register(fastifyCors, {
  origin: 'http://localhost:3000',
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
})

app.register(fastifyJwt, {
  secret: env.JWT_SECRET,
  sign: {
    expiresIn: '1d',
  },
  cookie: {
    cookieName: 'refreshToken',
    signed: true,
  },
})

app.register(fastifyCookie)

app.register(fastifyMultipart, {
  limits: {
    fileSize: 1024 * 1024 * 1024, // 1GB
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
app.register(imagesRoutes)
app.register(stripeSessionsRoutes)
app.register(lessonsRoutes)
app.register(forumsRoutes)

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
