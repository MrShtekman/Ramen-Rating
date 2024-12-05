import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;
const uri = 'mongodb+srv://MrShtekman:pain12345@cluster0.qwrah.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

app.get("/", (req, res) => {
    res.send("hello wosdfd!");
})

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

// async function run() {
//   try {
//     // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
//     await mongoose.connect(uri);
//     //await mongoose.connection.db.admin().command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//   } finally {
//     // Ensures that the client will close when you finish/error
//     await mongoose.disconnect();
//   }
// }
// run().catch(console.dir);