import InventoryLog from "../models/inventoryLog";
import {
  CreateInventoryLogInput,
} from "../types/inventoryLog.types";


export const createInventoryLog = async (data: CreateInventoryLogInput ) => {
   return InventoryLog.create(data); 
  };


export const getAllInventoryLogs = async () => {

  return InventoryLog
    .find()
    .populate("product", "name productCode")
    .populate("createdBy", "name email")
    .sort({
      createdAt: -1,
    });

};




export const getInventoryLogById = async (
  id: string
) => {

  return InventoryLog
    .findById(id)
    .populate("product", "name productCode")
    .populate("createdBy", "name email");

};




export const getInventoryLogsByProduct = async (
  productId: string
) => {

  return InventoryLog
    .find({
      product: productId,
    })
    .populate("product", "name productCode")
    .populate("createdBy", "name email")
    .sort({
      createdAt: -1,
    });

};