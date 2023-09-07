import { FastifyInstance } from 'fastify'
import multer from 'fastify-multer'

import { createCloudinaryStorage } from '@/utils/storage'
import { register } from './register.student.controller'
import { authenticateStudentController } from './authenticate.student.controller'
import { getAllStudentsController } from './get.all.students.controller'
import { getStudentProfileController } from './get.student.profile.controller'
import { deleteStudentController } from './delete.student.controller'
import { update } from './update.student.controller'

const upload = multer({
  storage: createCloudinaryStorage(),
})

export async function studentsRoutes(app: FastifyInstance) {
  app.post('/students', { preHandler: upload.single('avatar') }, register)
  app.post('/students/sessions', authenticateStudentController)
  app.get('/students', getAllStudentsController)
  app.get('/students/:studentId', getStudentProfileController)
  app.put(
    '/students/:studentId',
    { preHandler: upload.single('avatar') },
    update,
  )
  app.delete('/students/:studentId', deleteStudentController)
}
