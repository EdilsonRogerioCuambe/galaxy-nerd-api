/*
  Warnings:

  - You are about to drop the column `interests` on the `administrators` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "administrators" DROP COLUMN "interests";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "administratorId" TEXT;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_administratorId_fkey" FOREIGN KEY ("administratorId") REFERENCES "administrators"("id") ON DELETE SET NULL ON UPDATE CASCADE;
