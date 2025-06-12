import Review from '../../schemas/reviews/Review';

import fieldValidator from '../../utils/fieldValidator';
import { ReviewType, reviewTypeToSchema } from '../../constants/reviewTypesMap';

import { Request, Response } from 'express';
import { Types } from 'mongoose';

const updateReview = async ( req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        if(!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid review ID' });
        }

        const reviewToUpdate = await Review.findById(id);
        if(!reviewToUpdate){
            return res.status(404).json({ message: 'Review not found' });
        }

        const reviewModel = reviewTypeToSchema[reviewToUpdate.type as ReviewType];
        const invalidFields = fieldValidator(req.body, reviewModel, true);
        if (invalidFields.length > 0) {
            return res.status(400).json({ message: `Invalid field(s): ${invalidFields.join(', ')}` });
        }

        Object.assign(reviewToUpdate, req.body);
        await reviewToUpdate.save()

        res.status(200).json(reviewToUpdate);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export default updateReview;