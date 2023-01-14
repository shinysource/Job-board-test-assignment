import { PrismaClient, Prisma, Job, User, Bid } from "@prisma/client";

const prisma = new PrismaClient();

export const createJob =async (input:Prisma.JobCreateInput) => {
  return (await prisma.job.create({
    data: input,
  })) as Job;
}

export const findJobsByUser =async (
  email: string
  )=> {
    
    const selectedUser = await prisma.user.findUnique({
      where: {
        email: email,
      },
      include: {
        jobs: {
          include: {
            user: true,
            bids: {
              include: {
                user: true,
              }
            },
          }
        }
      },
    });

    return selectedUser!.jobs;
  }

  export const getAllJobs =async ()=> {
      
      const jobs = await prisma.job.findMany({
        include: {
          user: true,
          bids: {
            include: {
              user: true,
            }
          },
        }
      });
  
      return jobs;
  }


export const toggleJob = async (id:string)=>{
  const job = await prisma.job.findUnique({
    where: {
      id:id,
    }
  });

  const updateJob = await prisma.job.update({
    where: {
      id: id,
    },
    data: {
      proved: ! job?.proved,
    },
  });

  return updateJob;
}

export const deleteJob = async (id:string)=>{
  await prisma.job.delete({
    where: {
      id: id,
    }
  })
}
