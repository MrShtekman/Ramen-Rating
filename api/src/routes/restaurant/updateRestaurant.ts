import Restaurant from '../../schemas/Restaurant';

import fieldValidator from '../../utils/fieldValidator';

import { Request, Response } from 'express';
import { Types } from 'mongoose';

const updateRestaurant = async (req: Request, res: Response): Promise<any> => {
    try {
        const { id } = req.params;

        if (!Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid restaurant ID' });
        }

        const invalidFields = fieldValidator(req.body, Restaurant);
        if (invalidFields.length > 0) {
            return res.status(400).json({ message: `Invalid field(s): ${invalidFields.join(', ')}` })
        }

        const updatedRestaurant = await Restaurant.findByIdAndUpdate(id, req.body, { new: true });
        if (!updatedRestaurant) {
            return res.status(404).json({ message: 'Restaurant not found' })
        }
        res.status(200).json(updatedRestaurant);
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
}

export default updateRestaurant;