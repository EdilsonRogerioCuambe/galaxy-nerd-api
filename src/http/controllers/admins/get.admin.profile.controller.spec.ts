import { it, describe, afterAll, beforeAll, expect } from 'vitest'
import request from 'supertest'
import { app } from '@/app'

describe('Get Admin Profile Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get admin profile', async () => {
    const admin = await request(app.server).post('/admins').send({
      name: 'John Doe',
      email: 'edilson@gmail.com',
      password: '@17Edilson17',
      biography: 'I am a developer',
      location: 'Brazil',
      role: 'ADMIN',
    })

    const auth = await request(app.server).post('/admins/sessions').send({
      email: 'edilson@gmail.com',
      password: '@17Edilson17',
    })

    const { token } = auth.body

    const response = await request(app.server)
      .get(`/admins/${admin.body.admin.admin.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
  })
})
