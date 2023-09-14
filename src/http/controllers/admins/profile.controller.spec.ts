import { it, describe, afterAll, beforeAll, expect } from 'vitest'
import request from 'supertest'
import path from 'path'
import fs from 'fs'

import { app } from '@/app'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Admin Get His Profile Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get admin profile', async () => {
    await request(app.server)
      .post('/admins')
      .field('name', 'John Doe')
      .field('email', 'johndoe@gmail.com')
      .field('password', '@17Edilson17')
      .field('biography', 'I am a developer')
      .field('socialLinks', 'twitter')
      .field('socialLinks', 'facebook')
      .field('socialLinks', 'linkedin')
      .field('role', 'ADMIN')
      .field('location', 'Lagos')
      .attach('avatar', avatar)

    const auth = await request(app.server).post('/admins/sessions').send({
      email: 'johndoe@gmail.com',
      password: '@17Edilson17',
    })

    const response = await request(app.server)
      .get(`/admins/me`)
      .set('Authorization', `Bearer ${auth.body.token}`)

    expect(response.statusCode).toBe(200)
  })
})
