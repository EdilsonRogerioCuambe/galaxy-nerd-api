import { app } from '@/app'
import request from 'supertest'
import { it, describe, expect, afterAll, beforeAll } from 'vitest'

describe('Delete Admin Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete admin', async () => {
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
      .delete(`/admins/${admin.body.admin.admin.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(204)
    expect(response.body).toEqual({})
  })
})
