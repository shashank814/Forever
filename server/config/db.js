import mongoose from "mongoose";

async function connectDB() {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("DB Connected");
}

export default connectDB