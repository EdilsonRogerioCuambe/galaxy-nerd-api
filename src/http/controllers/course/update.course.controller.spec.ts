import request from 'supertest'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import path from 'path'
import fs from 'fs'

import { app } from '@/app'
import { createAndAuthenticateInstructor } from '@/utils/test/create.and.authenticate.instructor'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Update Course Controller', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should update a course', async () => {
    const { token, instructor } = await createAndAuthenticateInstructor(app)

    const category = await request(app.server)
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'any_name')
      .field('description', 'any_description')
      .attach('icon', avatar)

    const course = await request(app.server)
      .post('/courses')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Course title')
      .field('description', 'Course description')
      .field('price', '250')
      .field('categoryId', category.body.category.category.id)
      .field('instructorId', instructor.id)
      .attach('thumbnail', avatar)

    const response = await request(app.server)
      .put(`/courses/${course.body.course.course.id}`)
      .set('Authorization', `Bearer ${token}`)
      .field('courseId', course.body.course.course.id)
      .field('title', 'Course title updated')
      .field('description', 'Course description updated')
      .field('price', '500')
      .field('categoryId', category.body.category.category.id)
      .field('instructorId', instructor.id)
      .attach('thumbnail', avatar)

    expect(response.statusCode).toBe(200)
    expect(response.body.course.course.title).toBe('Course title updated')
  })
})
