import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class IndustriesService {
  async getIndustries() {
    return await prisma.industry.findMany();
  }

  async getIndustry(id) {
    return await prisma.industry.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }

  async createIndustry(data) {
    return await prisma.industry.create({
      data,
    });
  }

  async updateIndustry(id, data) {
    return await prisma.industry.update({
      where: {
        id: parseInt(id),
      },
      data,
    });
  }
}

export default new IndustriesService();
