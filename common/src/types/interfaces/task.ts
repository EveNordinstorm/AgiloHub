export type TaskType = "project" | "personal";

export type Task = {
  id: string;
  title: string;
  description: string;
  points: number;
  deadline: Date;
  type: TaskType;
  projectId?: string;
  complete?: boolean;
  createdAt: string;
  updatedAt: string;
};
