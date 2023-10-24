/*
  Warnings:

  - You are about to drop the `_AdministratorToCategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_AdministratorToCategory" DROP CONSTRAINT "_AdministratorToCategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_AdministratorToCategory" DROP CONSTRAINT "_AdministratorToCategory_B_fkey";

-- AlterTable
ALTER TABLE "administrators" ADD COLUMN     "interests" TEXT[];

-- DropTable
DROP TABLE "_AdministratorToCategory";
