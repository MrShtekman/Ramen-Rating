import mongoose from "mongoose";
import configs from "./configs/common";

const DBuri = configs.db.uri;
const testDBuri = configs.db.testUri;
const clientOptions = { serverApi: { version: '1', deprecationErrors: true } };

// let db;
// let testDB;

export async function connectDB() {
  const uri = configs.env === "dev" ? DBuri : testDBuri;
  return await mongoose.connect(uri, clientOptions as any);
}

export async function disconnectDB() {
  await mongoose.disconnect();
}

export async function disconnectCon(db){
  await db.connection.close();
}