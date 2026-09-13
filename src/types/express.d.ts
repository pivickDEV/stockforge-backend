import type { Request } from "express";
import type { UserRole } from "./user.types";

export interface AuthenticatedRequest extends Request {
  user: {
    id: string;
    role: UserRole;
    iat: number;
    exp: number;
  };
}