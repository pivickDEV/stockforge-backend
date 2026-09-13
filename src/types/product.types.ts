import type { Brand } from "./brand.types";
import type { Category } from "./category.types";
import type { Supplier } from "./supplier.types";
import type { User } from "./user.types";

export type ProductStatus = "ACTIVE" | "INACTIVE"


export interface ProductTypes {
  _id: string;
  productCode: string;
  barcode?: string;
  image?: string;
  name: string;

  categoryId: string;
  brandId: string;
  supplierId: string;

  description?: string;
  sellingPrice: number;
  costPrice: number;
  currentStock: number;
  minimumStock: number;

  status: ProductStatus;

  createdBy: string;

  createdAt: Date;
  updatedAt: Date;
}

export interface ProductWithDetails extends ProductTypes {
  category: Category;
  brand: Brand;
  supplier: Supplier;
  createdByUser: User;
}

export type CreateProductInput = Partial<
  Omit<ProductTypes, "_id" | "createdBy" | "createdAt" | "updatedAt">
>;

export type UpdateProductInput = Partial<Omit<ProductTypes, "_id">>;