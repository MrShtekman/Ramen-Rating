import { startSession, Types } from 'mongoose';
import Ramen from '../../schemas/Ramen';
import Restaurant from '../../schemas/Restaurant';
import { Request, Response } from 'express';
import dayjs from 'dayjs';

const addRamens = async (req: Request, res: Response): Promise<any> => {
    const session = await startSession();

    try {
        const { restaurant: restaurantId } = req.body;

        if (typeof restaurantId !== 'string' || !Types.ObjectId.isValid(restaurantId)){
            return res.status(400).json({ message: 'Invalid restaurant ID' });
        }

        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant){
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        const ramen = {
            ...req.body,
            created: dayjs().add(2, 'hour'),
        }

        await session.withTransaction(async () => {
            const [newRamen] = await Ramen.create([ramen], { session });
    
            restaurant.ramen.push(newRamen._id);
            await restaurant.save({ session });
        });
        
        res.status(200).json("Ramen added successfully");

    } catch (error: any) {
        res.status(500).json({ message: error.message });
    } finally {
        session.endSession();
    }
}; 

export default addRamens;