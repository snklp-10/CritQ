import { IMessage } from "@/models/Message";

export interface ApiResponse {
  success: boolean;
  message: string;
  isAcceptingMessage?: boolean;
  messages?: Array<IMessage>;
}
