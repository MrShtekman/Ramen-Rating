import mongoose from "mongoose";

const TestProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    quantity: {
        type: Number,
        default: 0,
    },
    price: {
        type: Number,
        required: true,
    },
    owner: {
        type: String,
        default: "none"
    }
}); 

export default mongoose.model("TestObject", TestProjectSchema);
