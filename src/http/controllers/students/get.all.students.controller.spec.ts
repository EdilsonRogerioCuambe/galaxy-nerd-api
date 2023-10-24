import { app } from '@/app'
import request from 'supertest'
import { it, describe, afterAll, beforeAll, expect } from 'vitest'

describe('Get All Students Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to get all students', async () => {
    await request(app.server).post('/students').send({
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

    await request(app.server).post('/students').send({
      name: 'Mary Doe',
      email: 'marydoe@gmail.com',
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
      email: 'marydoe@gmail.com',
      password: '@17Edilson17',
    })

    const { token } = auth.body

    const response = await request(app.server)
      .get('/students')
      .set('Authorization', `Bearer ${token}`)

    expect(response.statusCode).toBe(200)
    expect(response.body.students).toHaveLength(2)
    expect(response.body.students[0].name).toBe('John Doe')
    expect(response.body.students[1].name).toBe('Mary Doe')
  })
})
