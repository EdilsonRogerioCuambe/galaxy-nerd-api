import { app } from '@/app'
import request from 'supertest'
import path from 'path'
import fs from 'fs'
import { it, describe, afterAll, beforeAll, expect } from 'vitest'
import { createAndAuthenticateInstructor } from '@/utils/test/create.and.authenticate.instructor'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Get All Instructors Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get all instructors', async () => {
    await request(app.server)
      .post('/instructors')
      .field('name', 'John Doe')
      .field('email', 'charlen@gmail.com')
      .field('password', '@17Edilson17')
      .field('biography', 'I am a developer')
      .field('role', 'ADMIN')
      .field('location', 'Lagos')
      .attach('avatar', avatar)

    await request(app.server)
      .post('/instructors')
      .field('name', 'Mary Doe')
      .field('email', 'marydoe@gmail.com')
      .field('password', '@17Edilson17')
      .field('biography', 'I am a developer')
      .field('role', 'ADMIN')
      .field('location', 'Lagos')
      .attach('avatar', avatar)

    const { token } = await createAndAuthenticateInstructor(app)

    const response = await request(app.server)
      .get('/instructors')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
    expect(response.body.instructors.length).toBe(3)
  })
})
