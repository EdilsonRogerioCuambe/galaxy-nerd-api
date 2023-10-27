/*
  Warnings:

  - You are about to drop the column `downvotes` on the `answers` table. All the data in the column will be lost.
  - You are about to drop the column `upvotes` on the `answers` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "VoteType" AS ENUM ('UPVOTE', 'DOWNVOTE');

-- AlterTable
ALTER TABLE "answers" DROP COLUMN "downvotes",
DROP COLUMN "upvotes";

-- CreateTable
CREATE TABLE "votes" (
    "id" TEXT NOT NULL,
    "voteType" "VoteType" NOT NULL,
    "studentId" TEXT,
    "instructorId" TEXT,
    "answerId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "votes_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_instructorId_fkey" FOREIGN KEY ("instructorId") REFERENCES "instructors"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "votes" ADD CONSTRAINT "votes_answerId_fkey" FOREIGN KEY ("answerId") REFERENCES "answers"("id") ON DELETE SET NULL ON UPDATE CASCADE;
