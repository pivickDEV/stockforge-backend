import { Request, Response } from "express";
import * as inventoryLogService from "../services/inventoryLogService";

interface ProductParams {
  productId: string;
}

export const createInventoryLog = async (req: Request, res: Response) => {
  try {
    const inventoryLog = await inventoryLogService.createInventoryLog(req.body);

    res.status(201).json({
      success: true,
      message: "Inventory log created successfully",
      data: inventoryLog,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create inventory log",
      error,
    });
  }
};

export const getInventoryLogs = async (req: Request, res: Response) => {
  try {
    const logs = await inventoryLogService.getAllInventoryLogs();

    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch inventory logs",
      error,
    });
  }
};

export const getInventoryLogById = async (req: Request, res: Response) => {
  try {
    const log = await inventoryLogService.getInventoryLogById(
      req.params.id as string
    );

    if (!log) {
      return res.status(404).json({
        success: false,
        message: "Inventory log not found",
      });
    }

    res.status(200).json({
      success: true,
      data: log,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch inventory log",
      error,
    });
  }
};

export const getInventoryLogsByProduct = async (
  req: Request<ProductParams>,
  res: Response
) => {
  try {
    const logs = await inventoryLogService.getInventoryLogsByProduct(
      req.params.productId
    );

    res.status(200).json({
      success: true,
      data: logs,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch product inventory history",
      error,
    });
  }
};