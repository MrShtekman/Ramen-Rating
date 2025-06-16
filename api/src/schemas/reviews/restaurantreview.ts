import mongoose from "mongoose";
import Review, { IReview } from "./Review";

const restaurantReviewSchema = new mongoose.Schema({
    rating: {
        type: Number,
        default: 0,
        required: true,
    },
});

export interface IRestaurantReview extends IReview {
    rating: number;
}

export interface IRestaurantReviewModel extends mongoose.Model<IRestaurantReview> {}

Review.discriminator("RestaurantReview", restaurantReviewSchema);
export default mongoose.model<IRestaurantReview, IRestaurantReviewModel>("RestaurantReview");