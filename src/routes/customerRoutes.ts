import { Router } from "express";

import { createCustomer, deleteCustomer, getCustomerById, getCustomerPurchases, getCustomers, updateCustomer, } from "../controllers/customerController";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/rbacMiddleware";


const router = Router();

router.use(authenticate)


router.get("/", getCustomers);
router.get("/:id", getCustomerById);
router.post("/", createCustomer);
router.put("/:id", updateCustomer);
router.get("/:id/purchases", getCustomerPurchases);
router.delete("/:id", authorize("SUPER ADMIN", "ADMIN"), deleteCustomer);


export default router;