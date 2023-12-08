import { google } from 'googleapis'
import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { env } from '@/env'
import { OAuth2Client } from 'google-auth-library'

const oauth2Client = new OAuth2Client(
  env.GOOGLE_CLIENT_ID,
  env.GOOGLE_CLIENT_SECRET,
  'postmessage',
)

export async function createCourseUsingClassroomController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const bodySchema = z.object({
    name: z.string(),
    section: z.string(),
    descriptionHeading: z.string(),
    description: z.string(),
    room: z.string(),
    ownerId: z.string(),
    courseState: z.enum(['PROVISIONED', 'ACTIVE', 'ARCHIVED', 'DECLINED']),
    googleToken: z.string(),
  })

  try {
    const {
      name,
      section,
      descriptionHeading,
      description,
      room,
      ownerId,
      courseState,
      googleToken,
    } = bodySchema.parse(request.body)

    oauth2Client.setCredentials({
      access_token: googleToken,
    })

    const classroom = google.classroom({ version: 'v1', auth: oauth2Client })

    const { data } = await classroom.courses.create({
      requestBody: {
        name,
        section,
        descriptionHeading,
        description,
        room,
        ownerId,
        courseState,
      },
    })

    return reply.status(201).send({
      data,
    })
  } catch (error) {
    console.error(error)
    if (error instanceof z.ZodError) {
      return reply.status(400).send({
        message: error.message,
      })
    }
  }
}
