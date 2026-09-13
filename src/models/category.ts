import mongoose, { Document, Schema, } from "mongoose";

export type CategoryStatus = "ACTIVE" | "INACTIVE";

export interface ICategory extends Document {
  name: string;
  description?: string;
  status: CategoryStatus;
  createdAt: Date;
  updatedAt: Date;
}

const categorySchema = new Schema<ICategory>(
  {
    name: {
      type: String,
      required: [true, "Category name is required"],
      trim: true,
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
    timestamps: true, // Automatically manages createdAt and updatedAt
  }
);

const Category = mongoose.model<ICategory>("Category", categorySchema);
export default Category;