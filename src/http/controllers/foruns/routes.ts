import { FastifyInstance } from 'fastify'
import { createForumController } from './create.forum.controller'
import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { getForumByIdController } from './get.forum.by.id.controller'
import { getForumBySlugController } from './get.forum.by.slug.controller'
import { deleteForumController } from './delete.forum.controller'
import { updateForumController } from './update.forum.controller'
import { getAllForumsByLessonIdController } from './get.all.forums.lesson.id.controller'

export async function forumsRoutes(app: FastifyInstance) {
  app.post('/forums/:lessonId/:studentId', createForumController)
  app.get('/forums/:id', getForumByIdController)
  app.get('/forums/slug/:slug', getForumBySlugController)
  app.get('/forums/lesson/:lessonId', getAllForumsByLessonIdController)
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
