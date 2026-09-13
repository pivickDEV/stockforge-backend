import { Router } from "express";

import { createUser, deleteUser, getUserById, getUsers, loginUser, updateUser, } from "../controllers/userController";
import { authorize } from "../middleware/rbacMiddleware";


const router = Router();



router.post("/login", loginUser);
router.post("/register", createUser);

router.get("/",  getUsers);
router.get("/:id", authorize("SUPER ADMIN"), getUserById);
router.put("/:id", authorize("SUPER ADMIN"), updateUser);
router.delete("/:id",  authorize("SUPER ADMIN"), deleteUser);


export default router;