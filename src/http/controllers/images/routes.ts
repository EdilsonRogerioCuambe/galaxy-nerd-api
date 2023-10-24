import { createCloudinaryStorage } from '@/utils/storage'
import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import { uploadImages } from './upload.images.controller'

export async function imagesRoutes(fastify: FastifyInstance) {
  fastify.post('/images', uploadImages)
}
