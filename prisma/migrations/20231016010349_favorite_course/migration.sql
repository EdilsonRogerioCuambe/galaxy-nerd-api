-- AlterTable
ALTER TABLE "courses" ADD COLUMN     "administratorId" TEXT;

-- AddForeignKey
ALTER TABLE "courses" ADD CONSTRAINT "courses_administratorId_fkey" FOREIGN KEY ("administratorId") REFERENCES "administrators"("id") ON DELETE SET NULL ON UPDATE CASCADE;
