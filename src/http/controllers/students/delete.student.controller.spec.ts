import { app } from '@/app'
import request from 'supertest'
import { it, describe, expect, afterAll, beforeAll } from 'vitest'

describe('Delete Student Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to delete student', async () => {
    const student = await request(app.server).post('/students').send({
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

    await request(app.server).post('/admins').send({
      name: 'Eddy Rogerio',
      email: 'eddy@gmail.com',
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

    await request(app.server).post('/admins').send({
      name: 'Eddy Rogerio',
      email: 'edilsoncuambe@gmail.com',
      password: '@17Edilson17',
      biography: 'I am a developer',
      location: 'Lagos',
      role: 'ADMIN',
    })

    const auth = await request(app.server).post('/admins/sessions').send({
      email: 'edilsoncuambe@gmail.com',
      password: '@17Edilson17',
    })

    const { token } = auth.body

    const response = await request(app.server)
      .delete(`/students/${student.body.student.student.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        studentId: student.body.student.student.id,
      })

    expect(response.statusCode).toBe(204)
  })
})
