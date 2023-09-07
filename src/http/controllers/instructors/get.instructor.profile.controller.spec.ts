import { it, describe, afterAll, beforeAll, expect } from 'vitest'
import request from 'supertest'
import path from 'path'
import fs from 'fs'

import { app } from '@/app'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Get Instructor Profile Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get instructor profile', async () => {
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

    const response = await request(app.server).get(
      `/instructors/${instructor.body.instructor.instructor.id}`,
    )

    expect(response.statusCode).toBe(200)
  })

  it('should not be able to get instructor profile if instructor does not exists', async () => {
    const response = await request(app.server).get(`/instructors/any_id`)

    expect(response.statusCode).toBe(404)
  })
})
