import { z } from "zod";

export const TaskSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  points: z.number().min(1, { message: "Points value is required." }),
  deadline: z.date().min(1, { message: "Setting a deadline is required." }),
});

export type TaskFormValues = z.infer<typeof TaskSchema>;
