/*
  Warnings:

  - You are about to drop the column `adminId` on the `courses` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "courses" DROP CONSTRAINT "courses_adminId_fkey";

-- AlterTable
ALTER TABLE "courses" DROP COLUMN "adminId";

-- CreateTable
CREATE TABLE "_AdministratorToCourse" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_AdministratorToCourse_AB_unique" ON "_AdministratorToCourse"("A", "B");

-- CreateIndex
CREATE INDEX "_AdministratorToCourse_B_index" ON "_AdministratorToCourse"("B");

-- AddForeignKey
ALTER TABLE "_AdministratorToCourse" ADD CONSTRAINT "_AdministratorToCourse_A_fkey" FOREIGN KEY ("A") REFERENCES "administrators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_AdministratorToCourse" ADD CONSTRAINT "_AdministratorToCourse_B_fkey" FOREIGN KEY ("B") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
