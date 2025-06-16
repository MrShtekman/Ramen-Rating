import mongoose, { startSession, Types } from 'mongoose';
import { Request, Response } from 'express';

import Review from '../../schemas/reviews/Review';

import { reviewTypeToTargetModel, ReviewType } from '../../constants/reviewTypesMap';

const deleteReview = async (req: Request, res: Response): Promise<any> => {
    const session = await startSession();
    try {
        const { id } = req.params;

        if(!Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: 'Invalid review ID' });
        }

        const reviewToDelete = await Review.findById(id);
        if(!reviewToDelete){
            return res.status(404).json({ message: `Review not found!` });
        }

        const model = reviewTypeToTargetModel[reviewToDelete.type as ReviewType] as mongoose.Model<any>;
        const subject = await model.findById(reviewToDelete.subject);
        if(!subject){
            return res.status(404).json({ message: `Subject of the review not found!` });
        }

        await session.withTransaction(async () => {
            await Review.findByIdAndDelete(reviewToDelete._id, { session });
            await subject.updateOne({ $pull: { reviews: reviewToDelete._id } }, { session });
        })

        res.status(200).json({ message: "Review successfully deleted!", reviewToDelete });
    } catch (error: any) {

    } finally {
        session.endSession();
    }
}

export default deleteReview;