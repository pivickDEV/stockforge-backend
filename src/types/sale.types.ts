
export interface SaleItemTypes {
  product: string;
  quantity: number;
  sellingPrice: number;
}

export type SalePaymentMethod = "CASH" | "GCASH" | "CARD";

export interface Sale {
  _id: string;
  customer?: string;
  items: SaleItemTypes[];
  totalAmount: number;
  paymentMethod: SalePaymentMethod;
  createdBy: string;
  createdAt: Date;
}

export type CreateSaleInput = {
  customer?: string;

  items: {
    product: string;
    quantity: number;
    sellingPrice: number;
  }[];

  totalAmount: number;

  paymentMethod: SalePaymentMethod;

  createdBy: string;
};