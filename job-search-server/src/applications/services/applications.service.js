import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ApplicationsService {
  async getApplications() {
    return await prisma.application.findMany({
      select: {
        id: true,
        skills: {
          select: {
            id: true,
            level: true,
            title: true,
          },
        },
        experiences: {
          select: {
            id: true,
            title: true,
            company: true,
            description: true,
            startDate: true,
            endDate: true,
          },
        },
        educations: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async getApplication(id) {
    return await prisma.application.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        skills: {
          select: {
            id: true,
            level: true,
            title: true,
          },
        },
        experiences: {
          select: {
            id: true,
            title: true,
            company: true,
            description: true,
            startDate: true,
            endDate: true,
          },
        },
        educations: true,
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });
  }

  async createApplication(data) {
    await prisma.$transaction(async (prisma) => {
      const { userId, jobId, experiences, educations, skills } = data;

      // check if user savedJobs includes jobId
      const isApplied = await prisma.application.findMany({
        where: {
          userId: parseInt(userId),
          jobId: parseInt(jobId),
        },
      });

      if (isApplied.length > 0) {
        throw new Error("You have already applied to this job");
      }

      const job = await prisma.job.findUnique({
        where: {
          id: parseInt(jobId),
        },
      });

      const user = await prisma.user.findUnique({
        where: {
          id: parseInt(userId),
        },
      });

      if (!job || !user) {
        throw new Error("Job or User not found");
      }

      // create application
      const application = await prisma.application.create({
        data: {
          job: {
            connect: {
              id: parseInt(jobId),
            },
          },
          user: {
            connect: {
              id: parseInt(userId),
            },
          },
        },
      });

      // create experiences
      await prisma.experience.createMany({
        data: experiences.map((experience) => ({
          ...experience,
          startDate: new Date(experience.startDate),
          endDate: new Date(experience.endDate),
          applicationId: application.id,
        })),
      });

      // create educations
      await prisma.education.createMany({
        data: educations.map((education) => ({
          ...education,
          startDate: new Date(education.startDate),
          endDate: new Date(education.endDate),
          applicationId: application.id,
        })),
      });

      // create skills
      await prisma.skill.createMany({
        data: skills.map((skill) => ({
          ...skill,
          applicationId: application.id,
        })),
      });

      // return new application
      return await prisma.application.findUnique({
        where: {
          id: application.id,
        },

        include: { job: true, user: true },
      });
    });
  }

  async updateApplication(id, data) {
    return await prisma.application.update({
      where: {
        id: parseInt(id),
      },
      data,
    });
  }
}

export default new ApplicationsService();
