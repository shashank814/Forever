import express, { Router } from "express"
import { addToCart, getUserCart, updateCart } from "../controllers/cart.controller.js"
import { authenticateUser } from "../middlewares/user.middleware.js"

const router = Router()

router.post("/get", authenticateUser,  getUserCart)
router.post("/add", authenticateUser,  addToCart)
router.post("/update", authenticateUser,  updateCart)

export default router