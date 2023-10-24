/*
  Warnings:

  - You are about to drop the column `administratorId` on the `categories` table. All the data in the column will be lost.
  - You are about to drop the `_AdministratorToCourse` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AdministratorToCourse" DROP CONSTRAINT "_AdministratorToCourse_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdministratorToCourse" DROP CONSTRAINT "_AdministratorToCourse_B_fkey";

-- DropForeignKey
ALTER TABLE "categories" DROP CONSTRAINT "categories_administratorId_fkey";

-- AlterTable
ALTER TABLE "administrators" ADD COLUMN     "favoriteCourses" TEXT[],
ADD COLUMN     "interests" TEXT[];

-- AlterTable
ALTER TABLE "categories" DROP COLUMN "administratorId";

-- DropTable
DROP TABLE "_AdministratorToCourse";
