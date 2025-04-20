import mongoose from "mongoose";
import reviewTypes from "../../constants/reviewTypes";


const ReviewSchema = new mongoose.Schema({
    comment: {
        type: String,
        default: "",
        required: true,
    },
    type: {
        type: String,
        enum: Object.values(reviewTypes),
        required: true,
    },
    created: {
        type: Date,
        default: Date.now,
        required: true,
    },
});

export default mongoose.model("Review", ReviewSchema)