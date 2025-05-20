import Ramen from '../../schemas/Ramen';
import Restaurant from '../../schemas/Restaurant';
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
            return res.status(404).json({ message: `Ramen ${id} not found!`})
        }

        const restaurant = await Restaurant.findById(ramenToDelete.restaurant);
        if(!restaurant){
            return res.status(404).json({ message: `Ramen related restaurant ${ramenToDelete.restaurant} not found!`})
        }

        await session.withTransaction(async () => {
            await Ramen.findByIdAndDelete(ramenToDelete._id);
            await restaurant.updateOne({ $pull: { ramen: ramenToDelete._id}}, { session });
        })
    
        res.status(200).json({ message: "Ramen successfully deleted!", ramenToDelete });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    } finally {
        session.endSession();
    }
};

export default deleteRamen;