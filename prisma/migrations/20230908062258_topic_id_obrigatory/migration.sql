/*
  Warnings:

  - Made the column `topicId` on table `lessons` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "lessons" DROP CONSTRAINT "lessons_topicId_fkey";

-- AlterTable
ALTER TABLE "lessons" ALTER COLUMN "topicId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "lessons" ADD CONSTRAINT "lessons_topicId_fkey" FOREIGN KEY ("topicId") REFERENCES "topics"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
