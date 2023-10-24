import { app } from '@/app'
import request from 'supertest'
import path from 'path'
import fs from 'fs'
import { it, describe, afterAll, beforeAll, expect } from 'vitest'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Get All Admins Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get all admins', async () => {
    await request(app.server)
      .post('/admins')
      .field('name', 'John Doe')
      .field('email', 'johndoe@gmail.com')
      .field('password', '@17Edilson17')
      .field('biography', 'I am a developer')
      .field('role', 'ADMIN')
      .field('location', 'Lagos')
      .attach('avatar', avatar)

    await request(app.server)
      .post('/admins')
      .field('name', 'Mary Doe')
      .field('email', 'marydoe@gmail.com')
      .field('password', '@17Edilson17')
      .field('biography', 'I am a developer')
      .field('role', 'ADMIN')
      .field('location', 'Lagos')
      .attach('avatar', avatar)

    const auth = await request(app.server).post('/admins/sessions').send({
      email: 'johndoe@gmail.com',
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
