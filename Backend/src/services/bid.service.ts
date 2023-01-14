import { PrismaClient, Prisma, Job, User, Bid } from "@prisma/client";

const prisma = new PrismaClient();

export const createBid =async (input:Prisma.BidCreateInput) => {
  return (await prisma.bid.create({
    data: input,
  })) as Bid;
}