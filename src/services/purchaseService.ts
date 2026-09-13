import mongoose from "mongoose";

import Product from "../models/product";
import Purchase from "../models/purchase";

import { CreatePurchaseInput, PurchaseStatus } from "../types/purchase.types";
import { createInventoryLog } from "./inventoryLogService";

interface CreatePurchasePayload extends CreatePurchaseInput {
  createdBy: string;
}

export const createPurchase = async (data: CreatePurchasePayload) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const totalAmount = data.items.reduce(
      (sum, item) => sum + item.quantity * item.costPrice,
      0
    );

    const status: PurchaseStatus = data.status || "PENDING";

    const purchaseData = {
      ...data,
      totalAmount,
      status,
    };

    const purchase = await Purchase.create([purchaseData], { session });

  
    if (status === "COMPLETED") {
      for (const item of data.items) {
        await Product.findByIdAndUpdate(
          item.product,
          {
            $inc: {
              currentStock: item.quantity,
            },
            $set: {
              costPrice: item.costPrice,
            },
          },
          {
            session,
            runValidators: true,
          }
        );

        await createInventoryLog({
          product: item.product,
          action: "STOCK IN",
          quantity: item.quantity,
          reason: "Purchase Order Completed",
          createdBy: data.createdBy,
        });
      }
    }

    await session.commitTransaction();
    return purchase[0];
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const getAllPurchases = async (
  page: number = 1,
  limit: number = 8,
  search: string = ""
) => {
  const skip = (page - 1) * limit;


  const filter: Record<string, any> = {};

  if (search) {
    filter.$or = [
      { status: { $regex: search, $options: "i" } },
    
    ];
  }

  const [purchases, totalCount] = await Promise.all([
    Purchase.find(filter)
      .populate("supplier", "name contactPerson")
      .populate("createdBy", "name email")
      .populate("items.product", "name productCode")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Purchase.countDocuments(filter),
  ]);

  return {
    purchases,
    totalPages: Math.ceil(totalCount / limit) || 1,
    currentPage: page,
    totalItems: totalCount,
  };
};

export const getPurchaseById = async (id: string) => {
  return Purchase.findById(id)
    .populate("supplier", "name contactPerson")
    .populate("createdBy", "name email")
    .populate("items.product", "name productCode");
};

export const updatePurchaseStatus = async (
  id: string,
  newStatus: PurchaseStatus,
  userId?: string
) => {
  const session = await mongoose.startSession();

  try {
    session.startTransaction();

    const purchase = await Purchase.findById(id).session(session);
    if (!purchase) {
      throw new Error("Purchase order not found");
    }

    const previousStatus = purchase.status;


    if (newStatus === "COMPLETED" && previousStatus !== "COMPLETED") {
      for (const item of purchase.items) {
        await Product.findByIdAndUpdate(
          item.product,
          {
            $inc: { currentStock: item.quantity },
            $set: { costPrice: item.costPrice },
          },
          { session, runValidators: true }
        );

        const currentUserId: string = userId || String(purchase.createdBy);

        await createInventoryLog({
  product: item.product.toString(),
  action: "STOCK IN",
  quantity: item.quantity,
  reason: "Purchase Status Changed to Completed",
  createdBy: currentUserId,
});
      }
    }
const currentUserId: string = userId || String(purchase.createdBy);

    if (previousStatus === "COMPLETED" && newStatus !== "COMPLETED") {
      for (const item of purchase.items) {
        await Product.findByIdAndUpdate(
          item.product,
          { $inc: { currentStock: -item.quantity } },
          { session, runValidators: true }
        );

       await createInventoryLog({
          product: item.product.toString(),
          action: "STOCK OUT",
          quantity: item.quantity,
          reason: `Purchase Status Reverted from Completed to ${newStatus}`,
          createdBy: currentUserId,
        });
      }
    }

    purchase.status = newStatus;
    await purchase.save({ session });

    await session.commitTransaction();
    return purchase;
  } catch (error) {
    await session.abortTransaction();
    throw error;
  } finally {
    session.endSession();
  }
};

export const deletePurchase = async (id: string) => {
  return Purchase.findByIdAndDelete(id);
};