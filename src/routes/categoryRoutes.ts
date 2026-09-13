import { Router } from "express";

import { createCategory, deleteCategory, getCategories, getCategoryById, updateCategory } from "../controllers/categoryController";
import { authenticate } from "../middleware/authMiddleware";
import { authorize } from "../middleware/rbacMiddleware";


const router = Router();

router.use(authenticate);



router.get("/", getCategories);
router.get("/:id", getCategoryById);
router.post("/", authorize("SUPER ADMIN", "ADMIN"), createCategory);
router.put("/:id",authorize("SUPER ADMIN", "ADMIN"), updateCategory);
router.delete("/:id", authorize("SUPER ADMIN", "ADMIN"), deleteCategory);


export default router;