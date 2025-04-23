import { Request, Response } from 'express';
import dayjs from 'dayjs';

import Restaurant from '../../schemas/Restaurant';

const addRestaurant = async (req: Request, res: Response) => {
    try {
        const newRestaurant = {
            ...req.body,
            created: dayjs().add(2, 'hour'),
        };

        const restaurant = await Restaurant.create(newRestaurant);
        res.status(200).json({ message: "Restaurant created successfully", restaurant});
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

export default addRestaurant;