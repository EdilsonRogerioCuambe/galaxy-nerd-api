import { it, describe, afterAll, beforeAll, expect } from 'vitest'
import request from 'supertest'
import path from 'path'
import fs from 'fs'

import { app } from '@/app'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Get Student Profile Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get student profile', async () => {
    const student = await request(app.server)
      .post('/students')
      .field('name', 'John Doe')
      .field('email', 'johndoe@gmail.com')
      .field('password', '@17Edilson17')
      .field('biography', 'I am a developer')
      .field('facebook', 'facebook')
      .field('twitter', 'twitter')
      .field('linkedin', 'linkedin')
      .field('instagram', 'instagram')
      .field('github', 'github')
      .field('website', 'website')
      .field('role', 'ADMIN')
      .field('location', 'Lagos')
      .attach('avatar', avatar)

    const auth = await request(app.server).post('/students/sessions').send({
      email: 'johndoe@gmail.com',
      password: '@17Edilson17',
    })

    const { token } = auth.body

    const response = await request(app.server)
      .get(`/students/${student.body.student.student.id}`)
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
  })
})
