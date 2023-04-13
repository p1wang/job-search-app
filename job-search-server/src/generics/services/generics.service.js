import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class GenericsService {
  async getGenerics() {
    return await prisma.generic.findMany();
  }

  async getGeneric(id) {
    return await prisma.generic.findUnique({
      where: {
        id: parseInt(id),
      },
    });
  }

  async createGeneric(data) {
    return await prisma.generic.create({
      data,
    });
  }

  async updateGeneric(id, data) {
    return await prisma.generic.update({
      where: {
        id: parseInt(id),
      },
      data,
    });
  }
}

export default new GenericsService();
