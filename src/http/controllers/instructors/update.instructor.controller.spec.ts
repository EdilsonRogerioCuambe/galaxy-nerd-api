import { app } from '@/app'
import request from 'supertest'
import path from 'path'
import fs from 'fs'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'
import { createAndAuthenticateInstructor } from '@/utils/test/create.and.authenticate.instructor'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Update Instructor Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it.only('should update an instructor', async () => {
    const { token, instructor } = await createAndAuthenticateInstructor(app)

    const response = await request(app.server)
      .put(`/instructors/${instructor.id}`)
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'John Doe Edilson')
      .field('email', 'johndoe@gmail.com')
      .field('password', '@17Edilson171234')
      .field('biography', 'I am a developer and a designer')
      .field('role', 'INSTRUCTOR')
      .field('location', 'Lagos Island')
      .attach('avatar', avatar)

    expect(response.statusCode).toBe(200)
    expect(response.body.instructor.name).toBe('John Doe Edilson')
    expect(response.body.instructor.biography).toBe(
      'I am a developer and a designer',
    )
  })
})
