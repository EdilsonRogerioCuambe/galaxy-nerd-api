/*
  Warnings:

  - You are about to drop the column `favoriteCourseId` on the `administrators` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "administrators" DROP CONSTRAINT "administrators_favoriteCourseId_fkey";

-- AlterTable
ALTER TABLE "administrators" DROP COLUMN "favoriteCourseId";
