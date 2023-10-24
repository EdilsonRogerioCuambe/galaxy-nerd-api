import request from 'supertest'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import { app } from '@/app'

describe('Register Category Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new category', async () => {
    await request(app.server).post('/admins').send({
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
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Node.js',
        description:
          "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
      })

    expect(response.statusCode).toBe(201)
  })
})
