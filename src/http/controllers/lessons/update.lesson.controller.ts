import { makeUpdateLessonUseCase } from '@/use-cases/factories/lessons/make.update.lesson.use.case'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { LessonNotFoundError } from '@/use-cases/lessons/error/lesson.not.found'

interface MultipartFile {
  path: string
}

interface Files {
  video: MultipartFile[]
}

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
  })

  const { title, description, topicId, order, duration } = schema.parse(
    request.body,
  )

  const { video } = request.files as unknown as Files

  const videoPath = video[0].path

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

    reply.code(200).send(lesson)
  } catch (error) {
    if (error instanceof LessonNotFoundError) {
      reply.code(404).send({ message: error.message })
      return
    }

    console.error(error)
    reply.code(500).send({ message: 'Internal server error' })
  }
}
