import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(1, { message: "Title is required." }),
  description: z.string().min(1, { message: "Description is required." }),
  techStack: z.string().min(1, { message: "Tech stack is required." }),
  context: z.string().min(1, { message: "Context is required." }),
  methodology: z.string().min(1, { message: "Methodology is required." }),
  members: z
    .string()
    .min(1, { message: "At least one member email is required." }),
});

export type ProjectFormValues = z.infer<typeof ProjectSchema>;
