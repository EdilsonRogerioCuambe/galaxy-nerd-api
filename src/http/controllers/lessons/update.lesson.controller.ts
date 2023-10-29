import { makeUpdateLessonUseCase } from '@/use-cases/factories/lessons/make.update.lesson.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { LessonNotFoundError } from '@/use-cases/lessons/error/lesson.not.found'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

import { env } from '@/env'

const s3Client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function updateLessonController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.string(),
    topicId: z.string(),
    duration: z.string(),
    lessonId: z.string(),
    video: z.string().optional(),
  })

  const { title, description, topicId, order, duration, video } = schema.parse(
    request.body,
  )

  let videoPath = ''

  if (video) {
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
    await s3Client.send(videoCommand)
    videoPath = `https://d4lyjck7y73xy.cloudfront.net/assets/galaxynerd2/MP4/${videoFileName}`
  }

  const { lessonId } = request.params as { lessonId: string }

  try {
    const updateLessonUseCase = makeUpdateLessonUseCase()

    const lesson = await updateLessonUseCase.execute({
      lessonId,
      title,
      description,
      topicId,
      videoUrl: videoPath,
      order,
      duration,
    })

    reply.code(200).send({ lesson })
  } catch (error) {
    if (error instanceof LessonNotFoundError) {
      reply.code(404).send({ message: error.message })
      return
    }

    console.error(error)
    reply.code(500).send({ message: 'Internal server error' })
  }
}
