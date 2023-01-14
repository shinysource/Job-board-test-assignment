import { PrismaClient, Prisma, Invite } from "@prisma/client";

const prisma = new PrismaClient();

export const createInvite =async (input:Prisma.InviteCreateInput) => {
  return (await prisma.invite.create({
    data: input,
  })) as Invite;
}

export const findInvitesByUser =async (
  email: string
  )=> {
    const selectedUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        invites: {
          include: {
            job: {
              include: {
                user: true,
              }
            },
          }
        }
      },
    });

    return selectedUser!.invites;
  }
