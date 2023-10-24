import { app } from '@/app'
import request from 'supertest'
import { it, describe, afterAll, beforeAll, expect } from 'vitest'

describe('Get All Instructors Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get all instructors', async () => {
    await request(app.server).post('/instructors').send({
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

    await request(app.server).post('/instructors').send({
      name: 'Mary Doe',
      email: 'edilson@gmail.com',
      password: '@17Edilson17',
      biography: 'I am a developer',
      location: 'New York',
      role: 'INSTRUCTOR',
    })

    const response = await request(app.server)
      .get('/instructors')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
  })
})
