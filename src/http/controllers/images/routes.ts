import { createCloudinaryStorage } from '@/utils/storage'
import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import { uploadImages } from './upload.images.controller'

const upload = multer({
  storage: createCloudinaryStorage(),
})

export async function imagesRoutes(fastify: FastifyInstance) {
  fastify.post('/images', { preHandler: upload.single('image') }, uploadImages)
}
