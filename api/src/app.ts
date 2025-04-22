import express from "express";
import mongoose from "mongoose";
import MainRouter from "./routes/index";
import configs from "./configs/common";

const app = express();
const uri = configs.db.uri;

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
    res.send("hello world!");
})

app.use("/main", MainRouter);

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

mongoose.connect(uri, clientOptions as mongoose.ConnectOptions)
.then(() => {
    console.log('Connected!');
})
.catch(() => {
    console.log('connection failed');
})

export default app;
