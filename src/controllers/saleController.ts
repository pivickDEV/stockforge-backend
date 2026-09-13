import { Request, Response } from "express";
import * as saleService from "../services/saleService";




export const createSale = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized: User ID missing",
      });
    }

    const saleData = {
      ...req.body,
      createdBy: userId,
    };

    const sale = await saleService.createSale(saleData);

    res.status(201).json({
      success: true,
      message: "Sale created successfully",
      data: sale,
    });
  } catch (error: any) {
    if (
      error.message === "Product not found" ||
      error.message?.startsWith("Insufficient stock")
    ) {
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }

    res.status(500).json({
      success: false,
      message: "Failed to create sale",
      error: error.message || error,
    });
  }
};

export const getSales = async (req: Request, res: Response) => {
  try {
    const sales = await saleService.getAllSales();

    res.status(200).json({
      success: true,
      data: sales,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch sales",
      error: error.message || error,
    });
  }
};

export const getSaleById = async (req: Request, res: Response) => {
  try {
    const sale = await saleService.getSaleById(req.params.id as string);

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sale not found",
      });
    }

    res.status(200).json({
      success: true,
      data: sale,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch sale",
      error: error.message || error,
    });
  }
};

export const deleteSale = async (req: Request, res: Response) => {
  try {
    const sale = await saleService.deleteSale(req.params.id as string);

    if (!sale) {
      return res.status(404).json({
        success: false,
        message: "Sale not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Sale deleted successfully",
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to delete sale",
      error: error.message || error,
    });
  }
};