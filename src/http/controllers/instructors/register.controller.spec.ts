import { app } from '@/app'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import request from 'supertest'

describe('Register Instructor Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 201 when instructor is created', async () => {
    const response = await request(app.server).post('/instructors').send({
      name: 'John Doe',
      email: 'edilson@gmail.com',
      password: '@17Edilson17',
      biography: 'I am a developer',
      location: 'Brazil',
      role: 'INSTRUCTOR',
    })

    expect(response.statusCode).toBe(201)
  })
})
