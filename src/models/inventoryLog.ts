import mongoose, { Document, Schema } from "mongoose";

export type InventoryAction = "STOCK IN" | "STOCK OUT" | "ADJUSTMENT";

export interface IInventoryLog extends Document {
  product: mongoose.Types.ObjectId;
  action: InventoryAction;
  quantity: number;
  reason?: string;
  createdBy: mongoose.Types.ObjectId;
  createdAt: Date;
}

const inventoryLogSchema = new Schema<IInventoryLog>(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product is required"],
    },

    action: {
      type: String,
      enum: ["STOCK IN", "STOCK OUT", "ADJUSTMENT"],
      required: [true, "Inventory action is required"],
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: [1, "Quantity must be at least 1"],
    },

    reason: {
      type: String,
      trim: true,
      maxlength: [255, "Reason cannot exceed 255 characters"],
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User is required"],
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);

const InventoryLog = mongoose.model<IInventoryLog>(
  "InventoryLog",
  inventoryLogSchema
);

export default InventoryLog;