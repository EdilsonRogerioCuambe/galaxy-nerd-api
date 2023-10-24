import { app } from '@/app'
import request from 'supertest'
import { it, describe, expect, afterAll, beforeAll } from 'vitest'

describe.only('Delete Instructor Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete instructor', async () => {
    const instructor = await request(app.server).post('/instructors').send({
      name: 'John Doe',
      email: 'edilson@gmail.com',
      password: '@17Edilson17',
      biography: 'I am a developer',
      location: 'Lagos',
      role: 'INSTRUCTOR',
    })

    await request(app.server).post('/admins').send({
      name: 'Matheus',
      email: 'mateus@gmail.com',
      password: '@17Edilson17',
      role: 'ADMIN',
      biography: 'I am a developer',
    })

    const auth = await request(app.server).post('/admins/sessions').send({
      email: 'mateus@gmail.com',
      password: '@17Edilson17',
    })

    const { token } = auth.body

    const response = await request(app.server)
      .delete(`/instructors/${instructor.body.instructor.instructor.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(204)
    expect(response.body).toEqual({})
  })
})
