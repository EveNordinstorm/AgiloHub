import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export class TaskService {
  static async createTask(data: {
    title: string;
    description: string;
    points: number;
    deadline: Date;
    type: "project" | "personal";
    creatorId: string;
    projectId?: string;
  }) {
    const { title, description, points, deadline, type, creatorId, projectId } =
      data;

    // check the project exists
    let projectConnect = undefined;
    if (type === "project") {
      if (!projectId) {
        throw new Error("projectId is required for project tasks");
      }

      const projectExists = await prisma.project.findUnique({
        where: { id: projectId },
      });
      if (!projectExists) throw new Error("Project not found");

      projectConnect = { connect: { id: projectId } };
    }

    const task = await prisma.task.create({
      data: {
        title,
        description,
        points,
        deadline,
        type,
        creator: { connect: { id: creatorId } },
        project: projectConnect,
      },
      include: {
        creator: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        project: {
          select: { id: true, title: true },
        },
      },
    });

    return task;
  }

  static async getTasksForUser(userId: string, type?: "project" | "personal") {
    const where: any = { creatorId: userId };
    if (type) where.type = type;

    return prisma.task.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        creator: {
          select: { id: true, firstName: true, lastName: true },
        },
        project: {
          select: { id: true, title: true },
        },
      },
    });
  }

  static async getTaskById(id: string) {
    return prisma.task.findUnique({
      where: { id },
      include: {
        creator: {
          select: { id: true, firstName: true, lastName: true, email: true },
        },
        project: {
          select: { id: true, title: true },
        },
      },
    });
  }
}
