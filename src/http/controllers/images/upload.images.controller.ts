import { FastifyRequest, FastifyReply } from 'fastify'

interface MultipartFile {
  path: string
}

export async function uploadImages(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const { path: image } = request.file as unknown as MultipartFile

    return reply.code(200).send({
      success: 1,
      file: {
        url: image,
      },
    })
  } catch (error) {
    return reply.code(500).send({ message: 'Internal server error' })
  }
}
