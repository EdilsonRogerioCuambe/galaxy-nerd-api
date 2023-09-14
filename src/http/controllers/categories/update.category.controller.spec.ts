import request from 'supertest'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import path from 'path'
import fs from 'fs'

import { app } from '@/app'

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
    await request(app.server)
      .post('/instructors')
      .field('name', 'John Doe')
      .field('email', 'johndoe@gmail.com')
      .field('password', '@17Edilson17')
      .field('biography', 'I am a developer')
      .field('socialLinks', 'twitter')
      .field('socialLinks', 'facebook')
      .field('socialLinks', 'linkedin')
      .field('role', 'INSTRUCTOR')
      .field('location', 'Lagos')
      .attach('avatar', avatar)

    const auth = await request(app.server).post('/instructors/sessions').send({
      email: 'johndoe@gmail.com',
      password: '@17Edilson17',
    })

    const { token } = auth.body

    const category = await request(app.server)
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'any_name')
      .field('description', 'any_description')
      .attach('icon', avatar)

    console.log(category.body)

    const response = await request(app.server)
      .put(`/categories/${category.body.category.category.id}`)
      .set('Authorization', `Bearer ${token}`)
      .field('categoryId', category.body.category.category.id)
      .field('name', 'new_name')
      .field('description', 'new_description')
      .attach('icon', avatar)

    expect(response.statusCode).toBe(200)
  })
})
