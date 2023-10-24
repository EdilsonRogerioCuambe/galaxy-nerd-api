import { Forum } from '@prisma/client'
import { ForunsRepository } from '@/repositories/forum.repository'
import { ForumNotFoundError } from './error/forum.not.found.error'
import { slugify } from '@/utils/slug'

interface UpdateForumUseCaseProps {
  id: string
  title?: string
  description?: string
  answered?: boolean
  studentId: string
  lessonId: string
}

interface UpdateForumUseCaseResponse {
  forum: Forum
}

export class UpdateForumUseCase {
  constructor(private forumsRepository: ForunsRepository) {}

  async execute({
    id,
    title,
    description,
    answered,
    studentId,
    lessonId,
  }: UpdateForumUseCaseProps): Promise<UpdateForumUseCaseResponse> {
    const forumAlreadyExists = await this.forumsRepository.findById(id)

    if (!forumAlreadyExists) {
      throw new ForumNotFoundError()
    }

    const slug = title ? slugify({ slug: title }) : ''

    const forum = await this.forumsRepository.update(id, {
      title,
      description,
      slug,
      answered,
      studentId,
      lessonId,
    })

    return { forum }
  }
}
