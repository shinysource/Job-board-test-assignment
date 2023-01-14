-- DropForeignKey
ALTER TABLE "bids" DROP CONSTRAINT "bids_jobId_fkey";

-- DropForeignKey
ALTER TABLE "bids" DROP CONSTRAINT "bids_userId_fkey";

-- DropForeignKey
ALTER TABLE "invites" DROP CONSTRAINT "invites_freelancerId_fkey";

-- DropForeignKey
ALTER TABLE "invites" DROP CONSTRAINT "invites_jobId_fkey";

-- DropForeignKey
ALTER TABLE "jobs" DROP CONSTRAINT "jobs_postEmail_fkey";

-- AddForeignKey
ALTER TABLE "jobs" ADD CONSTRAINT "jobs_postEmail_fkey" FOREIGN KEY ("postEmail") REFERENCES "users"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "bids" ADD CONSTRAINT "bids_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE CASCADE ON UPDATE CASCADE;
