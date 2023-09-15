import { env } from '@/env'
import { Course, Student } from '@prisma/client'
import nodemailer from 'nodemailer'

export async function sendConfirmationEmailToStudent(
  student: Student,
  course: Course,
) {
  try {
    const transporter = nodemailer.createTransport({
      host: env.NODE_MAILER_HOST,
      port: Number(env.NODE_MAILER_PORT),
      secure: false,
      auth: {
        user: env.EMAIL,
        pass: env.PASSWORD,
      },
    })

    const mailOptions = {
      from: env.EMAIL,
      to: student.email,
      subject: 'Confirmação de matrícula',
      html: `
        <html>
          <head>
            <style>
              body {
                background-color: purple;
                font-family: Arial, sans-serif;
                color: white;
              }
              h1 {
                color: green;
              }
              p {
                color: red;
              }
            </style>
          </head>
          <body>
            <h1>Confirmação de Matrícula</h1>
            <p>Olá ${student.name},</p>
            <p>Você se matriculou no curso:</p>
            <p><strong>${course.title}</strong></p>
          </body>
        </html>
      `,
    }

    const info = await transporter.sendMail(mailOptions)

    console.log('Message sent: %s', info.messageId)
  } catch (error) {
    console.error('Error in sendConfirmationEmailToStudent:', error)
    throw error
  }
}
