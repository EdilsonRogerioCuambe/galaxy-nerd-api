import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { run } from './runner.manager'

export async function compileFileControllerPost(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    code: z.string(),
    language: z.string(),
  })

  const { code, language } = schema.parse(request.body)
  try {
    const result = await run(language, code)

    reply.send({
      status: '0',
      message: 'Success',
      result,
    })
  } catch (error) {
    console.log(error)
  }
}
