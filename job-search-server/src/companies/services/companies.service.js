import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

class CompaniesService {
  async getCompanies() {
    return await prisma.company.findMany({
      select: {
        id: true,
        name: true,
        streetAddress: true,
        city: true,
        province: true,
        postalCode: true,
        country: true,
        phone: true,
        email: true,
        website: true,
      },
    });
  }

  async getCompany(id) {
    return await prisma.company.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        name: true,
        streetAddress: true,
        city: true,
        province: true,
        postalCode: true,
        country: true,
        phone: true,
        email: true,
        website: true,
      },
    });
  }

  async createCompany(data) {
    return await prisma.company.create({
      data,
    });
  }

  async updateCompany(id, data) {
    return await prisma.company.update({
      where: {
        id: parseInt(id),
      },
      data,
    });
  }

  async getJobPostsByCompany(id) {
    return await prisma.job.findMany({
      where: {
        companyId: parseInt(id),
      },
      select: {
        id: true,
        title: true,
        description: true,
        createdAt: true,
        applications: {
          include: {
            skills: true,
            experiences: true,
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
        },
      },
    });
  }

  async getApplicationsByJob(id, jobId) {
    return await prisma.job.findUnique({
      where: {
        id: parseInt(jobId),
      },
      select: {
        applications: {
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
        },
      },
    });
  }

  async signUp(data) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    const company = await prisma.company.findUnique({
      where: {
        email: email,
      },
    });

    if (user || company) {
      throw new Error("User already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.company.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }
}

export default new CompaniesService();
