import { env } from '@/env'
import { Course, Student } from '@prisma/client'
import Stripe from 'stripe'

const stripe = new Stripe(env.STRIPE_PRIVATE_KEY, {
  apiVersion: '2023-08-16',
})

interface ProcessPaymentResponse {
  paymentSucceeded: boolean
  paymentIntent: Stripe.Checkout.Session
}

export async function processStudentPayment(
  course: Course,
  student: Student,
): Promise<ProcessPaymentResponse> {
  try {
    const coursePrice = parseInt(course.price)
    if (isNaN(coursePrice) || coursePrice <= 0) {
      throw new Error('Invalid course price')
    }

    const courseDescription: string | undefined =
      typeof course.description === 'string' ? course.description : undefined

    const paymentIntent = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'brl',
            product_data: {
              name: course.title,
              description: courseDescription,
              images: [course.thumbnail || 'url_da_imagem_padrao'],
            },
            unit_amount: coursePrice * 100,
          },
          quantity: 1,
        },
      ],
      customer_email: student.email,
      success_url: `${env.CLIENT_URL}/courses/${course.slug}/enrolled`,
      cancel_url: `${env.CLIENT_URL}/courses/${course.slug}`,
      client_reference_id: student.id,
    })

    console.log('Payment Intent Status:', paymentIntent.status)

    if (paymentIntent.payment_status === 'paid') {
      return {
        paymentSucceeded: true,
        paymentIntent,
      }
    } else if (paymentIntent.status === 'open') {
      return new Promise((resolve, reject) => {
        setTimeout(
          () => {
            if (paymentIntent.payment_status !== 'paid') {
              reject(new Error('Payment not succeeded'))
            } else {
              resolve({
                paymentSucceeded: true,
                paymentIntent,
              })
            }
          },
          5 * 60 * 1000,
        )
      })
    } else {
      throw new Error('Payment not succeeded')
    }
  } catch (error) {
    console.error('Error in processStudentPayment:', error)
    throw error
  }
}
