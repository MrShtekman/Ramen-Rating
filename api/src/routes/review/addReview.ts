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
        const { subject: targetId, type } = req.body;

        if (typeof targetId !== 'string' || !Types.ObjectId.isValid(targetId)) {
            return res.status(400).json({ message: 'Invalid subject ID' });
        }

        if (!Object.values(reviewTypes).includes(type)) {
            return res.status(400).json({ message: 'Invalid review type' });
        }

        const targetModel = reviewTypeToTargetModel[type as ReviewType] as mongoose.Model<any>;
        const subject = await targetModel.findById(targetId);
        if (!subject) {
            return res.status(404).json({ message: `${cap(type)} not found` });
        }

        const reviewModel = reviewTypeToSchema[type as ReviewType];
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
            subject.reviews.push(newReview._id);
            await subject.save({ session });
        });

        res.status(200).json({ message: "Review added successfully", review });

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    } finally {
        session.endSession();
    }

};

export default addReview;

