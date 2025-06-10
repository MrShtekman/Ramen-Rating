import mongoose, { startSession, Types } from 'mongoose';
import { Request, Response } from 'express';
import dayjs from 'dayjs';

import reviewTypes from '../../constants/reviewTypes';
import { reviewTypeToSchema, reviewTypeToTargetModel, ReviewType } from '../../constants/reviewTypesMap';

import cap from '../../utils/capitalize';
import fieldValidator from '../../utils/fieldValidator';

const addReview = async (req: Request, res: Response): Promise<any> => {
    const session = await startSession();

    try {
        const { target: targetId, type } = req.body;

        if (typeof targetId !== 'string' || !Types.ObjectId.isValid(targetId)) {
            return res.status(400).json({ message: 'Invalid target ID' });
        }

        if (!Object.values(reviewTypes).includes(type)) {
            return res.status(400).json({ message: 'Invalid review type' });
        }

        const targetModel = reviewTypeToTargetModel[type as ReviewType] as mongoose.Model<any>;
        const target = await targetModel.findById(targetId);
        if (!target) {
            return res.status(404).json({ message: `${cap(type)} not found` });
        }

        const reviewModel = reviewTypeToSchema[type as ReviewType] as mongoose.Model<any>;
        const invalidFields = fieldValidator(req.body, reviewModel);
        if (invalidFields.length > 0) {
            return res.status(400).json({ message: `Invalid field(s): ${invalidFields.join(', ')}` })
        }

        const review = {
            ...req.body,
            created: dayjs().add(2, 'hour'),
        };

        await session.withTransaction(async () => {
            const [newReview] = await reviewModel.create([review], { session });
            target.reviews.push(newReview._id);
            await target.save({ session });
        });

        res.status(200).json({ message: "Review added successfully", review });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    } finally {
        session.endSession();
    }

};

export default addReview;

