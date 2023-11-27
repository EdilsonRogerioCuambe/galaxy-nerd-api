import { FastifyInstance } from 'fastify'
import { registerCategoryController } from './register.category.controller'
import { updateCategoryController } from './update.category.controller'
import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { verifyUserRole } from '@/http/middlewares/verify.user.role'
import { getCategoriesController } from './get.categories.controller'
import { getCategoryByIdController } from './get.catgeory.controller'

export async function categoriesRoutes(app: FastifyInstance) {
  app.post(
    '/categories',
    {
      onRequest: [verifyJwt, verifyUserRole('ADMIN')],
    },
    registerCategoryController,
  )
  app.get('/categories', getCategoriesController)
  app.put(
    '/categories/:categoryId',
    {
      onRequest: [verifyJwt, verifyUserRole('ADMIN')],
    },
    updateCategoryController,
  )
  app.get('/categories/:id', getCategoryByIdController)
}
