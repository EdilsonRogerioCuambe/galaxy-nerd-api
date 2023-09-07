import { app } from '@/app'
import request from 'supertest'
import path from 'path'
import fs from 'fs'
import { it, describe, expect, afterAll, beforeAll } from 'vitest'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Delete Instructor Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete instructor', async () => {
    const instructor = await request(app.server)
      .post('/instructors')
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

    const response = await request(app.server).delete(
      `/instructors/${instructor.body.instructor.instructor.id}`,
    )

    expect(response.statusCode).toBe(204)
    expect(response.body).toEqual({})
  })
})
