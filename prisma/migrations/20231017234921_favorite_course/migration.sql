/*
  Warnings:

  - You are about to drop the column `favoriteCourses` on the `administrators` table. All the data in the column will be lost.
  - You are about to drop the column `interests` on the `administrators` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "administrators" DROP COLUMN "favoriteCourses",
DROP COLUMN "interests";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "administratorId" TEXT;

-- CreateTable
CREATE TABLE "_favoritesCourses" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_favoritesCourses_AB_unique" ON "_favoritesCourses"("A", "B");

-- CreateIndex
CREATE INDEX "_favoritesCourses_B_index" ON "_favoritesCourses"("B");

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_administratorId_fkey" FOREIGN KEY ("administratorId") REFERENCES "administrators"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favoritesCourses" ADD CONSTRAINT "_favoritesCourses_A_fkey" FOREIGN KEY ("A") REFERENCES "administrators"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_favoritesCourses" ADD CONSTRAINT "_favoritesCourses_B_fkey" FOREIGN KEY ("B") REFERENCES "courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
