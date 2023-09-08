/*
  Warnings:

  - Made the column `courseId` on table `topics` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "topics" DROP CONSTRAINT "topics_courseId_fkey";

-- AlterTable
ALTER TABLE "topics" ALTER COLUMN "courseId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "topics" ADD CONSTRAINT "topics_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
