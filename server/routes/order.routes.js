import express, { Router } from "express"
import { allOrders, placeOrder, placeOrderRazorpay, placeOrderStripe, updateStatus, userOrders, verifyRazorpay, verifyStripe } from "../controllers/order.controller.js"
import { authenticateAdmin, authenticateUser } from "../middlewares/user.middleware.js"

const router = Router()


// Admin Features

router.post('/list', authenticateAdmin, allOrders)
router.post('/status', authenticateAdmin, updateStatus)


// Payment Features
router.post('/place', authenticateUser, placeOrder)
router.post('/stripe', authenticateUser, placeOrderStripe)
router.post('/razorpay', authenticateUser, placeOrderRazorpay)


// User Features
router.post('/userorders', authenticateUser, userOrders)


// Verify Payment
router.post('/verifyStripe', authenticateUser, verifyStripe)
router.post('/verifyRazorpay', authenticateUser, verifyRazorpay)

export default router