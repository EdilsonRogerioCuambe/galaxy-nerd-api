import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import request from 'supertest'
import path from 'path'
import fs from 'fs'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Authenticate Student Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 200 when student is authenticated', async () => {
    await request(app.server)
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

    const response = await request(app.server).post('/students/sessions').send({
      email: 'johndoe@gmail.com',
      password: '@17Edilson17',
    })

    expect(response.statusCode).toBe(200)
  })
})
