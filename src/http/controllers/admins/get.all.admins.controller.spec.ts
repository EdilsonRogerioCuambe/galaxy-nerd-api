import { app } from '@/app'
import request from 'supertest'
import { it, describe, afterAll, beforeAll, expect } from 'vitest'

describe('Get All Admins Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get all admins', async () => {
    await request(app.server).post('/admins').send({
      name: 'John Doe',
      email: 'edilson@gmail.com',
      password: '@17Edilson17',
      biography: 'I am a developer',
      location: 'Brazil',
      role: 'ADMIN',
    })

    await request(app.server).post('/admins').send({
      name: 'Mary Doe',
      email: 'marydoe@gmail.com',
      password: '@17Mary17',
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
      .get('/admins')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.admins).toHaveLength(2)
    expect(response.body.admins[0].name).toBe('John Doe')
    expect(response.body.admins[1].name).toBe('Mary Doe')
  })
})
