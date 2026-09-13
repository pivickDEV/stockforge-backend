import { Router } from "express";

import { createSupplier, deleteSupplier, getSupplierById, getSuppliers, updateSupplier, } from "../controllers/supplierController";
import { authenticate } from "../middleware/authMiddleware";


const router = Router();

router.use(authenticate)


router.get("/", getSuppliers);
router.get("/:id", getSupplierById);
router.post("/", createSupplier);
router.put("/:id", updateSupplier);
router.delete("/:id", deleteSupplier);


export default router;