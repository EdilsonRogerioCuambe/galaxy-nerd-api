import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeUpdateCourseUseCase } from '@/use-cases/factories/courses/make.update.course.use.case'
import { CourseNotFoundError } from '@/use-cases/courses/err/course.not.found.error'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

import { env } from '@/env'

const s3Client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function updateCourseController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    courseId: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    price: z.string().optional(),
    instructorId: z.string(),
    languages: z.array(z.string()).optional(),
    level: z.string().optional(),
    duration: z.string().optional(),
    thumbnail: z.string().optional(),
    image: z.string().optional(),
  })

  const {
    title,
    description,
    instructorId,
    price,
    languages,
    level,
    duration,
    image,
    thumbnail,
  } = schema.parse(request.body)

  let imageFileName = ''
  let thumbnailFileName = ''

  if (image) {
    imageFileName = `${title}-image.${image.split(';')[0].split('/')[1]}`
  }

  if (thumbnail) {
    thumbnailFileName = `${title}-thumbnail.${
      thumbnail.split(';')[0].split('/')[1]
    }`
  }

  const { courseId } = request.params as { courseId: string }

  try {
    let thumbnailUrl = thumbnail
    let imageUrl = image

    if (thumbnail && thumbnail.includes('base64')) {
      const thumbnailParts = thumbnail.split(',')
      if (thumbnailParts.length > 1) {
        await s3Client.send(
          new PutObjectCommand({
            Bucket: 'galaxynerd',
            Key: thumbnailFileName,
            Body: Buffer.from(thumbnailParts[1], 'base64'),
            ContentType: `image/${
              thumbnailParts[0].split(';')[0].split('/')[1]
            }`,
          }),
        )

        thumbnailUrl = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${thumbnailFileName}`
      } else {
        return reply.status(400).send({
          message: 'thumbnail is not properly formatted',
        })
      }
    }

    if (image && image.includes('base64')) {
      const imageParts = image.split(',')
      if (imageParts.length > 1) {
        await s3Client.send(
          new PutObjectCommand({
            Bucket: 'galaxynerd',
            Key: imageFileName,
            Body: Buffer.from(imageParts[1], 'base64'),
            ContentType: `image/${imageParts[0].split(';')[0].split('/')[1]}`,
          }),
        )

        imageUrl = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${imageFileName}`
      } else {
        return reply.status(400).send({
          message: 'image is not properly formatted',
        })
      }
    }

    const updateCourseUseCase = makeUpdateCourseUseCase()

    const course = await updateCourseUseCase.execute({
      courseId,
      title,
      description,
      price,
      thumbnail: thumbnailUrl,
      instructorId,
      languages,
      level,
      duration,
      image: imageUrl,
    })

    return reply.status(200).send({ course })
  } catch (error) {
    if (error instanceof CourseNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
