import { createCloudinaryStorage } from '@/utils/storage'
import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'
import { registerCategoryController } from './register.category.controller'

const upload = multer({
  storage: createCloudinaryStorage(),
})

export async function categoriesRoutes(app: FastifyInstance) {
  app.post(
    '/categories',
    { preHandler: upload.single('icon') },
    registerCategoryController,
  )
}
