/*
  Warnings:

  - You are about to drop the column `socialLinks` on the `administrators` table. All the data in the column will be lost.
  - You are about to drop the column `socialLinks` on the `instructors` table. All the data in the column will be lost.
  - You are about to drop the column `socialLinks` on the `students` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "administrators" DROP COLUMN "socialLinks";

-- AlterTable
ALTER TABLE "instructors" DROP COLUMN "socialLinks";

-- AlterTable
ALTER TABLE "students" DROP COLUMN "socialLinks";

-- CreateTable
CREATE TABLE "social_links" (
    "id" TEXT NOT NULL,
    "facebook" TEXT,
    "twitter" TEXT,
    "instagram" TEXT,
    "linkedin" TEXT,
    "youtube" TEXT,
    "github" TEXT,
    "website" TEXT,
    "studentId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "social_links_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "social_links" ADD CONSTRAINT "social_links_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "students"("id") ON DELETE SET NULL ON UPDATE CASCADE;
