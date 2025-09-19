import { ISubscriptionTier } from "./subscriptionTiers";

export interface IUser {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  subscriptionTier?: ISubscriptionTier;
  createdAt: string;
  updatedAt: string;
}
