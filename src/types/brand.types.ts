export type BrandStatus = "ACTIVE" | "INACTIVE";

export interface Brand {
  id: string;
  name: string;
  description?: string;
  status: BrandStatus;
  createdAt: string;
  updatedAt: string;
}

export type CreateBrandInput = {
  name: string;
  description?: string;
  status?: BrandStatus;
};

export type UpdateBrandInput = Partial<CreateBrandInput>;