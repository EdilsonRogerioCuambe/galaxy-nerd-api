import request from 'supertest'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import path from 'path'
import fs from 'fs'

import { app } from '@/app'
import { createAndAuthenticateInstructor } from '@/utils/test/create.and.authenticate.instructor'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Update Category Controller', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should update a category', async () => {
    const { token } = await createAndAuthenticateInstructor(app)

    const category = await request(app.server)
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'any_name')
      .field('description', 'any_description')
      .attach('icon', avatar)

    const response = await request(app.server)
      .put(`/categories/${category.body.category.category.id}`)
      .set('Authorization', `Bearer ${token}`)
      .field('categoryId', category.body.category.category.id)
      .field('name', 'new_name')
      .field('description', 'new_description')
      .attach('icon', avatar)

    expect(response.statusCode).toBe(200)
    expect(response.body.category.category.name).toBe('new_name')
  })
})
