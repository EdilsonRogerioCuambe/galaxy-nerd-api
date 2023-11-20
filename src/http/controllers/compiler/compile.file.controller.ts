/* eslint-disable @typescript-eslint/no-unused-vars */
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { getFile } from './file.api'

export async function compileFileController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    code: z.string(),
    language: z.string(),
  })

  const { code, language } = schema.parse(request.body)

  try {
    getFile(language, (_content: string) => {
      const file = {
        lang: language,
        code,
      }
      reply.send(JSON.stringify(file))
    })
  } catch (error) {
    console.log(error)
  }
}
