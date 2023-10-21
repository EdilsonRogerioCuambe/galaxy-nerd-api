import { makeRegisterLessonUseCase } from '@/use-cases/factories/lessons/make.register.lesson.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import crypto from 'node:crypto'

import { env } from '@/env'

const s3Client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function registerLessonController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.string(),
    topicId: z.string(),
    duration: z.string(),
  })

  const { title, description, topicId, order, duration } = schema.parse(
    request.body,
  )

  const video = await request.file()

  if (!video) {
    return reply.code(400).send({ message: 'Video is required' })
  }

  const { filename, file } = video

  const fileHash = crypto.randomBytes(16).toString('hex')
  const fileName = `${fileHash}-${filename}`

  try {
    const s3UploadParams = {
      Bucket: env.AWS_BUCKET_NAME,
      Key: fileName,
      Body: file,
    }

    const command = new PutObjectCommand(s3UploadParams)

    await s3Client.send(command)

    const videoUrl = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${fileName}`

    const registerLessonUseCase = makeRegisterLessonUseCase()

    const lesson = await registerLessonUseCase.execute({
      title,
      description,
      topicId,
      videoUrl,
      order,
      duration,
    })

    reply.code(201).send({ lesson })
  } catch (error) {
    console.error(error)
    reply.code(500).send({ message: 'Internal server error' })
  }
}
