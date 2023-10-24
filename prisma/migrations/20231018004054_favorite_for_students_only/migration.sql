/*
  Warnings:

  - You are about to drop the column `administratorId` on the `favorites` table. All the data in the column will be lost.
  - You are about to drop the column `instructorId` on the `favorites` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_administratorId_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_instructorId_fkey";

-- AlterTable
ALTER TABLE "favorites" DROP COLUMN "administratorId",
DROP COLUMN "instructorId";
