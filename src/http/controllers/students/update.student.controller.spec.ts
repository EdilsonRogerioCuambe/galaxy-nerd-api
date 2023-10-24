import request from 'supertest'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'

import { app } from '@/app'

describe('Update Student Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 200 when student is updated', async () => {
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

    const auth = await request(app.server).post('/students/sessions').send({
      email: 'johndoe@gmail.com',
      password: '@17Edilson17',
    })

    const { token } = auth.body

    const response = await request(app.server)
      .put(`/students/${student.body.student.student.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'John Doe Updated',
        email: 'johndoe@gmail.com',
        password: '@17Edilson17',
        biography: 'I am a developer updated',
        location: 'Lagos updated',
        role: 'STUDENT',
        twitter: 'https://twitter.com/edilson_rogerio',
        facebook: 'https://facebook.com/edilson.rogerio',
        instagram: 'https://instagram.com/edilson_rogerio',
        linkedin: 'https://linkedin.com/in/edilson-rogerio',
        github: 'https://github.com/',
        website: 'https://edilson.rogerio',
      })

    expect(response.status).toBe(200)
  })
})
