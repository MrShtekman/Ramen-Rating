import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema.Types;

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
        required: true
    },
    reviews: {
        type: [ObjectId],
    }
});

export default mongoose.model("User", UserSchema);