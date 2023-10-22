import { makeRegisterLessonUseCase } from '@/use-cases/factories/lessons/make.register.lesson.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
import { Readable } from 'stream'

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
    video: z.string(),
  })

  const { title, description, topicId, order, duration, video } = schema.parse(
    request.body,
  )

  // excluir dois pontos, caracteres especiais e espaços no titulo que vai para o video
  const videoFileName = `${title
    .replace(/:/g, '')
    .replace(/ /g, '-')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')}.mp4`

  const videoCommand = new PutObjectCommand({
    Bucket: 'galaxynerd',
    Key: videoFileName,
    Body: Buffer.from(video.split(',')[1], 'base64'),
    ContentType: `video/mp4`,
    ContentDisposition: 'inline',
  })

  try {
    await s3Client.send(videoCommand)

    const videoUrl = `https://d4lyjck7y73xy.cloudfront.net/assets/galaxynerd2/MP4/${videoFileName}`

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
