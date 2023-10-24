import request from 'supertest'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import { app } from '@/app'

describe('Update Course Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update course', async () => {
    const newInstructor = await request(app.server).post('/instructors').send({
      name: 'John Doe',
      email: 'edilson@gmail.com',
      password: '@17Edilson17',
      biography: 'I am a developer',
      location: 'Lagos',
      role: 'INSTRUCTOR',
    })

    const auth = await request(app.server).post('/instructors/sessions').send({
      email: 'edilson@gmail.com',
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
        instructorId: newInstructor.body.instructor.instructor.id,
        duration: '10',
        level: 'Iniciante',
      })

    const updateCourse = await request(app.server)
      .put(`/courses/${course.body.course.course.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Course title updated',
        description: 'Course description updated',
        price: '250',
        instructorId: newInstructor.body.instructor.instructor.id,
        duration: '10',
        level: 'Iniciante',
        courseId: course.body.course.course.id,
      })

    expect(updateCourse.status).toBe(200)
  })
})
