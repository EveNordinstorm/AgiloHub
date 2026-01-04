import { PointsType } from "../enums/pointsType";

export interface PointsTransaction {
  id: string;
  userId: string;
  type: PointsType;
  amount: number;
  description?: string;
  createdAt: string;
  taskId?: string;
  projectStageId?: string;
}
