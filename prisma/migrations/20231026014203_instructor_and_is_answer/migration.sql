-- AlterTable
ALTER TABLE "answers" ADD COLUMN     "instructorId" TEXT,
ADD COLUMN     "isAnswer" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructors"("id") ON DELETE SET NULL ON UPDATE CASCADE;
