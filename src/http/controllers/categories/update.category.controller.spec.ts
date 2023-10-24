import request from 'supertest'
import { describe, it, expect, afterAll, beforeAll } from 'vitest'
import { app } from '@/app'

describe('Update Category Controller', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to update category', async () => {
    await request(app.server).post('/admins').send({
      name: 'John Doe',
      email: 'edilson@gmail.com',
      password: '@17Edilson17',
      biography: 'I am a developer',
      location: 'Brazil',
      role: 'ADMIN',
    })

    const auth = await request(app.server).post('/admins/sessions').send({
      email: 'edilson@gmail.com',
      password: '@17Edilson17',
    })

    const { token } = auth.body

    const responseNewCategorie = await request(app.server)
      .post('/categories')
      .set('Authorization', `Bearer ${token}`)
      .send({
        name: 'Node.js',
        description:
          "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
      })

    const { category } = responseNewCategorie.body

    const responseUpdateCategorie = await request(app.server)
      .put(`/categories/${category.category.id}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        categoryId: category.category.id,
        name: 'Node.js',
        description:
          "Node.js is a JavaScript runtime built on Chrome's V8 JavaScript engine.",
      })

    expect(responseUpdateCategorie.status).toBe(200)
  })
})
