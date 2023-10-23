import { ForunsRepository } from '@/repositories/forum.repository'
import { Forum } from '@prisma/client'
import { slugify } from '@/utils/slug'

interface CreateForumUseCaseProps {
  title: string
  description?: string
  lessonId: string
  studentId: string
}

interface CreateForumUseCaseResponse {
  forum: Forum
}

export class CreateForumUseCase {
  constructor(private forumsRepository: ForunsRepository) {}

  async execute({
    title,
    description,
    lessonId,
    studentId,
  }: CreateForumUseCaseProps): Promise<CreateForumUseCaseResponse> {
    const slug = slugify({ slug: title })

    const forum = await this.forumsRepository.create({
      title,
      description,
      slug,
      lessonId,
      studentId,
    })

    return { forum }
  }
}
