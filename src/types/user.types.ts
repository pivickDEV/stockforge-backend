
export type UserStatus = "ACTIVE" | "INACTIVE"

export type UserRole = "ADMIN" | "SUPER ADMIN" | "CASHIER"

export interface User {
  _id: string;
  name: string;
  email: string;
  password: string,
  role: UserRole;
  status: UserStatus;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}


export type CreateUserInput = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  status?: UserStatus;
};


export type LoginUserInput = {
  email: string;
  password: string;
};

export type UpdateUserInput = Partial<CreateUserInput> & {
  status?: UserStatus;
};