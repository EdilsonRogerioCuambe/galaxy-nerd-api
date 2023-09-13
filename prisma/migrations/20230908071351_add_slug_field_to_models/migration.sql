/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `lessons` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `topics` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `lessons` table without a default value. This is not possible if the table is not empty.
  - Added the required column `slug` to the `topics` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "lessons" ADD COLUMN     "slug" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "topics" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "lessons_slug_key" ON "lessons"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "topics_slug_key" ON "topics"("slug");
