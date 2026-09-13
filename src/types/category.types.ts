export type CategoryStatus = "ACTIVE" | "INACTIVE";

export interface Category {
  id: string;
  name: string;
  description?: string;
  status: CategoryStatus;
  createdAt: string;
  updatedAt: string;
}

export type CreateCategoryInput = {
  name: string;
  description?: string;
  status?: CategoryStatus;
};

export type UpdateCategoryInput = Partial<CreateCategoryInput>;