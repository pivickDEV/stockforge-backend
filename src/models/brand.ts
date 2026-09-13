import { Document, Schema, model } from "mongoose";
import { BrandStatus } from "../types/brand.types";

export interface IBrand extends Document {
  name: string;
  description?: string;
  status: BrandStatus;
  createdAt: Date;
  updatedAt: Date;
}

const brandSchema = new Schema<IBrand>(
  {
    name: {
      type: String,
      required: [true, "Brand name is required"],
      trim: true,
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },
  },
  {
    timestamps: true,
  }
);

const Brand = model<IBrand>("Brand", brandSchema);
export default Brand;