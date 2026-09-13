export interface PurchaseItem {
  productId: string;
  quantity: number;
  costPrice: number;
}

export type PurchaseStatus =
  | "PENDING"
  | "COMPLETED"
  | "CANCELLED";

export interface Purchase {
  _id: string;
  supplierId: string;
  items: PurchaseItem[];
  totalAmount: number;
  status: PurchaseStatus;
  createdBy: string;
  createdAt: Date;
}

export interface PurchaseItemInput {
  productId: string;
  product: string;
  quantity: number;
  costPrice: number;
}

export interface CreatePurchaseInput {
  supplierId: string;
  items: PurchaseItemInput[];
  status?: PurchaseStatus;
}