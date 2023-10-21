import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterTopicUseCase } from '@/use-cases/factories/topics/make.register.topic.use.case'
import { TopicAlreadyExistsError } from '@/use-cases/topics/err/topic.already.exists.error'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

import { env } from '@/env'

const s3Client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function registerTopicController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    title: z.string(),
    order: z.string(),
    courseId: z.string().uuid(),
    description: z.string().optional(),
    icon: z.string(),
  })

  const { title, order, courseId, description, icon } = schema.parse(
    request.body,
  )

  const iconFileName = `${title}-icon.${icon.split(';')[0].split('/')[1]}`

  const iconCommand = new PutObjectCommand({
    Bucket: 'galaxynerd',
    Key: iconFileName,
    Body: Buffer.from(icon.split(',')[1], 'base64'),
    ContentType: `image/${icon.split(';')[0].split('/')[1]}`,
  })

  try {
    await s3Client.send(iconCommand)

    const topicUrl = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${iconFileName}`

    const registerTopicUseCase = makeRegisterTopicUseCase()

    const topic = await registerTopicUseCase.execute({
      title,
      order,
      courseId,
      description,
      icon: topicUrl,
    })

    return reply.status(201).send({ topic })
  } catch (error) {
    if (error instanceof TopicAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
