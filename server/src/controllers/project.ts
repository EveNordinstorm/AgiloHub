import { Request, Response } from "express";
import { ProjectService } from "../services/project";
import { AuthRequest } from "../middleware/auth";

export class ProjectController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const { title, description, techStack, context, methodologyId, members } =
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
}
