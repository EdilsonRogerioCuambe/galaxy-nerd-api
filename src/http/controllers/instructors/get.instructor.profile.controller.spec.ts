import { it, describe, afterAll, beforeAll, expect } from 'vitest'
import request from 'supertest'

import { app } from '@/app'

describe('Get Instructor Profile Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get instructor profile', async () => {
    const newInstructor = await request(app.server).post('/instructors').send({
      name: 'John Doe',
      email: 'edilson@gmail.com',
      password: '@17Edilson17',
      biography: 'I am a developer',
      location: 'Lagos',
      role: 'INSTRUCTOR',
    })

    const auth = await request(app.server).post('/instructors/sessions').send({
      email: 'edilson@gmail.com',
      password: '@17Edilson17',
    })

    const { token } = auth.body

    const response = await request(app.server)
      .get(`/instructors/${newInstructor.body.instructor.instructor.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
  })
})
