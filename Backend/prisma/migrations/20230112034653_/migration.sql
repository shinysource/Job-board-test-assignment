-- CreateEnum
CREATE TYPE "JobEnumType" AS ENUM ('Hybrid', 'Office', 'Remote');

-- CreateEnum
CREATE TYPE "StatusEnumType" AS ENUM ('Hiring', 'Hired', 'Closed');

-- CreateTable
CREATE TABLE "jobs" (
    "id" TEXT NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "description" TEXT NOT NULL DEFAULT E'',
    "salary" DOUBLE PRECISION NOT NULL,
    "proved" BOOLEAN DEFAULT true,
    "status" "StatusEnumType" DEFAULT E'Hiring',
    "jobType" "JobEnumType" DEFAULT E'Remote',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "jobs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "jobs_id_idx" ON "jobs"("id");

-- CreateIndex
CREATE UNIQUE INDEX "jobs_id_key" ON "jobs"("id");
