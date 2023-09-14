import request from 'supertest'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import path from 'path'
import fs from 'fs'

import { app } from '@/app'

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
    const instructor = await request(app.server)
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
      .field('instructorId', instructor.body.instructor.instructor.id)
      .attach('thumbnail', avatar)

    const instructorTwo = await request(app.server)
      .post('/instructors')
      .field('name', 'Mary Doe')
      .field('email', 'marydoe@gmail.com')
      .field('password', '@17Edilson17')
      .field('biography', 'I am a developer')
      .field('socialLinks', 'twitter')
      .field('socialLinks', 'facebook')
      .field('socialLinks', 'linkedin')
      .field('role', 'INSTRUCTOR')
      .field('location', 'Lagos')
      .attach('avatar', avatar)

    const authTwo = await request(app.server)
      .post('/instructors/sessions')
      .send({
        email: 'marydoe@gmail.com',
        password: '@17Edilson17',
      })

    const { token: tokenTwo } = authTwo.body

    const categoryTwo = await request(app.server)
      .post('/categories')
      .set('Authorization', `Bearer ${tokenTwo}`)
      .field('name', 'New name')
      .field('description', 'New description')
      .attach('icon', avatar)

    await request(app.server)
      .post('/courses')
      .set('Authorization', `Bearer ${tokenTwo}`)
      .field('title', 'New title')
      .field('description', 'New description')
      .field('price', '250')
      .field('categoryId', categoryTwo.body.category.category.id)
      .field('instructorId', instructorTwo.body.instructor.instructor.id)

    const response = await request(app.server)
      .get('/courses')
      .set('Authorization', `Bearer ${token}`)

    console.log(response.body)

    expect(response.statusCode).toBe(200)
  })
})
