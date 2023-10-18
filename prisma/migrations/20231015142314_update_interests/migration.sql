/*
  Warnings:

  - You are about to drop the column `administratorId` on the `categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_administratorId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "administratorId",
ADD COLUMN     "adminId" TEXT;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_adminId_fkey" FOREIGN KEY ("adminId") REFERENCES "administrators"("id") ON DELETE SET NULL ON UPDATE CASCADE;
