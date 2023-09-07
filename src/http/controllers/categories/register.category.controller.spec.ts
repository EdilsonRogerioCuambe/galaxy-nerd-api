import request from 'supertest'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import path from 'path'
import fs from 'fs'

import { app } from '@/app'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Register Category Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to register a new category', async () => {
    const response = await request(app.server)
      .post('/categories')
      .field('name', 'any_name')
      .field('description', 'any_description')
      .attach('icon', avatar)

    expect(response.statusCode).toBe(201)
  })
})
