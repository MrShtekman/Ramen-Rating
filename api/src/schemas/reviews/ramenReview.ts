import mongoose from "mongoose";
import Review from "./Review";

const ramenReviewSchema = new mongoose.Schema({
    rating: {
        broth: {
            type: Number,
            default: 0,
            required: true,
        },
        toppings: {
            type: Number,
            default: 0,
            required: true,
        },
        noodles: {
            type: Number,
            default: 0,
            required: true,
        },
    },
});

Review.discriminator("RamenReview", ramenReviewSchema);
export default mongoose.model("RamenReview");