/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `examples` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `handlerFunctionName` on the `Problem` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Problem` table. All the data in the column will be lost.
  - Added the required column `starterFunctionName` to the `Problem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Problem" DROP COLUMN "createdAt",
DROP COLUMN "examples",
DROP COLUMN "handlerFunctionName",
DROP COLUMN "updatedAt",
ADD COLUMN     "starterFunctionName" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Example" (
    "id" TEXT NOT NULL,
    "inputText" TEXT NOT NULL,
    "outputText" TEXT NOT NULL,
    "explanation" TEXT NOT NULL,
    "img" TEXT,
    "problemId" TEXT,

    CONSTRAINT "Example_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Example" ADD CONSTRAINT "Example_problemId_fkey" FOREIGN KEY ("problemId") REFERENCES "Problem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
