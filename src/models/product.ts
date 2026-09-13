import mongoose, { Document, Schema } from "mongoose";

export type ProductStatus = "ACTIVE" | "INACTIVE";

export interface IProduct extends Document {
  productCode: string;
  barcode?: string;
  image?: string;
  name: string;

  categoryId: mongoose.Types.ObjectId;
  brandId: mongoose.Types.ObjectId;
  supplierId: mongoose.Types.ObjectId;

  description?: string;

  sellingPrice: number;
  costPrice: number;

  currentStock: number;
  minimumStock: number;

  status: ProductStatus;

  createdBy: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}


const productSchema = new Schema<IProduct>(
  {
    productCode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    barcode: {
      type: String,
      unique: true,
      sparse: true,
      trim: true,
    },

    image: {
      type: String,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },


    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },


    brandId: {
      type: Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },


    supplierId: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },


    description: {
      type: String,
      trim: true,
    },


    sellingPrice: {
      type: Number,
      required: true,
      min: 0,
    },


    costPrice: {
      type: Number,
      required: true,
      min: 0,
    },


    currentStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },


    minimumStock: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },


    status: {
      type: String,
      enum: ["ACTIVE", "INACTIVE"],
      default: "ACTIVE",
    },


    createdBy:{
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

  },
  {
    timestamps: true,
  }
);


const Product = mongoose.model<IProduct>("Product",productSchema);


export default Product;