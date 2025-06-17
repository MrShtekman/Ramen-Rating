import express from "express";
import MainRouter from "./routes/index";
import cors from "cors";

const app = express();

app.use(cors({
    origin: "http://localhost:4000",
    methods: ["GET", "POST", "PUT", "DELETE"],
}));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.send("hello world!");
});

app.use("/", MainRouter);

export default app;
