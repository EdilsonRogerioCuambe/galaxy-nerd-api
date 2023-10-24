import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { InstructorAlreadyExistsError } from '@/use-cases/instructors/err/instructor.already.exists.error'
import { makeRegisterInstructor } from '@/use-cases/factories/instructors/make.register.instructor.use.case'
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'

import { env } from '@/env'

const s3Client = new S3Client({
  region: 'us-east-2',
  credentials: {
    accessKeyId: env.AWS_ACCESS_KEY_ID,
    secretAccessKey: env.AWS_SECRET_ACCESS_KEY,
  },
})

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,32}$/),
    role: z.enum(['ADMIN', 'INSTRUCTOR', 'STUDENT']).default('INSTRUCTOR'),
    biography: z.string().optional(),
    location: z.string().optional(),
    avatar: z.string().optional(),
    banner: z.string().optional(),
  })

  const { name, email, password, biography, location, role, avatar, banner } =
    schema.parse(request.body)

  let avatarUrl = ''
  let bannerUrl = ''

  if (avatar) {
    const avatarFileName = `${name}-avatar.${
      avatar.split(';')[0].split('/')[1]
    }`

    const avatarCommand = new PutObjectCommand({
      Bucket: 'galaxynerd',
      Key: avatarFileName,
      Body: Buffer.from(avatar.split(',')[1], 'base64'),
      ContentType: `image/${avatar.split(';')[0].split('/')[1]}`,
    })

    await s3Client.send(avatarCommand)

    avatarUrl = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${avatarFileName}`
  }

  if (banner) {
    const bannerFileName = `${name}-banner.${
      banner.split(';')[0].split('/')[1]
    }`

    const bannerCommand = new PutObjectCommand({
      Bucket: 'galaxynerd',
      Key: bannerFileName,
      Body: Buffer.from(banner.split(',')[1], 'base64'),
      ContentType: `image/${banner.split(';')[0].split('/')[1]}`,
    })

    await s3Client.send(bannerCommand)

    bannerUrl = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${bannerFileName}`
  }

  try {
    const registerInstructorUseCase = makeRegisterInstructor()

    const instructor = await registerInstructorUseCase.execute({
      name,
      email,
      password,
      biography,
      location,
      role,
      avatar: avatarUrl,
      banner: bannerUrl,
    })

    return reply.status(201).send({ instructor })
  } catch (error) {
    console.log(error)

    if (error instanceof InstructorAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
