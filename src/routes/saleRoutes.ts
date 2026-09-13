import { Router } from "express";

import { createSale, deleteSale, getSaleById, getSales, } from "../controllers/saleController";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/rbacMiddleware";


const router = Router();

router.use(authenticate)


router.get("/", getSales);
router.get("/:id", getSaleById);
router.post("/",  createSale);
router.delete("/:id", authorize("SUPER ADMIN"), deleteSale);


export default router;