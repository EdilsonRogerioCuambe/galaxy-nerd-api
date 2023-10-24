import { makeUpdateStudentUseCaseFactory } from '@/use-cases/factories/students/make.update.student.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { StudentNotFoundError } from '@/use-cases/students/err/student.not.found.error'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

import { env } from '@/env'

const s3Client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,32}$/),
    role: z.enum(['ADMIN', 'INSTRUCTOR', 'STUDENT']).optional(),
    biography: z.string().optional(),
    location: z.string().optional(),
    interests: z.array(z.string()).optional(),
    facebook: z.string().url().optional(),
    twitter: z.string().url().optional(),
    instagram: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    github: z.string().url().optional(),
    website: z.string().url().optional(),
    youtube: z.string().url().optional(),
    avatar: z.string().optional(),
    banner: z.string().optional(),
  })

  const {
    name,
    email,
    password,
    biography,
    location,
    role,
    interests,
    facebook,
    twitter,
    instagram,
    linkedin,
    github,
    website,
    youtube,
    banner,
    avatar,
  } = schema.parse(request.body)

  let avatarFileName = ''
  let bannerFileName = ''

  if (avatar) {
    avatarFileName = `${name}-avatar.${avatar.split(';')[0].split('/')[1]}`
  }

  if (banner) {
    bannerFileName = `${name}-banner.${banner.split(';')[0].split('/')[1]}`
  }

  const { studentId } = request.params as { studentId: string }

  try {
    let avatarUrl = avatar
    let bannerUrl = banner

    if (avatar && avatar.includes('base64')) {
      const avatarParts = avatar.split(',')
      if (avatarParts.length > 1) {
        await s3Client.send(
          new PutObjectCommand({
            Bucket: 'galaxynerd',
            Key: avatarFileName,
            Body: Buffer.from(avatarParts[1], 'base64'),
            ContentType: `image/${avatarParts[0].split(';')[0].split('/')[1]}`,
          }),
        )
        avatarUrl = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${avatarFileName}`
      } else {
        return reply.status(400).send({
          message: 'avatar is not properly formatted',
        })
      }
    }

    if (banner && banner.includes('base64')) {
      const bannerParts = banner.split(',')
      if (bannerParts.length > 1) {
        await s3Client.send(
          new PutObjectCommand({
            Bucket: 'galaxynerd',
            Key: bannerFileName,
            Body: Buffer.from(bannerParts[1], 'base64'),
            ContentType: `image/${bannerParts[0].split(';')[0].split('/')[1]}`,
          }),
        )
        bannerUrl = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${bannerFileName}`
      } else {
        // Handle error: banner is not properly formatted

        return reply.status(400).send({
          message: 'banner is not properly formatted',
        })
      }
    }
    const updateStudentUseCase = makeUpdateStudentUseCaseFactory()

    const { student } = await updateStudentUseCase.execute({
      studentId,
      name,
      email,
      password,
      avatar: avatarUrl,
      biography,
      location,
      interests,
      role,
      facebook,
      twitter,
      instagram,
      linkedin,
      github,
      website,
      youtube,
      banner: bannerUrl,
    })

    return reply.status(200).send({ student })
  } catch (error) {
    if (error instanceof StudentNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
