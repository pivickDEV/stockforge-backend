import { Router } from 'express'
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controllers/productController'
import { authenticate } from '../middleware/authMiddleware'
import { authorize } from '../middleware/rbacMiddleware'



const router = Router()


router.get("/", getProducts)
router.get("/:id", getProductById)

router.use(authenticate)

router.post("/", authorize("SUPER ADMIN", "ADMIN"), createProduct)
router.put("/:id",  authorize("SUPER ADMIN", "ADMIN"), updateProduct)
router.delete("/:id", authorize("SUPER ADMIN"), deleteProduct)

export default router