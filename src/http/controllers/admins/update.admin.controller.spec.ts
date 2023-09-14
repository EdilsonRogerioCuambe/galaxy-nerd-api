import { app } from '@/app'
import request from 'supertest'
import path from 'path'
import fs from 'fs'
import { it, describe, expect, beforeAll, afterAll } from 'vitest'

const avatar = fs.readFileSync(
  path.resolve(__dirname, '..', 'tests', 'assets', 'avatar.png'),
)

describe('Update Admin Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should update an admin', async () => {
    const newAdmin = await request(app.server)
      .post('/admins')
      .field('name', 'John Doe')
      .field('email', 'johndoe@gmail.com')
      .field('password', '@17Edilson17')
      .field('biography', 'I am a developer')
      .field('socialLinks', 'twitter')
      .field('socialLinks', 'facebook')
      .field('socialLinks', 'linkedin')
      .field('role', 'ADMIN')
      .field('location', 'Lagos')
      .attach('avatar', avatar)

    const auth = await request(app.server).post('/admins/sessions').send({
      email: 'johndoe@gmail.com',
      password: '@17Edilson17',
    })

    const { token } = auth.body

    const response = await request(app.server)
      .put(`/admins/${newAdmin.body.admin.admin.id}`)
      .set('Authorization', `Bearer ${token}`)
      .field('name', 'John Doe Edilson')
      .field('email', 'johndoe@gmail.com')
      .field('password', '@17Edilson171234')
      .field('biography', 'I am a developer and a designer')
      .field('socialLinks', 'twitter')
      .field('socialLinks', 'facebook')
      .field('socialLinks', 'linkedin')
      .field('socialLinks', 'github')
      .field('role', 'ADMIN')
      .field('location', 'Lagos Island')
      .attach('avatar', avatar)

    expect(response.statusCode).toBe(200)
    expect(response.body.admin.name).toBe('John Doe Edilson')
    expect(response.body.admin.biography).toBe(
      'I am a developer and a designer',
    )
  })
})
