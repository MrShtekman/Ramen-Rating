import { Request, Response } from 'express';
import dayjs from 'dayjs';

import Restaurant from '../../schemas/Restaurant';

import fieldValidator from '../../utils/fieldValidator';

const addRestaurant = async (req: Request, res: Response): Promise<any> => {
    try {
        const invalidFields = fieldValidator(req.body, Restaurant);
        if (invalidFields.length > 0) {
            return res.status(400).json({ message: `Invalid field(s): ${invalidFields.join(', ')}` })
        }

        const newRestaurant = {
            ...req.body,
            created: dayjs().add(2, 'hour'),
        };

        const restaurant = await Restaurant.create(newRestaurant);
        res.status(200).json({ message: "Restaurant created successfully", restaurant });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export default addRestaurant;