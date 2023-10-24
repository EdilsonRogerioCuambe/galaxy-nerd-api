import { app } from '@/app'
import request from 'supertest'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

describe('Update Admin Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should update an admin', async () => {
    const newAdmin = await request(app.server).post('/admins').send({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '@17Edilson17',
      biography: 'I am a developer',
      location: 'Brazil',
      role: 'ADMIN',
    })

    const auth = await request(app.server).post('/admins/sessions').send({
      email: 'johndoe@gmail.com',
      password: '@17Edilson17',
    })

    const { token } = auth.body

    const response = await request(app.server)
      .put(`/admins/${newAdmin.body.admin.admin.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe Edilson',
        biography: 'I am a developer and a designer',
        adminId: newAdmin.body.admin.admin.id,
      })

    expect(response.statusCode).toBe(200)
    expect(response.body.admin.name).toBe('John Doe Edilson')
    expect(response.body.admin.biography).toBe(
      'I am a developer and a designer',
    )
  })
})
