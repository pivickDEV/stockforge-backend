import { Request, Response } from "express";
import * as brandService from "../services/brandService";

export const createBrand = async (req: Request, res: Response) => {
  try {
    const brand = await brandService.createBrand(req.body);

    res.status(201).json({
      success: true,
      message: "Brand created successfully",
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to create brand",
      error,
    });
  }
};

export const getBrands = async (req: Request, res: Response) => {
  try {
    const search = req.query.search as string;
    const brands = await brandService.getAllBrands(search);

    res.status(200).json({
      success: true,
      data: brands,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch brands",
      error,
    });
  }
};

export const getBrandById = async (req: Request, res: Response) => {
  try {
    const brand = await brandService.getBrandById(req.params.id as string);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.status(200).json({
      success: true,
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch brand",
      error,
    });
  }
};

export const updateBrand = async (req: Request, res: Response) => {
  try {
    const brand = await brandService.updateBrand(
      req.params.id as string,
      req.body
    );

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Brand updated successfully",
      data: brand,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update brand",
      error,
    });
  }
};

export const deleteBrand = async (req: Request, res: Response) => {
  try {
    const brand = await brandService.deleteBrand(req.params.id as string);

    if (!brand) {
      return res.status(404).json({
        success: false,
        message: "Brand not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Brand deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete brand",
      error,
    });
  }
};