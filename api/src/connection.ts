import mongoose from "mongoose";
import configs from "./configs/common";

const DBuri = configs.db.uri;
const testDBuri = configs.db.testUri;
const clientOptions = { serverApi: { version: '1', deprecationErrors: true } };

export async function connectDB() {
  const uri = configs.env === "dev" ? DBuri : testDBuri;
  return await mongoose.connect(uri, clientOptions as any);
}

export async function disconnectAll() {
  await mongoose.disconnect();
}

export async function disconnectDB(db : mongoose.Mongoose) {
  await db.connection.close();
}