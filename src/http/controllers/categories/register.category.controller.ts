import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterCategoryUseCase } from '@/use-cases/factories/categories/make.register.category.use.case'
import { CategoryAlreadyExistsError } from '@/use-cases/categories/err/cateogory.already.exists.error'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

import { env } from '@/env'

const s3Client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function registerCategoryController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    name: z.string(),
    description: z.string().optional(),
    icon: z.string(),
  })

  const { name, description, icon } = schema.parse(request.body)

  const iconFileName = `${name}-icon.${icon.split(';')[0].split('/')[1]}`

  const iconCommand = new PutObjectCommand({
    Bucket: 'galaxynerd',
    Key: iconFileName,
    Body: Buffer.from(icon.split(',')[1], 'base64'),
    ContentType: `image/${icon.split(';')[0].split('/')[1]}`,
  })

  try {
    await s3Client.send(iconCommand)

    const iconUrl = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${iconFileName}`

    const registerCategoryUseCase = makeRegisterCategoryUseCase()

    const category = await registerCategoryUseCase.execute({
      name,
      description,
      icon: iconUrl,
    })

    return reply.status(201).send({ category })
  } catch (error) {
    if (error instanceof CategoryAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
