import { makeRegisterCourseUseCase } from '@/use-cases/factories/courses/make.register.course.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { CourseAlreadyExistsError } from '@/use-cases/courses/err/course.already.exists.error'

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

import { env } from '@/env'

const s3Client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function registerCourseController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    title: z.string(),
    description: z.string().optional(),
    price: z.string(),
    instructorId: z.string(),
    studentId: z.string().optional(),
    shortDescription: z.string().optional(),
    languages: z.array(z.string()),
    level: z.enum(['Iniciante', 'Intermediário', 'Avançado']),
    duration: z.string(),
    thumbnail: z.string(),
    image: z.string(),
  })

  const {
    title,
    description,
    instructorId,
    price,
    languages,
    shortDescription,
    level,
    duration,
    thumbnail,
    image,
  } = schema.parse(request.body)

  const imageFileName = `${title}-image.${image.split(';')[0].split('/')[1]}`
  const thumbnailFileName = `${title}-thumbnail.${
    thumbnail.split(';')[0].split('/')[1]
  }`

  const imageCommand = new PutObjectCommand({
    Bucket: 'galaxynerd',
    Key: imageFileName,
    Body: Buffer.from(image.split(',')[1], 'base64'),
    ContentType: `image/${image.split(';')[0].split('/')[1]}`,
  })

  const thumbnailCommand = new PutObjectCommand({
    Bucket: 'galaxynerd',
    Key: thumbnailFileName,
    Body: Buffer.from(thumbnail.split(',')[1], 'base64'),
    ContentType: `image/${thumbnail.split(';')[0].split('/')[1]}`,
  })

  try {
    await s3Client.send(imageCommand)
    await s3Client.send(thumbnailCommand)

    const imageUrl = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${imageFileName}`
    const thumbnailUrl = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${thumbnailFileName}`

    const registerCourseUseCase = makeRegisterCourseUseCase()

    const course = await registerCourseUseCase.execute({
      title,
      description,
      price,
      thumbnail: thumbnailUrl,
      image: imageUrl,
      shortDescription,
      languages,
      instructorId,
      level,
      duration,
    })

    return reply.status(201).send({ course })
  } catch (error) {
    if (error instanceof CourseAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
