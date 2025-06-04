import { connectDB, disconnectDB } from "../../connection";
import removeAllCollections from "./clearCollections";
import mongoose from "mongoose";

let db : mongoose.Mongoose;

beforeAll(async () => {
  db = await connectDB();
});

afterAll(async () => {
    if(db) {
        await removeAllCollections(db);
        await disconnectDB(db);
    }
});