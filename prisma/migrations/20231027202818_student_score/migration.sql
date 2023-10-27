-- CreateTable
CREATE TABLE "student_quiz_scores" (
    "id" TEXT NOT NULL,
    "score" INTEGER NOT NULL,
    "studentId" TEXT,
    "quizId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "student_quiz_scores_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "student_quiz_scores" ADD CONSTRAINT "student_quiz_scores_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "student_quiz_scores" ADD CONSTRAINT "student_quiz_scores_quizId_fkey" FOREIGN KEY ("quizId") REFERENCES "quizzes"("id") ON DELETE SET NULL ON UPDATE CASCADE;
