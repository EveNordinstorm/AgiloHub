import { Request, Response } from "express";
import { TaskService } from "../services/task";
import { AuthRequest } from "../middleware/auth";

export class TaskController {
  static async create(req: AuthRequest, res: Response) {
    try {
      const { title, description, points, deadline, type, projectId } =
        req.body;
      const creatorId = req.userId!;

      const task = await TaskService.createTask({
        title,
        description,
        points,
        deadline,
        type,
        creatorId,
        projectId,
      });

      res.status(201).json(task);
    } catch (err: any) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  }

  static async list(req: AuthRequest, res: Response) {
    try {
      const { type } = req.query;
      const tasks = await TaskService.getTasksForUser(
        req.userId!,
        type === "project" || type === "personal" ? (type as any) : undefined
      );
      res.json(tasks);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async get(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const task = await TaskService.getTaskById(id);
      if (!task) return res.status(404).json({ error: "Task not found" });
      res.json(task);
    } catch (err: any) {
      res.status(400).json({ error: err.message });
    }
  }

  static async getActiveByProject(req: AuthRequest, res: Response) {
    try {
      const { projectId } = req.params;

      if (!projectId) {
        return res.status(400).json({ error: "projectId is required" });
      }

      const tasks = await TaskService.getTasksByProject(projectId);

      res.json(tasks);
    } catch (err: any) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  }

  static async complete(req: AuthRequest, res: Response) {
    try {
      const { id } = req.params;
      const userId = req.userId!;
      const task = await TaskService.completeTask(id, userId);
      res.json({ message: "Task completed successfully", task });
    } catch (err: any) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  }

  static async listCompleted(req: AuthRequest, res: Response) {
    try {
      const { type } = req.query;

      const tasks = await TaskService.getCompletedTasksForUser(
        req.userId!,
        type === "project" || type === "personal" ? (type as any) : undefined
      );

      res.json(tasks);
    } catch (err: any) {
      console.error(err);
      res.status(400).json({ error: err.message });
    }
  }
}
