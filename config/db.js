
import mongoose from "mongoose";
 export const connectDB = async () => {
  try {
    console.log("Trying the connection...");
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Successful connection with the DB");
  } catch (err) {
    console.error("❌ Mongoose connection failed because:", err);
  }
};

