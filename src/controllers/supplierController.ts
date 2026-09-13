import { Request, Response } from "express";
import * as supplierService from "../services/supplierService";

export const getSuppliers = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const search = (req.query.search as string) || "";

    const result = await supplierService.getAllSuppliers(page, limit, search);

    res.status(200).json({
      success: true,
      ...result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch suppliers",
      error,
    });
  }
};

export const getSupplierById = async (req: Request, res: Response) => {
  try {
    const supplier = await supplierService.getSupplierById(req.params.id as string);

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      success: true,
      data: supplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch supplier",
      error,
    });
  }
};

export const createSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = await supplierService.createSupplier(req.body);

    res.status(201).json({
      success: true,
      message: "Supplier created successfully",
      data: supplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create supplier",
      error,
    });
  }
};

export const updateSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = await supplierService.updateSupplier(
      req.params.id as string,
      req.body
    );

    if (!supplier) {
      return res.status(404).json({
        success: false,
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Supplier updated successfully",
      data: supplier,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update supplier",
      error,
    });
  }
};

export const deleteSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = await supplierService.deleteSupplier(req.params.id as string);

    if (!supplier) {
      return res.status(404).json({
        success: false, 
        message: "Supplier not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Supplier deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete supplier",
      error,
    });
  }
};