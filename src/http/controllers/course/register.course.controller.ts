import { makeRegisterCourseUseCase } from '@/use-cases/factories/courses/make.register.course.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { CourseAlreadyExistsError } from '@/use-cases/courses/err/course.already.exists.error'

interface MultipartFile {
  path: string
}

interface Files {
  image: MultipartFile[]
  thumbnail: MultipartFile[]
}

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
  } = schema.parse(request.body)

  const { image, thumbnail } = request.files as unknown as Files

  const imagePath = image[0].path
  const thumbnailPath = thumbnail[0].path

  try {
    const registerCourseUseCase = makeRegisterCourseUseCase()

    const course = await registerCourseUseCase.execute({
      title,
      description,
      price,
      thumbnail: thumbnailPath,
      image: imagePath,
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
