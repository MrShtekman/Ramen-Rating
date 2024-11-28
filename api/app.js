import express from "express";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
    console.log(req);
    console.log(res);
    res.send("hello world!");
})

app.listen(port, () => {
    console.log(`app on port ${port}`);
})