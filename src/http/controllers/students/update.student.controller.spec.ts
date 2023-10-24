import request from 'supertest'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import path from 'path'
import fs from 'fs'

import { app } from '@/app'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Update Student Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 200 when student is updated', async () => {
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
      .field('role', 'STUDENT')
      .field('location', 'Lagos')
      .attach('avatar', avatar)

    const auth = await request(app.server).post('/students/sessions').send({
      email: 'johndoe@gmail.com',
      password: '@17Edilson17',
    })

    const { token } = auth.body

    const response = await request(app.server)
      .put(`/students/${student.body.student.student.id}`)
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'Updated John Doe')
      .field('email', 'johndoe@gmail.com')
      .field('password', '@17Edilson17')
      .field('biography', 'I am a developer and a student')
      .field('facebook', 'facebook')
      .field('twitter', 'twitter')
      .field('linkedin', 'linkedin')
      .field('instagram', 'instagram')
      .field('github', 'github')
      .field('website', 'website')
      .field('role', 'STUDENT')
      .field('location', 'Lagos')
      .attach('avatar', avatar)

    expect(response.statusCode).toBe(200)
  })
})
