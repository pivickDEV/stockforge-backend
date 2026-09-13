import { Router } from 'express'
import { createBrand, deleteBrand, getBrandById, getBrands, updateBrand } from '../controllers/brandController'

import { authenticate } from '../middleware/authMiddleware'
import { authorize } from '../middleware/rbacMiddleware'

const router = Router()

router.use(authenticate)

router.get("/", getBrands)
router.get("/:id", getBrandById)
router.post("/", authorize("SUPER ADMIN", "ADMIN"), createBrand)
router.put("/:id", authorize("SUPER ADMIN", "ADMIN"), updateBrand)
router.delete("/:id", authorize("SUPER ADMIN", "ADMIN"), deleteBrand)

export default router