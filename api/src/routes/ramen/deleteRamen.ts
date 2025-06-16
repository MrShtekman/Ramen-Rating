import Ramen from '../../schemas/Ramen';
import Restaurant from '../../schemas/Restaurant';
import Review from '../../schemas/reviews/Review';

import { Request, Response } from 'express';
import { startSession, Types } from 'mongoose';

const deleteRamen = async (req: Request, res: Response): Promise<any> => {
    const session = await startSession();
    try {
        const { id } = req.params;

        if(!Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: 'Invalid ramen ID' });
        }

        const ramenToDelete = await Ramen.findById(id);
        if(!ramenToDelete){
            return res.status(404).json({ message: `Ramen not found!`})
        }

        const restaurant = await Restaurant.findById(ramenToDelete.restaurant);
        if(!restaurant){
            return res.status(404).json({ message: `Restaurant related to this Ramen not found!`})
        }

        await session.withTransaction(async () => {
            if(ramenToDelete.reviews.length > 0){
                await Review.deleteMany({ _id: { $in: ramenToDelete.reviews } }, { session });
            }
            await Ramen.findByIdAndDelete(ramenToDelete._id, { session });
            await restaurant.updateOne({ $pull: { ramen: ramenToDelete._id}}, { session });
        })
    
        res.status(200).json({ message: "Ramen deleted successfully!", ramenToDelete });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    } finally {
        session.endSession();
    }
};

export default deleteRamen;