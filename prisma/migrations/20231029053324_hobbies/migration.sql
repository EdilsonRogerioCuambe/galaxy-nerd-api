-- AlterTable
ALTER TABLE "students" ADD COLUMN     "birthDate" TIMESTAMP(3),
ADD COLUMN     "hobbies" TEXT[],
ADD COLUMN     "phone" TEXT,
ADD COLUMN     "profession" TEXT,
ADD COLUMN     "skills" TEXT[],
ADD COLUMN     "works" TEXT[];
