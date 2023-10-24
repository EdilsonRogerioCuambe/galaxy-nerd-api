import request from 'supertest'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import path from 'path'
import fs from 'fs'

import { app } from '@/app'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Register Admin Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 201 when admin is created', async () => {
    const response = await request(app.server)
      .post('/admins')
      .field('name', 'John Doe')
      .field('email', 'johndoe@gmail.com')
      .field('password', '@17Edilson17')
      .field('biography', 'I am a developer')
      .field('role', 'ADMIN')
      .field('location', 'Lagos')
      .attach('avatar', avatar)
      .attach('banner', avatar)

    expect(response.statusCode).toBe(201)
  })
})
