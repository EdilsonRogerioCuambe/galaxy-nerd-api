/*
  Warnings:

  - You are about to drop the `interests` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "interests" DROP CONSTRAINT "interests_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "interests" DROP CONSTRAINT "interests_studentId_fkey";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "studentId" TEXT;

-- DropTable
DROP TABLE "interests";

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE CASCADE;
