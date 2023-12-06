import { ChannelType } from "./channel.type";
import { UserType } from "./user.type";

export interface SubscriptionType {
  id: number;
  channel: ChannelType;
  user: UserType;
  createdAt: string;
}
