import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class JobsService {
  async getJobs(page, take, skip, search) {
    if (search) {
      const jobs = await prisma.job.findMany({
        skip,
        take,
        where: {
          OR: [
            {
              title: {
                contains: search,
              },
            },
            {
              description: {
                contains: search,
              },
            },
          ],
        },
        include: {
          company: {
            select: {
              id: true,
              name: true,
              email: true,
              website: true,
              city: true,
            },
          },
        },
      });

      const count = await prisma.job.count({
        where: {
          OR: [
            {
              title: {
                contains: search,
              },
            },
            {
              description: {
                contains: search,
              },
            },
          ],
        },
      });

      const pageCount = Math.ceil(count / 10);

      return {
        jobs,
        pageCount,
      };
    } else {
      const jobs = await prisma.job.findMany({
        skip,
        take,
        include: {
          company: {
            select: {
              id: true,
              name: true,
              email: true,
              website: true,
              city: true,
            },
          },
        },
      });

      const count = await prisma.job.count();

      const pageCount = Math.ceil(count / 10);

      return {
        jobs,
        pageCount,
      };
    }
  }

  async getJob(id) {
    return await prisma.job.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        company: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });
  }

  async createJob(companyId, data) {
    return await prisma.job.create({
      data: {
        ...data,
        company: {
          connect: {
            id: parseInt(companyId),
          },
        },
      },
    });
  }

  async updateJob(id, data) {
    return await prisma.job.update({
      where: {
        id: parseInt(id),
      },
      data,
    });
  }

  async deleteJob(id) {
    return await prisma.job.delete({
      where: {
        id: parseInt(id),
      },
    });
  }
}

export default new JobsService();
