import { createCloudinaryStorage } from '@/utils/storage'
import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'
import { registerCategoryController } from './register.category.controller'
import { updateCategoryController } from './update.category.controller'
import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { verifyUserRole } from '@/http/middlewares/verify.user.role'

const upload = multer({
  storage: createCloudinaryStorage(),
})

export async function categoriesRoutes(app: FastifyInstance) {
  app.post(
    '/categories',
    {
      onRequest: [verifyJwt, verifyUserRole('INSTRUCTOR')],
      preHandler: [upload.single('icon')],
    },
    registerCategoryController,
  )
  app.put(
    '/categories/:categoryId',
    {
      onRequest: [verifyJwt, verifyUserRole('INSTRUCTOR')],
      preHandler: [upload.single('icon')],
    },
    updateCategoryController,
  )
}
