import { Forum } from '@prisma/client'
import { ForunsRepository } from '@/repositories/forum.repository'
import { ForumNotFoundError } from './error/forum.not.found.error'

interface GetForumByIdUseCaseProps {
  id: string
}

interface GetForumByIdUseCaseResponse {
  forum: Forum
}

export class GetForumByIdUseCase {
  constructor(private forumsRepository: ForunsRepository) {}

  async execute({
    id,
  }: GetForumByIdUseCaseProps): Promise<GetForumByIdUseCaseResponse> {
    const forum = await this.forumsRepository.findById(id)

    if (!forum) {
      throw new ForumNotFoundError()
    }

    return { forum }
  }
}
