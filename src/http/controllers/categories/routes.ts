import { createCloudinaryStorage } from '@/utils/storage'
import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'
import { registerCategoryController } from './register.category.controller'
import { updateCategoryController } from './update.category.controller'
import { verifyJwt } from '@/http/middlewares/verify.jwt'

const upload = multer({
  storage: createCloudinaryStorage(),
})

export async function categoriesRoutes(app: FastifyInstance) {
  app.post(
    '/categories',
    {
      preHandler: [upload.single('icon')],
      onRequest: [verifyJwt],
    },
    registerCategoryController,
  )
  app.put(
    '/categories/:categoryId',
    {
      preHandler: [upload.single('icon')],
      onRequest: [verifyJwt],
    },
    updateCategoryController,
  )
}
