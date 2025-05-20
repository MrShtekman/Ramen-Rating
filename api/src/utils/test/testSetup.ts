import { connectDB, disconnectDB, disconnectCon } from "../../connection";
import removeAllCollections from "./clearCollections";
import mongoose from "mongoose";

let db : mongoose.Mongoose;

beforeAll(async () => {
  //await connectDB();
  db = await connectDB();
});

afterAll(async () => {
    if(db) {
        await removeAllCollections(db);
        //await disconnectDB();
      await disconnectCon(db);
    }
});