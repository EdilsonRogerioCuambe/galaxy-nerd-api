/*
  Warnings:

  - You are about to drop the column `administratorId` on the `categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_administratorId_fkey";

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "administratorId";

-- CreateTable
CREATE TABLE "_AdministratorToCategory" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AdministratorToCategory_AB_unique" ON "_AdministratorToCategory"("A", "B");

-- CreateIndex
CREATE INDEX "_AdministratorToCategory_B_index" ON "_AdministratorToCategory"("B");

-- AddForeignKey
ALTER TABLE "_AdministratorToCategory" ADD CONSTRAINT "_AdministratorToCategory_A_fkey" FOREIGN KEY ("A") REFERENCES "administrators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdministratorToCategory" ADD CONSTRAINT "_AdministratorToCategory_B_fkey" FOREIGN KEY ("B") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE CASCADE;
