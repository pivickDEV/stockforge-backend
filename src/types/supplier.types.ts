export type SupplierStatus = "ACTIVE" | "INACTIVE";

export interface Supplier {
  id: string;
  name: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  status: SupplierStatus;
  createdAt: string;
  updatedAt: string;
}

export type CreateSupplierInput = Omit<
  Supplier,
  "id" | "createdAt" | "updatedAt"
>;

export type UpdateSupplierInput = Partial<CreateSupplierInput>;