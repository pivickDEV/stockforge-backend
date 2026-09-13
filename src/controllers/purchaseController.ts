import { Request, Response } from "express";
import * as purchaseService from "../services/purchaseService";


export interface AuthenticatedRequest extends Omit<Request, "user"> {
  user?: {
    id?: string;
    _id?: string;
    role?: string;
    iat?: number;
    exp?: number;
  };
}

export const getPurchases = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 8;
    const search = (req.query.search as string) || "";

    const data = await purchaseService.getAllPurchases(page, limit, search);
    res.status(200).json(data);
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch purchases",
    });
  }
};

export const getPurchaseById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const purchase = await purchaseService.getPurchaseById(id as string);

    if (!purchase) {
      return res.status(404).json({ message: "Purchase order not found" });
    }

    res.status(200).json(purchase);
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to fetch purchase details",
    });
  }
};

export const createPurchase = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  try {
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    
    const purchaseData = {
      ...req.body,
      createdBy: userId,
    };

    const purchase = await purchaseService.createPurchase(purchaseData);
    res.status(201).json(purchase);
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Failed to create purchase order",
    });
  }
};

export const updatePurchaseStatus = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const userId = req.user?.id;

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const updatedPurchase = await purchaseService.updatePurchaseStatus(
      id as string,
      status ,
      userId
    );

    if (!updatedPurchase) {
      return res.status(404).json({ message: "Purchase order not found" });
    }

    res.status(200).json(updatedPurchase);
  } catch (error: any) {
    res.status(400).json({
      message: error.message || "Failed to update purchase status",
    });
  }
};


export const deletePurchase = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedPurchase = await purchaseService.deletePurchase(id as string);

    if (!deletedPurchase) {
      return res.status(404).json({ message: "Purchase order not found" });
    }

    res.status(200).json({ message: "Purchase deleted successfully" });
  } catch (error: any) {
    res.status(500).json({
      message: error.message || "Failed to delete purchase order",
    });
  }
};