import mongoose from "mongoose";
import Review from "./Review";

const restaurantReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        default: 0,
        required: true,
    },
});

Review.discriminator("RamenReview", restaurantReviewSchema);
export default mongoose.model("RamenReview", restaurantReviewSchema);