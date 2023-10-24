import request from 'supertest'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import { app } from '@/app'

describe('Create Enrollment Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to create a new enrollment', async () => {
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

    const responseStudent = await request(app.server).post('/students').send({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '@17Edilson17',
      biography: 'I am a developer',
      location: 'Lagos',
      role: 'STUDENT',
      twitter: 'https://twitter.com/edilson_rogerio',
      facebook: 'https://facebook.com/edilson.rogerio',
      instagram: 'https://instagram.com/edilson_rogerio',
      linkedin: 'https://linkedin.com/in/edilson-rogerio',
      github: 'github',
      website: 'https://edilson.rogerio',
    })

    const studentAuth = await request(app.server)
      .post('/students/sessions')
      .send({
        email: 'johndoe@gmail.com',
        password: '@17Edilson17',
      })

    const { token: studentToken } = studentAuth.body

    const response = await request(app.server)
      .post('/enrollments')
      .set('Authorization', `Bearer ${studentToken}`)
      .send({
        studentId: responseStudent.body.student.student.id,
        courseId: course.body.course.course.id,
      })

    expect(response.statusCode).toBe(201)
    expect(response.body.enrollment).toBeTruthy()
  })
})
