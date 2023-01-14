-- CreateTable
CREATE TABLE "invites" (
    "id" TEXT NOT NULL,
    "letter" TEXT NOT NULL,
    "proved" BOOLEAN DEFAULT true,
    "jobId" TEXT NOT NULL,
    "freelancerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "invites_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "invites_id_idx" ON "invites"("id");

-- CreateIndex
CREATE UNIQUE INDEX "invites_id_key" ON "invites"("id");

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_freelancerId_fkey" FOREIGN KEY ("freelancerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "invites" ADD CONSTRAINT "invites_jobId_fkey" FOREIGN KEY ("jobId") REFERENCES "jobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
