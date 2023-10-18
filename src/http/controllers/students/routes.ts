import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import { createCloudinaryStorage } from '@/utils/storage'
import { register } from './register.student.controller'
import { authenticateStudentController } from './authenticate.student.controller'
import { getAllStudentsController } from './get.all.students.controller'
import { getStudentProfileController } from './get.student.profile.controller'
import { deleteStudentController } from './delete.student.controller'
import { update } from './update.student.controller'
import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { verifyUserRole } from '@/http/middlewares/verify.user.role'

const upload = multer({
  storage: createCloudinaryStorage(),
})

export async function studentsRoutes(app: FastifyInstance) {
  app.post(
    '/students',
    {
      preHandler: upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'banner', maxCount: 1 },
      ]),
    },
    register,
  )
  app.post('/students/sessions', authenticateStudentController)
  app.get('/students', { onRequest: verifyJwt }, getAllStudentsController)
  app.get(
    '/students/:studentId',
    { onRequest: verifyJwt },
    getStudentProfileController,
  )
  app.put(
    '/students/:studentId',
    {
      preHandler: upload.fields([
        { name: 'avatar', maxCount: 1 },
        { name: 'banner', maxCount: 1 },
      ]),
      onRequest: [verifyJwt, verifyUserRole('STUDENT')],
    },
    update,
  )
  app.delete(
    '/students/:studentId',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    deleteStudentController,
  )
}
