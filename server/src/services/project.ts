import { PrismaClient } from "../../generated/prisma";
const prisma = new PrismaClient();

export class ProjectService {
  static async createProject(data: {
    title: string;
    description: string;
    techStack: string[];
    context: string;
    methodologyId: string;
    creatorId: string;
    memberEmails: string[];
  }) {
    // Find methodology
    const methodology = await prisma.methodology.findUnique({
      where: { id: data.methodologyId },
    });
    if (!methodology) throw new Error("Methodology not found");

    // Find members by email
    const members = await prisma.user.findMany({
      where: { email: { in: data.memberEmails.map((e) => e.toLowerCase()) } },
    });
    if (members.length === 0) throw new Error("No valid members found");

    // Include creator as member
    const memberIds = Array.from(
      new Set([data.creatorId, ...members.map((m) => m.id)])
    );

    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        techStack: data.techStack,
        context: data.context,
        methodologyId: data.methodologyId,
        creatorId: data.creatorId,
        members: { connect: memberIds.map((id) => ({ id })) },
      },
      include: {
        methodology: true,
        creator: true,
        members: true,
        stages: true,
      },
    });

    return project;
  }

  static async getProjectsForUser(userId: string) {
    return prisma.project.findMany({
      where: {
        members: { some: { id: userId } },
      },
      include: {
        methodology: true,
        creator: true,
        members: true,
        stages: true,
      },
    });
  }

  static async getProjectById(id: string) {
    return prisma.project.findUnique({
      where: { id },
      include: {
        methodology: true,
        creator: true,
        members: true,
        stages: true,
      },
    });
  }
}
