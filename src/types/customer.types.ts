export interface CustomerTypes {
  id: string; 
  name: string;
  phone?: string;
  email?: string;
  address?: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateCustomerInput = {
  name: string;
  phone?: string;
  email?: string;
  address?: string;
};

export type UpdateCustomerInput = Partial<CreateCustomerInput>;