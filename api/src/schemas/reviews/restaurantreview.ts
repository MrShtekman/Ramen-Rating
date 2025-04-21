import mongoose from "mongoose";
import Review from "./Review";

const restaurantReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        default: 0,
        required: true,
    },
});

Review.discriminator("RestaurantReview", restaurantReviewSchema);
export default mongoose.model("RestaurantReview");