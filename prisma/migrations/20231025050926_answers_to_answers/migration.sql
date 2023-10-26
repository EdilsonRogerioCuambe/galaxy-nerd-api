-- AlterTable
ALTER TABLE "answers" ADD COLUMN     "parentId" TEXT;

-- AddForeignKey
ALTER TABLE "answers" ADD CONSTRAINT "answers_parentId_fkey" FOREIGN KEY ("parentId") REFERENCES "answers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
