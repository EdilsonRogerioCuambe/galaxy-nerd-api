import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { makeRegisterStudentUseCase } from '@/use-cases/factories/students/make.register.student.use.case'
import { StudentAlreadyExistsError } from '@/use-cases/students/err/student.already.exists.error'
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
    role: z.enum(['ADMIN', 'INSTRUCTOR', 'STUDENT']).default('STUDENT'),
    biography: z.string().optional(),
    location: z.string().optional(),
    interests: z.array(z.string()).optional(),
    avatar: z.string().optional(),
    banner: z.string().optional(),
    facebook: z.string().optional(),
    twitter: z.string().optional(),
    instagram: z.string().optional(),
    linkedin: z.string().optional(),
    youtube: z.string().optional(),
    github: z.string().optional(),
    website: z.string().optional(),
    skills: z.array(z.string()).optional(),
    works: z.array(z.string()).optional(),
    hobbies: z.array(z.string()).optional(),
    birthDate: z.string().optional(),
    profession: z.string().optional(),
    phone: z.string().optional(),
  })

  const {
    name,
    email,
    password,
    biography,
    location,
    role,
    interests,
    avatar,
    banner,
    facebook,
    twitter,
    instagram,
    linkedin,
    youtube,
    github,
    website,
    skills,
    works,
    hobbies,
    birthDate,
    profession,
    phone,
  } = schema.parse(request.body)

  let avatarFileName = ''
  let bannerFileName = ''

  if (avatar) {
    avatarFileName = `${name}-avatar.${avatar.split(';')[0].split('/')[1]}`

    const avatarCommand = new PutObjectCommand({
      Bucket: 'galaxynerd',
      Key: avatarFileName,
      Body: Buffer.from(avatar.split(',')[1], 'base64'),
      ContentType: `image/${avatar.split(';')[0].split('/')[1]}`,
    })

    await s3Client.send(avatarCommand)
  }

  if (banner) {
    bannerFileName = `${name}-banner.${banner.split(';')[0].split('/')[1]}`

    const bannerCommand = new PutObjectCommand({
      Bucket: 'galaxynerd',
      Key: bannerFileName,
      Body: Buffer.from(banner.split(',')[1], 'base64'),
      ContentType: `image/${banner.split(';')[0].split('/')[1]}`,
    })

    await s3Client.send(bannerCommand)
  }

  try {
    const avatarUrl = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${avatarFileName}`
    const bannerUrl = `https://${env.AWS_BUCKET_NAME}.s3.amazonaws.com/${bannerFileName}`

    const registerStudentUseCase = makeRegisterStudentUseCase()

    const student = await registerStudentUseCase.execute({
      name,
      email,
      password,
      avatar: avatarUrl,
      banner: bannerUrl,
      biography,
      location,
      role,
      interests,
      facebook,
      twitter,
      instagram,
      linkedin,
      youtube,
      github,
      website,
      skills,
      works,
      hobbies,
      birthDate,
      profession,
      phone,
    })

    return reply.status(201).send({ student })
  } catch (error) {
    if (error instanceof StudentAlreadyExistsError) {
      return reply.status(409).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
