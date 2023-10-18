import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'
import { AdminNotFoundError } from '@/use-cases/admins/err/admin.not.found.error'
import { makeUpdateAdminUseCase } from '@/use-cases/factories/admins/make.update.admin.use.case'

interface MultipartFile {
  path: string
}

interface Files {
  avatar: MultipartFile[]
  banner: MultipartFile[]
}

export async function update(request: FastifyRequest, reply: FastifyReply) {
  const schema = z.object({
    name: z.string().optional(),
    email: z.string().email().optional(),
    password: z
      .string()
      .regex(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,32}$/)
      .optional(),
    role: z.enum(['ADMIN', 'INSTRUCTOR', 'STUDENT']).optional(),
    biography: z.string().optional(),
    location: z.string().optional(),
    socialLinks: z.array(z.string()).optional(),
    avatar: z.string().optional(),
    banner: z.string().optional(),
  })

  const {
    name,
    email,
    password,
    biography,
    location,
    socialLinks,
    role,
    avatar,
    banner,
  } = schema.parse(request.body)

  const { adminId } = request.params as { adminId: string }

  try {
    const updateAdminUseCase = makeUpdateAdminUseCase()

    let avatarPath = avatar
    let bannerPath = banner

    const { avatar: avatarFiles, banner: bannerFiles } =
      request.files as unknown as Files

    if (avatarFiles && avatarFiles.length > 0) {
      avatarPath = avatarFiles[0].path
    }

    if (bannerFiles && bannerFiles.length > 0) {
      bannerPath = bannerFiles[0].path
    }

    const { admin } = await updateAdminUseCase.execute({
      adminId,
      name,
      email,
      password,
      biography,
      location,
      socialLinks,
      role,
      avatar: avatarPath,
      banner: bannerPath,
    })

    return reply.status(200).send({ admin })
  } catch (error) {
    if (error instanceof AdminNotFoundError) {
      return reply.status(404).send({
        message: error.message,
      })
    }

    return reply.status(500).send()
  }
}
