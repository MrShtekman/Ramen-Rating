import mongoose, { Types } from "mongoose";
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
        immutable: true,
    },
    subject: {
        type: Types.ObjectId,
        required: true,
        immutable: true,
    },
    created: {
        type: Date,
        default: Date.now,
        required: true,
        immutable: true,
    },
});

export interface IReview extends mongoose.Document {
    comment: string;
    type: string;
    subject: Types.ObjectId;
    created: Date;
}

export interface IReviewModel extends mongoose.Model<IReview> {}

export default mongoose.model<IReview, IReviewModel>("Review", ReviewSchema)