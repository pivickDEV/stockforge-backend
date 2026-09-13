import { Router } from "express";

import { createPurchase, deletePurchase, getPurchaseById, getPurchases, updatePurchaseStatus, } from "../controllers/purchaseController";
import { authorize } from "../middleware/rbacMiddleware";

import { authenticate } from "../middleware/authMiddleware";

const router = Router();

router.use(authenticate)

router.post("/", authorize("SUPER ADMIN", "ADMIN"), createPurchase);
router.get("/", getPurchases);
router.get("/:id", getPurchaseById);
router.patch("/:id/status", authorize("SUPER ADMIN", "ADMIN"), updatePurchaseStatus);
router.delete("/:id", authorize("SUPER ADMIN", "ADMIN"), deletePurchase);

export default router;