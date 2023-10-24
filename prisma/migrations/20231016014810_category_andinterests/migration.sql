/*
  Warnings:

  - You are about to drop the column `interests` on the `administrators` table. All the data in the column will be lost.
  - You are about to drop the `admin_favorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `favorites` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `instructor_favorites` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "admin_favorites" DROP CONSTRAINT "admin_favorites_adminId_fkey";

-- DropForeignKey
ALTER TABLE "admin_favorites" DROP CONSTRAINT "admin_favorites_courseId_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_courseId_fkey";

-- DropForeignKey
ALTER TABLE "favorites" DROP CONSTRAINT "favorites_studentId_fkey";

-- DropForeignKey
ALTER TABLE "instructor_favorites" DROP CONSTRAINT "instructor_favorites_courseId_fkey";

-- DropForeignKey
ALTER TABLE "instructor_favorites" DROP CONSTRAINT "instructor_favorites_instructorId_fkey";

-- AlterTable
ALTER TABLE "administrators" DROP COLUMN "interests";

-- AlterTable
ALTER TABLE "categories" ADD COLUMN     "administratorId" TEXT;

-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "administratorId" TEXT;

-- DropTable
DROP TABLE "admin_favorites";

-- DropTable
DROP TABLE "favorites";

-- DropTable
DROP TABLE "instructor_favorites";

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_administratorId_fkey" FOREIGN KEY ("administratorId") REFERENCES "administrators"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "categories" ADD CONSTRAINT "categories_administratorId_fkey" FOREIGN KEY ("administratorId") REFERENCES "administrators"("id") ON DELETE SET NULL ON UPDATE CASCADE;
