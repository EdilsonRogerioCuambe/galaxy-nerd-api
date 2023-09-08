-- AlterTable
ALTER TABLE "course_progress" ALTER COLUMN "progress" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "documents" ALTER COLUMN "order" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "lessons" ALTER COLUMN "duration" SET DATA TYPE TEXT,
ALTER COLUMN "order" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "topics" ALTER COLUMN "order" SET DATA TYPE TEXT;
