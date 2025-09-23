import { Member } from "./member";
import { ProjectStage } from "./projectStage";

export type Project = {
  id: string;
  title: string;
  description?: string;
  techStack: string[];
  context?: string;
  methodology?: {
    id: string;
    name: string;
    definition: string;
  };
  creator: Member;
  members: Member[];
  stages: ProjectStage[];
  createdAt: string;
  updatedAt: string;
};
