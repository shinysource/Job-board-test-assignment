/*
  Warnings:

  - The values [user] on the enum `RoleEnumType` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `passwordResetAt` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetToken` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `provider` on the `users` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,verificationCode]` on the table `users` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RoleEnumType_new" AS ENUM ('client', 'freelancer', 'admin');
ALTER TABLE "users" ALTER COLUMN "role" DROP DEFAULT;
ALTER TABLE "users" ALTER COLUMN "role" TYPE "RoleEnumType_new" USING ("role"::text::"RoleEnumType_new");
ALTER TYPE "RoleEnumType" RENAME TO "RoleEnumType_old";
ALTER TYPE "RoleEnumType_new" RENAME TO "RoleEnumType";
DROP TYPE "RoleEnumType_old";
ALTER TABLE "users" ALTER COLUMN "role" SET DEFAULT 'client';
COMMIT;

-- DropIndex
DROP INDEX "users_email_verificationCode_passwordResetToken_idx";

-- DropIndex
DROP INDEX "users_email_verificationCode_passwordResetToken_key";

-- AlterTable
ALTER TABLE "users" DROP COLUMN "passwordResetAt",
DROP COLUMN "passwordResetToken",
DROP COLUMN "provider",
ALTER COLUMN "role" SET DEFAULT E'client';

-- CreateIndex
CREATE INDEX "users_email_verificationCode_idx" ON "users"("email", "verificationCode");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_verificationCode_key" ON "users"("email", "verificationCode");
