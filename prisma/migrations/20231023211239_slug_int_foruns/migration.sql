/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `forums` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `forums` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "forums" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "forums_slug_key" ON "forums"("slug");
