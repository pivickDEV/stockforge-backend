import mongoose, { Document, Schema } from "mongoose";

export type SalePaymentMethod = "CASH" | "GCASH" | "CARD";

export interface ISaleItem {
  product: mongoose.Types.ObjectId;
  quantity: number;
  sellingPrice: number;
}

export interface ISale extends Document {
  customer?: mongoose.Types.ObjectId;
  items: ISaleItem[];
  totalAmount: number;
  paymentMethod: SalePaymentMethod;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const saleItemSchema = new Schema<ISaleItem>(
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

    sellingPrice: {
      type: Number,
      required: [true, "Selling price is required"],
      min: [0, "Selling price cannot be negative"],
    },
  },
  {
    _id: false,
  }
);

const saleSchema = new Schema<ISale>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "Customer",
    },

    items: {
      type: [saleItemSchema],
      required: [true, "At least one product is required"],
      validate: {
        validator: (items: ISaleItem[]) => items.length > 0,
        message: "Sale must contain at least one item.",
      },
    },

    totalAmount: {
      type: Number,
      required: [true, "Total amount is required"],
      min: [0, "Total amount cannot be negative"],
    },

    paymentMethod: {
      type: String,
      enum: ["CASH", "GCASH", "CARD"],
      required: [true, "Payment method is required"],
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

const Sale = mongoose.model<ISale>("Sale", saleSchema);

export default Sale;