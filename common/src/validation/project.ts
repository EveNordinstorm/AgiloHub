import { z } from "zod";

export const ProjectSchema = z.object({
  title: z.string().min(3, { message: "Title must be at least 3 characters." }),
  description: z
    .string()
    .min(10, { message: "Description must be at least 10 characters." }),
  techStack: z.string().regex(/,/, {
    message: "Tech stack must be a comma-separated list.",
  }),
  context: z.string().min(1, { message: "Context is required." }),
  methodology: z.string().min(1, { message: "Methodology is required." }),
  members: z
    .string()
    .regex(/@/, { message: "Please enter at least one valid email." }),
});

export type ProjectFormValues = z.infer<typeof ProjectSchema>;
