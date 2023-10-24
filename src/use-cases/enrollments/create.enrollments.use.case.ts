import { EnrollmentsRepository } from '@/repositories/enrollments.repository'
import { StudentsRepository } from '@/repositories/students.repository'
import { CoursesRepository } from '@/repositories/courses.repository'
import { Enrollment } from '@prisma/client'
import { sendConfirmationEmailToStudent } from '@/utils/send.confirmation.email.to.student'

interface CreateEnrollmentProps {
  studentId: string
  courseId: string
}

interface CreateEnrollmentResponse {
  enrollment: Enrollment
}

export class CreateEnrollmentUseCase {
  constructor(
    private enrollmentsRepository: EnrollmentsRepository,
    private studentsRepository: StudentsRepository,
    private coursesRepository: CoursesRepository,
  ) {}

  async execute({
    studentId,
    courseId,
  }: CreateEnrollmentProps): Promise<CreateEnrollmentResponse> {
    const student = await this.studentsRepository.findById(studentId)
    const course = await this.coursesRepository.findById(courseId)

    if (!student) {
      throw new Error('Student not found')
    }

    if (!course) {
      throw new Error('Course not found')
    }

    await sendConfirmationEmailToStudent(student, course)

    const enrollment = await this.enrollmentsRepository.create({
      student: {
        connect: {
          id: studentId,
        },
      },
      course: {
        connect: {
          id: courseId,
        },
      },
    })

    return {
      enrollment,
    }
  }
}
