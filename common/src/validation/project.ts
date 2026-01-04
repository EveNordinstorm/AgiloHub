import { z } from "zod";
import { StageIcon } from "../types/enums/stageIcon";

export const ProjectStageSchema = z.object({
  description: z
    .string()
    .min(3, { message: "Stage description must be at least 3 characters." }),
  totalPoints: z.number().min(1, { message: "Points must be at least 1." }),
  date: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Invalid date format.",
  }),
  icon: z.nativeEnum(StageIcon, { message: "Invalid icon type." }),
});

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
  stages: z.array(ProjectStageSchema).optional(),
});

export const UpdateStageSchema = z.object({
  description: z.string().min(3).optional(),
  totalPoints: z.number().min(1).optional(),
  date: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), { message: "Invalid date format." })
    .optional(),
  icon: z.nativeEnum(StageIcon).optional(),
});

export type ProjectStageFormValues = z.infer<typeof ProjectStageSchema>;
export type ProjectFormValues = z.infer<typeof ProjectSchema>;
export type UpdateStageFormValues = z.infer<typeof UpdateStageSchema>;
