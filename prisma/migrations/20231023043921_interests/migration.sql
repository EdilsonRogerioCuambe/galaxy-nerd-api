/*
  Warnings:

  - You are about to drop the column `administratorId` on the `interests` table. All the data in the column will be lost.
  - You are about to drop the column `instructorId` on the `interests` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "interests" DROP CONSTRAINT "interests_administratorId_fkey";

-- DropForeignKey
ALTER TABLE "interests" DROP CONSTRAINT "interests_instructorId_fkey";

-- AlterTable
ALTER TABLE "interests" DROP COLUMN "administratorId",
DROP COLUMN "instructorId";
