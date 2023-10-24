import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { app } from '@/app'
import request from 'supertest'

describe('Authenticate Student Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 200 when student is authenticated', async () => {
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

    const response = await request(app.server).post('/students/sessions').send({
      email: 'johndoe@gmail.com',
      password: '@17Edilson17',
    })

    expect(response.statusCode).toBe(200)
  })
})
