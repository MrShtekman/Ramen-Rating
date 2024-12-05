import express from "express";
import mongoose from "mongoose";
import testRouter from "./src/routes/testRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

const port = 4000;
const uri = 'mongodb+srv://MrShtekman:pain12345@cluster0.qwrah.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.get("/", (req, res) => {
    res.send("test app!");
})

app.use('/api/testObjects', testRouter);

app.listen(port, () => {
    console.log(`app on port ${port}`);
})

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
mongoose.connect(uri, clientOptions)
    .then(() => {
        console.log('Connected!');
    })
    .catch(() => {
        console.log('connection failed');
    })