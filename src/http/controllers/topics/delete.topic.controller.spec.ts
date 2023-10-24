import request from 'supertest'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import path from 'path'
import fs from 'fs'

import { app } from '@/app'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Delete Topic Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete a topic', async () => {
    const instructor = await request(app.server).post('/instructors').send({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '@17Edilson17',
      biography: 'I am a developer',
      location: 'Brazil',
      role: 'INSTRUCTOR',
    })

    const auth = await request(app.server).post('/instructors/sessions').send({
      email: 'johndoe@gmail.com',
      password: '@17Edilson17',
    })

    const { token } = auth.body

    const course = await request(app.server)
      .post('/courses')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Course title',
        description: 'Course description',
        price: '250',
        instructorId: instructor.body.instructor.instructor.id,
        duration: '10',
        level: 'Iniciante',
      })

    const response = await request(app.server)
      .post('/topics')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Topic title',
        description: 'Topic description',
        courseId: course.body.course.course.id,
        order: '1',
      })

    const responseDelete = await request(app.server)
      .delete(`/topics/${response.body.topic.topic.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send()

    expect(responseDelete.statusCode).toBe(200)
  })
})
