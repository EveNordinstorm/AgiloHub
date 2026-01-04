import { Request, Response } from "express";
import { ProjectService } from "../services/project";
import { AuthRequest } from "../middleware/auth";

export class ProjectController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const { title, description, techStack, context, methodologyId, members, stages } =
        req.body;
      const creatorId = req.userId!;

      const project = await ProjectService.createProject({
        title,
        description,
        techStack,
        context,
        methodologyId,
        creatorId,
        memberEmails: members,
        stages,
      });

      res.json(project);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async list(req: AuthRequest, res: Response) {
    try {
      const projects = await ProjectService.getProjectsForUser(req.userId!);
      res.json(projects);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async get(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const project = await ProjectService.getProjectById(id);
      if (!project) return res.status(404).json({ error: "Project not found" });
      res.json(project);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getStages(req: AuthRequest, res: Response) {
    try {
      const { projectId } = req.params;
      const stages = await ProjectService.getStagesForProject(projectId);
      res.json(stages);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async addStage(req: AuthRequest, res: Response) {
    try {
      const { projectId } = req.params;
      const { description, totalPoints, date, icon } = req.body;
      const userId = req.userId!;

      const stage = await ProjectService.addStage(projectId, userId, {
        description,
        totalPoints,
        date,
        icon,
      });

      res.status(201).json(stage);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async updateStage(req: AuthRequest, res: Response) {
    try {
      const { stageId } = req.params;
      const { description, totalPoints, date, icon } = req.body;
      const userId = req.userId!;

      const stage = await ProjectService.updateStage(stageId, userId, {
        description,
        totalPoints,
        date,
        icon,
      });

      res.json(stage);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async deleteStage(req: AuthRequest, res: Response) {
    try {
      const { stageId } = req.params;
      const userId = req.userId!;

      await ProjectService.deleteStage(stageId, userId);
      res.json({ message: "Stage deleted successfully" });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async completeStage(req: AuthRequest, res: Response) {
    try {
      const { stageId } = req.params;
      const userId = req.userId!;

      const result = await ProjectService.completeStage(stageId, userId);
      res.json({
        message: "Stage completed successfully",
        ...result,
      });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async update(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const { title, description, techStack, context, methodologyId, members } =
        req.body;
      const userId = req.userId!;

      const project = await ProjectService.updateProject(id, userId, {
        title,
        description,
        techStack,
        context,
        methodologyId,
        memberEmails: members,
      });

      res.json(project);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async delete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.userId!;

      await ProjectService.deleteProject(id, userId);
      res.json({ message: "Project deleted successfully" });
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }
}
