import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI;
let isConnected = false;

export const connectToDatabase = async () => {
  if (isConnected) return;
  try {
    const db = await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    isConnected = !!db.connection[0].readyState;
    console.log("Connected to MongoDB");
  } catch (error) {
    console.log("Mongo Connection failed",error.message);
  }
};
