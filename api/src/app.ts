import express from "express";
import MainRouter from "./routes/index";

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.send("hello world!");
});

app.use("/", MainRouter);

export default app;
