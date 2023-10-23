/*
  Warnings:

  - You are about to drop the `social_links` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "social_links" DROP CONSTRAINT "social_links_studentId_fkey";

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "facebook" TEXT,
ADD COLUMN     "github" TEXT,
ADD COLUMN     "instagram" TEXT,
ADD COLUMN     "linkedin" TEXT,
ADD COLUMN     "twitter" TEXT,
ADD COLUMN     "website" TEXT,
ADD COLUMN     "youtube" TEXT;

-- DropTable
DROP TABLE "social_links";
