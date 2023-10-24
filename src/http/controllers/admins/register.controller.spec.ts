import request from 'supertest'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'

import { app } from '@/app'

describe('Register Admin Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 201 when admin is created', async () => {
    const response = await request(app.server).post('/admins').send({
      name: 'John Doe',
      email: 'edilson@gmail.com',
      password: '@17Edilson17',
      biography: 'I am a developer',
      location: 'Brazil',
      role: 'ADMIN',
    })

    expect(response.statusCode).toBe(201)
  })
})
