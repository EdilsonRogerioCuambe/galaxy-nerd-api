-- AlterTable
ALTER TABLE "administrators" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'ADMIN';

-- AlterTable
ALTER TABLE "instructors" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'INSTRUCTOR';

-- AlterTable
ALTER TABLE "students" ADD COLUMN     "role" "Role" NOT NULL DEFAULT 'STUDENT';
