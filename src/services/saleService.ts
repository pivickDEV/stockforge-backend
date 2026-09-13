import mongoose from "mongoose";
import Product from "../models/product";
import Sale from "../models/sale";
import { CreateSaleInput } from "../types/sale.types";
import { createInventoryLog } from "./inventoryLogService";

export const createSale = async (data: CreateSaleInput) => {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();

    // 1. Verify product availability and stock
    for (const item of data.items) {
      const product = await Product.findById(item.product).session(session);

      if (!product) {
        throw new Error("Product not found");
      }

      if (product.currentStock < item.quantity) {
        throw new Error(`Insufficient stock for ${product.name}`);
      }
    }

    // 2. Create the sale
    const sale = await Sale.create(
      [
        {
          ...data,
          ...(data.customer && {
            customer: new mongoose.Types.ObjectId(data.customer),
          }),
          createdBy: new mongoose.Types.ObjectId(data.createdBy),
          items: data.items.map((item) => ({
            ...item,
            product: new mongoose.Types.ObjectId(item.product),
          })),
        },
      ],
      { session }
    );

    
    for (const item of data.items) {
      await Product.findByIdAndUpdate(
        item.product,
        {
          $inc: {
            currentStock: -item.quantity,
          },
        },
        { session }
      );

      await createInventoryLog({
        product: String(item.product),
        action: "STOCK OUT",
        quantity: item.quantity,
        reason: "Sale",
        createdBy: String(data.createdBy),
      });
    }

    await session.commitTransaction();
    return sale[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getAllSales = async () => {
  return Sale.find()
    .populate("customer", "name phone")
    .populate("createdBy", "name email")
    .populate("items.product", "name productCode currentStock sellingPrice")
    .sort({ createdAt: -1 });
};

export const getSaleById = async (id: string) => {
  return Sale.findById(id)
    .populate("customer", "name phone")
    .populate("createdBy", "name email")
    .populate("items.product", "name productCode currentStock sellingPrice");
};

export const deleteSale = async (id: string) => {
  return Sale.findByIdAndDelete(id);
};