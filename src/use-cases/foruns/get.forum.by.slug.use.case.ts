import { ForumNotFoundError } from './error/forum.not.found.error'
import { ForunsRepository } from '@/repositories/forum.repository'
import { Forum } from '@prisma/client'

interface GetForumByIdUseCaseProps {
  slug: string
}

interface GetForumByIdUseCaseResponse {
  forum: Forum
}

export class GetForumBySlugUseCase {
  constructor(private forumsRepository: ForunsRepository) {}

  async execute({
    slug,
  }: GetForumByIdUseCaseProps): Promise<GetForumByIdUseCaseResponse> {
    const forum = await this.forumsRepository.findBySlug(slug)

    if (!forum) {
      throw new ForumNotFoundError()
    }

    return { forum }
  }
}
