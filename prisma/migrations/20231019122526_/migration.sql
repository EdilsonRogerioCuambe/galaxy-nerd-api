/*
  Warnings:

  - You are about to drop the column `categoryId` on the `courses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_categoryId_fkey";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "courseId" TEXT;

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "categoryId";

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "courses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
