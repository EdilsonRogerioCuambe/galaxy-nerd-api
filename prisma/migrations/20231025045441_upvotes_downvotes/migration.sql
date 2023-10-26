/*
  Warnings:

  - You are about to drop the column `body` on the `answers` table. All the data in the column will be lost.
  - Added the required column `content` to the `answers` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "answers" DROP COLUMN "body",
ADD COLUMN     "content" TEXT NOT NULL,
ADD COLUMN     "downvotes" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "upvotes" INTEGER NOT NULL DEFAULT 0;
