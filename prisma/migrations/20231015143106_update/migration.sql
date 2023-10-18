/*
  Warnings:

  - You are about to drop the column `adminId` on the `categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_adminId_fkey";

-- AlterTable
ALTER TABLE "administrators" ADD COLUMN     "interests" TEXT[];

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "adminId";
