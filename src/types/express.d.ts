import { UserRole } from "./user.types";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        role: UserRole;
        iat: number;
        exp: number;
      };
    }
  }
}

export { };
