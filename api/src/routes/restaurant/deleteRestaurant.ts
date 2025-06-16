import Restaurant from '../../schemas/Restaurant';
import Ramen from '../../schemas/Ramen';
import Review from '../../schemas/reviews/Review';

import { Request, Response } from 'express';
import { startSession, Types } from 'mongoose';

const deleteRestaurant = async (req: Request, res: Response): Promise<any> => {
    const session = await startSession();
    try {
        const { id } = req.params;
        
        if(!Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: 'Invalid restaurat ID'});
        }

        const restaurantToDelete = await Restaurant.findById(id);
        if(!restaurantToDelete){
            return res.status(404).json({ message: `Restaurant not found!` });
        }

        await session.withTransaction(async () => {
            if (restaurantToDelete.reviews.length > 0) {
                await Review.deleteMany({ _id: { $in: restaurantToDelete.reviews } }, { session });
            }
            if (restaurantToDelete.ramen.length > 0) {
                await Ramen.deleteMany({ _id: { $in: restaurantToDelete.ramen } }, { session });
            }
            await Restaurant.findByIdAndDelete(id);
        })
        res.status(200).json({ message: "Restaurant deleted successfully!", restaurantToDelete });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    } finally {
        session.endSession();
    }
};

export default deleteRestaurant;