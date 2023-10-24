import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Authenticate Instructor Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 200 when instructor is authenticated', async () => {
    await request(app.server).post('/instructors').send({
      name: 'John Doe',
      email: 'edilson@gmail.com',
      password: '@17Edilson17',
      biography: 'I am a developer',
      location: 'Lagos',
      role: 'INSTRUCTOR',
    })

    const response = await request(app.server)
      .post('/instructors/sessions')
      .send({
        email: 'edilson@gmail.com',
        password: '@17Edilson17',
      })

    expect(response.statusCode).toBe(200)
  })
})
