import mongoose from "mongoose";
import Review from "./Review";

const ramenReviewSchema = new mongoose.Schema({
    rating: {
        type: {
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
        required: true,
    },
});

Review.discriminator("RamenReview", ramenReviewSchema);
export default mongoose.model("RamenReview");