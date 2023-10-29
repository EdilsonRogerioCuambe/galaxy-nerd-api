import { FastifyInstance } from 'fastify'

import { register } from './register.student.controller'
import { authenticateStudentController } from './authenticate.student.controller'
import { getAllStudentsController } from './get.all.students.controller'
import { getStudentProfileController } from './get.student.profile.controller'
import { deleteStudentController } from './delete.student.controller'
import { update } from './update.student.controller'
import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { verifyUserRole } from '@/http/middlewares/verify.user.role'
import { addStudentScoreController } from './add.student.score.controller'
import { createLessonProgressController } from './create.lesson.progress.controller'
import { updateLessonProgressController } from './update.lesson.progress.controller'

export async function studentsRoutes(app: FastifyInstance) {
  app.post('/students', register)
  app.post('/students/sessions', authenticateStudentController)
  app.get('/students', getAllStudentsController)
  app.get('/students/:studentId', getStudentProfileController)
  app.put(
    '/students/:studentId',
    {
      onRequest: [verifyJwt, verifyUserRole('STUDENT')],
    },
    update,
  )
  app.delete(
    '/students/:studentId',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    deleteStudentController,
  )
  app.post('/students/:studentId/scores', addStudentScoreController)
  app.post(
    '/students/:studentId/lessons-progress',
    createLessonProgressController,
  )
  app.put('/students/lessons-progress', updateLessonProgressController)
}
