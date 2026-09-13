import { Request, Response } from "express";
import * as dashboardService from "../services/dashboardService";

export const getDashboard = async (req: Request, res: Response) => {
  try {
    const dashboard = await dashboardService.getDashboard();

    res.status(200).json({
      success: true,
      data: dashboard, 
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard metrics",
      error,
    });
  }
};