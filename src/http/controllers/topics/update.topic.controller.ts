import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateTopicUseCase } from '@/use-cases/factories/topics/make.update.use.case'
import { TopicNotFoundError } from '@/use-cases/topics/err/topic.not.found.error'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

import { env } from '@/env'

const s3Client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function updateTopicController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    id: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    order: z.string().optional(),
    courseId: z.string().optional(),
    icon: z.string().optional(),
  })

  const { title, description, order, courseId, icon } = schema.parse(
    request.body,
  )

  const { id } = schema.parse(request.params)

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

    const updateTopicUseCase = makeUpdateTopicUseCase()

    const topic = await updateTopicUseCase.execute({
      id,
      title,
      icon: iconUrl,
      description,
      order,
      courseId,
    })

    return reply.status(201).send({ topic })
  } catch (error) {
    if (error instanceof TopicNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
