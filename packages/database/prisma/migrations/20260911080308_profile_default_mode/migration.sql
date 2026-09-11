-- CreateEnum
CREATE TYPE "ProfileMode" AS ENUM ('HUB', 'SOCIAL');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "defaultMode" "ProfileMode";
