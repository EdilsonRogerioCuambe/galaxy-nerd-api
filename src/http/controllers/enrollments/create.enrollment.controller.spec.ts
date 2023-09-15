import request from 'supertest'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import path from 'path'
import fs from 'fs'

import { app } from '@/app'
import { createAndAuthenticateInstructor } from '@/utils/test/create.and.authenticate.instructor'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Create Enrollment Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new enrollment', async () => {
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

    const student = await request(app.server)
      .post('/students')
      .field('name', 'John Doe')
      .field('email', 'johndoe@gmail.com')
      .field('password', '@17Edilson17')
      .field('biography', 'I am a developer')
      .field('socialLinks', 'twitter')
      .field('socialLinks', 'facebook')
      .field('socialLinks', 'linkedin')
      .field('role', 'STUDENT')
      .field('location', 'Lagos')
      .attach('avatar', avatar)

    const auth = await request(app.server)
      .post('/students/sessions')
      .field('email', student.body.student.student.email)
      .field('password', '@17Edilson17')

    const response = await request(app.server)
      .post('/enrollments')
      .set('Authorization', `Bearer ${auth.body.token}`)
      .field('studentId', student.body.student.student.id)
      .field('courseId', course.body.course.course.id)

    console.log(response.body)
  }, 10000)
})
