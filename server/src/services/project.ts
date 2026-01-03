import { PrismaClient, StageIcon, PointsType } from "../../generated/prisma";
const prisma = new PrismaClient();

type StageInput = {
  description: string;
  totalPoints: number;
  date: string;
  icon: StageIcon;
};

export class ProjectService {
  static async createProject(data: {
    title: string;
    description: string;
    techStack: string[];
    context: string;
    methodologyId: string;
    creatorId: string;
    memberEmails: string[];
    stages?: StageInput[];
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

    // Create stages data with auto-incrementing stageNumber
    const stagesData =
      data.stages?.map((stage, index) => ({
        description: stage.description,
        totalPoints: stage.totalPoints,
        pointsEarned: 0,
        date: new Date(stage.date),
        icon: stage.icon,
        stageNumber: index + 1,
        completed: false,
      })) ?? [];

    const project = await prisma.project.create({
      data: {
        title: data.title,
        description: data.description,
        techStack: data.techStack,
        context: data.context,
        methodologyId: data.methodologyId,
        creatorId: data.creatorId,
        members: { connect: memberIds.map((id) => ({ id })) },
        stages: stagesData.length > 0 ? { create: stagesData } : undefined,
      },
      include: {
        methodology: true,
        creator: true,
        members: true,
        stages: { orderBy: { stageNumber: "asc" } },
      },
    });

    return project;
  }

  static async addStage(projectId: string, userId: string, data: StageInput) {
    // Verify user is project member
    const project = await prisma.project.findFirst({
      where: {
        id: projectId,
        members: { some: { id: userId } },
      },
      include: { stages: { orderBy: { stageNumber: "desc" }, take: 1 } },
    });

    if (!project) throw new Error("Project not found or unauthorized");

    const nextStageNumber = (project.stages[0]?.stageNumber ?? 0) + 1;

    return prisma.projectStage.create({
      data: {
        projectId,
        description: data.description,
        totalPoints: data.totalPoints,
        pointsEarned: 0,
        date: new Date(data.date),
        icon: data.icon,
        stageNumber: nextStageNumber,
        completed: false,
      },
    });
  }

  static async updateStage(
    stageId: string,
    userId: string,
    data: Partial<StageInput>
  ) {
    // Verify user is project member
    const stage = await prisma.projectStage.findUnique({
      where: { id: stageId },
      include: { project: { include: { members: true } } },
    });

    if (!stage) throw new Error("Stage not found");
    if (!stage.project.members.some((m) => m.id === userId)) {
      throw new Error("Unauthorized");
    }
    if (stage.completed) throw new Error("Cannot update completed stage");

    return prisma.projectStage.update({
      where: { id: stageId },
      data: {
        description: data.description,
        totalPoints: data.totalPoints,
        date: data.date ? new Date(data.date) : undefined,
        icon: data.icon,
      },
    });
  }

  static async deleteStage(stageId: string, userId: string) {
    const stage = await prisma.projectStage.findUnique({
      where: { id: stageId },
      include: { project: { include: { members: true } } },
    });

    if (!stage) throw new Error("Stage not found");
    if (!stage.project.members.some((m) => m.id === userId)) {
      throw new Error("Unauthorized");
    }
    if (stage.completed) throw new Error("Cannot delete completed stage");

    await prisma.projectStage.delete({ where: { id: stageId } });

    // Renumber remaining stages
    const remainingStages = await prisma.projectStage.findMany({
      where: { projectId: stage.projectId },
      orderBy: { stageNumber: "asc" },
    });

    for (let i = 0; i < remainingStages.length; i++) {
      await prisma.projectStage.update({
        where: { id: remainingStages[i].id },
        data: { stageNumber: i + 1 },
      });
    }

    return { id: stageId };
  }

  static async completeStage(stageId: string, userId: string) {
    const stage = await prisma.projectStage.findUnique({
      where: { id: stageId },
      include: { project: { include: { members: true } } },
    });

    if (!stage) throw new Error("Stage not found");
    if (!stage.project.members.some((m) => m.id === userId)) {
      throw new Error("Unauthorized - must be project member");
    }
    if (stage.completed) throw new Error("Stage already completed");

    const now = new Date();
    const isBeforeDeadline = now <= stage.date;
    const pointsToAward = isBeforeDeadline ? stage.totalPoints : 0;

    // Transaction: update stage + award points to all members
    const result = await prisma.$transaction(async (tx) => {
      // Update stage
      const completedStage = await tx.projectStage.update({
        where: { id: stageId },
        data: {
          completed: true,
          completedAt: now,
          completedById: userId,
          pointsEarned: pointsToAward,
        },
      });

      // Award points to ALL project members if before deadline
      if (pointsToAward > 0) {
        for (const member of stage.project.members) {
          await tx.pointsTransaction.create({
            data: {
              userId: member.id,
              type: PointsType.PROJECT_STAGE_COMPLETION,
              amount: pointsToAward,
              description: `Completed stage "${stage.description}" in project "${stage.project.title}"`,
              projectStageId: stageId,
            },
          });

          await tx.user.update({
            where: { id: member.id },
            data: { points: { increment: pointsToAward } },
          });
        }
      }

      return completedStage;
    });

    return {
      stage: result,
      pointsAwarded: pointsToAward,
      awardedToMembers: pointsToAward > 0 ? stage.project.members.length : 0,
    };
  }

  static async getStagesForProject(projectId: string) {
    return prisma.projectStage.findMany({
      where: { projectId },
      orderBy: { stageNumber: "asc" },
    });
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
        stages: { orderBy: { stageNumber: "asc" } },
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
        stages: { orderBy: { stageNumber: "asc" } },
      },
    });
  }
}
