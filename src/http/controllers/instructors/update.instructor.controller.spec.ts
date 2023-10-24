import { app } from '@/app'
import request from 'supertest'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

describe('Update Instructor Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should update an instructor', async () => {
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
      .put(`/instructors/${newInstructor.body.instructor.instructor.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe',
        biography: 'I am a developer and a designer',
        instructorId: newInstructor.body.instructor.instructor.id,
      })

    expect(response.statusCode).toBe(200)
  })
})
