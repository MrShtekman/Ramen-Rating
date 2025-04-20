import express from "express";
import mongoose from "mongoose";
import MainRouter from "./src/routes/index";

const app = express();
const port = 3000;
const uri = 'mongodb+srv://MrShtekman:pain12345@cluster0.qwrah.mongodb.net/RamenRatings?retryWrites=true&w=majority&appName=Cluster0';

app.use(express.json());
app.use(express.urlencoded({extended: false}))

app.get("/", (req, res) => {
    res.send("hello world!");
})

app.listen(port, () => {
    console.log(`app on port ${port}`);
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
