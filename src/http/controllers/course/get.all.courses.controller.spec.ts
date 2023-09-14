import request from 'supertest'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import path from 'path'
import fs from 'fs'

import { app } from '@/app'
import { createAndAuthenticateInstructor } from '@/utils/test/create.and.authenticate.instructor'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Get All Courses Controller', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    app.close()
  })

  it('should be able to get all courses', async () => {
    const { token, instructor } = await createAndAuthenticateInstructor(app)

    const category = await request(app.server)
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'any_name')
      .field('description', 'any_description')
      .attach('icon', avatar)

    await request(app.server)
      .post('/courses')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Course title')
      .field('description', 'Course description')
      .field('price', '250')
      .field('categoryId', category.body.category.category.id)
      .field('instructorId', instructor.id)
      .attach('thumbnail', avatar)

    const response = await request(app.server)
      .get('/courses')
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(response.statusCode).toBe(200)
  })
})
