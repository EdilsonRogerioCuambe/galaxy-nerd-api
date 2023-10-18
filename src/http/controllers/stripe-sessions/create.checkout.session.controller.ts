import { env } from '@/env'
import { Stripe } from 'stripe'
import { z } from 'zod'
import { FastifyRequest, FastifyReply } from 'fastify'
import { makeGetCourseUseCase } from '@/use-cases/factories/courses/make.get.course.use.case'
import { CourseNotFoundError } from '@/use-cases/courses/err/course.not.found.error'
import { makeGetStudentProfileUseCaseFactory } from '@/use-cases/factories/students/make.get.student.profile.use.case'

const stripe = new Stripe(env.STRIPE_PRIVATE_KEY, {
  apiVersion: '2023-08-16',
})

export async function createCheckoutSessionController(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const schema = z.object({
    studentId: z.string(),
    courseId: z.string(),
  })

  const { courseId, studentId } = schema.parse(request.body)

  const courseResponse = await makeGetCourseUseCase().execute({ courseId })
  const { course } = courseResponse

  const studentResponse = await makeGetStudentProfileUseCaseFactory().execute({
    studentId,
  })
  const { student } = studentResponse

  if (!course) {
    throw new CourseNotFoundError()
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              images: [course.thumbnail || ''],
              name: course.title,
              description: `Olá ${student.name}, muito obrigado por adquirir o curso ${course.title}! Espero que você goste!`,
              metadata: {
                courseId: course.id,
                studentId,
              },
            },
            unit_amount: Number(course.price) * 100,
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${env.CLIENT_URL}/course/${course.slug}`,
      cancel_url: `${env.CLIENT_URL}/`,
    })

    return reply.status(201).send({ sessionId: session.id })
  } catch (error) {
    console.log(error)
  }
}
