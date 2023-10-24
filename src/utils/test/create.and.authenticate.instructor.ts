import request from 'supertest'
import { FastifyInstance } from 'fastify'
import { prisma } from '@/lib/prisma'
import { hash } from 'bcryptjs'

export async function createAndAuthenticateInstructor(app: FastifyInstance) {
  const instructor = await prisma.instructor.create({
    data: {
      name: 'John Doe',
      email: 'edilson@gmail.com',
      password: await hash('@17Edilson17', 6),
      role: 'INSTRUCTOR',
      location: 'Lagos',
      biography: 'I am a developer',
    },
  })

  const response = await request(app.server)
    .post('/instructors/sessions')
    .send({
      email: instructor.email,
      password: '@17Edilson17',
    })

  const { token } = response.body

  return { token, instructor }
}
