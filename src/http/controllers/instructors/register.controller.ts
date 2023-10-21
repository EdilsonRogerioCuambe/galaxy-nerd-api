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
    socialLinks: z.array(z.string()).optional(),
    interests: z.array(z.string()).optional(),
    avatar: z.string(),
    banner: z.string(),
  })

  const {
    name,
    email,
    password,
    biography,
    location,
    socialLinks,
    role,
    interests,
    avatar,
    banner,
  } = schema.parse(request.body)

  const avatarFileName = `${name}-avatar.${avatar.split(';')[0].split('/')[1]}`
  const bannerFileName = `${name}-banner.${banner.split(';')[0].split('/')[1]}`

  const avatarCommand = new PutObjectCommand({
    Bucket: 'galaxynerd',
    Key: avatarFileName,
    Body: Buffer.from(avatar.split(',')[1], 'base64'),
    ContentType: `image/${avatar.split(';')[0].split('/')[1]}`,
  })

  const bannerCommand = new PutObjectCommand({
    Bucket: 'galaxynerd',
    Key: bannerFileName,
    Body: Buffer.from(banner.split(',')[1], 'base64'),
    ContentType: `image/${banner.split(';')[0].split('/')[1]}`,
  })

  try {
    await s3Client.send(avatarCommand)
    await s3Client.send(bannerCommand)

    const avatarUrl = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${avatarFileName}`
    const bannerUrl = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${bannerFileName}`

    console.log(avatarUrl, bannerUrl)

    const registerInstructorUseCase = makeRegisterInstructor()

    const instructor = await registerInstructorUseCase.execute({
      name,
      email,
      password,
      interests,
      biography,
      location,
      socialLinks,
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
