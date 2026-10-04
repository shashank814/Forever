import express, { Router } from "express"
import multer, { memoryStorage } from "multer";
import { addProduct, listProducts, removeProduct, singleProduct } from "../controllers/product.controller.js";
import { authenticateAdmin } from "../middlewares/user.middleware.js";

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    files: 5,
    fileSize: 1 * 1024 * 1024,
  },
});

const router = Router()

router.post("/add", authenticateAdmin, upload.array("images"), addProduct)
router.delete("/remove/:id", authenticateAdmin, removeProduct)
router.get("/single/:id", singleProduct)
router.get("/list", listProducts)

export default router