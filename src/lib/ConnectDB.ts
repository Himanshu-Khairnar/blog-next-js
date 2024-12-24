import mongoose from "mongoose";
export  const ConnectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.NEXT_APP_MONGODB_URI || "");
  } catch (error) {
    console.log(error);
  }
};
