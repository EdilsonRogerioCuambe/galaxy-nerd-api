import { Course, Student } from '@prisma/client'
import nodemailer from 'nodemailer'

export async function sendConfirmationEmailToStudent(
  student: Student,
  course: Course,
) {
  try {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: 'edilson@aluno.unilab.edu.br',
        pass: '@ShaniaZibia20',
      },
    })

    const mailOptions = {
      from: 'edilson@aluno.unilab.edu.br',
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
