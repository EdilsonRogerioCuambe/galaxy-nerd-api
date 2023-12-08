/* eslint-disable camelcase */
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { oauth2Client } from '../instructors/google.auth'
import { classroom_v1 } from 'googleapis'

export async function createInstructorUsingGoogleClassroom(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  try {
    const bodySchema = z.object({
      first_name: z.string(),
      last_name: z.string(),
      email_address: z.string(),
      password: z.string(),
    })

    const { first_name, last_name, email_address, password } = bodySchema.parse(
      request.body,
    )

    const classroom = new classroom_v1.Classroom({
      auth: oauth2Client,
    })
  } catch (error) {
    console.log(error)
    return reply.send({
      error,
    })
  }
}
