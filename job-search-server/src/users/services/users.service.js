import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Errors are handled in the controller layer

const prisma = new PrismaClient();

class UsersService {
  async getUsers() {
    return await prisma.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });
  }

  async getUser(id) {
    const user = await prisma.user.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    return user;
  }

  async createUser(user) {
    return await prisma.user.create({
      data: user,
    });
  }

  async updateUser(id, user) {
    return await prisma.user.update({
      where: {
        id: parseInt(id),
      },
      data: user,
    });
  }

  async deleteUser(id) {
    return await prisma.user.delete({
      where: {
        id: parseInt(id),
      },
    });
  }

  async getSavedJobsByUser(id) {
    return await prisma.userJob.findMany({
      where: {
        userId: parseInt(id),
      },
      select: {
        job: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
    });
  }

  async getApplicationsByUser(id) {
    return await prisma.application.findMany({
      where: {
        userId: parseInt(id),
      },
      select: {
        job: {
          select: {
            id: true,
            title: true,
            description: true,
          },
        },
      },
    });
  }

  async saveJob(id, jobId) {
    const userPost = await prisma.userJob.findFirst({
      where: {
        userId: parseInt(id),
        jobId: parseInt(jobId),
      },
    });

    if (userPost) {
      await prisma.userJob.delete({
        where: {
          id: userPost.id,
        },
      });
    } else {
      await prisma.userJob.create({
        data: {
          user: {
            connect: {
              id: parseInt(id),
            },
          },
          job: {
            connect: {
              id: parseInt(jobId),
            },
          },
        },
      });
    }
  }

  async signUp(data) {
    const { email, password } = data;

    const user = await prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (user) {
      throw new Error("User already exists");
    }

    const company = await prisma.company.findUnique({
      where: {
        email: email,
      },
    });

    if (company) {
      throw new Error("Company already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async signIn(email, password) {
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

    if (!user && !company) {
      throw new Error("User not found");
    }

    // user
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          name: user.firstName + " " + user.lastName,
          userType: "regular",
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      return { token };
    }

    // company
    if (company) {
      const isMatch = await bcrypt.compare(password, company.password);

      const token = jwt.sign(
        {
          id: company.id,
          email: company.email,
          name: company.name,
          userType: "company",
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" }
      );

      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      return { token };
    }
  }
}

export default new UsersService();
