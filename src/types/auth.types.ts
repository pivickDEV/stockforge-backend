import { Request } from "express";
import { UserRole } from "./user.types";

export interface AuthenticatedUser {
  id: string;
  role: UserRole;
  iat: number;
  exp: number;
}

export type AuthenticatedRequest = Request & {
  user?: AuthenticatedUser;
};
