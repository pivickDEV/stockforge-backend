import { Router } from "express";

import brandRoutes from "./brandRoutes";
import categoryRoutes from "./categoryRoutes";
import customerRoutes from "./customerRoutes";
import dashboardRoutes from './dashboardRoutes';
import inventoryLogRoutes from "./inventoryLogRoutes";
import productRoutes from "./productRoutes";
import purchaseRoutes from "./purchaseRoutes";
import saleRoutes from "./saleRoutes";
import supplierRoutes from "./supplierRoutes";
import userRoutes from "./userRoutes";


const router = Router();

router.use("/products", productRoutes);
router.use("/brands", brandRoutes);
router.use("/categories", categoryRoutes);
router.use("/customers", customerRoutes);
router.use("/inventory-logs", inventoryLogRoutes);
router.use("/purchases", purchaseRoutes);
router.use("/sales", saleRoutes);
router.use("/suppliers", supplierRoutes);
router.use("/users", userRoutes);
router.use("/dashboard", dashboardRoutes)


export default router;