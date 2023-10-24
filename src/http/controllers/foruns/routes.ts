import { FastifyInstance } from 'fastify'
import { createForumController } from './create.forum.controller'
import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { getForumByIdController } from './get.forum.by.id.controller'
import { getForumBySlugController } from './get.forum.by.slug.controller'
import { deleteForumController } from './delete.forum.controller'
import { updateForumController } from './update.forum.controller'

export async function forumsRoutes(app: FastifyInstance) {
  app.post(
    '/forums/:lessonId/:studentId',
    {
      onRequest: [verifyJwt],
    },
    createForumController,
  )
  app.get(
    '/forums/:id',
    {
      onRequest: [verifyJwt],
    },
    getForumByIdController,
  )
  app.get(
    '/forums/slug/:slug',
    {
      onRequest: [verifyJwt],
    },
    getForumBySlugController,
  )
  app.delete(
    '/forums/:id',
    {
      onRequest: [verifyJwt],
    },
    deleteForumController,
  )
  app.put(
    '/forums/:id',
    {
      onRequest: [verifyJwt],
    },
    updateForumController,
  )
}
