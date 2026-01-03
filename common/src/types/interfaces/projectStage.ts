import { StageIcon } from "../enums/stageIcon";

export type ProjectStage = {
  id: string;
  stageNumber: number;
  description: string;
  pointsEarned: number;
  totalPoints: number;
  date: string;
  icon: StageIcon;
  completed: boolean;
  completedAt?: string;
  completedById?: string;
};

export type ProjectStageInput = {
  description: string;
  totalPoints: number;
  date: string;
  icon: StageIcon;
};
