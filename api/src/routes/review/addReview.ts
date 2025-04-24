import mongoose, { mongo, startSession, Types } from 'mongoose';
import { Request, Response } from 'express';
import dayjs from 'dayjs';

import Ramen, { IRamen } from '../../schemas/Ramen';
import Restaurant, { IRestaurant } from '../../schemas/Restaurant';
import RamenReview from '../../schemas/reviews/RamenReview';
import RestaurantReview from '../../schemas/reviews/RestaurantReview';

import reviewTypes from '../../constants/reviewTypes';

const addReview = async (req: Request, res: Response): Promise<any> => {
    const session = await startSession();

    try {
        const { target: targetId, type } = req.body;

        if (typeof targetId !== 'string' || !Types.ObjectId.isValid(targetId)){
            console.log(req.body);
            return res.status(400).json({ message: 'Invalid target ID' });
        }

        let target : mongoose.Document<IRestaurant | IRamen> | null;
        if(type === reviewTypes.RESTAURANT){
            target = await Restaurant.findById(targetId);
            if (!target)
                return res.status(404).json({ message: 'Restaurant not found' });
        } else if(type === reviewTypes.RAMEN){
            target = await Ramen.findById(targetId);
            if (!target)
                return res.status(404).json({ message: 'Ramen not found' });
        } else
            return res.status(400).json({ message: 'Invalid review type' });

        const review = {
            ...req.body,
            created: dayjs().add(2, 'hour'),
        };

        await session.withTransaction(async () => {

            if(type === reviewTypes.RESTAURANT){
                const [newReview] = await RestaurantReview.create([review], { session });
                (target as IRestaurant).reviews.push(newReview._id);
            } else if(type === reviewTypes.RAMEN){
                const [newReview]= await RamenReview.create([review], { session });
                (target as IRamen).reviews.push(newReview._id);
            }
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

