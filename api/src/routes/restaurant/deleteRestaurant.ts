import Restaurant from '../../schemas/Restaurant';
import { Request, Response } from 'express';
import { Types } from 'mongoose';

const deleteRestaurant = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;
        
        if(!Types.ObjectId.isValid(id)){
            return res.status(400).json({ message: 'Invalid restaurat ID'});
        }

        const restaurantToDelete = await Restaurant.findById(id);
        if(!restaurantToDelete){
            return res.status(404).json({ message: `Restaurant not found!` });
        }

        const deletedRestaurant = await Restaurant.findByIdAndDelete(id);
        res.status(200).json({ message: "Restaurant successfully deleted!", deletedRestaurant });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export default deleteRestaurant;