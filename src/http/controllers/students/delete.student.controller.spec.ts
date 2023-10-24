import { app } from '@/app'
import request from 'supertest'
import path from 'path'
import fs from 'fs'
import { it, describe, expect, afterAll, beforeAll } from 'vitest'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Delete Student Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete student', async () => {
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

    await request(app.server)
      .post('/admins')
      .field('name', 'John Doe')
      .field('email', 'eddy@gmail.com')
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

    const auth = await request(app.server).post('/admins/sessions').send({
      email: 'eddy@gmail.com',
      password: '@17Edilson17',
    })

    const { token } = auth.body

    const response = await request(app.server)
      .delete(`/students/${student.body.student.student.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(204)
  })
})
