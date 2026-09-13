import { Router } from "express";

import { createInventoryLog, getInventoryLogById, getInventoryLogs, getInventoryLogsByProduct, } from "../controllers/inventoryLogController";
import { authenticate } from "../middleware/authMiddleware";


const router = Router();

router.use(authenticate)


router.get("/", getInventoryLogs);
router.get("/:id", getInventoryLogById);
router.get("/product/:productId", getInventoryLogsByProduct);
router.post("/", createInventoryLog);

export default router;