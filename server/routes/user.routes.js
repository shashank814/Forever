import express, { Router } from "express"
import { adminLogin, loginUser, registerUser } from "../controllers/user.controller.js"
import { loginValidator, registerValidator } from "../validators/user.validator.js"

const router = Router()

router.post("/register", registerValidator, registerUser)
router.post("/login", loginValidator, loginUser)
router.post("/admin", adminLogin)

export default router