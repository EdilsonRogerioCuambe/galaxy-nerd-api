/*
  Warnings:

  - You are about to drop the column `body` on the `forums` table. All the data in the column will be lost.
  - Added the required column `description` to the `forums` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "forums" DROP COLUMN "body",
ADD COLUMN     "description" TEXT NOT NULL;
