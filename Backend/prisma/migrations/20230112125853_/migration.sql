/*
  Warnings:

  - You are about to drop the column `clientId` on the `bids` table. All the data in the column will be lost.
  - You are about to drop the column `freelancerId` on the `bids` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "bids" DROP COLUMN "clientId",
DROP COLUMN "freelancerId";
