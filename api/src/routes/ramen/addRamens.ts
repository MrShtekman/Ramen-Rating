import { startSession, Types } from 'mongoose';
import Ramen from '../../schemas/Ramen';
import Restaurant from '../../schemas/Restaurant';
import { Request, Response } from 'express';

const addRamens = async (req: Request, res: Response) => {
    const session = await startSession();

    try {
        const { 
            name,
            price,
            restaurant: restaurantId,
            rating,
            created,
            reviews,
            flavor,
            components,
        } = req.body;

        const ramen = {
            name,
            price,
            restaurant: restaurantId,
            rating,
            created,
            reviews,
            flavor,
            components,
        };

        if (typeof restaurantId !== 'string' || !Types.ObjectId.isValid(restaurantId)){
            return res.status(400).json({ message: 'Invalid restaurant ID' });
        }

        const restaurant = await Restaurant.findById(restaurantId);
        if (!restaurant){
            return res.status(404).json({ message: 'Restaurant not found' });
        }

        session.withTransaction(async () => {
            const newRamen = await Ramen.create(ramen);
    
            restaurant.ramen.push(newRamen._id);
            await restaurant.save();
        });
        
        session.endSession();
        res.status(200).json("Ramen added successfully");

    } catch (error) {
        res.status(500).json({ message: error.message });
    } finally {
        session.endSession();
    }
}; 

export default addRamens;