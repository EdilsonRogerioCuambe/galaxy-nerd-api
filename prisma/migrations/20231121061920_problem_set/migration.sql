-- CreateTable
CREATE TABLE "Problem" (
    "id" TEXT NOT NULL,
    "problemStatement" TEXT NOT NULL,
    "explanation" JSONB NOT NULL,
    "constraints" TEXT NOT NULL,
    "starterCode" TEXT NOT NULL,
    "handlerFunction" TEXT NOT NULL,
    "handlerFunctionName" TEXT NOT NULL,
    "order" TEXT NOT NULL,
    "lessonId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Problem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Problem" ADD CONSTRAINT "Problem_lessonId_fkey" FOREIGN KEY ("lessonId") REFERENCES "lessons"("id") ON DELETE SET NULL ON UPDATE CASCADE;
