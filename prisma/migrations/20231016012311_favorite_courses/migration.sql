/*
  Warnings:

  - You are about to drop the column `administratorId` on the `courses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_administratorId_fkey";

-- AlterTable
ALTER TABLE "administrators" ADD COLUMN     "favoriteCourseId" TEXT;

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "administratorId";

-- AddForeignKey
ALTER TABLE "administrators" ADD CONSTRAINT "administrators_favoriteCourseId_fkey" FOREIGN KEY ("favoriteCourseId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
