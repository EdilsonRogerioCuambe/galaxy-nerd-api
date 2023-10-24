import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateCategoryUseCase } from '@/use-cases/factories/categories/make.update.category.use.case'
import { CategoryNotFoundError } from '@/use-cases/categories/err/category.not.found.error'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

import { env } from '@/env'

const s3Client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function updateCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    categoryId: z.string(),
    name: z.string().optional(),
    description: z.string().optional(),
    icon: z.string().optional(),
  })

  const { name, description, icon } = schema.parse(request.body)

  const { categoryId } = schema.parse(request.params)

  let iconFileName = ''

  if (icon) {
    iconFileName = `${name}-icon.${icon.split(';')[0].split('/')[1]}`
  }

  try {
    let iconUrl = icon

    if (icon && icon.includes('base64')) {
      const iconParts = icon.split(',')
      if (iconParts.length > 1) {
        const iconCommand = new PutObjectCommand({
          Bucket: 'galaxynerd',
          Key: iconFileName,
          Body: Buffer.from(iconParts[1], 'base64'),
          ContentType: `image/${icon.split(';')[0].split('/')[1]}`,
        })

        await s3Client.send(iconCommand)

        iconUrl = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${iconFileName}`
      }
    }

    const updateCategoryUseCase = makeUpdateCategoryUseCase()

    const category = await updateCategoryUseCase.execute({
      categoryId,
      name,
      description,
      icon: iconUrl,
    })

    return reply.status(200).send({ category })
  } catch (error) {
    if (error instanceof CategoryNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
