import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/db.js"
import userRouter from "./routes/user.routes.js"
import productRouter from "./routes/product.routes.js"
import cartRouter from "./routes/cart.routes.js"
import orderRouter from "./routes/order.routes.js"
import cookieParser from "cookie-parser"

const app = express()

const PORT = process.env.PORT || 3000
connectDB()

app.use(express.json())
app.use(cookieParser())
app.use(cors())

app.use("/api/user", userRouter)
app.use("/api/product", productRouter)
app.use("/api/cart", cartRouter)
app.use("/api/order", orderRouter)

app.get("/", (req, res) => {
    res.send("server is running")
})

app.listen(PORT, () => {
    console.log("Server is running on port : " + PORT);
})