import request from 'supertest'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'

import { app } from '@/app'

describe('Register Student Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should return 201 when student is created', async () => {
    const response = await request(app.server).post('/students').send({
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

    expect(response.statusCode).toBe(201)
  })

  it('should return 409 when student already exists', async () => {
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

    const response = await request(app.server).post('/students').send({
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

    expect(response.statusCode).toBe(409)

    expect(response.body).toEqual({
      message: 'Student already exists',
    })
  })
})
