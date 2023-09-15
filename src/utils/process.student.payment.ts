import { env } from '@/env'
import { Course, Student } from '@prisma/client'
import Stripe from 'stripe'

const stripe = new Stripe(env.STRIPE_PRIVATE_KEY, {
  apiVersion: '2023-08-16',
})

export async function processStudentPayment(course: Course, student: Student) {
  try {
    const paymentMethod = await stripe.paymentMethods.create({
      type: 'card',
      card: {
        token: 'tok_visa',
      },
    })

    const paymentIntent = await stripe.paymentIntents.create({
      amount: parseInt(course.price) * 100,
      currency: 'brl',
      description: `Payment for ${course.title}`,
      receipt_email: student.email,
      metadata: {
        studentId: student.id,
        courseId: course.id,
      },
      automatic_payment_methods: {
        enabled: true,
      },
      confirm: true,
      return_url: 'http://localhost:3333/payment/success',
      payment_method: paymentMethod.id,
    })

    if (!paymentIntent.client_secret) {
      console.error('Payment intent without client secret:', paymentIntent)
      throw new Error('Payment intent without client secret')
    }

    console.log('Payment Intent Status:', paymentIntent.status)

    if (paymentIntent.status === 'succeeded') {
      return true
    } else {
      console.error('Payment intent not succeeded:', paymentIntent)
      throw new Error('Payment intent not succeeded')
    }
  } catch (error) {
    console.error('Error in processStudentPayment:', error)
    throw error
  }
}
