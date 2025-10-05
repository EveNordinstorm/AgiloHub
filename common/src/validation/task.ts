import { z } from "zod";
import { TaskType } from "../types/enums/taskType";

export const TaskSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z
    .string()
    .min(1, { message: "Description must be at least 1 characters." }),
  points: z.number().min(1, { message: "Points value is required." }),
  deadline: z.date().min(1, { message: "Setting a deadline is required." }),
  type: z.enum([TaskType.project, TaskType.personal], {
    message: "Task type is required.",
  }),
  projectId: z.string().optional(),
});

export type TaskFormValues = z.infer<typeof TaskSchema>;
