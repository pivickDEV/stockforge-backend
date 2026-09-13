import mongoose, { Document, Schema, model } from "mongoose";

export type PurchaseStatus = "PENDING" | "COMPLETED" | "CANCELLED";

export interface IPurchaseItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  costPrice: number;
}

export interface IPurchase extends Document {
  supplier: mongoose.Types.ObjectId;
  items: IPurchaseItem[];
  totalAmount: number;
  status: PurchaseStatus;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const purchaseItemSchema = new Schema<IPurchaseItem>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },

    costPrice: {
      type: Number,
      required: [true, "Cost price is required"],
      min: [0, "Cost price cannot be negative"],
    },
  },
  {
    _id: false,
  }
);

const purchaseSchema = new Schema<IPurchase>(
  {
    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: [true, "Supplier is required"],
    },

    items: {
      type: [purchaseItemSchema],
      required: [true, "At least one product is required"],
      validate: {
        validator: (items: IPurchaseItem[]) => items.length > 0,
        message: "Purchase must contain at least one item.",
      },
    },

    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },

    status: {
      type: String,
      enum: ["PENDING", "COMPLETED", "CANCELLED"],
      default: "PENDING",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Created by is required"],
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const Purchase = model<IPurchase>("Purchase", purchaseSchema);

export default Purchase;