import { createCloudinaryStorage } from '@/utils/storage'
import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'
import { registerCategoryController } from './register.category.controller'
import { updateCategoryController } from './update.category.controller'
import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { verifyUserRole } from '@/http/middlewares/verify.user.role'
import { getCategoriesController } from './get.categories.controller'

const upload = multer({
  storage: createCloudinaryStorage(),
})

export async function categoriesRoutes(app: FastifyInstance) {
  app.post(
    '/categories',
    {
      onRequest: [verifyJwt, verifyUserRole('ADMIN')],
      preHandler: [upload.single('icon')],
    },
    registerCategoryController,
  )
  app.get('/categories', getCategoriesController)
  app.put(
    '/categories/:categoryId',
    {
      onRequest: [verifyJwt, verifyUserRole('ADMIN')],
      preHandler: [upload.single('icon')],
    },
    updateCategoryController,
  )
}
