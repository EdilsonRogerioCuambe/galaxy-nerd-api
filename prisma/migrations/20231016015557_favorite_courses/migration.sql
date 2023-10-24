/*
  Warnings:

  - You are about to drop the column `administratorId` on the `courses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_administratorId_fkey";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "administratorId",
ADD COLUMN     "adminId" TEXT;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "administrators"("id") ON DELETE SET NULL ON UPDATE CASCADE;
