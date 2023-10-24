import { FastifyInstance } from 'fastify'
import { register } from './register.controller'
import { authenticateAdminController } from './authenticate.controller'
import { getAdminProfile } from './get.admin.profile.controller'
import { getAllAdmins } from './get.all.admins.controller'
import { deleteAdminController } from './delete.admin.controller'
import { update } from './update.admin.controller'
import { profileAdminController } from './profile.controller'
import { verifyJwt } from '@/http/middlewares/verify.jwt'
import { verifyUserRole } from '@/http/middlewares/verify.user.role'
import { refresh } from './refresh.admin'

export async function adminsRoutes(app: FastifyInstance) {
  app.post('/admins', register)
  app.post('/admins/sessions', authenticateAdminController)
  app.get(
    '/admins/:adminId',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    getAdminProfile,
  )
  app.put(
    '/admins/:adminId',
    {
      onRequest: [verifyJwt, verifyUserRole('ADMIN')],
    },
    update,
  )
  app.get(
    '/admins/me',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    profileAdminController,
  )
  app.get(
    '/admins/adminId',
    {
      onRequest: [verifyJwt, verifyUserRole('ADMIN')],
    },
    getAdminProfile,
  )
  app.get(
    '/admins',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    getAllAdmins,
  )
  app.delete(
    '/admins/:adminId',
    { onRequest: [verifyJwt, verifyUserRole('ADMIN')] },
    deleteAdminController,
  )
  app.patch('/admin/token/refresh', refresh)
}
