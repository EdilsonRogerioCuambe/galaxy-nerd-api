import { ForunsRepository } from '@/repositories/forum.repository'
import { Forum } from '@prisma/client'

interface GetAllForumsByLessonIdUseCaseProps {
  lessonId: string
}

interface GetAllForumsByLessonIdUseCaseResponse {
  forums: Forum[]
}

export class GetAllForumsByLessonIdUseCase {
  constructor(private forumsRepository: ForunsRepository) {}

  async execute({
    lessonId,
  }: GetAllForumsByLessonIdUseCaseProps): Promise<GetAllForumsByLessonIdUseCaseResponse> {
    const forums = await this.forumsRepository.findAllForumsByLessonId(lessonId)

    return { forums }
  }
}
