import mongoose from "mongoose";
import Review, { IReview } from "./Review";

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

export interface IRamenReview extends IReview {
    rating?: {
        broth: number;
        toppings: number;
        noodles: number;
    };
}

export interface IRamenReviewModel extends mongoose.Model<IRamenReview> {}

Review.discriminator("RamenReview", ramenReviewSchema);
export default mongoose.model<IRamenReview, IRamenReviewModel>("RamenReview");