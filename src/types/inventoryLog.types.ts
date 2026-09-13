
export type InventoryAction = "STOCK IN" | "STOCK OUT" | "ADJUSTMENT"

export interface InventoryLogTypes{
  _id: string;
  product: string;
  action: InventoryAction;
  quantity: number;
  reason?: string;
  createdBy: string;
  createdAt: Date;
}

export type CreateInventoryLogInput = {
  product: string;
  action: InventoryAction;
  quantity: number;
  reason?: string;
  createdBy: string;
};