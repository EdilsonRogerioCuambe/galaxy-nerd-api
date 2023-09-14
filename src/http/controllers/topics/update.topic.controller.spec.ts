import request from 'supertest'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import path from 'path'
import fs from 'fs'

import { app } from '@/app'
import { createAndAuthenticateInstructor } from '@/utils/test/create.and.authenticate.instructor'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Update Topic Controller', () => {
  beforeAll(async () => {
    app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should update a topic', async () => {
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

    const topic = await request(app.server)
      .post('/topics')
      .set('Authorization', `Bearer ${token}`)
      .field('title', 'Topic title')
      .field('description', 'Topic description')
      .field('order', '1')
      .field('courseId', course.body.course.course.id)
      .attach('icon', avatar)

    const response = await request(app.server)
      .put(`/topics/${topic.body.topic.topic.id}`)
      .set('Authorization', `Bearer ${token}`)
      .field('id', topic.body.topic.topic.id)
      .field('title', 'new_title')
      .field('description', 'new_description')
      .field('order', '5')
      .field('courseId', course.body.course.course.id)
      .attach('icon', avatar)

    expect(response.statusCode).toBe(200)
    expect(response.body.topic.topic.title).toBe('new_title')
  })
})
